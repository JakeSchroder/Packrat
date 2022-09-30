from unittest import skip
from pymongo import MongoClient, UpdateOne, ReplaceOne, errors
from pymongo.errors import BulkWriteError
import logging
import json
from flashtext import KeywordProcessor

def get_db(host='localhost', port=27017):
    print("Connecting to database...")
    try:
        client = MongoClient(host, port)
        return [client.everything_everywhere, client]
    except Exception as e:
        logging.error("failed to connect to database")
        exit()

def find_categories(categories, db, client):
    try:
        for product in db.products.find({'tags':{"$nin":["kid", "Kids"]},'title':{"$not":{"$regex":"Kids"}}}, {"product_type"}):
            if product["product_type"] not in categories:
                categories.append(product["product_type"])
    except Exception as e:
        logging.error("Failed to search database")
        exit()

def find_tags(types, db, client):
    try:
        for product in db.products.find({'variants.available':True, 'tags':{"$nin":["kid", "Kids"]},'title':{"$not":{"$regex":"Kids"}}}, {"tags"}):
            for tag in product['tags']:
                if tag not in types:
                    types.append(tag)
    except Exception as e:
        logging.error("Failed to search database")
        exit()

def process_category(product_type):
    kp = KeywordProcessor(case_sensitive=False)
    key = {'T-Shirts': ['t-shirt', 't-shirts', 't shirt', 'crewneck', 'tshirt', 'tee', 'long', 'sleeve', 'longsleeve', 'tees'],
            'Tops': ['shirt', 'top', 'polo', 'tank', 'jersey', 'crop', 'blouse', 'tops', 'blouses', 'flannel', 'shirts'],
            'Layers': ['jacket', 'vest', 'cardigan', 'outerwear', 'coat', 'button-up', 'parka', 'button', 'knit', 
                        'shawl', 'capelet', 'bomber', 'blazer', 'windbreaker', 'zip', 'vests', 'fleece', 'jackets',
                        'knitwear'],
            'Pullovers': ['hoodie', 'sweatshirt', 'jumper', 'hoody', 'pullover', 'sweatshirts', 'sweater', 'hoodies',
                        'sweaters', 'rollneck'],
            'Shorts': ['shorts', 'short', 'sweatshorts'],
            'Pants': ['pant', 'bottom', 'sweatpant', 'trouser', 'jean', 'pants', 'bottoms', 'jeans', 'trousers', 'sweatpants'],
            'Dresses & Skirts': ['skirt', 'dress', 'skirts', 'dresses'],
            'Swim': ['swim', 'bodysuit'],
            'Shoes': ['footwear', 'shoe', 'clog', 'sneaker', 'sandal', 'boot', 'sneakers', 'sandals', 'boots',
                        'shoes'],
            'Jewelry': ['jewelry', 'necklace', 'ring'],
            'Accessories': ['socks', 'belt', 'hat', 'accessories', 'eyewear', 'underwear', 'bag', 'headwear', 
                        'apparel', 'beanie', 'pouch', 'tote', 'scarf', 'cap', 'trucker', 'sunglasses', 'odds'
                        'gloves', 'scarve', 'snapback', 'balaclavas', 'tie', 'headband', 'boxers', 'headbands',
                        'neckties', 'handbags', 'bags', 'watches', 'wristband', 'hats', 'beanies', 'belts',
                        'backpacks', 'mittens', 'scarves', 'wallets', 'wallet', 'case', 'cases', 'accessorie',
                        'ends'],

            'Wildcard Clothing': ['tracksuit', 'kimono', 'sport', 'overall', 'coverall', 'jumpsuits', 'rompers', 'robe', 
                                    'suit', 'clothing', 'suits', 'athletic', 'jumpsuit', 'casual', 'sweat', 'thermal',
                                    'womens', 'women\'s'],
            'Goods': ['art', 'music', 'home', 'books', 'furniture', 'bottle', 'desk', 'object', 'mask', 'pin',
                        'rug', 'incense', 'pillow', 'chair', 'kitchen', 'food', 'ceramic', 'soap', 'perfume',
                        'gift', 'card', 'sticker', 'digital', 'desk', 'neon', 'service', 'keychain', 'petware'
                        'towel', 'puzzle', 'cosmetic', 'good', 'tattoo', 'candle', 'blanket', 'insurance', 'mug',
                        'cup', 'bowl', 'cleaner', 'wellness', 'golf', 'skate', 'dvd', 'video', 'trucks', 'hardware',
                        'grip', 'dvds', 'videos', 'bearings', 'blankets', 'key', 'rugby', 'towel', 'stickers',
                        'skateboard', 'wheels', 'masks', 'bottles', 'homeware', 'cosmetics', 'petware', 'tattoos',
                        'pins', 'cleaners']
        }

    kp.add_keywords_from_dict(key)
    keywords_found = kp.extract_keywords(product_type)

    if len(keywords_found) == 0: # No match in key
        return product_type
    else: # New product_type
        return keywords_found[-1]


def update_product_type(db, client):
    try:
        products = db.products.find({'variants.available':True, 'tags':{"$nin":["kid", "Kids"]},'title':{"$not":{"$regex":"Kids"}}}, {"product_type"})
        operations = [UpdateOne(product, {'$set': {'product_type': process_category(product['product_type'])}}, upsert=True)
                for product in products]

        result = db.products.bulk_write(operations)
        logging.debug(f"{result.inserted_count} results inserted")
        logging.debug(f"{result.modified_count} results modified")
        logging.debug(f"{result.upserted_count} results upserted")

    except BulkWriteError as bwe:
        print(bwe.details)

def main():
    categories = []
    types = []
    db, client  = get_db()

    #find_categories(categories, db, client)
    #find_tags(types, db, client)
    #process_category(categories)
    update_product_type(db, client)

    client.close()



main()