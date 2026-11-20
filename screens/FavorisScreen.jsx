import { View, Text, FlatList, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from './FavorisStyles';

const formaterPrix = (prix) => prix.toFixed(2).replace('.', ',') + ' €';

const CarteFavori = ({ produit, onRetirer, onAjouterPanier }) => (
  <View style={styles.carte}>
    <Image
      source={{ uri: produit.image }}
      style={styles.image}
      resizeMode="cover"
    />

    <View style={styles.info}>
      <Text style={styles.nom} numberOfLines={1}>{produit.nom}</Text>
      <Text style={styles.categorie}>{produit.categorie}</Text>
      <Text style={styles.prix}>{formaterPrix(produit.prix)}</Text>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onAjouterPanier(produit)}
          style={({ pressed }) => [
            styles.boutonPanier,
            pressed && styles.boutonPressed,
          ]}
        >
          <Ionicons name="cart-outline" size={16} color="#fff" />
          <Text style={styles.boutonPanierTexte}>Ajouter</Text>
        </Pressable>

        <Pressable
          onPress={() => onRetirer(produit.id)}
          style={({ pressed }) => [
            styles.boutonRetirer,
            pressed && styles.boutonPressed,
          ]}
        >
          <Ionicons name="heart-dislike-outline" size={18} color="#DC2626" />
        </Pressable>
      </View>
    </View>
  </View>
);

export const FavorisScreen = ({
  favoris = [],
  onRetirerFavori,
  onAjouterAuPanier,
}) => {
  if (favoris.length === 0) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
        <Text style={styles.videTitre}>Aucun favori</Text>
        <Text style={styles.videTexte}>
          Les produits que vous aimez apparaîtront ici
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.ecran}>
      {/* En-tête */}
      <View style={styles.entete}>
        <Text style={styles.titre}>Mes Favoris</Text>
        <Text style={styles.sousTitre}>
          {favoris.length} produit{favoris.length > 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={favoris}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CarteFavori
            produit={item}
            onRetirer={onRetirerFavori}
            onAjouterPanier={onAjouterAuPanier}
          />
        )}
        contentContainerStyle={styles.liste}
        ItemSeparatorComponent={() => <View style={styles.separateur} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};