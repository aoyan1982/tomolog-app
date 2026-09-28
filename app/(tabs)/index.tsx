import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Card, ScreenTitle, SectionHeader } from "../../src/components/ui";
import { colors } from "../../src/theme";
import { demoFriends, demoWishes } from "../../src/data/demo";

export default function HomeScreen() {
  const birthdays = demoFriends.slice().sort((a,b) => (a.birthday ?? "").localeCompare(b.birthday ?? "")).slice(0,2);
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="大切な人のことを、ちゃんと覚えておける。">ともログ</ScreenTitle>

      <Card style={styles.hero}>
        <Text style={styles.heroLabel}>今日のともログ</Text>
        <Text style={styles.heroTitle}>ゆきほさんの誕生日まであと5日 🎂</Text>
        <Text style={styles.heroBody}>プレゼント候補や前回のメモを見返してみよう。</Text>
        <Link href="/friend/1" style={styles.link}>プロフィールを見る →</Link>
      </Card>

      <SectionHeader title="もうすぐ誕生日" />
      <View style={styles.stack}>
        {birthdays.map((f) => (
          <Card key={f.id}>
            <View style={styles.row}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{f.name.slice(0,1)}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{f.name}</Text>
                <Text style={styles.meta}>🎂 {f.birthday} ・ {f.relationship}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader title="最近のアップデート" />
      <Card>
        <Text style={styles.name}>そらさんが仕事を更新しました</Text>
        <Text style={styles.meta}>大学生 → Webエンジニア</Text>
      </Card>

      <SectionHeader title="一緒にやりたいこと" />
      <View style={styles.stack}>
        {demoWishes.slice(0,2).map((w) => (
          <Card key={w.id}>
            <Text style={styles.name}>{w.title}</Text>
            <Text style={styles.meta}>一緒に：{w.person}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 64, paddingBottom: 120 },
  hero: { backgroundColor: colors.primarySoft, borderColor: "transparent", marginBottom: 18 },
  heroLabel: { color: colors.primary, fontWeight: "800", marginBottom: 8 },
  heroTitle: { color: colors.text, fontSize: 20, fontWeight: "800", lineHeight: 28 },
  heroBody: { color: colors.subtext, marginTop: 8, lineHeight: 20 },
  link: { color: colors.primary, marginTop: 14, fontWeight: "700" },
  stack: { gap: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.primary, fontWeight: "800", fontSize: 18 },
  name: { color: colors.text, fontSize: 16, fontWeight: "700" },
  meta: { color: colors.subtext, marginTop: 4, lineHeight: 20 }
});
