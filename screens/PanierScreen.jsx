import { useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// CHANGEMENT : modal de confirmation
import { ConfirmModal } from '../components/ConfirmModal';
import styles from './PanierStyles';

const formaterPrix = (prix) => prix.toFixed(2).replace('.', ',') + ' €';

// CHANGEMENT : la ligne reçoit onDemanderSuppression au lieu d'appeler onSupprimer directement
const LignePanier = ({ item, onModifierQuantite, onDemanderSuppression }) => (
    <View style={styles.ligne}>
        <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
        />
        <View style={styles.info}>
            <Text style={styles.nom} numberOfLines={1}>{item.nom}</Text>
            <Text style={styles.prixUnitaire}>{formaterPrix(item.prix)} / unité</Text>

            <View style={styles.quantiteContainer}>
                {/* CHANGEMENT : à 1, le "−" demande confirmation au lieu de supprimer d'un coup */}
                <Pressable
                    onPress={() =>
                        item.quantite <= 1
                            ? onDemanderSuppression(item)
                            : onModifierQuantite(item.id, item.quantite - 1)
                    }
                    style={styles.boutonQuantite}
                >
                    <Text style={styles.boutonQuantiteTexte}>−</Text>
                </Pressable>

                <Text style={styles.quantite}>{item.quantite}</Text>

                <Pressable
                    onPress={() => onModifierQuantite(item.id, item.quantite + 1)}
                    style={styles.boutonQuantite}
                >
                    <Text style={styles.boutonQuantiteTexte}>+</Text>
                </Pressable>
            </View>
        </View>

        <View style={styles.droite}>
            <Text style={styles.prixTotalLigne}>
                {formaterPrix(item.prix * item.quantite)}
            </Text>
            {/* CHANGEMENT : ouvre le modal */}
            <Pressable onPress={() => onDemanderSuppression(item)}>
                <Text style={styles.supprimer}>Supprimer</Text>
            </Pressable>
        </View>
    </View>
);

export const PanierScreen = ({
    panier = [],
    onModifierQuantite,
    onSupprimer,
    onViderPanier,
    onCommander,
}) => {
    // CHANGEMENT : null = modal fermé, sinon { type: 'article', item } ou { type: 'vider' }
    const [confirmation, setConfirmation] = useState(null);

    const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);
    const nombreArticles = panier.reduce((sum, item) => sum + item.quantite, 0);

    const fermer = () => setConfirmation(null);

    const confirmer = () => {
        if (confirmation?.type === 'article') {
            onSupprimer(confirmation.item.id);
        } else if (confirmation?.type === 'vider') {
            onViderPanier();
        }
        fermer();
    };

    if (panier.length === 0) {
        return (
            <SafeAreaView style={[styles.ecran, styles.centre]}>
                <Text style={styles.videTitre}>Votre panier est vide</Text>
                <Text style={styles.videTexte}>
                    Ajoutez des produits depuis le catalogue
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.ecran}>
            {/* En-tête */}
            <View style={styles.entete}>
                <Text style={styles.titre}>Mon Panier</Text>
                <Text style={styles.sousTitre}>
                    {nombreArticles} article{nombreArticles > 1 ? 's' : ''}
                </Text>
            </View>

            {/* Liste des articles */}
            <FlatList
                data={panier}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <LignePanier
                        item={item}
                        onModifierQuantite={onModifierQuantite}
                        onDemanderSuppression={(it) => setConfirmation({ type: 'article', item: it })}
                    />
                )}
                contentContainerStyle={styles.liste}
                ItemSeparatorComponent={() => <View style={styles.separateur} />}
            />

            {/* Résumé + boutons */}
            <View style={styles.footer}>
                <View style={styles.totalLigne}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalPrix}>{formaterPrix(total)}</Text>
                </View>

                <Pressable
                    onPress={onCommander}
                    style={({ pressed }) => [
                        styles.boutonCommander,
                        pressed && styles.boutonPresse,
                    ]}
                >
                    <Text style={styles.boutonCommanderTexte}>
                        Valider la commande
                    </Text>
                </Pressable>

                {/* CHANGEMENT : ouvre le modal "vider le panier" */}
                <Pressable
                    onPress={() => setConfirmation({ type: 'vider' })}
                    style={styles.boutonVider}
                >
                    <Text style={styles.boutonViderTexte}>Vider le panier</Text>
                </Pressable>
            </View>

            {/* CHANGEMENT : modal de confirmation (article ou panier entier) */}
            <ConfirmModal
                visible={confirmation !== null}
                icone="trash-outline"
                titre={
                    confirmation?.type === 'vider'
                        ? 'Vider le panier ?'
                        : 'Supprimer cet article ?'
                }
                message={
                    confirmation?.type === 'vider'
                        ? 'Tous les articles seront retirés de votre panier.'
                        : confirmation?.item
                        ? `« ${confirmation.item.nom} » sera retiré de votre panier.`
                        : ''
                }
                texteConfirmer={confirmation?.type === 'vider' ? 'Vider' : 'Supprimer'}
                onAnnuler={fermer}
                onConfirmer={confirmer}
            />
        </SafeAreaView>
    );
};