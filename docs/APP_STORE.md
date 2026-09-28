# App Store公開チェックリスト

## 実装済みの土台
- Expo / React Native
- EAS Build / Submit 設定
- Supabase Auth
- メール登録 / ログイン
- プロフィール・友達・非公開メモ・思い出・やりたいこと用DB
- Row Level Security
- アカウント削除用Edge Function雛形
- iPhone / iPad対応設定

## 公開前に必要
1. Supabaseプロジェクト作成
2. schema.sqlを実行
3. .envにSupabase URL / anon keyを設定
4. delete-account Edge Functionをデプロイし SUPABASE_SERVICE_ROLE_KEY を設定
5. app.json の bundleIdentifier / android.package を確定
6. Apple Developer Programへ登録
7. EASプロジェクト設定
8. アプリアイコン / スプラッシュ画像
9. プライバシーポリシー公開URL
10. 利用規約公開URL
11. サポートURL
12. App Store ConnectでApp Privacyを入力
13. TestFlightで実機テスト
14. App Review用デモアカウントを準備

## 方針
初版ではSNS型の公開投稿・ランキングは入れず、人間関係の個人管理に集中します。
