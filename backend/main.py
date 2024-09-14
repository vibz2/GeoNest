from flask import Flask, jsonify
from flask_cors import CORS
import http.client
# import requests, json

conn = http.client.HTTPSConnection("zillow56.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "64d06c0a70mshc1395b98bc739c1p1e5c27jsnc75a73d509d8",
    'x-rapidapi-host': "zillow56.p.rapidapi.com"
}



app = Flask(__name__)
cors = CORS(app, origins='*')  # Allow cross-origin 

@app.route('/', methods=['GET'])
def users(location):
    conn.request("GET", f"/search?location={location}&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any", headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))

if __name__ == '__main__':
    app.run(debug=True, port="8080")

