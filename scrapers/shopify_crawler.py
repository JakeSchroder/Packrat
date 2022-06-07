#from pymongo import MongoClient, errors
import json
import requests
from time import sleep
print("Retrieving products...")

url = 'https://www.wearebraindead.com'
page = 70
with open('products.json', 'w') as f:
    while True:
        products_json = requests.get(url+'/products.json?page=' + str(page)).json()
        if len(products_json) == 1: # Reached end of products
            break
        else: # Store product data
            json.dump(products_json, f)
            print('Retrieved page: ' + str(page))
        page+=1
        sleep(10)
            

# print("Connecting to database...")
# client = MongoClient('mongodb://root:password@mongo:27017/')
# db = client.braindead


# print("Injecting data into database...")
# db.insert_many(file_data)


# client.close()
# print("Success!")