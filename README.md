# ともログ (tomolog-app)

友達の誕生日、仕事、性格タイプ、趣味、思い出、やりたいことをまとめて管理できる日本向け友達管理アプリです。

## Stack
- React Native / Expo
- Expo Router
- TypeScript
- Supabase
- EAS Build / Submit

## Setup
1. npm install
2. .env.example を .env にコピー
3. Supabase URL / anon key を設定
4. npm run start

## Database
`supabase/schema.sql` を Supabase SQL Editor で実行してください。

## App Store
`app.json` と `eas.json` は App Store 公開を想定した初期設定です。
Bundle Identifier は公開前に自身のものへ変更してください。
