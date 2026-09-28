import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../src/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#9698A3",
        tabBarStyle: { height: 84, paddingTop: 8, paddingBottom: 18, borderTopColor: colors.border }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "ホーム", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="friends" options={{ title: "友達", tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="memories" options={{ title: "思い出", tabBarIcon: ({ color, size }) => <Ionicons name="images-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="wishes" options={{ title: "やりたい", tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "自分", tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
