# AGENTS.md

このドキュメントは、AIエージェントがプロジェクトを理解し、効果的に支援できるようにするためのガイドです。

## コミュニケーション

- **AIエージェントとのやり取りは日本語で行ってください**
- コードコメントやドキュメントも日本語で記述することを推奨します

## プロジェクト概要

このプロジェクトは、Hono と React を使用して AWS Lambda 上で動作する最小限の SPA アプリケーションです。

### 技術スタック

- **バックエンド**: Hono (TypeScript Web Framework)
- **フロントエンド**: React 18 + React Router DOM
- **デプロイ先**: AWS Lambda (ARM64)
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS + shadcn/ui コンポーネント
- **テスト**: Vitest
- **Linter/Formatter**: Biome
- **開発ツール**: Storybook, TypeScript, pino (ロギング)

### アーキテクチャ

- **SSR (Server-Side Rendering)**: Hono が React コンポーネントをサーバーサイドレンダリング
- **API ルート**: `/api/*` でバックエンド API を提供
- **静的ファイル**: 本番環境では `/static/*` から配信
- **開発環境**: Vite の HMR (Hot Module Replacement) をサポート

### ディレクトリ構成

```
src/
├── client/              # フロントエンド (React)
│   ├── components/      # UI コンポーネント
│   │   └── ui/         # shadcn/ui ベースの共通コンポーネント
│   ├── pages/          # ページコンポーネント
│   ├── App.tsx         # React アプリケーションのルート
│   └── main.tsx        # クライアントサイドエントリーポイント
├── lib/                # ユーティリティ
│   ├── logger.ts       # pino ロガー設定
│   └── utils.ts        # 汎用ユーティリティ関数
└── index.tsx           # Hono サーバー & Lambda ハンドラー
```

## 開発ルール

### コーディング規約

1. **型安全性**
   - TypeScript を厳格に使用
   - `any` 型の使用を避ける
   - 型定義は明示的に記述する

2. **コードスタイル**
   - Biome を使用してコードの整形と Lint を実施
   - コミット前に `npm run check` を実行
   - すべてのコードは Biome の規則に従う

3. **コンポーネント設計**
   - 関数コンポーネントを使用
   - shadcn/ui パターンに従った再利用可能なコンポーネントを作成
   - コンポーネントは `src/client/components/` に配置
   - ページコンポーネントは `src/client/pages/` に配置

4. **ロギング**
   - `src/lib/logger.ts` の pino ロガーを使用
   - 本番環境では構造化ログを出力
   - 開発環境では pino-pretty で読みやすく表示

### テスト

- Vitest を使用してテストを記述
- `npm run test` でテストを実行
- `npm run test:watch` でウォッチモードを使用

### Git ワークフロー

- main ブランチを基準としてプルリクエストを作成
- コミット前に必ず `npm run check` を実行
- Docker ビルドは ARM64 アーキテクチャでビルド

#### コミットメッセージ規約

このプロジェクトでは [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) に準拠したコミットメッセージを使用します。

**基本フォーマット:**
```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

**主なタイプ:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット、セミコロンなど）
- `refactor`: バグ修正でも機能追加でもないコード変更
- `perf`: パフォーマンス向上のためのコード変更
- `test`: テストの追加や修正
- `chore`: ビルドプロセスやツールの変更

**例:**
```
feat(api): Lambda用のhelloエンドポイントを追加

AWS Lambda環境で動作する/api/helloエンドポイントを実装しました。
タイムスタンプと環境情報を含むJSONレスポンスを返します。
```

```
fix(logger): 本番環境でのクライアントIP取得を修正
```

```
docs(readme): セットアップ手順を更新
```

### デプロイ

- AWS Lambda (ARM64) にデプロイ
- ECR にコンテナイメージをプッシュ
- GitHub Actions でデプロイを自動化

## API エンドポイント

### `GET /api/hello`
- Lambda からの Hello メッセージを返す
- レスポンス例:
  ```json
  {
    "message": "Hello from Lambda!",
    "timestamp": "2025-01-01T00:00:00.000Z",
    "environment": "AWS Lambda"
  }
  ```

### `POST /api/post`
- JSON ボディを受け取り、そのデータをエコーバックする
- リクエストボディとヘッダーをログに記録

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (HMR 有効)
npm run dev

# テスト実行
npm run test

# Lint + Format + 自動修正
npm run check

# Storybook 起動
npm run storybook

# Docker ビルド (ARM64)
docker build --platform linux/arm64 -t hono-lambda-poc . --provenance=false
```

## 注意事項

- 本番環境では、クライアント IP アドレスを API Gateway の `X-Forwarded-For` ヘッダーから取得してログに記録
- 開発環境と本番環境で静的ファイルの配信方法が異なる
- SSR を使用しているため、クライアント専用の API (window など) は使用時に環境チェックが必要
