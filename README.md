# ビルド

## 必要な環境

- Node.js 22.14.0 (nodenvを使用)
- yarn 1.22.x 以上


## 開発ツール

- [Biome](https://biomejs.dev/) - リンターとフォーマッター
  - `yarn lint` - コードのリンティング
  - `yarn format` - コードのフォーマット
  - `yarn lint:fix` - リント問題の自動修正
  - `yarn format:fix` - フォーマットの自動修正



## API環境設定

このプロジェクトはAPIサーバーと通信するため、以下の環境変数を設定する必要があります：

```
# .env ファイルを作成
NEXT_PUBLIC_API_URL=
```

環境変数が設定されていない場合、API通信が失敗する可能性があります。

# プロジェクトのディレクトリ構造

```
├─ app/                            # Next.jsのアプリケーションルート
│  ├─ content/                     # コンテンツ関連のルート
│  ├─ example/                     # 例示用ディレクトリ
│  ├─ globals.css                  # グローバルスタイル
│  ├─ layout.tsx                   # ルートレイアウト
│  ├─ page.tsx                     # ホームページ
│  └─ favicon.ico                  # ファビコン
│
├─ components/                     # 共通コンポーネント
│  ├─ ActionButton.tsx             # アクションボタンコンポーネント
│  ├─ DeleteIconButton.tsx         # 削除ボタンコンポーネント
│  └─ svg/                         # SVGコンポーネント
│
├─ features/                       # 機能ごとのモジュール
│  └─ content/                     # コンテンツ機能に関連するモジュール
│     ├─ actions.ts                # Server Actions
│     ├─ atom/                     # Jotai Atoms
│     ├─ components/               # コンテンツ関連のコンポーネント
│     ├─ content-api.ts            # コンテンツAPI関連の関数
│     └─ schemas/                  # Valibotスキーマ定義
│
├─ lib/                            # ユーティリティライブラリ
│  ├─ api/                         # API関連ユーティリティ
│  ├─ styles/                      # スタイル関連
│  ├─ utils/                       # 汎用ユーティリティ関数
│  └─ utils.ts                     # 共通ユーティリティ関数
│
└─ shadcn/                         # shadcn UIライブラリ関連
```

## 技術スタック

- Next.js 15.2.4
- React 19.0.0
- TypeScript 5
- Valibot (バリデーション)
- Jotai (状態管理)
- TailwindCSS (スタイリング)
- Tanstack form　(フォームライブラリ)

