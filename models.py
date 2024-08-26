from typing import Optional

from pydantic import EmailStr

from redis_om import (
    Field,
    HashModel,
    get_redis_connection,
    JsonModel,
    EmbeddedJsonModel,
    Migrator
)

redis = get_redis_connection(host="redis",port=6379)

class Department(EmbeddedJsonModel):
    serial_no:str
    name:str

    class Meta:
        database = redis

class Features(EmbeddedJsonModel):
    name:str=Field(index=True)
    description:str
    image:str
    cta:str

    class Meta:
        database = redis


class Product(JsonModel):
    name:str=Field(index=True)
    image:str
    description:str
    department:Department
    features:list[Features]

    class Meta:
        database = redis


class Package(JsonModel):
    name:str=Field(index=True)
    image:str
    description:str
    products:list[Product]

    class Meta:
        database = redis

        
from datetime import datetime

# Sample data for populating the schema

# Product features
feature1 = Features(name="Unified Search Experience", 
                    description="Transformative AI Power: Amazon Q Business leverages generative AI to unify data from over 40 secure connectors, offering a seamless search experience across various enterprise applications and document repositories.",
                    image="analytics.png", 
                    cta="Learn More")

feature2 = Features(name="Task Automation with Amazon Q Apps", 
                    description="Streamlined Productivity: Employees can create AI-powered apps effortlessly by conversing with the system or describing their needs, significantly boosting individual and team productivity.",
                    image="analytics.png", 
                    cta="Learn More")

feature3 = Features(name="App Sharing and Discovery", 
                    description="Promoting Collaboration: Employees can share and publish their custom-built apps in a central library, facilitating easy discovery and use by others, thus reducing redundant efforts and fostering best practices across the organization.",
                    image="analytics.png", 
                    cta="Learn More")

feature4 = Features(name="Enhanced Security and Privacy", 
                    description="Role-Based Permissions and Topic Filters maintain security, privacy, and consistency by aligning data access with user permissions and blocking specific topics.",
                    image="analytics.png", 
                    cta="Learn More")

feature5 = Features(name="Generative BI Capabilities", 
                    description="Simplified Data Exploration: In Amazon QuickSight, Amazon Q offers a generative AI assistant that provides multi-visual responses and data previews, empowering business users to gain insights beyond traditional dashboards.",
                    image="analytics.png", 
                    cta="Learn More")

feature6 = Features(name="Integration Capabilities", 
                    description="Office 365 and CRM Integration: Allows seamless access and management of emails, calendars, documents, and customer data through Amazon Q Business.",
                    image="analytics.png", 
                    cta="Learn More")

feature7 = Features(name="Integration Capabilities", 
                    description="Office 365 and CRM Integration: Allows seamless access and management of emails, calendars, documents, and customer data through Amazon Q Business.",
                    image="analytics.png", 
                    cta="Learn More")

# Products
product1 = Product(name="Amazon Q", 
                   image="https://assets.aboutamazon.com/dims4/default/f12650b/2147483647/strip/true/crop/1999x1000+0+0/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F95%2Fbc%2Fb88478784cc19cf09c627968cc06%2Faa-apr2024-amazonq-standard-hero-v5-2000x1125-1.jpg", 
                   description="""Your employees spend countless hours sifting through emails, documents, and online resources, trying to find the information they need. This information overload is a common issue for many businesses, leading to wasted time, frustrated employees, and reduced productivity.
                                But what if there was a way to give your team a smart assistant that could answer questions, create content, and find valuable insights from your data? Introducing Amazon Q AI Solutions, a cutting-edge AI solution designed to revolutionize your workplace.Amazon Q Business uses advanced artificial intelligence to make information easy to access, automate tasks, and promote data-driven decision-making. This leads to significant improvements in efficiency and helps your team reach its full potential.Amazon Q Business is a secure AI assistant designed to boost productivity by transforming how you access and use information. It connects seamlessly to your enterprise data sources to answer questions, create content, and uncover valuable insights.""", 
                   department=Department(serial_no="D001", name="Storage Solutions"), 
                   features=[feature1, feature2, feature3, feature4, feature5, feature6, feature7])


# Packages
package1 = Package(
            name="Bronze", 
            image='https://assets.aboutamazon.com/dims4/default/f12650b/2147483647/strip/true/crop/1999x1000+0+0/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F95%2Fbc%2Fb88478784cc19cf09c627968cc06%2Faa-apr2024-amazonq-standard-hero-v5-2000x1125-1.jpg', 
            description="""The Bronze Package is tailored for small businesses aiming to enhance productivity and streamline operations. This package includes essential office software tools for communication, collaboration, and task management. Features encompass cloud-based email, document storage, and sharing, project management applications, and basic CRM capabilities. It provides secure access to critical business data from any location, fostering a flexible and efficient work environment. Designed to be cost-effective, the Bronze Package ensures small businesses have the foundational technology to compete and grow, with scalable options available as business needs evolve.""", 
            products=[product1])

# package1.save()