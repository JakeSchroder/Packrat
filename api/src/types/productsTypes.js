// TOPS
const SHIRTS = ["t-shirt", "longsleeve", "Shirts & Tops", "VINTAGE TOP", "women's top", "CROP TOP", "LONG-SLEEVER", "HWAB TOPS", "women's tops", "T-Shirt", "Shirt", "T Shirt", "Longsleeve", "shirt", "Tank Top", "Button-Ups", "crop top", "Button-Up", "Button Up", "polo", "SHIRT", "Tank", "Polo", "vintage outerwear", "Crop Tee", "Crewneck", "CREWNECK", "SS Knit"];
const JACKETS = ["Coats & Jackets", "Jacket", "vintage jacket", "jacket", "women's jacket", "JACKET", "HWAB OUTERWEAR", "women's outerwear", "Outerwear", "Flannel", "parka", "tracksuit"];
const HOODIES = ["HOODIES", "Jumper", "hoodie", "Hoodie", "HOODY", "pullover", "HOODIE", "Clothing"];
const SWEATERS = ["sweater",  "Sweatshirt", "sweatshirt", "Sweaters", "Sweater", "Fleece", "fleece"];
const VESTS = ["vest", "Knit"];
const CARDIGANS = ["CARDIGAN", "cardigan"];
// BOTTOMS
const UNDERWEAR = ["underwear"];
const PANTS = ["Vintage Pants", "women's pants", "Pants", "Pant", "pant", "sweatpant", "Women's - Bottoms", "VINTAGE BOTTOMS", "SWEAT PANTS", "PANTS"];
const SHORTS = ["Vintage shorts", "HWAB SHORTS", "Shorts", "shorts", "SWEAT SHORTS", "SHORTS", "Biker Short"];
const SKIRTS = ["Vintage skirt", "women's skirt", "skirt"];
// FULL_BODY
const SWIM = ["Body Suit", "bodysuit"];
const OVERALL = ["overall"];
const COVERALL = ["coverall"];
const DRESS = ["dress", "women's dress", "Vintage Dress"];
// ACCESSORIES
const JEWELRY = ["jewelry", "JEWELRY", "NECKLACE", "RING"];
const EYEWEAR = ["eyewear"];
const HATS = ["hat", "Hat", "Headwear", "Hats", "BEANIE"];
const APPAREL = ["belt", "Accessories", "bag", "vintage accessories", "SAFETY PIN", "Apparel & Accessories", "women's accessories", "wristband"];
const SOCKS = ["Socks", "socks"];
const SHOES = ["footwear", "FOOTWEAR"];
// MISC
const MISC = ["music", "Desk Mat", "Art Print", "digital", "Water Bottles", "Pin", "Mask", "rug", "incense", "homeware", "furniture", "Books", "pillow", "soap", "keychain", "petware", "towel", "kitchen", "sticker", "puzzle", "pin", "chair","food", "BLANKET", "perfume", "mask", "RUG", "CANDLE", "TATTOOS", "pins", "ceramic", "object", "sport", "Neon", "Home", "Home Goods", "cosmetics"];

const TOP = [...SHIRTS, ...JACKETS, ...HOODIES, ...SWEATERS, ...VESTS, ...CARDIGANS];
const BOTTOM = [...SHORTS, ...SKIRTS, ...PANTS, ...UNDERWEAR];
const FULL_BODY = [...SWIM, ...OVERALL, ...COVERALL, ...DRESS];
const ACCESSORIES = [...JEWELRY, ...EYEWEAR, ...HATS, ...APPAREL, ...SOCKS, ...SHOES];
const ALL = [...TOP, ...BOTTOM, ...FULL_BODY, ...ACCESSORIES, ...MISC];

module.exports = { ALL, TOP, BOTTOM, FULL_BODY, ACCESSORIES, MISC };
