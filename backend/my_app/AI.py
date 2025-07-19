# my_app/AI.py
import os
from flask import Blueprint, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

AI = Blueprint('AI', __name__)

# Gemini APIキーを設定
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@AI.route('/generate', methods=['POST'])
def get_ai():
    # リクエストボディがJSON形式であることを確認
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({"error": "Missing 'title' or 'content' in request"}), 400

    try:
        # Geminiモデルのインスタンス化
        # 使用するモデルはニーズに合わせて変更してください（例: "gemini-pro"）
        model = genai.GenerativeModel('gemini-2.5-flash')

        # AIへの指示（プロンプト）の作成
        # titleとcontentを組み合わせ、どんな種類のコンテンツ作成にも対応できるよう汎用的な指示にする
        prompt = f"あなたはプロフェッショナルなコンテンツ作成アシスタントです。以下の指示に従い、{title}を作成してください。\n\n指示:\n{content}"

        # Gemini APIを呼び出し、コンテンツを生成
        response = model.generate_content(prompt)

        # 生成されたテキストをレスポンスとして返す
        generated_text = response.text
        return jsonify({"message": generated_text}), 200

    except Exception as e:
        # エラーハンドリング
        return jsonify({"error": str(e)}), 500