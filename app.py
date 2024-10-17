from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi.requests import Request
from fastapi import Form

from utils import load_zahlentech_solutions
# from db_controller import *

app=FastAPI()

#Mount the static files
app.mount("/static",StaticFiles(directory=r"./static"),name="static")

#Set up templates directory.
templates=Jinja2Templates(directory=r"./templates")

@app.get("/")
def get(request:Request):

    #Load up the data from the csv file and return only the first 5
    data=load_zahlentech_solutions(5)
    return templates.TemplateResponse('index.html', {'request': request, 'data': data})

@app.get("/builder")
def get(request:Request):
    return templates.TemplateResponse('form.html',{'request':request})

@app.post("/builder")
async def print_form_data(
    name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    business_name: str = Form(...),
    facebook: str = Form('#'),
    linkedin: str = Form('#'),
    twitter: str = Form('#'),
    instagram: str = Form('#')
):
    # Print form data to console
    print(f"Name: {name}")
    print(f"Phone: {phone}")
    print(f"Email: {email}")
    print(f"Business Name: {business_name}")
    print(f"Facebook: {facebook}")
    print(f"LinkedIn: {linkedin}")
    print(f"Twitter: {twitter}")
    print(f"Instagram: {instagram}")
    
    # Return a confirmation message to the user
    return {"message": "Form data received and printed successfully!"}

    
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