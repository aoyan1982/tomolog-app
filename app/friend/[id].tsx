import { useLocalSearchParams, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Pill, SectionHeader } from "../../src/components/ui";
import { demoFriends } from "../../src/data/demo";
import { colors } from "../../src/theme";

export default function FriendDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const friend = demoFriends.find((f) => f.id === id) ?? demoFriends[0];

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ 戻る</Text></Pressable>

      <View style={styles.profile}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{friend.name.slice(0,1)}</Text></View>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.sub}>{friend.relationship}</Text>
      </View>

      <Card>
        <View style={styles.grid}>
          <Info label="誕生日" value={friend.birthday ?? "未設定"} />
          <Info label="地域" value={friend.location ?? "未設定"} />
          <Info label="仕事" value={friend.occupation ?? "未設定"} />
          <Info label="性格タイプ" value={friend.personality ?? "未設定"} />
        </View>
      </Card>

      <SectionHeader title="好き・趣味" />
      <Card>
        <View style={styles.pills}>
          {friend.interests.map((x) => <Pill key={x}>{x}</Pill>)}
        </View>
      </Card>

      <SectionHeader title="🔒 自分だけのメモ" />
      <Card>
        <Text style={styles.memo}>{friend.memo}</Text>
        <Text style={styles.privateHint}>この内容は相手や他の友達には表示されません。</Text>
      </Card>

      <SectionHeader title="思い出" />
      <Card>
        <Text style={styles.itemTitle}>2026/09/20</Text>
        <Text style={styles.memo}>新宿でごはん</Text>
      </Card>

      <SectionHeader title="一緒にしたいこと" />
      <Card>
        <Text style={styles.memo}>□ ディズニーに行く</Text>
        <Text style={styles.memo}>□ 気になっていたカフェに行く</Text>
      </Card>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <View style={styles.info}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 60, paddingBottom: 80 },
  back: { color: colors.primary, fontWeight: "700", marginBottom: 18, fontSize: 16 },
  profile: { alignItems: "center", marginBottom: 22 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 34, fontWeight: "800", color: colors.primary },
  name: { fontSize: 28, fontWeight: "800", color: colors.text, marginTop: 12 },
  sub: { color: colors.subtext, marginTop: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", rowGap: 18 },
  info: { width: "50%" },
  infoLabel: { color: colors.subtext, fontSize: 12, marginBottom: 5 },
  infoValue: { color: colors.text, fontSize: 16, fontWeight: "700" },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  memo: { color: colors.text, lineHeight: 23 },
  privateHint: { color: colors.subtext, fontSize: 12, marginTop: 10 },
  itemTitle: { fontWeight: "700", color: colors.text, marginBottom: 6 }
});
