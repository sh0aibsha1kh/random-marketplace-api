import random

product_list = open("./product_list.js", "w")
with open('./random_item_list.txt') as random_item_list:
    random_items = random_item_list.read().splitlines()


def generate_random_price():
    '''
    Generate a random two decimal number between 1 and 100.
    '''
    return str(round(random.uniform(1, 101), 2))


def generate_random_inventory_count():
    '''
    Generate a random integer between 1 and 10.
    '''
    return str(random.randint(1, 11))

product_list.write("const productList = [\n")

for item in random_items:
    if(random.random() >= 0.75):  # we want approximately 25% of the inventory to be empty
        product_list.write(
            "\t{ title: \"" + item + "\", price: " + generate_random_price() + ", inventory_count: 0 },\n")
    else:
        product_list.write(
            "\t{ title: \"" + item + "\", price: " + generate_random_price() + ", inventory_count: " + generate_random_inventory_count() + " },\n")

product_list.write("];\n\nmodule.exports = {\n\tproductList\n}")