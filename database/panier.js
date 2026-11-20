import { getDb } from './connexion';

export const initPanier = async (db) => {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS panier (
            utilisateur_id INTEGER NOT NULL,
            produit_id INTEGER NOT NULL,
            quantite INTEGER NOT NULL DEFAULT 1,
            image TEXT,
            PRIMARY KEY (utilisateur_id, produit_id)
        );
    `);
};

export const listerPanier = async (utilisateurId) => {
    const db = await getDb();
    return db.getAllAsync(
        `SELECT p.id, p.nom, p.categorie, p.prix, p.stock, c.quantite, c.image
         FROM panier c
         JOIN produits p ON p.id = c.produit_id
         WHERE c.utilisateur_id = ?
         ORDER BY c.rowid`,
        [utilisateurId]
    );
};

// Ajoute 1 : crée la ligne, ou augmente la quantité si elle existe déjà
export const ajouterAuPanierDb = async (utilisateurId, produit) => {
    const db = await getDb();
    await db.runAsync(
        `INSERT INTO panier (utilisateur_id, produit_id, quantite, image)
         VALUES (?, ?, 1, ?)
         ON CONFLICT(utilisateur_id, produit_id)
         DO UPDATE SET quantite = quantite + 1`,
        [utilisateurId, produit.id, produit.image ?? null]
    );
};

export const modifierQuantiteDb = async (utilisateurId, produitId, quantite) => {
    const db = await getDb();
    if (quantite < 1) {
        await db.runAsync(
            'DELETE FROM panier WHERE utilisateur_id = ? AND produit_id = ?',
            [utilisateurId, produitId]
        );
    } else {
        await db.runAsync(
            'UPDATE panier SET quantite = ? WHERE utilisateur_id = ? AND produit_id = ?',
            [quantite, utilisateurId, produitId]
        );
    }
};

export const supprimerDuPanierDb = async (utilisateurId, produitId) => {
    const db = await getDb();
    await db.runAsync(
        'DELETE FROM panier WHERE utilisateur_id = ? AND produit_id = ?',
        [utilisateurId, produitId]
    );
};

export const viderPanierDb = async (utilisateurId) => {
    const db = await getDb();
    await db.runAsync('DELETE FROM panier WHERE utilisateur_id = ?', [utilisateurId]);
};