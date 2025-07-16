# my_app/api.py
from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

# ★ /api/hello でアクセス可能になります
@api.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello from Flask API!"})

# ★ルートパス (/api/) でアクセス可能になります
@api.route('/', methods=['GET'])
def root_endpoint():
    return jsonify({"message": "Welcome to the root of the API!"})