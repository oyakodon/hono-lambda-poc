# CI/CD構築のためのTodoリスト

## ✅ 完了
- [x] プロジェクト構造とビルドプロセスの理解
- [x] CI用GitHub Actionsワークフローの設計・作成
  - Pull Request時のコード検証
  - mainブランチへのpush時の検証
- [x] コード品質チェックの設定
  - Biome lint
  - Biome format check
  - TypeScript型チェック (`tsc --noEmit`)
- [x] ビルド検証の追加
  - クライアントビルド (`vite build --mode client`)
  - サーバービルド (`vite build`)
  - ビルド成果物の検証
- [x] Dockerイメージビルド検証の追加
  - ARM64プラットフォームでのビルドテスト
  - イメージサイズの確認

## 📋 CI (継続的インテグレーション) タスク

## 🚀 CD (継続的デリバリー) タスク

- [ ] CD用GitHub Actionsワークフローの設計・作成
  - タグpush時の自動デプロイ
  - または mainブランチへのマージ時のデプロイ

- [ ] AWS ECRへのDockerイメージpush自動化
  - AWS認証の設定
  - ECRリポジトリへのpush
  - イメージタグ管理（semantic versioning等）

- [ ] AWS Lambdaへのデプロイ自動化の実装
  - Lambda関数の更新
  - API Gatewayの設定（必要に応じて）
  - デプロイ後の疎通確認

## 🔧 設定・運用タスク

- [ ] 環境変数とシークレット管理の設定
  - GitHub Secrets の設定（AWS認証情報等）
  - 環境別の設定管理（dev/staging/prod）

- [ ] ワークフローのテストとドキュメント更新
  - ワークフローの動作確認
  - README.mdへのCI/CDバッジ追加
  - デプロイ手順のドキュメント化

## 💡 推奨される追加タスク（オプション）

- [ ] テストフレームワークの導入 (Vitest等)
- [ ] 依存関係の脆弱性スキャン (npm audit, Dependabot)
- [ ] セキュリティスキャン (Trivy等でDockerイメージスキャン)
- [ ] パフォーマンステスト (Lambda のコールドスタート時間等)
