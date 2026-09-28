import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Card, Pill, ScreenTitle } from "../../src/components/ui";
import { demoFriends } from "../../src/data/demo";
import { colors } from "../../src/theme";

export default function FriendsScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="プロフィール・誕生日・仕事・思い出をまとめて管理">友達</ScreenTitle>
      <TextInput placeholder="名前・仕事・性格タイプ・趣味で検索" placeholderTextColor="#A0A2AA" style={styles.search} />
      <View style={styles.stack}>
        {demoFriends.map((friend) => (
          <Link key={friend.id} href={{ pathname: "/friend/[id]", params: { id: friend.id } }} asChild>
            <Card>
              <View style={styles.row}>
                <View style={styles.avatar}><Text style={styles.avatarText}>{friend.name.slice(0,1)}</Text></View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{friend.name}</Text>
                    {friend.personality ? <Pill>{friend.personality}</Pill> : null}
                  </View>
                  <Text style={styles.meta}>{friend.occupation} ・ {friend.location}</Text>
                  <Text style={styles.meta}>🎂 {friend.birthday}　最後に会った日 {friend.lastMet}</Text>
                </View>
              </View>
            </Card>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 64, paddingBottom: 120 },
  search: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 16, minHeight: 50, marginBottom: 16, color: colors.text },
  stack: { gap: 10 },
  row: { flexDirection: "row", gap: 12, alignItems: "center" },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.primary, fontSize: 20, fontWeight: "800" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { fontSize: 17, fontWeight: "800", color: colors.text },
  meta: { color: colors.subtext, marginTop: 4, fontSize: 13 }
});
