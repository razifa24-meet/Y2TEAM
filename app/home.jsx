import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const ivyLeagues = [
  {
    name: "Brown University",
    culture:
      "Known for its open curriculum and emphasis on intellectual freedom.",
    type:
      "Students are independent thinkers with creative academic interests.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "Columbia University",
    culture:
      "Located in New York City, balancing rigorous academics with urban life.",
    type:
      "Students are driven and engaged in both campus and city communities.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "Cornell University",
    culture: "Combines Ivy League tradition with strong engineering programs.",
    type:
      "Students appreciate a mix of research opportunities and campus spirit.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "Dartmouth College",
    culture:
      "Focuses on undergraduate teaching with a strong sense of community.",
    type:
      "Students enjoy a blend of academics and outdoor activities.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "Harvard University",
    culture: "Historic campus with diverse academic and extracurricular options.",
    type:
      "Students are ambitious and pursue excellence across many fields.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "University of Pennsylvania",
    culture:
      "Interdisciplinary programs and strong emphasis on practical learning.",
    type:
      "Students are collaborative, entrepreneurial and socially engaged.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "Princeton University",
    culture:
      "Undergraduate-focused with close faculty interaction and research.",
    type:
      "Students value rigorous academics and a tight-knit community.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
  {
    name: "Yale University",
    culture:
      "Residential college system fostering a strong sense of belonging.",
    type:
      "Students are intellectually curious and artistically inclined.",
    prompts: ["Question 1", "Question 2", "Question 3"],
  },
];

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [search, setSearch] = useState("");

  // go to login if not logged 
  if (!user) {
    router.replace("/login");
    return null;
  }

  const filteredUniversities = ivyLeagues.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderUniversity = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/university", params: { ...item } })
      }
    >
      <Text style={styles.uniName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#00c6ff", "#0072ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search universities..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.buttonsRow}>
          <Button title="Grades" onPress={() => router.push("/grades")} />
          <Button title="Profile" onPress={() => router.push("/profile")} />
        </View>
        <Text style={styles.subtitle}>Ivy League Universities</Text>
        <FlatList
          data={filteredUniversities}
          horizontal
          keyExtractor={(item) => item.name}
          renderItem={renderUniversity}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  listContainer: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  uniName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
