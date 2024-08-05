# survey
音声付きアンケートフォーム


## アンケート結果集計用サーバー
### aws で行う場合
料金が発生する場合があるので気をつけてね♪
#### aws の構築
後ほど更新します
##### セキュリティグループの許可
8080ポートを許可する

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

本リポジトリをクローンして集計用ディレクトリへ移動
```
git clone https://github.com/tokudai-nishimura-lab/survey.git
cd survey/DataCollector/
```

「poetry」の導入・PATHの設定・バージョンの確認
```
curl -sSL https://install.python-poetry.org | python3 -
export PATH="/home/ubuntu/.local/bin:$PATH"
poetry -V
```

poetry 環境の再構築（.tomlファイルが必要）
```
poetry install
```

アンケート集計サーバーを立ち上げる
```
poetry run python DataCollector.py
```
