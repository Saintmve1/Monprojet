import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { ConfirmModal } from '../components/ConfirmModal';
import styles from './ProfilStyles';

export const ProfilScreen = () => {
  const { utilisateur, deconnecter } = useAuth();
  // CHANGEMENT : état d'ouverture du modal de déconnexion
  const [modalDeconnexion, setModalDeconnexion] = useState(false);

  const menuItems = [
    { id: '1', title: 'Modifier mon profil', icon: 'person-outline', onPress: () => Alert.alert('Info', 'Fonctionnalité à venir') },
    { id: '2', title: 'Mes commandes', icon: 'receipt-outline', onPress: () => Alert.alert('Info', 'Fonctionnalité à venir') },
    { id: '3', title: 'Adresses de livraison', icon: 'location-outline', onPress: () => Alert.alert('Info', 'Fonctionnalité à venir') },
    { id: '4', title: 'Moyens de paiement', icon: 'card-outline', onPress: () => Alert.alert('Info', 'Fonctionnalité à venir') },
    { id: '5', title: 'Notifications', icon: 'notifications-outline', onPress: () => Alert.alert('Info', 'Fonctionnalité à venir') },
    { id: '6', title: 'Aide & Support', icon: 'help-circle-outline', onPress: () => Alert.alert('Info', 'Fonctionnalité à venir') },
  ];

  return (
    <SafeAreaView style={styles.ecran}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header profil */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexte}>
                {utilisateur?.prenom?.[0]?.toUpperCase() || '?'}
                {utilisateur?.nom?.[0]?.toUpperCase() || ''}
              </Text>
            </View>
          </View>

          <Text style={styles.nomComplet}>
            {utilisateur?.prenom} {utilisateur?.nom}
          </Text>
          <Text style={styles.email}>{utilisateur?.email || 'email@exemple.com'}</Text>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>0</Text>
            <Text style={styles.statLabel}>Commandes</Text>
          </View>
          <View style={styles.separateurVertical} />
          <View style={styles.statItem}>
            <Text style={styles.statNombre}>0</Text>
            <Text style={styles.statLabel}>En cours</Text>
          </View>
          <View style={styles.separateurVertical} />
    
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}
            >
              <View style={styles.menuItemGauche}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={22} color="#03163e" />
                </View>
                <Text style={styles.menuTitre}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        {/* Bouton déconnexion : ouvre le modal */}
        <Pressable
          onPress={() => setModalDeconnexion(true)}
          style={({ pressed }) => [
            styles.boutonDeconnexion,
            pressed && styles.boutonPressed,
          ]}
        >
          <Ionicons name="log-out-outline" size={22} color="#DC2626" />
          <Text style={styles.texteDeconnexion}>Se déconnecter</Text>
        </Pressable>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>

      {/* CHANGEMENT : modal de confirmation de déconnexion */}
      <ConfirmModal
        visible={modalDeconnexion}
        icone="log-out-outline"
        titre="Déconnexion"
        message="Voulez-vous vraiment vous déconnecter ?"
        texteConfirmer="Se déconnecter"
        onAnnuler={() => setModalDeconnexion(false)}
        onConfirmer={() => {
          setModalDeconnexion(false);
          deconnecter();
        }}
      />
    </SafeAreaView>
  );
};