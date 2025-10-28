# AWS インフラ構成

このディレクトリには、Hono Lambda POCプロジェクトのAWSインフラ構成に関するファイルが含まれています。

## ファイル一覧

### CloudFormationテンプレート

- **cfn-repository.yml** - CI/CDインフラスタック
  - GitHub OIDC Provider
  - ECRリポジトリ
  - GitHub Actions用のIAMロール

- **cfn-service.yml** - アプリケーションインフラスタック
  - Lambda関数（ARM64、コンテナイメージ）
  - API Gateway HTTP API
  - Lambda Execution Role
  - CloudWatch Logs ロググループ（保持期間設定可能）

### インフラ構成図

- **infrastructure-diagram.drawio** - インフラ構成図
  - AWS 2025アイコンセットを使用
  - CI/CDフローとアプリケーションフローを視覚化
  - 各コンポーネントの接続関係を明示

## インフラ構成図の開き方

`infrastructure-diagram.drawio`ファイルは以下の方法で開くことができます：

1. **Webブラウザ**: [draw.io](https://app.diagrams.net/)でファイルを開く
2. **デスクトップアプリ**: [Draw.io Desktop](https://github.com/jgraph/drawio-desktop)をインストール
3. **VS Code**: [Draw.io Integration拡張機能](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)をインストール

## アーキテクチャ概要

### CI/CDフロー
1. GitHub Actionsがコードをビルド
2. OIDC経由でAWS IAMロールを取得（長期的な認証情報不要）
3. ECRにDockerイメージをプッシュ
4. Lambda関数のコードを更新

### アプリケーションフロー
1. ユーザーがAPI Gateway HTTP APIにリクエスト
2. API GatewayがLambda関数を起動
3. Lambda関数がHono + Reactアプリケーションを実行
4. レスポンスをユーザーに返却

## デプロイ手順

### 1. リポジトリスタックのデプロイ

```bash
aws cloudformation create-stack \
  --stack-name hono-spa-lambda-repository \
  --template-body file://cfn-repository.yml \
  --parameters \
    ParameterKey=GitHubOrg,ParameterValue=oyakodon \
    ParameterKey=RepositoryName,ParameterValue=hono-spa-lambda \
  --capabilities CAPABILITY_NAMED_IAM
```

### 2. サービススタックのデプロイ

```bash
aws cloudformation create-stack \
  --stack-name hono-spa-lambda-service \
  --template-body file://cfn-service.yml \
  --parameters \
    ParameterKey=ImageUri,ParameterValue=<ECR_IMAGE_URI> \
    ParameterKey=LogRetentionInDays,ParameterValue=14 \
  --capabilities CAPABILITY_NAMED_IAM
```

**パラメータ:**
- `ImageUri` (必須): ECRイメージのURI
- `StageName` (オプション): API Gatewayのステージ名 (デフォルト: prod)
- `LogRetentionInDays` (オプション): CloudWatch Logsの保持期間（日数）(デフォルト: 14)

## 注意事項

- Lambda関数はARM64アーキテクチャで実行されます
- タイムアウト: 30秒
- メモリ: 512MB
- ECRライフサイクルポリシーにより、最新5イメージのみ保持されます
- CloudWatch Logsの保持期間はデフォルトで14日間です（カスタマイズ可能）
