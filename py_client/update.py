import requests

endpoint = 'http://127.0.0.1:8000/api/products/8/update/'

data = {
    'title': 'This is an updated data',
    'price': 1000.00
}

get_response = requests.put(endpoint, json=data)
print(get_response.json())