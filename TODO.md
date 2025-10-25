# CI/CD構築のためのTodoリスト

## ✅ 完了

### ワークフロー構成
- [x] ワークフローを3つに分割 (`check.yml`, `push-ecr.yml`, `deploy.yml`)
- [x] GitHub Actions v6 へ最新化

### CI (継続的インテグレーション) - check.yml
- [x] プロジェクト構造とビルドプロセスの理解
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

### CD - ECRプッシュ (push-ecr.yml)
- [x] AWS ECRへのDockerイメージpush自動化
  - AWS認証の設定
  - ECRリポジトリへのpush
  - イメージタグ管理（タグ/SHA/latest）
  - 手動実行（workflow_dispatch）対応

### CD - デプロイ (deploy.yml)
- [x] AWS Lambdaへのデプロイ自動化の実装
  - Lambda関数の更新
  - ECRプッシュ成功後の自動デプロイ
  - 手動デプロイ対応
  - デプロイ状態の確認

## 📋 残タスク

### 設定・運用
- [ ] 環境変数とシークレット管理の設定
  - GitHub Secrets の設定（AWS認証情報等）
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`
  - ECRリポジトリ名の確認・設定
  - Lambda関数名の確認・設定

- [ ] ワークフローのテストとドキュメント更新
  - ワークフローの動作確認
  - README.mdへのCI/CDバッジ追加
  - デプロイ手順のドキュメント化

## 💡 推奨される追加タスク（オプション）

- [ ] テストフレームワークの導入 (Vitest等)
- [ ] 依存関係の脆弱性スキャン (npm audit, Dependabot)
- [ ] セキュリティスキャン (Trivy等でDockerイメージスキャン)
- [ ] パフォーマンステスト (Lambda のコールドスタート時間等)
