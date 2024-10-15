import csv

def load_zahlentech_solutions(n:int):
    BASE = 'products/' 
    csv_file_name = 'solutions.csv'  # Just the file name
    solutions_list = []
    csv_file_path = BASE + csv_file_name  # Construct the full path using BASE
    
    # Open the CSV file and read its content
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)  # Create a CSV DictReader to read rows as dictionaries
        
        for index,row in enumerate(reader):
            if index==n:
                break
            solutions_list.append(row)  # Append each row (dictionary) to the list
            
    return solutions_list