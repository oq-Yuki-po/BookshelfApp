# ベースイメージ
FROM python:3.6

# aptのアップデート
RUN apt-get update && apt-get install -y \
# apiディレクトリの作成
    && mkdir /var/api \
# pipのアップデート
    && pip install --upgrade pip

# workdirの指定
WORKDIR /var

# 依存Pythonライブラリ一覧コピー
COPY requirements.txt ./var/api/

# 依存Pythonライブラリインストール
RUN pip install --no-cache-dir -r var/api/requirements.txt

# uwsgiの起動
CMD ["uwsgi","--ini","/var/api/uwsgi.ini"]