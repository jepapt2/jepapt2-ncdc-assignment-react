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
  - App routerを使用
- React 19.0.0
  - データフェッチはサーバーコンポーネントを使用
- TypeScript 5
- Valibot (バリデーションライブラリ)
- Jotai (状態管理)
- TailwindCSS (スタイリング)
- Tanstack Form (フォームライブラリ)
- Jest & React Testing Library (テスト)


## テスト内容

### コンポーネントテスト

#### ContentEditor.tsx
- タイトル・本文の表示/編集切り替え
- フォーム入力とバリデーション
- コンテンツの保存処理

## 学習目的で採用した新しめの技術

### Valibot
**概要**: 軽量でタイプセーフなバリデーションライブラリ
- バンドルサイズが小さい（Zodと比較して約10倍軽量）
- zodの書き方(メソッドチェーン)とは異なるので移行は難しい

**ドキュメント**: https://valibot.dev/guides/introduction/

**紹介記事**: https://zenn.dev/uttk/articles/introduce-valibot

### Tanstack Form
**概要**: React用の型安全なフォームライブラリ 
- standard schema対応(https://zenn.dev/caffe_latte_623/articles/standard-schema)でアダプタなしでvalibotでバリデーションできるため採用
- 厳密な型安全性で入れ子構造の型推論が優れている(フォームの構造が簡単なので実感はできず)
- バリデーションのタイミングを細かく設定できる

**ドキュメント**: https://tanstack.com/form/latest/docs/overview

**紹介記事**: https://zenn.dev/takumaru/articles/a01bad21517f2e

### shadcn/ui
**概要**: コピー&ペースト可能なReact UIコンポーネント集
- コードをプロジェクトに直接取り込める
- Tailwind CSSとの互換性

**ドキュメント**: https://ui.shadcn.com/docs

**紹介記事**: https://note.com/akane_desu/n/n1276d86d388e

### Biome
**概要**: Rustで書かれた高速なJavaScript/TypeScriptツールチェイン 
- 高速な実行速度
- リンターとフォーマッターが一体化
- 低い設定コスト
- ESLintやPrettierの代替として機能
- prettier＋eslintと違って細かい設定はできない(importするファイルの詳細な順序など)

**ドキュメント**: https://biomejs.dev/ja/

**紹介記事**: https://zenn.dev/ako/articles/b8a686843f6b83

### Lefthook
**概要**: Gitフックを管理するためのツール。  
- コミット前やプッシュ前に自動的にリント・テストを実行
- 比較対象になるhuskyも使用したことがないのでなんとも言えないが、設定が簡単？

**ドキュメント**: https://lefthook.dev/installation/

**紹介記事**: https://zenn.dev/sukesan0720/articles/87a8c005f82522


## つまづいたこと

### クライアントコンポーネント中ににサーバーコンポーネントを置けない
- コンテンツリスト内実装時に気づく
- サーバーコンポーネント→クライアントコンポーネントのレンダリングの順序
- データの流れを意識する必要がある
- 状態管理ライブラリを使ってクライアントコンポーネント間で状態管理する

### コンテンツ投稿後のリスト再フェッチ
- next.jsの[revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)を使ってURLパスを再検証
- サーバー側でしか使用できないのでクライアントコンポーネントで使うにはサーバーアクションの作成が必要(ファイルの一行目か個別の場合は関数の一行目に'use server'記入)
- 特定のフェッチリクエストだけ再検証したい場合はrevalidateTagを使用する
  - リフェッチする対象のタグ付けは[fetchで指定する](https://zenn.dev/cybozu_frontend/articles/server-actions-and-revalidate#revalidatetag-%E3%81%AE%E5%8B%95%E3%81%8D%E3%82%92%E3%81%BF%E3%81%A6%E3%81%BF%E3%82%8B)のでaxiosを使うべきではなかった
    

