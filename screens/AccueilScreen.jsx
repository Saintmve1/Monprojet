import { useMemo, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import styles from './AccueilStyles';

const CATEGORIES = [
  { id: '1', nom: 'Sols', icone: 'brush-outline' },
  { id: '2', nom: 'Vitres', icone: 'sparkles-outline' },
  { id: '3', nom: 'Cuisine', icone: 'restaurant-outline' },
  { id: '4', nom: 'Linge', icone: 'shirt-outline' },
  { id: '5', nom: 'Salle de bain', icone: 'water-outline' },
];

const salutation = () => {
  const heure = new Date().getHours();
  if (heure < 12) return 'Bonjour';
  if (heure < 18) return 'Bon après-midi';
  return 'Bonsoir';
};

export const AccueilScreen = ({ navigation }) => {
  const { utilisateur } = useAuth(); // HOOK useContext (via useAuth) : utilisateur connecté

  // HOOK useMemo : la salutation est calculée une seule fois, pas à chaque rendu
  const message = useMemo(salutation, []);

  // HOOK useMemo : initiales recalculées seulement si le nom ou prénom change
  const initiales = useMemo(
    () =>
      `${utilisateur?.prenom?.[0]?.toUpperCase() ?? '?'}${utilisateur?.nom?.[0]?.toUpperCase() ?? ''}`,
    [utilisateur?.prenom, utilisateur?.nom]
  );

  // HOOK useCallback : une seule fonction de navigation, stable entre les rendus
  const allerCatalogue = useCallback(() => navigation?.navigate('Catalogue'), [navigation]);

  return (
    <SafeAreaView style={styles.ecran} edges={['left', 'right', 'top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contenu}>
        {/* En-tête */}
        <View style={styles.entete}>
          <View>
            <Text style={styles.salutation}>{message},</Text>
            <Text style={styles.prenom}>{utilisateur?.prenom ?? 'cher client'} 👋</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexte}>{initiales}</Text>
          </View>
        </View>

        {/* Bannière promo */}
        <View style={styles.banniere}>
          <View style={styles.banniereTexte}>
            <Text style={styles.banniereBadge}>NOUVEAUTÉS</Text>
            <Text style={styles.banniereTitre}>Tout pour une maison impeccable</Text>
            <Pressable
              onPress={allerCatalogue}
              style={({ pressed }) => [styles.banniereBouton, pressed && styles.presse]}
            >
              <Text style={styles.banniereBoutonTexte}>Voir le catalogue</Text>
            </Pressable>
          </View>
          <Ionicons name="sparkles" size={64} color="rgba(255,255,255,0.25)" />
        </View>

        {/* Catégories */}
        <Text style={styles.sectionTitre}>Catégories populaires</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map((c) => (
            <Pressable
              key={c.id}
              onPress={allerCatalogue}
              style={({ pressed }) => [styles.categorie, pressed && styles.presse]}
            >
              <Ionicons name={c.icone} size={22} color="#2563EB" />
              <Text style={styles.categorieTexte}>{c.nom}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Avantages */}
        <View style={styles.avantages}>
          <View style={styles.avantage}>
            <Ionicons name="car-outline" size={22} color="#03163e" />
            <Text style={styles.avantageTexte}>Livraison rapide</Text>
          </View>
          <View style={styles.avantage}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#03163e" />
            <Text style={styles.avantageTexte}>Paiement sécurisé</Text>
          </View>
          <View style={styles.avantage}>
            <Ionicons name="refresh-outline" size={22} color="#03163e" />
            <Text style={styles.avantageTexte}>Retours faciles</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};