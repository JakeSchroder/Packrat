from pymongo import MongoClient, UpdateOne, ReplaceOne, errors
from pymongo.errors import BulkWriteError
import logging
import json
import requests
from time import sleep
from secrets import token_urlsafe

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
        operations += [UpdateOne(item, {'$set': {'random_sort': token_urlsafe(32)}}, upsert=True)
                for item in products]

        result = db.products.bulk_write(operations)
        logging.debug(f"{result.inserted_count} results inserted")
        logging.debug(f"{result.modified_count} results modified")
        logging.debug(f"{result.upserted_count} results upserted")
    except BulkWriteError as bwe:
        print(bwe.details)

    logging.info(f"Page {page} stored!")

def store_products(url, db):
    page = 0

    products_on_page = get_products_by_page(url, page)
    while len(products_on_page):
        # Store product data
        update_products(db, page, products_on_page)
        page += 1
        sleep(15)  # Prevents blocking from shopify
        products_on_page = get_products_by_page(url, page)

def main():
    urls = ['https://shoptunnelvision.com', 'https://www.wearebraindead.com', # 0, 1
            'https://shop-cometees.biz', 'https://basketcase.gallery', 'https://shirtz.cool', # 2, 3, 4
            'https://generaladmission.com', 'https://honorthegift.co', 'https://forthosewhosin.com', # 5, 6, 7
            'https://www.bbcicecream.com', 'https://camphigh.com', 'https://unfortunateportrait.com', # 8, 9, 10 .... 9 products.json is unavailable
            'https://www.junglesjungles.com', 'https://funeralapparel.com', 'https://awakenyclothing.com', # 11, 12, 13
            'https://pleasuresnow.com', 'https://tombolocompany.com', 'https://www.storymfg.com', # 14, 15, 16
            'https://chnge.com', 'https://bdgastore.com', 'https://nepenthesny.com', # 17, 18, 19
            'https://humblesbrand.com', 'https://cherryla.com', 'https://faworldentertainment.com', # 20, 21, 22
            'https://kidsuper.com', 'https://www.thevintagetwin.com', 'https://wishmeluckbrand.com'] # 23, 24, 25
    db, client = get_db()

    for url in urls[]:
        print(f"\nWorking on {url}\n")
        store_products(url, db)
        print(f"\nFinished {url}\n")

    client.close()
    print("Success!")


main()
