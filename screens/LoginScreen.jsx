import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
  Image, StyleSheet, // CHANGEMENT : pour l'image de fond
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import styles from './InscriptionStyles';
import { validerFormulaireLogin } from '../utils/validation';
import { initDb, verifierConnexion } from '../database';

// CHANGEMENT : même image que l'inscription (ou require('../assets/fond.jpg'))
const IMAGE_FOND = {
  uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=1800&fit=crop',
};

export const LoginScreen = ({ navigation }) => {
  const { connecter } = useAuth();
  const [form, setForm] = useState({ email: '', mdp: '' });
  const [erreurs, setErreurs] = useState({});
  const [erreurGenerale, setErreurGenerale] = useState(null);

  useEffect(() => {
    initDb().catch((e) => console.log('Erreur init base', e));
  }, []);

  const maj = (champ, valeur) => setForm((f) => ({ ...f, [champ]: valeur }));

  const seConnecter = async () => {
    setErreurGenerale(null);
    const e = validerFormulaireLogin(form);
    setErreurs(e);
    if (Object.keys(e).length > 0) return;
    try {
      const utilisateur = await verifierConnexion(form.email, form.mdp);
      if (!utilisateur) {
        setErreurGenerale('Email ou mot de passe incorrect');
        return;
      }
      connecter(utilisateur);
    } catch (err) {
      console.log(err);
      setErreurGenerale('Connexion impossible, veuillez réessayer');
    }
  };

  return (
    // CHANGEMENT : View + Image en position absolue + voile sombre
    <View style={styles.fond}>
      <Image source={IMAGE_FOND} style={StyleSheet.absoluteFill} resizeMode="cover" />

      <View style={styles.voile}>
        {/* CHANGEMENT : fond transparent pour laisser voir l'image */}
        <SafeAreaView edges={['top']} style={[styles.safe, styles.transparent]}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.contenu}
              keyboardShouldPersistTaps="handled"
            >
              {/* CHANGEMENT : formulaire dans une carte semi-transparente */}
              <View style={styles.carteFormulaire}>
                <Text style={styles.titre}>Connexion</Text>

                <View style={styles.groupe}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.champ, erreurs.email && styles.champErreur]}
                    placeholder="marie@mail.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={form.email}
                    onChangeText={(t) => maj('email', t)}
                  />
                  {erreurs.email && <Text style={styles.erreur}>{erreurs.email}</Text>}
                </View>

                <View style={styles.groupe}>
                  <Text style={styles.label}>Mot de passe</Text>
                  <TextInput
                    style={[styles.champ, erreurs.mdp && styles.champErreur]}
                    placeholder="••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={form.mdp}
                    onChangeText={(t) => maj('mdp', t)}
                  />
                  {erreurs.mdp && <Text style={styles.erreur}>{erreurs.mdp}</Text>}
                </View>

                {erreurGenerale && <Text style={styles.erreur}>{erreurGenerale}</Text>}

                <Pressable
                  onPress={seConnecter}
                  style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
                >
                  <Text style={styles.boutonTexte}>Se connecter</Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* CHANGEMENT : fond transparent + lien blanc pour rester lisible */}
          <SafeAreaView edges={['bottom']} style={[styles.zoneLien, styles.transparent]}>
            <Pressable onPress={() => navigation.navigate('Inscription')}>
              <Text style={[styles.lien, styles.lienClair]}>
                Pas encore de compte ? S'inscrire
              </Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>
      </View>
    </View>
  );
};