from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')  # Allow cross-origin 

@app.route('/', methods=['GET'])
def users():
    return jsonify(
        {
            'users': [
                'hello', 
                'from', 
                'flask!'
            ]
        }
    )

if __name__ == '__main__':
    app.run(debug=True, port="8080")

