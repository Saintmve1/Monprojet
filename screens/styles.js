import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, padding: 20 },
  banniere: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  titreBanniere: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowRadius: 6,
  },
  ligneImages: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 12,
  },
  logo: { width: 50, height: 50 },
  titre: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  ligneSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  libelleSwitch: { fontSize: 16 },
  champ: {
    borderWidth: 1,
    borderColor: "#111827",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  erreur: { color: "#DC2626", marginBottom: 12 },
  bouton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  boutonPresse: { opacity: 0.7 },
  boutonTexte: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});