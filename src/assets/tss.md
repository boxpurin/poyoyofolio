# 配信タイムスタンプ検索
特定YouTubeチャンネルに数万存在するタイムスタンプの検索用サイト。高速検索を行うためにMeiliSearchを使用。選択することで話題のポイントから再生できます。

設計、開発に関してはDDDを意識したレイヤードアーキテクチャによる責務分離を意識した構造になっており、Docker Compose によるローカル開発環境構築を行うなど、一定規模以上の開発で使われるような色々な技術や設計を取り込む意識をしました。

運用面に関しては、最新情報の取得はGoogle Cloud Scheduleを使用することで定期的なデータ取得を行うことで自動化、MeiliSearchのインスタンス自体は外部ネットワークからは遮断された状態にすることで一定のセキュリティを確保しています。

今後の予定としてはGoogle OAuthを使ったログイン認証、MySQL + Redisを使ったユーザー情報+セッション管理を考えており、ユーザーの情報を取り扱うに伴い、セキュリティの見直しを改めて行う予定です。加えて運用のためのデスクトップアプリケーション作成を行いたいと考えています。

また、今後別のアプリケーションやサービスを作成する際は、更にGithub Actionsを使ったCI/CDを行うことでより効率的に開発を行いたいと考えています。

## URL
- [サービスページ](https://basic-cat-448106-g5.web.app/ "サービスページ")
- [Github(バックエンド)](https://github.com/boxpurin/timestamp-search "backend")
- [Github(フロントエンド)](https://github.com/boxpurin/timestamp-serach-frontend "frontend")

## 使用技術
|  |  |
|----|----|
| Frontend | React / TypeScript / Vite / MUI |
| Backend | Rust / Axum / Docker / Docker Compose / Python3 |
| インフラ | Google Cloud Run / Google Compute Engine / MeiliSearch |