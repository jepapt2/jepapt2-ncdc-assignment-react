

https://github.com/user-attachments/assets/74b8ad8b-93c9-4474-bb5f-bde3b6edaa84



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
- `yarn test` - テストの実行
- `yarn test:watch` - 変更があるたびにテストを実行



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
│  │  ├─ [id]/                     # 動的ルーティング（ID別コンテンツ表示）
│  │  │  └─ page.tsx               # コンテンツ詳細ページ
│  │  └─ page.tsx                  # コンテンツ一覧ページ
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
│     ├─ actions.ts                # Server Actions (コンテンツの保存・削除)
│     ├─ atom/                     # Jotai Atoms (状態管理)
│     ├─ components/               # コンテンツ関連のコンポーネント
│     │  ├─ ContentEditor.tsx      # コンテンツ編集コンポーネント
│     │  ├─ ContentList.tsx        # コンテンツ一覧コンポーネント
│     │  ├─ ContentListTile.tsx    # コンテンツリストのタイルコンポーネント
│     │  ├─ ContentSidebar.tsx     # サイドバーコンポーネント
│     │  ├─ __tests__/             # テストディレクトリ
│     ├─ content-api.ts            # コンテンツAPI関連の関数
│     └─ schemas/                  # Valibotスキーマ定義
│
├─ lib/                            # ユーティリティライブラリ
│  ├─ api/                         # API関連ユーティリティ
│  │  ├─ fetcher.ts                # APIフェッチャー
│  │  └─ types.ts                  # API関連の型定義
│  ├─ styles/                      # スタイル関連
│  ├─ utils/                       # 汎用ユーティリティ関数
│  └─ utils.ts                     # shadcn用共通ユーティリティ関数
│
├─ public/                         # 静的ファイル
│
├─ shadcn/                         # shadcn UIライブラリ関連
│  └─ ui/                          # UI コンポーネント
│
├─ .env.example                    # 環境変数のサンプル
├─ jest.config.js                  # Jestの設定ファイル
├─ next.config.js                  # Next.jsの設定ファイル
├─ package.json                    # パッケージ設定
├─ tsconfig.json                   # TypeScript設定
└─ README.md                       # プロジェクト説明
```

## 技術スタック

- Next.js 15.2.4
- React 19.0.0
- TypeScript 5
- Valibot (バリデーションライブラリ)
- Jotai (状態管理)
- TailwindCSS (スタイリング)
- Tanstack Form (フォームライブラリ)
- Jest & React Testing Library (テスト)

##テスト内容


### コンポーネントテスト

#### ContentEditor.tsx
- タイトル・本文の表示/編集切り替え
- フォーム入力とバリデーション
- コンテンツの保存処理



