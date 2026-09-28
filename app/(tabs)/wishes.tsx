import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, ScreenTitle } from "../../src/components/ui";
import { demoWishes } from "../../src/data/demo";
import { colors } from "../../src/theme";

export default function WishesScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="友達と「いつかやりたい」を忘れない">やりたいこと</ScreenTitle>
      <View style={styles.stack}>
        {demoWishes.map((w) => (
          <Card key={w.id}>
            <View style={styles.row}>
              <View style={styles.checkbox} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{w.title}</Text>
                <Text style={styles.meta}>一緒に：{w.person}</Text>
              </View>
            </View>
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
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: colors.primary },
  title: { fontSize: 16, fontWeight: "700", color: colors.text },
  meta: { color: colors.subtext, marginTop: 4 }
});
