from pymongo import MongoClient, UpdateOne, ReplaceOne, errors
from pymongo.errors import BulkWriteError
import logging
import json


def get_db(host='localhost', port=27017):
    print("Connecting to database...")
    try:
        client = MongoClient(host, port)
        return [client.everything_everywhere, client]
    except Exception as e:
        logging.error("failed to connect to database")
        exit()

def search_db(categories, db, client):
    try:
        for product in db.products.find({'variants.available':True, 'tags':{"$nin":["kid", "Kids"]},'title':{"$not":{"$regex":"Kids"}}}, {"product_type"}):
            if product["product_type"] not in categories:
                categories.append(product["product_type"])
    except Exception as e:
        logging.error("Failed to search database")
        exit()
        
def main():
    categories = []
    db, client  = get_db()
    search_db(categories, db, client)

    for product_type in categories:
        print(product_type)



main()