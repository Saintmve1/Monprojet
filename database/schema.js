import { getDb } from './connexion';
import { initProduits } from './catalogue';
import { initFavoris } from './favoris';
import { initPanier } from './panier';


export const initDb = async () => {
    const db = await getDb();
    await db.execAsync(`
 PRAGMA journal_mode = WAL;
 CREATE TABLE IF NOT EXISTS utilisateurs (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nom TEXT NOT NULL,
 prenom TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 telephone TEXT,
 mdp TEXT NOT NULL,
 newsletter INTEGER NOT NULL DEFAULT 0,
 cgu INTEGER NOT NULL DEFAULT 0,
 cree_le TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
 );
 `);
    //  Étape 1.3 : brancher sur initDb et sur index.js
    await initProduits(); // nouvelle ligne, en dernie
    await initFavoris(db);
    await initPanier(db);
};