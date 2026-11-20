import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ConfirmModal = ({
  visible,
  titre,
  message,
  texteConfirmer = 'Confirmer',
  texteAnnuler = 'Annuler',
  icone = 'alert-circle-outline',
  destructif = true,
  onConfirmer,
  onAnnuler,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onAnnuler} // bouton retour Android
  >
    {/* Fond sombre : un clic dessus ferme le modal */}
    <Pressable style={styles.fond} onPress={onAnnuler}>
      {/* Pressable vide pour que le clic dans la boîte ne ferme pas le modal */}
      <Pressable style={styles.boite} onPress={() => {}}>
        <View style={[styles.icone, destructif && styles.iconeDestructif]}>
          <Ionicons name={icone} size={28} color={destructif ? '#DC2626' : '#2563EB'} />
        </View>

        <Text style={styles.titre}>{titre}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <View style={styles.boutons}>
          <Pressable
            onPress={onAnnuler}
            style={({ pressed }) => [styles.bouton, styles.boutonAnnuler, pressed && styles.presse]}
          >
            <Text style={styles.texteAnnuler}>{texteAnnuler}</Text>
          </Pressable>

          <Pressable
            onPress={onConfirmer}
            style={({ pressed }) => [
              styles.bouton,
              destructif ? styles.boutonDestructif : styles.boutonNormal,
              pressed && styles.presse,
            ]}
          >
            <Text style={styles.texteConfirmer}>{texteConfirmer}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  boite: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  icone: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconeDestructif: { backgroundColor: '#FEE2E2' },
  titre: { fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center' },
  message: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 6 },
  boutons: { flexDirection: 'row', gap: 10, marginTop: 20, width: '100%' },
  bouton: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  boutonAnnuler: { backgroundColor: '#F3F4F6' },
  boutonDestructif: { backgroundColor: '#DC2626' },
  boutonNormal: { backgroundColor: '#2563EB' },
  texteAnnuler: { color: '#374151', fontWeight: '600' },
  texteConfirmer: { color: '#FFFFFF', fontWeight: '600' },
  presse: { opacity: 0.7 },
});