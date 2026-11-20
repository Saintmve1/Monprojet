import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';

function Racine() {
  const { utilisateur } = useAuth();
  return utilisateur ? <DrawerNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <Racine />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}