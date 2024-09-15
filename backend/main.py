from flask import Flask, jsonify, request
from flask_cors import CORS
import http.client
import requests, json
# import requests, json
#run python -m venv python-venv
#run "python-venv\Scripts\activate" to activate the virtual environment
#run curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py 
#run python get-pip.py
#run pip install flask flask-cors
#run pip install requests

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes
# cors = CORS(app, origins='*')  # Allow cross-origin 

conn = http.client.HTTPSConnection("zillow56.p.rapidapi.com")
headers = {
    'x-rapidapi-key': "e2168eb707msh4b307843c2da548p17279ejsn291624712ef8",
    'x-rapidapi-host': "zillow56.p.rapidapi.com"
}

@app.route('/api/get_disaster_data/', methods=['POST'])
def get_disaster_data():
    county = request.args.get('county')
    state = request.args.get('state')

    base_url = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries"

    # filter = "?$filter=declarationDate lt '1995-09-07T00:00:00.000Z' and state eq 'CA' and incidentType eq 'Earthquake' and declarationDate gt '1990-09-07T00:00:00.000Z'"

    # Write a function that takes in a state and returns the name of the disaster, the start date of the disaster, the state, the county, and the disaster type.
    start_year = '1980'
    start_month = '01'
    end_year = '2024'
    end_month = '12'
    with open('states.json', 'r') as file:
        states_data = json.load(file)
    for stateFull, acronym in states_data.items():
        if state == stateFull:
            state = acronym

    county=county+" (County)"

    filter = f"?$filter=state eq '{state}' and declarationDate gt '{start_year}-{start_month}-01T00:00:00.000Z' and declarationDate lt '{end_year}-{end_month}-01T00:00:00.000Z' and designatedArea eq '{county}'"

    response = requests.get(base_url + filter) 

    print(response.json())
    return response.json()

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
    
    try:
        conn.request("GET", f"/search?location={state}&output=json&status=forSale&sortSelection=priorityscore&listing_type=by_agent&doz=any", headers=headers)
        res = conn.getresponse()
        data = res.read()
        return data.decode("utf-8")
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8080)
