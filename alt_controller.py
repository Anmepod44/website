from models import *

# Create a Department instance
department = Department(serial_no="12345", name="Finance")

# Create Feature instances
feature1 = Features(name="Feature 1", description="Feature 1 Description", image="feature1.png", cta="Call to Action 1")
feature2 = Features(name="Feature 2", description="Feature 2 Description", image="feature2.png", cta="Call to Action 2")

# Create a Product instance
product = Product(
    name="Product 1",
    image="product1.png",
    description="Product Description",
    department=department,
    features=[feature1, feature2]
)


# Create a Package instance
package = Package(
    name="Package 1",
    image="package1.png",
    description="Package Description",
    products=[product]
)

# Save the Package to Redis
package.save()