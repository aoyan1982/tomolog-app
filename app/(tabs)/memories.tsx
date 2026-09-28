import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, ScreenTitle } from "../../src/components/ui";
import { demoMemories } from "../../src/data/demo";
import { colors } from "../../src/theme";

export default function MemoriesScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="会った日や一緒に過ごした時間を残す">思い出</ScreenTitle>
      <View style={styles.stack}>
        {demoMemories.map((m) => (
          <Card key={m.id}>
            <Text style={styles.date}>{m.date}</Text>
            <Text style={styles.title}>{m.title}</Text>
            <Text style={styles.meta}>{m.people.join("・")}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 64, paddingBottom: 120 },
  stack: { gap: 10 },
  date: { fontSize: 12, color: colors.subtext },
  title: { fontSize: 18, fontWeight: "800", color: colors.text, marginTop: 5 },
  meta: { color: colors.primary, fontWeight: "600", marginTop: 8 }
});
