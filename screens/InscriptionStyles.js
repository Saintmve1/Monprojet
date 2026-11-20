
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fefefe' },

  contenu: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  titre: { fontSize: 26, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  groupe: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },

  champ: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },

  champErreur: { borderColor: '#DC2626' },
  erreur: { color: '#DC2626', fontSize: 13, marginTop: 4 },

  ligneSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

  libelle: { fontSize: 16 },

  bouton: {
    backgroundColor: '#04163c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  boutonPresse: { opacity: 0.7 },
  boutonTexte: { color: '#fff', fontSize: 16, fontWeight: '600' },

  zoneLien: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },

  lien: { color: '#00133b', fontSize: 15, fontWeight: '600' },

  // Image de fond
  fond: { flex: 1 },

  voile: {
    flex: 1,
    backgroundColor: 'rgba(3, 22, 62, 0.55)',
    justifyContent: 'center',
  },

  transparent: { backgroundColor: 'transparent' },

  // Carte du formulaire : taille inchangée
  carteFormulaire: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 16,
    padding: 20,
  },

  // Lien du bas
  lienClair: { color: '#FFFFFF', fontWeight: '600' },
});
