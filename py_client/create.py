import requests

headers = {'Authorization': 'Bearer 307ef781cf1a4cbfd204f442d7cf4f921eb2e163'}
endpoint = 'http://127.0.0.1:8000/api/products/'

data = {
    'title': 'This field is created anew',
    'price': 59.89
    
}

get_response = requests.post(endpoint, json=data, headers=headers)
print(get_response.json())