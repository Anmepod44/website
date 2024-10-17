import re

def modify_personal_site_html(input_file_path, output_file_path, name, phone, email, business_name, cta_links=None):
    """
    Modify the personal site HTML template.
    """
    modify_and_save_html(input_file_path, output_file_path, name, phone, email, business_name, cta_links)


def modify_portfolio_site_html(input_file_path, output_file_path, name, phone, email, business_name, cta_links=None):
    """
    Modify the portfolio site HTML template.
    """
    modify_and_save_html(input_file_path, output_file_path, name, phone, email, business_name, cta_links)


def convert_to_camel_case(text):
    """
    Convert a string to Camel Case.
    """
    # Split the text into words, capitalize each, and join them back together
    words = re.split(r'\s+', text)
    camel_case_text = ''.join(word.capitalize() for word in words)
    return camel_case_text


def modify_and_save_html(input_file_path, output_file_path, name, phone, email, business_name, cta_links=None):
    """
    Generic function to modify the HTML content.
    """
    # Set default social media URLs if none are provided
    default_cta_links = {
        "facebook": "#",
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "youtube": "#",
        "pinterest": "#"
    }

    if cta_links is None:
        cta_links = default_cta_links
    else:
        cta_links = {**default_cta_links, **cta_links}

    # Read the original HTML file
    with open(input_file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Convert business name to Camel Case for the title
    camel_case_business_name = convert_to_camel_case(business_name)

    # Replace placeholders in the HTML file with the provided details
    modified_html = html_content.replace('Ariana', name) \
                                .replace('+96 56-85-1379', phone) \
                                .replace('contact@robert.com', email) \
                                .replace('Wpshopmart', business_name)

    # Replace CTA links
    modified_html = modified_html.replace('<a href="#"><ion-icon name="logo-facebook"></ion-icon></a>', f'<a href="{cta_links["facebook"]}"><ion-icon name="logo-facebook"></ion-icon></a>') \
                                 .replace('<a href="#"><ion-icon name="logo-twitter"></ion-icon></a>', f'<a href="{cta_links["twitter"]}"><ion-icon name="logo-twitter"></ion-icon></a>') \
                                 .replace('<a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>', f'<a href="{cta_links["linkedin"]}"><ion-icon name="logo-linkedin"></ion-icon></a>') \
                                 .replace('<a href="#"><ion-icon name="logo-instagram"></ion-icon></a>', f'<a href="{cta_links["instagram"]}"><ion-icon name="logo-instagram"></ion-icon></a>')

    # Replace the <title> tag content with the Camel Case business name
    modified_html = re.sub(r'<title>.*?</title>', f'<title>{camel_case_business_name}</title>', modified_html)

    # Save the modified HTML to a new file
    with open(output_file_path, 'w', encoding='utf-8') as file:
        file.write(modified_html)

    print(f"Modified HTML saved to {output_file_path}")
