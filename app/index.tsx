import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../src/providers/AuthProvider";
import { colors } from "../src/theme";

export default function Index() {
  const { session, loading, demoMode } = useAuth();

  if (loading) {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}><ActivityIndicator color={colors.primary} /></View>;
  }

  if (!demoMode && !session) return <Redirect href="/login" />;
  return <Redirect href="/(tabs)" />;
}
