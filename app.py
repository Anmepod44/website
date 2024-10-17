from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi.requests import Request
from fastapi import Form
from builder import create_and_deploy_website
from html_modifier import modify_personal_site_html, modify_portfolio_site_html

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
async def deploy_website(request: Request):
    # Parse the incoming JSON data
    data = await request.json()

    # Extract form data
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    business_name = data.get('business_name')
    cta_links = {
        "facebook": data.get('facebook', '#'),
        "linkedin": data.get('linkedin', '#'),
        "twitter": data.get('twitter', '#'),
        "instagram": data.get('instagram', '#')
    }

    # Paths for the HTML and folder (you can customize these paths or use defaults)
    input_html = 'projects/portfolio/index.html'  # Original HTML file
    modified_html = 'projects/personal/modified_index.html'  # Modified HTML file
    folder_path = 'projects/personal'  # Folder with website files

    # AWS region (optional)
    region = "eu-north-1"

    # Modify the HTML for the personal site (you can customize which site to deploy)
    modify_personal_site_html(input_html, modified_html, name, phone, email, business_name, cta_links)

    # Deploy the website
    website_url = create_and_deploy_website(name, phone, email, business_name, cta_links, input_html, modified_html, folder_path, region)

    # Check if the deployment was successful and return the website URL
    if website_url:
        return {"message": website_url}
    else:
        return {"message": "Website deployment failed."}

    
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