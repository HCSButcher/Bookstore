import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
export default function Index() {
  const { user, token, checkAuth } = useAuthStore();
  console.log(user, token);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user?.username} </Text>
      <Text style={styles.title}>Token {token} </Text>

      <Link href="/(auth)/signup">Signup</Link>
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
  title: { color: "blue" },
});
