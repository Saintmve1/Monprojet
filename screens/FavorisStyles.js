import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  centre: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  entete: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titre: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  sousTitre: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  liste: {
    padding: 16,
    paddingBottom: 30,
  },
  carte: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  nom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categorie: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  prix: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  boutonPanier: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03163e',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 6,
  },
  boutonPanierTexte: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  boutonRetirer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boutonPressed: {
    opacity: 0.75,
  },
  separateur: {
    height: 12,
  },
  videTitre: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
  },
  videTexte: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});