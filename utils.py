import csv
import random

def load_zahlentech_solutions(n: int):
    BASE = 'products/' 
    csv_file_name = 'solutions.csv'  # Just the file name
    csv_file_path = BASE + csv_file_name  # Construct the full path using BASE
    solutions_list = []
    
    # Open the CSV file and read its content
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = list(csv.DictReader(file))  # Convert the CSV reader to a list of dictionaries
        
        # Check if n is greater than the available number of rows to avoid error
        if n > len(reader):
            n = len(reader)
        
        # Randomly sample n rows from the file
        selected_rows = random.sample(reader, n)
        solutions_list.extend(selected_rows)  # Append the randomly selected rows to the list
    
    return solutions_list