import { Redirect } from "expo-router";

export default function Index() {
  // makes sense to start in signup lol
  return <Redirect href="/signup" />;
}
