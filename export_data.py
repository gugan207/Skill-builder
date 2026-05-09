import urllib.request
import urllib.error
import json
import csv
import sys
from datetime import datetime

# Supabase Configuration
SUPABASE_URL = 'https://qvdsyvqjckpbegyhzeyi.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZHN5dnFqY2twYmVneWh6ZXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzgyOTQsImV4cCI6MjA5MjQ1NDI5NH0.J-jlxJLDvUHFWHhVH0VDOiRkfSQ6x4S1PrN5RxPCMiY'

# Question counts per week (coding + MCQ)
WEEK_CODING = {1: 5, 2: 5, 3: 5, 4: 5, 5: 4}   # 24 coding total
WEEK_MCQ    = {1: 20, 2: 20, 3: 20, 4: 20, 5: 10}  # 90 MCQ total
TOTAL_QUESTIONS = 114

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
    except urllib.error.URLError as e:
        if 'getaddrinfo failed' in str(e.reason):
            print(f"DNS Resolution Error: Could not connect to Supabase. Your project '{SUPABASE_URL}' might be paused or deleted.")
            print("Please log in to the Supabase dashboard (https://supabase.com/dashboard) and restore your project.")
        else:
            print(f"URL Error while fetching '{table_name}': {e.reason}")
        return None
    except Exception as e:
        print(f"Unexpected error while fetching '{table_name}': {e}")
        return None

def main():
    print("=" * 60)
    print("MIT Skill Builder - Advanced Data Exporter v2.0")
    print(f"Total Questions: {TOTAL_QUESTIONS} (24 Coding + 90 MCQ)")
    print("=" * 60)
    print("Fetching user profiles and progress data from the cloud...")

    profiles = fetch_table_data('profiles')
    progress = fetch_table_data('user_progress')

    if profiles is None or progress is None:
        print("\nERROR: Failed to retrieve data from the server.")
        print("This could be due to your Supabase project being paused/offline, or missing RLS policies.")
        print("If your project is active, please ensure you have run the RLS bypass policies in the Supabase SQL editor:")
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
            
        # Calculate points per week — coding and MCQ separately
        coding_pts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        mcq_pts    = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        
        for q in solved_questions:
            q_str = str(q)
            if q_str.startswith('mcq-'):
                # MCQ format: mcq-week-num
                parts = q_str.split('-')
                if len(parts) == 3:
                    try:
                        week = int(parts[1])
                        if week in mcq_pts:
                            mcq_pts[week] += 1
                    except ValueError:
                        pass
            else:
                # Coding format: week-num
                parts = q_str.split('-')
                if len(parts) == 2:
                    try:
                        week = int(parts[0])
                        if week in coding_pts:
                            coding_pts[week] += 1
                    except ValueError:
                        pass
        
        total_coding = sum(coding_pts.values())
        total_mcq = sum(mcq_pts.values())
        grand_total = total_coding + total_mcq
        completion = round((grand_total / TOTAL_QUESTIONS) * 100, 1) if TOTAL_QUESTIONS > 0 else 0
        
        # Format dates robustly
        joined_raw = user.get('created_at', '')
        joined_date = joined_raw.split('T')[0] if joined_raw else 'Unknown'
        
        updated_raw = user_prog.get('updated_at', '')
        last_active = updated_raw.split('T')[0] if updated_raw else 'Never'
            
        export_rows.append({
            'Name': user.get('full_name', 'Unknown') or 'Unknown',
            'Email': user.get('email', 'Unknown') or 'Unknown',
            'W1 Coding': f"{coding_pts[1]}/{WEEK_CODING[1]}",
            'W1 MCQ': f"{mcq_pts[1]}/{WEEK_MCQ[1]}",
            'W2 Coding': f"{coding_pts[2]}/{WEEK_CODING[2]}",
            'W2 MCQ': f"{mcq_pts[2]}/{WEEK_MCQ[2]}",
            'W3 Coding': f"{coding_pts[3]}/{WEEK_CODING[3]}",
            'W3 MCQ': f"{mcq_pts[3]}/{WEEK_MCQ[3]}",
            'W4 Coding': f"{coding_pts[4]}/{WEEK_CODING[4]}",
            'W4 MCQ': f"{mcq_pts[4]}/{WEEK_MCQ[4]}",
            'W5 Coding': f"{coding_pts[5]}/{WEEK_CODING[5]}",
            'W5 MCQ': f"{mcq_pts[5]}/{WEEK_MCQ[5]}",
            'Total Coding': f"{total_coding}/24",
            'Total MCQ': f"{total_mcq}/90",
            'Grand Total': f"{grand_total}/{TOTAL_QUESTIONS}",
            'Completion %': f"{completion}%",
            'Joined Date': joined_date,
            'Last Active': last_active
        })

    # Sort users primarily by grand total (descending), then alphabetically by Name
    def sort_key(x):
        total = int(x['Grand Total'].split('/')[0])
        return (-total, x['Name'])
    export_rows.sort(key=sort_key)

    # Add S.No and Rank after sorting
    for i, row in enumerate(export_rows, 1):
        row['S.No'] = i
        row['Rank'] = i

    # Generate timestamped filename to prevent overwriting
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f'SkillBuilder_Export_v2_{timestamp}.csv'

    print(f"\nFormatting data and generating CSV file: {filename}")
    
    fieldnames = [
        'S.No', 'Rank', 'Name', 'Email', 
        'W1 Coding', 'W1 MCQ', 'W2 Coding', 'W2 MCQ',
        'W3 Coding', 'W3 MCQ', 'W4 Coding', 'W4 MCQ',
        'W5 Coding', 'W5 MCQ',
        'Total Coding', 'Total MCQ', 'Grand Total', 'Completion %',
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
