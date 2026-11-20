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
        paddingBottom: 24,
    },
    ligne: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#E5E7EB',
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    nom: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    prixUnitaire: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
    },
    quantiteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    boutonQuantite: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boutonQuantiteTexte: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    quantite: {
        marginHorizontal: 14,
        fontSize: 16,
        fontWeight: '600',
        minWidth: 20,
        textAlign: 'center',
    },
    droite: {
        alignItems: 'flex-end',
        marginLeft: 8,
    },
    prixTotalLigne: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB',
    },
    supprimer: {
        marginTop: 8,
        fontSize: 13,
        color: '#DC2626',
        fontWeight: '500',
    },
    separateur: {
        height: 10,
    },
    footer: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    totalLigne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
    },
    totalPrix: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    boutonCommander: {
        backgroundColor: '#03163e',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    boutonPresse: {
        opacity: 0.75,
    },
    boutonCommanderTexte: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    boutonVider: {
        marginTop: 12,
        alignItems: 'center',
        paddingVertical: 8,
    },
    boutonViderTexte: {
        color: '#DC2626',
        fontSize: 15,
        fontWeight: '500',
    },
    videTitre: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    videTexte: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
    },
});