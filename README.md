# プロジェクトのディレクトリ構造

├─ app/                   # Next.jsのアプリケーションルート
├─ features/             # 機能ごとのモジュール
│  └─ /post             # 投稿機能に関連するモジュール
│     ├─ components/    # 投稿関連のコンポーネント
│        ├─ Post.tsx    # 単一投稿表示コンポーネント
│        └─ Posts.tsx   # 投稿一覧表示コンポーネント
│     ├─ hooks/         # 投稿関連のカスタムフック
│        └─ usePost.ts  # 投稿データ操作用フック
│     └─ types/         # 投稿関連の型定義
├─ components/          # 共通コンポーネント
├─ shadcn/             # shadcn UIライブラリ関連
│  ├─ ui/              # UIコンポーネント
├─ hooks/              # 共通カスタムフック
├─ libs/               # ユーティリティライブラリ
│  └─ utils/           # 汎用ユーティリティ関数

