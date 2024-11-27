import boto3
from botocore.exceptions import ClientError
import json
import random
import string
import os
import mimetypes

# Import the HTML modification function from the other module dede
from html_modifier import modify_and_save_html

def generate_random_bucket_name(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def create_s3_bucket(bucket_name, region=None):
    try:
        if region is None:
            s3_client = boto3.client('s3')
            s3_client.create_bucket(Bucket=bucket_name)
        else:
            s3_client = boto3.client('s3', region_name=region)
            s3_client.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={'LocationConstraint': region})
        print(f"Bucket {bucket_name} created.")
    except ClientError as e:
        print(f"Error creating bucket: {e}")
        return False
    return True

def disable_public_access_block(bucket_name):
    s3_client = boto3.client('s3')
    try:
        s3_client.put_public_access_block(
            Bucket=bucket_name,
            PublicAccessBlockConfiguration={
                'BlockPublicAcls': False,
                'IgnorePublicAcls': False,
                'BlockPublicPolicy': False,
                'RestrictPublicBuckets': False
            }
        )
        print(f"Public access block disabled for {bucket_name}.")
    except ClientError as e:
        print(f"Error disabling public access block: {e}")
        return False
    return True

def upload_folder_to_s3(bucket_name, folder_path):
    """Upload an entire folder to an S3 bucket, with content type set based on the file extension"""
    s3_client = boto3.client('s3')
    try:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                object_name = os.path.relpath(file_path, folder_path)

                # Automatically detect the content type
                content_type, _ = mimetypes.guess_type(file_path)

                # Default to 'text/html' if the content type cannot be determined
                if content_type is None:
                    content_type = 'text/html'

                # Upload the file with the determined content type
                with open(file_path, 'rb') as f:
                    s3_client.upload_fileobj(f, bucket_name, object_name, ExtraArgs={'ContentType': content_type})
                
                print(f"File {file_path} uploaded to {bucket_name}/{object_name} with content type {content_type}.")
    except ClientError as e:
        print(f"Error uploading folder: {e}")
        return False
    return True

def set_s3_bucket_policy(bucket_name):
    s3_client = boto3.client('s3')
    bucket_policy = {
        'Version': '2012-10-17',
        'Statement': [{
            'Effect': 'Allow',
            'Principal': '*',
            'Action': 's3:GetObject',
            'Resource': f'arn:aws:s3:::{bucket_name}/*'
        }]
    }
    try:
        s3_client.put_bucket_policy(Bucket=bucket_name, Policy=json.dumps(bucket_policy))
        print(f"Bucket policy updated for {bucket_name} to allow public access.")
    except ClientError as e:
        print(f"Error updating bucket policy: {e}")
        return False
    return True

def enable_static_website_hosting(bucket_name):
    s3_client = boto3.client('s3')
    website_configuration = {
        'IndexDocument': {'Suffix': 'index.html'},
        'ErrorDocument': {'Key': 'error.html'}
    }
    try:
        s3_client.put_bucket_website(Bucket=bucket_name, WebsiteConfiguration=website_configuration)
        print(f"Static website hosting enabled for {bucket_name}.")
    except ClientError as e:
        print(f"Error enabling static website hosting: {e}")
        return False
    return True

def get_website_url(bucket_name):
    return f"http://{bucket_name}.s3-website.{boto3.Session().region_name}.amazonaws.com/"