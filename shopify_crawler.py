from pymongo import MongoClient, UpdateOne, ReplaceOne, errors
from pymongo.errors import BulkWriteError
import logging
import json
import requests
from time import sleep

logging.basicConfig(level=logging.DEBUG)


def get_products_by_page(url, page):
    request_url = f"{url}/products.json?page={page}"
    try:
        # NOTE: should check for 200 response first before proceeding
        # if non-200 response throw exception
        print(f"Retrieving products from {request_url}")
        result = requests.get(
            request_url).json()
        return result["products"]
    except Exception as e:
        logging.error(f"Failed to fetch from: {request_url}")
        return []


def get_db(host='localhost', port=27017):
    print("Connecting to database...")
    try:
        client = MongoClient(host, port)
        return [client.everything_everywhere, client]
    except Exception as e:
        logging.error("failed to connect to database")
        exit()


def update_products(db, page, products):
    try:
        operations = [ReplaceOne({'_id': item["id"]}, item, upsert=True)
                      for item in products]
        result = db.products.bulk_write(operations)
        print(result)
        logging.debug(f"{result.inserted_count} results inserted")
        logging.debug(f"{result.modified_count} results modified")
        logging.debug(f"{result.upserted_count} results upserted")
    except BulkWriteError as bwe:
        print(bwe.details)

    logging.info(f"Page {page} stored!")


def main():
    urls = ['https://shoptunnelvision.com', 'https://www.wearebraindead.com',# 0, 1
            'https://shop-cometees.biz', 'https://basketcase.gallery', 'https://shirtz.cool',# 2, 3, 4
            'https://generaladmission.com', 'https://honorthegift.co', 'https://forthosewhosin.com',# 5, 6, 7
            'https://www.bbcicecream.com']
    url = urls[8]
    page = 0
    db, client = get_db()

    products_on_page = get_products_by_page(url, page)
    while len(products_on_page):
        # Store product data
        update_products(db, page, products_on_page)
        page += 1
        sleep(15)  # Prevents blocking from shopify
        products_on_page = get_products_by_page(url, page)

    client.close()
    print("Success!")


main()
