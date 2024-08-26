from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi.requests import Request
import redis
from models import *
from redis_om import Migrator
import os


#Run the db migrator as we discussed.
Migrator().run()
app=FastAPI()

#Mount the static files
app.mount("/static",StaticFiles(directory=r"./static"),name="static")

#Set up templates directory.
templates=Jinja2Templates(directory=r"./templates")

@app.get("/")
def get(request:Request):
    return templates.TemplateResponse('index.html',{'request':request})
    
@app.get("/product")
def get(request:Request):
    return templates.TemplateResponse('product.html',{'request':request})

@app.get("/bronze")
def bronze_hander(request:Request):
    data=Package.find((Package.name=="Bronze")).all()[0]
    data.name="Bronze"
    print(data)
    return templates.TemplateResponse('product.html',{'request':request,'data':data})

@app.get("/bronze/details")
def details_hander(request:Request,id:int=0):
    return templates.TemplateResponse('details.html',{'request':request})

@app.get("/silver")
def silver_hander(request:Request):
    data=Package.find((Package.name=="Standard Package")).all()[0]
    return templates.TemplateResponse('product.html',{'request':request,'data':data})

@app.get("/platinum")
def bronze_hander(request:Request):
    data=Package.find((Package.name=="Premium Package")).all()[0]
    return templates.TemplateResponse('product.html',{'request':request,'data':data})

@app.get("/products")
def get_products(Name:str="Bronze"):
    #You should use the package id to query for products specific to that package.
    data=Package.find((Package.name==Name)).all()[0]
    products=data.products
    return products