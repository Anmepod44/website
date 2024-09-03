from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi.requests import Request
# from db_controller import *

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
    data=[]
    return templates.TemplateResponse('product.html',{'request':request,'data':data})

@app.get("/silver")
def silver_hander(request:Request):
    data=[]
    return templates.TemplateResponse('product.html',{'request':request,'data':data})

@app.get("/platinum")
def bronze_hander(request:Request):
    data=[]
    return templates.TemplateResponse('product.html',{'request':request,'data':data})