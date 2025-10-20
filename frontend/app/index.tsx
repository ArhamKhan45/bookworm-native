import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function Index() {
  const { user, token, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log("true", user, token);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://static.wikia.nocookie.net/dragonball/images/b/ba/Goku_anime_profile.png/revision/latest/smart/width/250/height/250?cb=20250723190513",
        }}
        style={{ width: 250, height: 250 }}
      />

      <Text>Arham Khan is here</Text>
      <Link href="/(auth)">Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
