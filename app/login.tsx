import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { PrimaryButton } from "../src/components/ui";
import { supabase } from "../src/lib/supabase";
import { colors } from "../src/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return Alert.alert("ログインできませんでした", error.message);
    router.replace("/(tabs)");
  }

  async function signUp() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email: email.trim(), password });
    setBusy(false);
    if (error) return Alert.alert("登録できませんでした", error.message);
    Alert.alert("登録しました", "確認メールが届いた場合は、メール内のリンクから認証してください。");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.page}>
      <View style={styles.logo}><Text style={styles.logoText}>と</Text></View>
      <Text style={styles.title}>ともログ</Text>
      <Text style={styles.sub}>大切な人のことを、ちゃんと覚えておける。</Text>

      <View style={styles.form}>
        <TextInput autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="メールアドレス" style={styles.input} />
        <TextInput secureTextEntry value={password} onChangeText={setPassword} placeholder="パスワード（6文字以上）" style={styles.input} />
        <PrimaryButton title={busy ? "処理中..." : "ログイン"} onPress={signIn} disabled={busy || !email || password.length < 6} />
        <Text style={styles.signup} onPress={signUp}>はじめての方はこちらから登録</Text>
      </View>

      <Text style={styles.note}>登録することで利用規約とプライバシーポリシーに同意したものとみなします。</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background, padding: 28, justifyContent: "center" },
  logo: { width: 72, height: 72, borderRadius: 24, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: colors.primary },
  logoText: { color: "#fff", fontWeight: "900", fontSize: 34 },
  title: { fontSize: 32, fontWeight: "900", color: colors.text, textAlign: "center", marginTop: 18 },
  sub: { color: colors.subtext, textAlign: "center", marginTop: 8 },
  form: { gap: 12, marginTop: 36 },
  input: { minHeight: 52, borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 16, color: colors.text },
  signup: { color: colors.primary, textAlign: "center", fontWeight: "700", padding: 10 },
  note: { color: colors.subtext, textAlign: "center", fontSize: 11, lineHeight: 17, marginTop: 20 }
});
