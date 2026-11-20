// CHANGEMENT : ajout de useEffect
import { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AccueilScreen } from '../screens/AccueilScreen';
import { CatalogueScreen } from '../screens/CatalogueScreen';
import { FavorisScreen } from '../screens/FavorisScreen';
import { PanierScreen } from '../screens/PanierScreen';
import { ParametresScreen } from '../screens/ParametresScreen';
// CHANGEMENT : utilisateur connecté + fonctions de la base
import { useAuth } from '../context/AuthContext';
import {
  initDb,
  listerFavoris, ajouterFavoriDb, retirerFavoriDb,
  listerPanier, ajouterAuPanierDb, modifierQuantiteDb,
  supprimerDuPanierDb, viderPanierDb,
} from '../database';

const Tab = createBottomTabNavigator();

const IMAGE_DEFAUT =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop';

// HOOK useReducer : toutes les actions possibles sur le panier sont regroupées ici,
// au lieu de 4 fonctions qui modifient chacune l'état. Une action = { type, ... }.
function panierReducer(etat, action) {
  switch (action.type) {
    // CHANGEMENT : remplace tout le panier par celui lu en base
    case 'CHARGER':
      return action.items;
    case 'AJOUTER': {
      const existant = etat.find((p) => p.id === action.produit.id);
      if (existant) {
        return etat.map((p) =>
          p.id === existant.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [
        ...etat,
        { ...action.produit, quantite: 1, image: action.produit.image ?? IMAGE_DEFAUT },
      ];
    }
    case 'QUANTITE':
      return action.quantite < 1
        ? etat.filter((p) => p.id !== action.id)
        : etat.map((p) => (p.id === action.id ? { ...p, quantite: action.quantite } : p));
    case 'SUPPRIMER':
      return etat.filter((p) => p.id !== action.id);
    case 'VIDER':
      return [];
    default:
      return etat;
  }
}

export default function TabNavigator() {
  // CHANGEMENT : utilisateur connecté, et son id (clé des tables favoris et panier)
  const { utilisateur } = useAuth();
  const userId = utilisateur?.id;

  // HOOK useReducer : état du panier + fonction dispatch pour envoyer des actions
  const [panier, dispatch] = useReducer(panierReducer, []);
  // HOOK useState : état simple des favoris
  const [favoris, setFavoris] = useState([]);

  // CHANGEMENT : à la connexion, on relit le panier et les favoris de CET utilisateur.
  // À la déconnexion, TabNavigator est démonté, donc l'état repart de zéro pour le suivant.
  useEffect(() => {
    if (userId == null) return;
    let actuel = true;
    const charger = async () => {
      try {
        await initDb();
        const [lignesPanier, lignesFavoris] = await Promise.all([
          listerPanier(userId),
          listerFavoris(userId),
        ]);
        if (!actuel) return;
        dispatch({
          type: 'CHARGER',
          items: lignesPanier.map((l) => ({ ...l, image: l.image ?? IMAGE_DEFAUT })),
        });
        setFavoris(lignesFavoris.map((l) => ({ ...l, image: l.image ?? IMAGE_DEFAUT })));
      } catch (e) {
        console.log('ERREUR CHARGEMENT PANIER/FAVORIS :', e.message);
      }
    };
    charger();
    return () => {
      actuel = false;
    };
  }, [userId]);

  // HOOK useCallback : fonctions stables (même référence à chaque rendu),
  // ce qui permet à `memo` des écrans enfants d'éviter des redessins inutiles.
  // CHANGEMENT : chaque action met à jour l'écran (dispatch) ET la base ; userId en dépendance
  const ajouterAuPanier = useCallback(
    (produit) => {
      dispatch({ type: 'AJOUTER', produit });
      ajouterAuPanierDb(userId, produit).catch((e) => console.log('ERREUR PANIER :', e.message));
    },
    [userId]
  );
  const modifierQuantite = useCallback(
    (id, quantite) => {
      dispatch({ type: 'QUANTITE', id, quantite });
      modifierQuantiteDb(userId, id, quantite).catch((e) => console.log('ERREUR PANIER :', e.message));
    },
    [userId]
  );
  const supprimerDuPanier = useCallback(
    (id) => {
      dispatch({ type: 'SUPPRIMER', id });
      supprimerDuPanierDb(userId, id).catch((e) => console.log('ERREUR PANIER :', e.message));
    },
    [userId]
  );
  const viderPanier = useCallback(() => {
    dispatch({ type: 'VIDER' });
    viderPanierDb(userId).catch((e) => console.log('ERREUR PANIER :', e.message));
  }, [userId]);

  // CHANGEMENT : on regarde si le produit est déjà favori pour choisir INSERT ou DELETE en base
  const toggleFavori = useCallback(
    (produit) => {
      const existe = favoris.some((p) => p.id === produit.id);
      if (existe) {
        setFavoris((prev) => prev.filter((p) => p.id !== produit.id));
        retirerFavoriDb(userId, produit.id).catch((e) => console.log('ERREUR FAVORI :', e.message));
      } else {
        const avecImage = { ...produit, image: produit.image ?? IMAGE_DEFAUT };
        setFavoris((prev) => [...prev, avecImage]);
        ajouterFavoriDb(userId, avecImage).catch((e) => console.log('ERREUR FAVORI :', e.message));
      }
    },
    [favoris, userId]
  );

  const retirerFavori = useCallback(
    (id) => {
      setFavoris((prev) => prev.filter((p) => p.id !== id));
      // CHANGEMENT : suppression aussi en base
      retirerFavoriDb(userId, id).catch((e) => console.log('ERREUR FAVORI :', e.message));
    },
    [userId]
  );

  // HOOK useMemo : recalculés uniquement quand panier/favoris changent
  const nombreArticlesPanier = useMemo(
    () => panier.reduce((sum, item) => sum + item.quantite, 0),
    [panier]
  );
  const favorisIds = useMemo(() => favoris.map((f) => f.id), [favoris]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#1F2937',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Accueil') iconName = 'home';
          else if (route.name === 'Catalogue') iconName = 'list';
          else if (route.name === 'Favoris') iconName = 'heart';
          else if (route.name === 'Panier') iconName = 'cart';
          else if (route.name === 'Paramètres') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBadge:
          route.name === 'Panier' && nombreArticlesPanier > 0
            ? nombreArticlesPanier
            : route.name === 'Favoris' && favoris.length > 0
            ? favoris.length
            : undefined,
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />

      <Tab.Screen name="Catalogue">
        {() => (
          <CatalogueScreen
            onAjouterAuPanier={ajouterAuPanier}
            favorisIds={favorisIds}
            onToggleFavori={toggleFavori}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Favoris">
        {() => (
          <FavorisScreen
            favoris={favoris}
            onRetirerFavori={retirerFavori}
            onAjouterAuPanier={ajouterAuPanier}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Panier">
        {() => (
          <PanierScreen
            panier={panier}
            onModifierQuantite={modifierQuantite}
            onSupprimer={supprimerDuPanier}
            onViderPanier={viderPanier}
            onCommander={() => {
              alert('Commande validée !');
              viderPanier();
            }}
          />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}