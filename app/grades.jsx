import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function Grades() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return (
    <LinearGradient colors={["#1d2671", "#c33764"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Grades</Text>
        <Text style={styles.text}>
          TALK TO ME WHEN YOU DOCTA!
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
  },
});
