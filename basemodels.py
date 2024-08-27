from pydantic import BaseModel, Field
from typing import List

class DepartmentModel(BaseModel):
    serial_no: str
    name: str

class FeaturesModel(BaseModel):
    name: str = Field(..., index=True)
    description: str
    image: str
    cta: str

class ProductModel(BaseModel):
    name: str = Field(..., index=True)
    image: str
    description: str
    department: DepartmentModel
    features: List[FeaturesModel]

#made some changes.
class PackageModel(BaseModel):
    name: str = Field(..., index=True)
    image: str
    description: str
    products: List[ProductModel]