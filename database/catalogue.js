// Étape 1.2 : la fonction de lecture
import { getDb } from './connexion';

const PRODUITS_DE_DEPART = [
    ['Lessive liquide', 'Maison', 12.9, 25],
    ['Liquide vaisselle', 'Maison', 3.5, 40],
    ['Éponge', 'Maison', 2.2, 60],
    ['Serpillière', 'Maison', 8.9, 18],
    ['Balai', 'Maison', 14.5, 12],
    ['Aspirateur', 'Maison', 89.9, 7],
    ['Detergent multi-surfaces', 'Maison', 5.9, 30],
    ['Nettoyant vitre', 'Maison', 4.2, 22],
    ['Désodorisant', 'Maison', 6.5, 35],
    ['Sacs poubelle', 'Maison', 3.9, 50],
    ['Papier toilette', 'Maison', 7.5, 28],
    ['Essuie-tout', 'Maison', 4.8, 33],
    ['Gants ménage', 'Maison', 3.2, 45],
    ['Brosse WC', 'Maison', 5.5, 20],
    ['Produit sol', 'Maison', 6.9, 15],
    ['Javel', 'Maison', 2.9, 40],
    ['Adoucissant', 'Maison', 4.5, 27],
    ['Tablettes lave-vaisselle', 'Maison', 9.9, 18],
    ['Éponge magique', 'Maison', 3.8, 55],
    ['Chiffon microfibre', 'Maison', 4.1, 38],
    ['Seau', 'Maison', 7.2, 14],
    ['Raclette vitre', 'Maison', 6.3, 16],
    ['Poubelle cuisine', 'Maison', 19.9, 9],
    ['Spray anti-calcaire', 'Maison', 5.7, 24],
];

export const initProduits = async () => {
    const db = await getDb();

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            categorie TEXT NOT NULL,
            prix REAL NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0
        );
    `);

    // On ne remplit la table que si elle est vide
    const { n } = await db.getFirstAsync('SELECT COUNT(*) AS n FROM produits');
    if (n > 0) return;

    await db.withTransactionAsync(async () => {
        for (const [nom, categorie, prix, stock] of PRODUITS_DE_DEPART) {
            await db.runAsync(
                'INSERT INTO produits (nom, categorie, prix, stock) VALUES (?, ?, ?, ?)',
                nom, categorie, prix, stock
            );
        }
    });
};

const FILTRE = 'nom LIKE ? AND (? IS NULL OR categorie = ?)';
const parametresFiltre = (recherche, categorie) => [
    `%${recherche.trim()}%`, categorie, categorie,
];

export const listerProduits = async ({
    recherche = '', categorie = null, limite = -1, decalage = 0,
} = {}) => {
    const db = await getDb();
    return db.getAllAsync(
        `SELECT id, nom, categorie, prix, stock FROM produits
         WHERE ${FILTRE}
         ORDER BY nom, id
         LIMIT ? OFFSET ?`,
        ...parametresFiltre(recherche, categorie),
        limite,
        decalage
    );
};

export const compterProduits = async ({ recherche = '', categorie = null } = {}) => {
    const db = await getDb();
    const { n } = await db.getFirstAsync(
        `SELECT COUNT(*) AS n FROM produits WHERE ${FILTRE}`,
        ...parametresFiltre(recherche, categorie)
    );
    return n;
};

export const listerCategories = async () => {
    const db = await getDb();
    const lignes = await db.getAllAsync(
        'SELECT DISTINCT categorie FROM produits ORDER BY categorie'
    );
    return lignes.map((ligne) => ligne.categorie);
};

export const insererProduit = async (nom, categorie, prix, stock) => {
    const db = await getDb();
    const resultat = await db.runAsync(
        'INSERT INTO produits (nom, categorie, prix, stock) VALUES (?, ?, ?, ?)',
        nom, categorie, prix, stock
    );
    return resultat.lastInsertRowId;
};