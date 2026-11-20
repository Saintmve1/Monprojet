import { getDb } from './connexion';

export const initFavoris = async (db) => {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS favoris (
            utilisateur_id INTEGER NOT NULL,
            produit_id INTEGER NOT NULL,
            image TEXT,
            PRIMARY KEY (utilisateur_id, produit_id)
        );
    `);
};

export const listerFavoris = async (utilisateurId) => {
    const db = await getDb();
    return db.getAllAsync(
        `SELECT p.id, p.nom, p.categorie, p.prix, p.stock, f.image
         FROM favoris f
         JOIN produits p ON p.id = f.produit_id
         WHERE f.utilisateur_id = ?
         ORDER BY f.rowid`,
        [utilisateurId]
    );
};

export const ajouterFavoriDb = async (utilisateurId, produit) => {
    const db = await getDb();
    await db.runAsync(
        'INSERT OR IGNORE INTO favoris (utilisateur_id, produit_id, image) VALUES (?, ?, ?)',
        [utilisateurId, produit.id, produit.image ?? null]
    );
};

export const retirerFavoriDb = async (utilisateurId, produitId) => {
    const db = await getDb();
    await db.runAsync(
        'DELETE FROM favoris WHERE utilisateur_id = ? AND produit_id = ?',
        [utilisateurId, produitId]
    );
};