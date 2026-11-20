import { useState, useEffect, useRef, useCallback, memo } from 'react';
import {
  View, Text, TextInput, FlatList, Pressable, ActivityIndicator, Image, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styles from './CatalogueStyles';
import {
  initDb, listerProduits, compterProduits, listerCategories, insererProduit,
} from '../database';
import { useAuth } from '../context/AuthContext';
import { useDebounce } from '../hooks/useDebounce';

const TAILLE_PAGE = 10;

const formaterPrix = (prix) => prix.toFixed(2).replace('.', ',') + ' €';

const IMAGES_PRODUITS = {
  'Lessive liquide': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop',
  'Liquide vaisselle': 'https://images.unsplash.com/photo-1629198688000-55b9bc4021ce?w=120&h=120&fit=crop',
  'Éponge': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=120&h=120&fit=crop',
  'Serpillière': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop',
  'Balai': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=120&h=120&fit=crop',
  'Aspirateur': 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCW5UDG9I0xbke0GEmzHneMW3CPU5B0dIiBT6e9uDVOnXX_-s5qCzOTkiWjKiPDy1NwwNsoEjegmllpLke2pptjpuC-a_CtE3NB8prJ3CxA2sQQWfIl4ByFHrJc0Z7H4sDk_c6LYdxQw&usqp=CAc',
  'Detergent multi-surfaces': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop',
  'Nettoyant vitre': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=120&h=120&fit=crop',
  'Désodorisant': 'https://images.unsplash.com/photo-1608571423902-eed4a5dbd13c?w=120&h=120&fit=crop',
  'Sacs poubelle': 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=120&h=120&fit=crop',
  'Papier toilette': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=120&h=120&fit=crop',
  'Essuie-tout': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=120&h=120&fit=crop',
  'Gants ménage': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop',
  'Brosse WC': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=120&h=120&fit=crop',
  'Produit sol': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop',
  'Javel': 'https://images.unsplash.com/photo-1629198688000-55b9bc4021ce?w=120&h=120&fit=crop',
  'Adoucissant': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3IYkAfnQPJGXcp-bvaKezaza7AvtdWWAa1rnsLCm9w&s=10',
  'Tablettes lave-vaisselle': 'https://images.unsplash.com/photo-1629198688000-55b9bc4021ce?w=120&h=120&fit=crop',
  'Éponge magique': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=120&h=120&fit=crop',
  'Chiffon microfibre': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=120&h=120&fit=crop',
  'Seau': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=120&h=120&fit=crop',
  'Raclette vitre': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=120&h=120&fit=crop',
  'Poubelle cuisine': 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=120&h=120&fit=crop',
  'Spray anti-calcaire': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=120&h=120&fit=crop',
};

const getImageUrl = (nom) =>
  IMAGES_PRODUITS[nom] ||
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=120&h=120&fit=crop';

// HOOK memo : la carte n'est redessinée que si SES props changent
// (sans memo, les 10+ cartes se redessinent à chaque frappe ou changement d'état).
const CarteProduit = memo(({ produit, onAjouter, onToggleFavori, estFavori }) => {
  const image = getImageUrl(produit.nom);
  return (
    <View style={styles.carte}>
      <Image source={{ uri: image }} style={styles.imageProduit} resizeMode="cover" />

      <View style={styles.carteGauche}>
        <Text style={styles.nom} numberOfLines={1}>{produit.nom}</Text>
        <Text style={styles.categorie}>{produit.categorie}</Text>
        <Text style={styles.prix}>{formaterPrix(produit.prix)}</Text>
      </View>

      <View style={styles.carteDroite}>
        <Pressable
          // on envoie aussi l'image pour que Favoris/Panier gardent la bonne photo
          onPress={() => onToggleFavori?.({ ...produit, image })}
          style={styles.boutonFavori}
        >
          <Text style={{ fontSize: 22 }}>{estFavori ? '❤️' : '🤍'}</Text>
        </Pressable>

        <Text style={[styles.stock, produit.stock === 0 && styles.rupture]}>
          {produit.stock === 0 ? 'En rupture' : `Stock : ${produit.stock}`}
        </Text>

        <Pressable
          onPress={() => {
            if (typeof onAjouter === 'function') {
              onAjouter({ ...produit, image });
            } else {
              Alert.alert('Erreur', 'Fonction ajouter au panier non disponible');
            }
          }}
          disabled={produit.stock === 0}
          style={({ pressed }) => [
            styles.boutonAjouter,
            produit.stock === 0 && styles.boutonDesactive,
            pressed && styles.boutonPresse,
          ]}
        >
          <Text style={styles.boutonAjouterTexte}>
            {produit.stock === 0 ? 'Indisponible' : 'Ajouter'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});

const Separateur = () => <View style={styles.separateur} />;

export const CatalogueScreen = ({ onAjouterAuPanier, favorisIds = [], onToggleFavori }) => {
  const { utilisateur } = useAuth(); // HOOK useContext (via useAuth) : lit l'utilisateur connecté

  // HOOK useState : les données qui font changer l'affichage
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState(null);
  const [version, setVersion] = useState(0);
  const [chargement, setChargement] = useState(true);
  const [rafraichissement, setRafraichissement] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [total, setTotal] = useState(0);
  const [chargementPlus, setChargementPlus] = useState(false);

  // HOOK useDebounce : la saisie reste instantanée, mais la requête
  // n'est envoyée que 400 ms après la dernière lettre tapée.
  const rechercheDiffere = useDebounce(recherche, 400);

  // HOOK useRef : valeur qui survit aux rendus SANS les déclencher.
  // Ici : compteur de lectures pour ignorer les réponses périmées.
  const generation = useRef(0);
  // HOOK useRef : référence vers la FlatList pour la faire défiler par code.
  const listeRef = useRef(null);
  // HOOK useRef : pour ne pas recharger au tout premier affichage de l'onglet.
  const premierFocus = useRef(true);

  // HOOK useEffect (1) : initialise la base et charge les catégories, une seule fois ([] = au montage)
  useEffect(() => {
    const initialiser = async () => {
      try {
        await initDb();
        const liste = await listerCategories();
        setCategories([null, ...liste]);
      } catch (e) {
        console.log('ERREUR INIT :', e.message);
        setErreur("Impossible d'initialiser la base : " + e.message);
        setChargement(false);
      }
    };
    initialiser();
  }, []);

  // HOOK useEffect (2) : relit les produits quand la recherche différée, la catégorie
  // ou `version` change. Le return annule la lecture si un nouveau filtre arrive.
  useEffect(() => {
    let actuel = true;
    generation.current += 1;

    const lire = async () => {
      try {
        const [lignes, nombre] = await Promise.all([
          listerProduits({ recherche: rechercheDiffere, categorie, limite: TAILLE_PAGE, decalage: 0 }),
          compterProduits({ recherche: rechercheDiffere, categorie }),
        ]);
        if (actuel) {
          setProduits(lignes);
          setTotal(nombre);
          setErreur(null);
        }
      } catch (e) {
        console.log('ERREUR LECTURE :', e.message);
        if (actuel) setErreur('Impossible de charger les produits : ' + e.message);
      } finally {
        if (actuel) {
          setChargement(false);
          setRafraichissement(false);
        }
      }
    };

    lire();
    return () => {
      actuel = false;
    };
  }, [rechercheDiffere, categorie, version]);

  // HOOK useEffect (3) : remonte en haut de la liste quand le filtre change
  useEffect(() => {
    listeRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [categorie, rechercheDiffere]);

  // HOOK useFocusEffect (React Navigation) : s'exécute à chaque fois qu'on REVIENT sur
  // l'onglet Catalogue. Permet de mettre à jour les stocks. Le premier affichage est ignoré
  // car le chargement initial est déjà fait par les effets ci-dessus.
  useFocusEffect(
    useCallback(() => {
      if (premierFocus.current) {
        premierFocus.current = false;
        return;
      }
      setVersion((v) => v + 1);
    }, [])
  );

  const recharger = () => setVersion((v) => v + 1);

  const reessayer = () => {
    setChargement(true);
    recharger();
  };

  const rafraichir = () => {
    setRafraichissement(true);
    recharger();
  };

  const ajouter = async () => {
    try {
      await insererProduit(`Nouveau produit ${Date.now() % 1000}`, 'Maison', 9.9, 5);
      recharger();
    } catch (e) {
      console.log(e);
      setErreur("Impossible d'ajouter le produit");
    }
  };

  const chargerPlus = async () => {
    if (chargementPlus || produits.length >= total) return;
    const lecture = generation.current;
    setChargementPlus(true);
    try {
      const suite = await listerProduits({
        recherche: rechercheDiffere,
        categorie,
        limite: TAILLE_PAGE,
        decalage: produits.length,
      });
      if (lecture !== generation.current) return;
      setProduits((actuels) => [...actuels, ...suite]);
    } catch (e) {
      console.log(e);
    } finally {
      setChargementPlus(false);
    }
  };

  // HOOK useCallback : garde la MÊME fonction entre deux rendus tant que les dépendances
  // ne changent pas. Indispensable pour que `memo` sur CarteProduit serve à quelque chose.
  // IMPORTANT : tous les hooks restent AVANT les `return` conditionnels ci-dessous.
  const renderProduit = useCallback(
    ({ item }) => (
      <CarteProduit
        produit={item}
        onAjouter={onAjouterAuPanier}
        estFavori={favorisIds.includes(item.id)}
        onToggleFavori={onToggleFavori}
      />
    ),
    [onAjouterAuPanier, favorisIds, onToggleFavori]
  );

  if (chargement) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (erreur) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <Text style={styles.messageErreur}>{erreur}</Text>
        <Pressable
          onPress={reessayer}
          style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
        >
          <Text style={styles.boutonTexte}>Réessayer</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const filtreActif = recherche.trim() !== '' || categorie !== null;

  return (
    <SafeAreaView style={styles.ecran}>
      <View style={styles.fixe}>
        <View style={styles.ligneTitre}>
          <View>
            <Text style={styles.titre}>Produits</Text>
            <Text style={styles.sousTitre}>
              {produits.length} / {total} produit(s)
            </Text>
          </View>
        </View>

        <Text style={styles.bonjour}>
          Connecté : {utilisateur?.prenom} {utilisateur?.nom}
        </Text>

        <TextInput
          style={styles.champRecherche}
          placeholder="Rechercher un produit"
          placeholderTextColor="#9CA3AF"
          autoCorrect={false}
          value={recherche}
          onChangeText={setRecherche}
        />
      </View>

      <View style={styles.conteneurPuces}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          extraData={categorie}
          keyExtractor={(c) => c ?? 'toutes'}
          contentContainerStyle={styles.puces}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item: c }) => (
            <Pressable
              onPress={() => setCategorie(c)}
              style={[styles.puce, categorie === c && styles.puceActive]}
            >
              <Text style={[styles.puceTexte, categorie === c && styles.puceTexteActive]}>
                {c ?? 'Toutes'}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        ref={listeRef}
        style={{ flex: 1 }}
        data={produits}
        extraData={favorisIds}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduit}
        ItemSeparatorComponent={Separateur}
        onEndReached={chargerPlus}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          chargementPlus ? <ActivityIndicator style={styles.pied} color="#2563EB" /> : null
        }
        
        ListEmptyComponent={
          <Text style={styles.vide}>
            {filtreActif ? 'Aucun produit ne correspond' : 'Aucun produit à afficher'}
          </Text>
        }
        refreshing={rafraichissement}
        onRefresh={rafraichir}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.liste}
      />
    </SafeAreaView>
  );
};