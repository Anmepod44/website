import os
from s3_uploader import (
    generate_random_bucket_name, create_s3_bucket, disable_public_access_block, upload_folder_to_s3,
    set_s3_bucket_policy, enable_static_website_hosting, get_website_url
)
from html_modifier import modify_and_save_html

def create_and_deploy_website(name, phone, email, business_name, cta_links, input_html, modified_html, folder_path, region="eu-north-1"):
    """
    Creates an S3 bucket, modifies an HTML file with user data, uploads the site to S3, 
    and enables static website hosting. Returns the URL of the website.
    
    :param name: Name to replace in the HTML file
    :param phone: Phone number to replace in the HTML file
    :param email: Email to replace in the HTML file
    :param business_name: Business name to replace in the HTML file
    :param cta_links: Dictionary of CTA (Call to Action) links (optional)
    :param input_html: Path to the input HTML file
    :param modified_html: Path to save the modified HTML file
    :param folder_path: Path to the folder containing website files for S3 upload
    :param region: AWS region for S3 bucket
    :return: URL of the hosted static website
    """
    try:
        # Modify the HTML file before uploading
        modify_and_save_html(input_html, modified_html, name, phone, email, business_name, cta_links)

        # Generate a random bucket name
        bucket_name = generate_random_bucket_name()
    
        print(f"Generated bucket name: {bucket_name}")

        # Step 1: Create the S3 bucket
        if not create_s3_bucket(bucket_name, region):
            raise Exception("Bucket creation failed.")

        # Step 2: Disable public access block
        if not disable_public_access_block(bucket_name):
            raise Exception("Disabling public access block failed.")

        # Step 3: Upload the modified folder to S3
        if not upload_folder_to_s3(bucket_name, folder_path):
            raise Exception("Folder upload failed.")

        # Step 4: Set bucket policy for public access
        if not set_s3_bucket_policy(bucket_name):
            raise Exception("Setting bucket policy failed.")

        # Step 5: Enable static website hosting
        if not enable_static_website_hosting(bucket_name):
            raise Exception("Enabling static website hosting failed.")

        # Step 6: Return the website URL
        website_url = get_website_url(bucket_name)
        return website_url

    except Exception as e:

        print(f"Error: builder {e}")
        return None