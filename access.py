from database import Session
from db_controller import get_all_products


session=Session()

products=get_all_products(session)

for i in products:
    print(i.name)