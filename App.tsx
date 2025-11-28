import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthConfiguration, authorize, AuthorizeResult } from 'react-native-app-auth';

const config: AuthConfiguration = {
  issuer: '...',
  clientId: '...',
  redirectUrl: 'de.amiconsult.demo://authcallback',
  additionalParameters: {},
  scopes: ['openid'] as const,
  usePKCE: true,
  // only required when metadata discovery is not an option becaus
  // the metadata document is not available or invalid
  serviceConfiguration: {
    authorizationEndpoint: "...",
    tokenEndpoint: "..."
  }
};

export default function App() {
  const [authState, setAuthState] = useState<AuthorizeResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthorize = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await authorize(config);
      setAuthState(result);
      Alert.alert('Success', 'Authentication successful!');
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert('Error', `Authentication failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (): void => {
    setAuthState(null);
    Alert.alert('Logged out', 'You have been logged out successfully');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>React Native App Auth - Expo CNG Demo</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authentication Status</Text>
        <Text style={styles.status}>
          {authState ? 'Authenticated' : 'Not authenticated'}
        </Text>
      </View>

      {!authState ? (
        <Button
          title={loading ? 'Authenticating...' : 'Authorize'}
          onPress={handleAuthorize}
          disabled={loading}
        />
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Info</Text>
          <Text style={styles.info}>Access Token: {authState.accessToken.substring(0, 20)}...</Text>
          <Text style={styles.info}>Token Type: {authState.tokenType}</Text>
          <Text style={styles.info}>Scopes: {authState.scopes.join(', ')}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plugin Configuration</Text>
        <Text style={styles.info}>Redirect URL: {config.redirectUrl}</Text>
        <Text style={styles.info}>Issuer: {config.issuer}</Text>
        <Text style={styles.info}>Scopes: {config.scopes.join(', ')}</Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
});
