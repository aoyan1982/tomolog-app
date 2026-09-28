import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Card, Pill, PrimaryButton, ScreenTitle, SectionHeader } from "../../src/components/ui";
import { colors } from "../../src/theme";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/providers/AuthProvider";

export default function ProfileScreen() {
  const { demoMode } = useAuth();

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace("/");
  }

  async function deleteAccount() {
    if (!supabase) return;

    Alert.alert(
      "アカウントを削除しますか？",
      "プロフィール、友達関係、自分だけのメモ、思い出、やりたいことなどのデータが削除されます。この操作は取り消せません。",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除する",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase.functions.invoke("delete-account");
            if (error) {
              Alert.alert("削除できませんでした", error.message);
              return;
            }
            await supabase.auth.signOut();
            router.replace("/");
          }
        }
      ]
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="ここで変えた公開情報は、つながっている友達にも反映されます">自分</ScreenTitle>

      {demoMode && (
        <Card style={styles.demoCard}>
          <Text style={styles.demoTitle}>デモモード</Text>
          <Text style={styles.demoText}>Supabaseを設定すると、ログインと実データ保存に切り替わります。</Text>
        </Card>
      )}

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
        {!demoMode && <Pressable onPress={signOut}><Text style={styles.accountItem}>ログアウト</Text></Pressable>}
        {!demoMode && <Pressable onPress={deleteAccount}><Text style={[styles.accountItem, styles.danger]}>アカウントを削除</Text></Pressable>}
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
  demoCard: { marginBottom: 18, backgroundColor: colors.primarySoft, borderColor: "transparent" },
  demoTitle: { color: colors.primary, fontWeight: "800" },
  demoText: { color: colors.subtext, marginTop: 5, lineHeight: 20 },
  profile: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 86, height: 86, borderRadius: 43, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.primary, fontSize: 34, fontWeight: "800" },
  name: { color: colors.text, fontSize: 26, fontWeight: "800", marginTop: 12 },
  meta: { color: colors.subtext, marginTop: 5 },
  pills: { flexDirection: "row", gap: 7, marginTop: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { color: colors.text, fontWeight: "600" },
  rowValue: { color: colors.subtext },
  accountItem: { color: colors.text, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  danger: { color: colors.danger, borderBottomWidth: 0 }
});
