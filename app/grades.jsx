import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import { databases, ID, Query } from "../appwriteConfig";
import { APPLICANTS_COLLECTION_ID, DB_ID } from "../constants";
import { AuthContext } from "../contexts/AuthContext";

export default function Grades() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [sat, setSat] = useState("");
  const [gpa, setGpa] = useState("");
  const [ib, setIb] = useState("");
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const loadGrades = async () => {
      try {
        const res = await databases.listDocuments(
          DB_ID,
          APPLICANTS_COLLECTION_ID,
          [Query.equal("userID2", user.$id)]
        );

        if (res.documents.length > 0) {
          const doc = res.documents[0];
          setDocId(doc.$id);
          setSat(doc.satScore?.toString() || "");
          setGpa(doc.gpa?.toString() || "");
          setIb(doc.ib?.toString() || "");
        }
      } catch {}
    };

    loadGrades();
  }, [user]);

  const handleSave = async () => {
    const payload = {
      userID2: user.$id,
      satScore: sat ? Number(sat) : null,
      gpa: gpa ? Number(gpa) : null,
      ib: ib ? Number(ib) : null,
    };

    try {
      if (docId) {
        await databases.updateDocument(
          DB_ID,
          APPLICANTS_COLLECTION_ID,
          docId,
          payload
        );
      } else {
        const created = await databases.createDocument(
          DB_ID,
          APPLICANTS_COLLECTION_ID,
          ID.unique(),
          payload
        );
        setDocId(created.$id);
      }
    } catch (e) {
      console.log("SAVE ERROR:", e);
    }

    Keyboard.dismiss();
  };

  return (
    <LinearGradient colors={["#1d2671", "#c33764"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Your Grades</Text>

            <TextInput
              style={styles.input}
              placeholder="SAT (400–1600)"
              keyboardType="numeric"
              value={sat}
              onChangeText={setSat}
            />

            <TextInput
              style={styles.input}
              placeholder="GPA (0–4)"
              keyboardType="decimal-pad"
              value={gpa}
              onChangeText={setGpa}
            />

            <TextInput
              style={styles.input}
              placeholder="IB (0–45)"
              keyboardType="numeric"
              value={ib}
              onChangeText={setIb}
            />

            <View style={{ marginTop: 24 }}>
              <Button title="Save Grades" onPress={handleSave} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
});
