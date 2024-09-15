from flask import Flask, jsonify, request
from flask_cors import CORS
import http.client
# import requests, json
#run "python-venv\Scripts\activate" to activate the virtual environment

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes
# cors = CORS(app, origins='*')  # Allow cross-origin 

conn = http.client.HTTPSConnection("zillow56.p.rapidapi.com")
headers = {
    'x-rapidapi-key': "64d06c0a70mshc1395b98bc739c1p1e5c27jsnc75a73d509d8",
    'x-rapidapi-host': "zillow56.p.rapidapi.com"
}


@app.route('/api/data/', methods=['POST'])
def get_data():
    county = request.args.get('county')
    city = request.args.get('city')
    state = request.args.get('state')
    
    print(f"Received data - County: {county}, City: {city}, State: {state}")
    
    # Process the data as needed
    data = {
        'county': county,
        'city': city,
        'state': state,
        'message': 'Data received successfully'
    }

    location = request.args.get('county')
    try:
        conn.request("GET", f"/search?location={state}&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any", headers=headers)
        res = conn.getresponse()
        data = res.read()
        return data.decode("utf-8")
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8080)

