# survey
音声付きアンケートフォーム

Google Formではアンケートを作成した際に音声を一緒に再生できなかったので作ってみました。

目次
- [survey](#survey)
  - [使い方](#使い方)
  - [xrea で行う場合](#xrea-で行う場合)
  - [aws で行う場合](#aws-で行う場合)
  - [自宅PC で行う場合](#自宅PC-で行う場合)

## 使い方
今回は「アンケートを表示させるサーバー」と「アンケート結果を集計するサーバー」の二つを建てることを想定しています。<br>
<br>
「アンケートを表示させるサーバー」のportを8000にする想定で、「アンケート結果を集計するサーバー」のデフォルトのportを8080に設定しています。
そのため、一つのパソコンで実現することが可能です。<br>
<br>
大学の環境であればLAN内にこの二つのサーバーを構築し、被験者に来校してもらうことでアンケートの実現ができます。<br>
オンラインでの運用を希望する場合は aws や xrea の無料サーバー、自宅PCなどを活用することで実現可能です。<br>

### 変更が必要な箇所
出来るだけ簡単に利用してもらいたいのでカスタムする際に変えるべき部分を出来るだけ少なくしています。<br>
わかりずらかったらご連絡ください。<br>
以下に変更ポイントを示します

- `HTML`（ディレクトリ）<br>
  表示させるだけのHTMLファイル<br>
  今回であれば、個人情報のページ、MOSのページ、DMOSのページ、完了ページ の４つを作っている
- `PostURL`（`js/const.js`の中）<br>
  アンケート結果集計用サーバーのURL<br>
  **localhost**の部分を適宜変更して下さい。 -> `"http://localhost:8080/save_data"`;
- `HTML`（`js/const.js`の中）<br>
  連想配列を調整して下さい。（例個人情報ページ）
  - `category`: "form"（カテゴリ名を決めます。実は特に使っていない要素）
  - `html`: "form.html"（作成したHTMLファイル）
  - `total`: 3（このカテゴリにおける総質問数）
  - `perpage`: 3（ページ毎に表示する質問数）
  - `action`: "ValidFormInfo"（カテゴリ毎の検証関数名）
- `MOSaudioFiles`（`js/const.js`の中）<br>
    MOSに関する音声リスト（順番も考慮すること）<br>
- `DMOSaudioFiles`（`js/const.js`の中）<br>
    DMOSに関する音声リスト（順番も考慮すること）<br>

その他に質問のカテゴリを増やしたい場合はMOS,DMOSを参考に増やして下さい。<br>
質問の総数, 各ページ毎の質問, jsファイルの検証関数 etc...

## xrea で行う場合
諸々は調べてみて下さい。<br>
基本的にはこのリポジトリをそのままアップロードして下さい。<br>
ドメインなどを得られるのでアクセスするとindex.htmlが表示されます。

余力があれば解説します。^^;

## aws で行う場合
料金が発生する場合があるので気をつけてね♪

### サーバーの構築のための準備
#### aws 構築
後ほど記述します。

#### セキュリティグループの許可
8080ポートを許可する

aws に接続する方法は色々あります。<br>

- PCのコンソールから接続
- VSCodeで少しGUI的に接続
- aws の公式サイトで接続

好きな方法を試して下さい。<br>
余力があればそれぞれ解説します。^^;

#### 接続完了後
pythonサーバーの運用のために「pyenv」,「poetry」,「git」を導入する

python3 と python を繋げる
```
sudo apt install python-is-python3
```

「git」の導入
```
sudo apt update
sudo apt install build-essential libffi-dev libssl-dev zlib1g-dev liblzma-dev libbz2-dev   libreadline-dev libsqlite3-dev libopencv-dev tk-dev git
```

「pyenv」の導入
```
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

「pyenv」の PATH を設定
```
echo '' >> ~/.bashrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
```

設定を適応
```
source ~/.bashrc
```

「pyenv」のバージョン確認
```
pyenv -v
```

pyenv 環境で利用する python の選択（ここでは 3.11.6 を選択）
```
pyenv install --list
pyenv install 3.11.6
```
利用する python のがインストールしているのか確認し適応する

```
pyenv versions
pyenv global 3.11.6
```

「poetry」の導入・PATHの設定・バージョンの確認
```
curl -sSL https://install.python-poetry.org | python3 -
export PATH="/home/ubuntu/.local/bin:$PATH"
poetry -V
```

このリポジトリをクローン
```
git clone https://github.com/tokudai-nishimura-lab/survey.git
```

### アンケート表示用サーバー
index.htmlのファイルがあるディレクトリに移動する
```
python3 -m http.server 8000
```

### アンケート結果集計用サーバー
DataCollector.pyのファイルがあるディレクトリに移動する
```
cd survey/DataCollector/
```

poetry 環境の再構築（.tomlファイルが必要）
```
poetry install
```

アンケート集計サーバーを立ち上げる
```
poetry run python DataCollector.py
```


## 自宅PC で行う場合
色々問題はあるよね〜是非調べてみて下さい。
- 自宅PCへの外部ネットワーク接続の許可
  ドメインを取得するのがいいと思います。
- pythonが運用可能な環境
- gitが利用可能

### サーバー構築
構築自体は aws とやっていることは同じです。<br>
aws で行った場合も参考にして下さい。
