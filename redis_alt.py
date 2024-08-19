import datetime
from typing import Optional

from pydantic import EmailStr

from redis_om import (
    Field,
    HashModel,
    JsonModel,
    EmbeddedJsonModel,
    Migrator
)

class Address(EmbeddedJsonModel):
    address_line_1:str
    address_line_2:str
    city:str=Field(index=True)
    state:str=Field(index=True)
    country:str
    postal_code:str=Field(index=True)


class Customer(JsonModel):
    first_name: str
    last_name: str = Field(index=True)
    email: EmailStr
    join_date: datetime.date
    age: int = Field(index=True)
    bio: Optional[str] = None
    address:Address


# Now, if we use this model with a Redis deployment that has the
# RediSearch module installed, we can run queries like the following.

# Before running queries, we need to run migrations to set up the
# indexes that Redis OM will use. You can also use the `migrate`
# CLI tool for this!
Migrator().run()

my_location=Address(address_line_1="1",address_line_2="2",city="Nairobi",state="Florida",country="Kenya",postal_code="00100")
andrew=Customer(first_name="Andrew",
    last_name = "Momanyi",
    email="andrew@outlook.com",
    join_date=datetime.date.today(),
    age=38,
    bio="Python developer, works at Redis, Inc.",
    address=my_location)

print(andrew.pk)
andrew.save()

# print(
#     Customer.find((Customer.address.postal_code=='00100') & (Customer.address.postal_code=='0100')).all()
# )