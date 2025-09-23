import { Text, View } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View>
      <Image
        source={{
          uri: "https://static.wikia.nocookie.net/dragonball/images/b/ba/Goku_anime_profile.png/revision/latest/smart/width/250/height/250?cb=20250723190513",
        }}
        style={{ width: 250, height: 250 }}
      />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
