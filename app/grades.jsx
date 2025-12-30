import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function Grades() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [sat, setSat] = useState("");
  const [gpa, setGpa] = useState("");
  const [ibScore, setIbScore] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  const handleSave = () => {
    // later this goes to Appwrite
    console.log({
      SAT: sat,
      GPA: gpa,
      IB: ibScore,
    });
  };

  return (
    <LinearGradient colors={["#1d2671", "#c33764"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Grades</Text>

        <TextInput
          style={styles.input}
          placeholder="SAT Score (e.g. 1520)"
          keyboardType="numeric"
          value={sat}
          onChangeText={setSat}
        />

        <TextInput
          style={styles.input}
          placeholder="GPA (e.g. 3.9)"
          keyboardType="decimal-pad"
          value={gpa}
          onChangeText={setGpa}
        />

        <TextInput
          style={styles.input}
          placeholder="IB Score (e.g. 42)"
          keyboardType="numeric"
          value={ibScore}
          onChangeText={setIbScore}
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Save Grades" onPress={handleSave} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
  },
});
