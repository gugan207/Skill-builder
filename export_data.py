import urllib.request
import urllib.error
import json
import csv
import sys
from datetime import datetime

# Supabase Configuration
SUPABASE_URL = 'https://qvdsyvqjckpbegyhzeyi.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZHN5dnFqY2twYmVneWh6ZXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzgyOTQsImV4cCI6MjA5MjQ1NDI5NH0.J-jlxJLDvUHFWHhVH0VDOiRkfSQ6x4S1PrN5RxPCMiY'

headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json'
}

def fetch_table_data(table_name):
    """Fetches all rows from a specified Supabase table using the REST API."""
    url = f'{SUPABASE_URL}/rest/v1/{table_name}?select=*'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read().decode('utf-8')
            return json.loads(data)
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code} while fetching '{table_name}'. Message: {e.reason}")
        return None
    except Exception as e:
        print(f"Unexpected error while fetching '{table_name}': {e}")
        return None

def main():
    print("=" * 60)
    print("MIT Skill Builder - Advanced Data Exporter")
    print("=" * 60)
    print("Fetching user profiles and progress data from the cloud...")

    profiles = fetch_table_data('profiles')
    progress = fetch_table_data('user_progress')

    if profiles is None or progress is None:
        print("\nERROR: Failed to retrieve data from the server.")
        print("Please ensure that you have run the RLS bypass policies in the Supabase SQL editor:")
        print("  CREATE POLICY \"Allow read all profiles\" ON public.profiles FOR SELECT USING (true);")
        print("  CREATE POLICY \"Allow read all progress\" ON public.user_progress FOR SELECT USING (true);")
        sys.exit(1)

    if not profiles:
        print("\nNo user profiles found in the database.")
        sys.exit(0)

    print(f"Successfully retrieved {len(profiles)} user profiles.")

    # Map user progress to their IDs for O(1) lookup
    progress_map = {p['user_id']: p for p in progress} if progress else {}

    export_rows = []
    
    for user in profiles:
        user_id = user.get('id')
        user_prog = progress_map.get(user_id, {})
        
        # Parse solved questions (Supabase might return stringified JSON or native list)
        solved_raw = user_prog.get('solved_questions', [])
        if isinstance(solved_raw, str):
            try:
                solved_questions = json.loads(solved_raw)
            except json.JSONDecodeError:
                solved_questions = []
        else:
            solved_questions = solved_raw if isinstance(solved_raw, list) else []
            
        # Calculate points per week (Weeks 1 through 5)
        points = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 'total': 0}
        for q in solved_questions:
            parts = str(q).split('-')
            if len(parts) == 2:
                try:
                    week = int(parts[0])
                    if week in points:
                        points[week] += 1
                        points['total'] += 1
                except ValueError:
                    pass # Ignore malformed question IDs
        
        # Format dates robustly
        joined_raw = user.get('created_at', '')
        joined_date = joined_raw.split('T')[0] if joined_raw else 'Unknown'
        
        updated_raw = user_prog.get('updated_at', '')
        last_active = updated_raw.split('T')[0] if updated_raw else 'Never'
            
        export_rows.append({
            'User ID': user_id,
            'Name': user.get('full_name', 'Unknown') or 'Unknown',
            'Email': user.get('email', 'Unknown') or 'Unknown',
            'Week 1 Points': points[1],
            'Week 2 Points': points[2],
            'Week 3 Points': points[3],
            'Week 4 Points': points[4],
            'Week 5 Points': points[5],
            'Total Points': points['total'],
            'Joined Date': joined_date,
            'Last Active': last_active
        })

    # Sort users primarily by Total Points (descending), then alphabetically by Name
    export_rows.sort(key=lambda x: (x['Total Points'], x['Name']), reverse=True)

    # Generate timestamped filename to prevent overwriting
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f'SkillBuilder_Advanced_Export_{timestamp}.csv'

    print(f"\nFormatting data and generating CSV file: {filename}")
    
    fieldnames = [
        'User ID', 'Name', 'Email', 
        'Week 1 Points', 'Week 2 Points', 'Week 3 Points', 
        'Week 4 Points', 'Week 5 Points', 'Total Points', 
        'Joined Date', 'Last Active'
    ]
    
    try:
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(export_rows)
        print("SUCCESS: Data export completed.")
        print(f"You can now open '{filename}' in Microsoft Excel or Google Sheets.")
    except Exception as e:
        print(f"\nERROR: Failed to write to file {filename}.")
        print(f"Details: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
