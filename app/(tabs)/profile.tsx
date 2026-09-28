import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Pill, PrimaryButton, ScreenTitle, SectionHeader } from "../../src/components/ui";
import { colors } from "../../src/theme";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="ここで変えた公開情報は、つながっている友達にも反映されます">自分</ScreenTitle>

      <View style={styles.profile}>
        <View style={styles.avatar}><Text style={styles.avatarText}>あ</Text></View>
        <Text style={styles.name}>あお</Text>
        <Text style={styles.meta}>東京 ・ システムエンジニア</Text>
        <View style={styles.pills}><Pill>ENFP</Pill><Pill>ゲーム</Pill><Pill>サッカー</Pill></View>
      </View>

      <PrimaryButton title="プロフィールを編集" />

      <SectionHeader title="公開設定" />
      <Card>
        <Row label="誕生日" value="友達のみ" />
        <Row label="仕事" value="友達のみ" />
        <Row label="性格タイプ" value="友達のみ" />
        <Row label="SNS" value="親しい友達のみ" last />
      </Card>

      <SectionHeader title="アカウント" />
      <Card>
        <Text style={styles.accountItem}>通知設定</Text>
        <Text style={styles.accountItem}>プライバシーポリシー</Text>
        <Text style={styles.accountItem}>利用規約</Text>
        <Text style={[styles.accountItem, { color: colors.danger, borderBottomWidth: 0 }]}>アカウントを削除</Text>
      </Card>
    </ScrollView>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 64, paddingBottom: 120 },
  profile: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 86, height: 86, borderRadius: 43, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.primary, fontSize: 34, fontWeight: "800" },
  name: { color: colors.text, fontSize: 26, fontWeight: "800", marginTop: 12 },
  meta: { color: colors.subtext, marginTop: 5 },
  pills: { flexDirection: "row", gap: 7, marginTop: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { color: colors.text, fontWeight: "600" },
  rowValue: { color: colors.subtext },
  accountItem: { color: colors.text, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border }
});
