import requests, json


"""
Data to fetch:
Name given to the disaster (e.g. Northridge Earthquake)
Start date of the disaster
State
County
Disaster Type
"""

def get_disaster_data(state, start_year, start_month, end_year, end_month):
    base_url = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries"

    # filter = "?$filter=declarationDate lt '1995-09-07T00:00:00.000Z' and state eq 'CA' and incidentType eq 'Earthquake' and declarationDate gt '1990-09-07T00:00:00.000Z'"

    # Write a function that takes in a state and returns the name of the disaster, the start date of the disaster, the state, the county, and the disaster type.
    start_year = '2000'
    start_month = '01'
    end_year = '2005'
    end_month = '03'
    state = 'CA'
    county = 'Orange (County)'

    filter = f"?$filter=state eq '{state}' and declarationDate gt '{start_year}-{start_month}-01T00:00:00.000Z' and declarationDate lt '{end_year}-{end_month}-01T00:00:00.000Z' and designatedArea eq '{county}'"
    
    # print(filter)


    response = requests.get(base_url + filter)

    return response.json()

data = get_disaster_data('CA', '2000', '01', '2000', '02')
print(data)


