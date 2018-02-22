import requests
import json

baseurl = 'https://traci.s-apps.de1.bosch-iot-cloud.com'
auth_path = '/api/v3/authenticate'
location_path = '/api/TRACI/v3/locations'

user = { 'im_tid': 'BCX', 'username': 'bcx-user', 'password': 'BCX2018!' }
header = { 'content-type': 'application/json'}

url = baseurl + auth_path
api_key = json.loads(requests.post(url, data=json.dumps(user), headers=header).content)['user']['api_key']


url = baseurl + location_path
header['Authorization'] = api_key
resp = json.loads(requests.get(url, headers=header).content)

for i in resp:
 if i['name'] == '100002882007475':
  print i  
