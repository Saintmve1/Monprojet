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
    messageErreur: {
        color: '#B91C1C',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    bouton: {
        backgroundColor: '#03163e',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    boutonPresse: {
        opacity: 0.7,
    },
    boutonTexte: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    liste: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    entete: {
        paddingVertical: 16,
    },
    titre: {
        fontSize: 24,
        fontWeight: '700',
    },
    sousTitre: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    separateur: {
        height: 10,
    },
    vide: {
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 16,
        marginTop: 40,
    },
    carte: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageProduit: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#E5E7EB',
    },
    carteGauche: {
        flex: 1,
        paddingRight: 12,
    },
    carteDroite: {
        alignItems: 'flex-end',
    },
    nom: {
        fontSize: 16,
        fontWeight: '600',
    },
    categorie: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
    },
    prix: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2563EB',
    },
    stock: {
        fontSize: 12,
        color: '#047857',
        marginTop: 4,
        textAlign: 'right',
    },
    rupture: {
        color: '#B91C1C',
    },
    boutonAjout: {
        alignSelf: 'flex-start',
        marginTop: 12,
        paddingVertical: 10,
    },
    fixe: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    champRecherche: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginTop: 12,
    },

    // === Barre de catégories ===
    conteneurPuces: {
        height: 52,
        justifyContent: 'center',
    },
    puces: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    puce: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    puceActive: {
        backgroundColor: '#01102f',
        borderColor: '#02143b',
    },
    puceTexte: {
        fontSize: 14,
        color: '#374151',
    },
    puceTexteActive: {
        color: '#fff',
        fontWeight: '600',
    },

    pied: {
        paddingVertical: 16,
    },
    ligneTitre: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    lienDeconnexion: {
        color: '#04215f',
        fontSize: 14,
        fontWeight: '600',
        paddingTop: 8,
    },
    bonjour: {
        fontSize: 14,
        color: '#374151',
        marginTop: 4,
    },

    boutonAjouter: {
    marginTop: 8,
    backgroundColor: '#03163e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
},
boutonAjouterTexte: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
},
boutonDesactive: {
    backgroundColor: '#9CA3AF',
},
boutonFavori: {
  alignSelf: 'flex-end',
  marginBottom: 6,
  padding: 4,
},
});