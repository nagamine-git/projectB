# セットアップの方法

1. 構築〜ビルドまで
```bash
# ビルド
docker-compose build
# bashに入る
docker-compose run -p 35729:35729 extention bash
#  ディレクトリに移動してnpm install
cd hogehoge (&& npm install)
# 拡張機能の自動ビルド
npm run dev:chrome
```

2. <chrome://extensions/>へアクセス
3. 「デベロッパーモード」をオンに
4. パッケージ化されていない拡張機能を読み込む
5. `projectB/extention/hogehoge/dist/chrome` ディレクトリを選択