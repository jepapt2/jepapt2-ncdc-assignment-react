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

