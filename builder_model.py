from pydantic import BaseModel


class BuilderData(BaseModel):
    name: str
    phone: str
    email: str
    business_name: str
    facebook: str = "#"
    linkedin: str = "#"
    twitter: str = "#"
    instagram: str = "#"