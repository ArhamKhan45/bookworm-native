import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const router = useRouter();
  const segment = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  //  checking if user is already login or not
  useEffect(() => {
    checkAuth();
  }, []);

  // redirecting to the  exact route , it works as a middleware
  useEffect(() => {
    const isAuthScreen = segment[0] === "(auth)";
    const isSignedIn = user && token;

    if (isAuthScreen && isSignedIn) router.push("/(tabs)");
    else if (!isAuthScreen && !isSignedIn) router.push("/(auth)");
  }, [user, token, segment]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
