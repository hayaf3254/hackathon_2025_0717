# run.py
import os
from my_app import create_app

# 環境変数から設定名を読み込む。設定されていなければ 'development' をデフォルトとする。
# 通常は export FLASK_CONFIG=production のように設定して使い分けます。
config_name = os.environ.get('FLASK_CONFIG', 'development')

# create_app ファクトリ関数を呼び出してFlaskアプリケーションインスタンスを作成
app = create_app(config_name)

if __name__ == '__main__':
    # Flaskアプリケーションインスタンス 'app' の設定から DEBUG モードを取得
    # config.py で定義された DEBUG の値が反映されます。
    app.run(port=5000, debug=app.config.get('DEBUG', False))
    # debug=True にしたい場合は、app.config.get('DEBUG', False) を True に直接変更するか、
    # config.py の DevelopmentConfig で DEBUG = True と設定してください。