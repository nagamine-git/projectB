# セットアップの方法

1. 構築〜ビルドまで
```bash
# ビルド
docker-compose build
# 初回だけnpm install
docker-compose run extention npm install
# 起動・自動ビルド
docker-compose up
```

2. <chrome://extensions/>へアクセス
3. 「デベロッパーモード」をオンに
4. パッケージ化されていない拡張機能を読み込む
5. `projectB/extention/hogehoge/dist/chrome` ディレクトリを選択