import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ecran: { flex: 1, backgroundColor: '#F9FAFB' },
  contenu: { padding: 16, paddingBottom: 32 },

  // En-tête
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  salutation: { fontSize: 14, color: '#6B7280' },
  prenom: { fontSize: 24, fontWeight: '700', color: '#111827' },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#03163e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexte: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },

  // Bannière
  banniere: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#02143b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  banniereTexte: { flex: 1, paddingRight: 8 },
  banniereBadge: { color: '#BFDBFE', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  banniereTitre: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginVertical: 8 },
  banniereBouton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  banniereBoutonTexte: { color: '#2563EB', fontWeight: '600' },

  // Sections
  sectionTitre: { fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 12 },

  // Accès rapides
  raccourcis: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  raccourci: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
  },
  raccourciIcone: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  raccourciTexte: { fontSize: 13, fontWeight: '600', color: '#374151' },

  // Catégories
  categories: { gap: 10, paddingBottom: 4, marginBottom: 24 },
  categorie: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categorieTexte: { fontSize: 14, color: '#111827', fontWeight: '500' },

  // Avantages
  avantages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  avantage: { flex: 1, alignItems: 'center', gap: 6 },
  avantageTexte: { fontSize: 11, color: '#6B7280', textAlign: 'center' },

  // Effet d'appui
  presse: { opacity: 0.7 },
});