# -*- coding: utf-8 -*-
"""
Created on Wed Feb 21 22:23:05 2018

@author: rtkri
"""
import requests
import pandas as pd
from requests.auth import HTTPBasicAuth
from pandas.io.json import json_normalize
import json

headers = {'x-cr-api-token': 'XXXXXXXXXXXXXXXXX'}
data = requests.get('https://things.s-apps.de1.bosch-iot-cloud.com/api/2/things/XXXXXXXXXXX', headers=headers,auth=HTTPBasicAuth('XXXXX','XXXXX'))
j = data.json()
abc=pd.DataFrame(j)
df2 = pd.io.json.json_normalize(j)
df2.columns = df2.columns.map(lambda x: x.split(".")[-1])
df2.to_csv('sensor.csv', sep=',', encoding='utf-8')
