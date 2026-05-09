"""
MIT Skill Builder — Question Counter v2.0
Parses questions.js and displays a breakdown of all questions.
"""
import re
import os

def main():
    filepath = os.path.join(os.path.dirname(__file__), 'questions.js')
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count coding questions per week
    coding_weeks = re.findall(r"\{week:(\d+),\s*num:(\d+),\s*title:", content)
    # Count MCQ questions per week
    mcq_weeks = re.findall(r"\{week:(\d+),\s*num:(\d+),\s*type:'mcq'", content)

    # Build per-week counts
    coding_by_week = {}
    for week, _ in coding_weeks:
        w = int(week)
        coding_by_week[w] = coding_by_week.get(w, 0) + 1

    mcq_by_week = {}
    for week, _ in mcq_weeks:
        w = int(week)
        mcq_by_week[w] = mcq_by_week.get(w, 0) + 1

    all_weeks = sorted(set(list(coding_by_week.keys()) + list(mcq_by_week.keys())))

    print("=" * 55)
    print("  MIT Skill Builder — Question Summary v2.0")
    print("=" * 55)
    print(f"  {'Week':<8} {'Coding':<10} {'MCQ':<10} {'Total':<10}")
    print("-" * 55)

    total_coding = 0
    total_mcq = 0
    for w in all_weeks:
        c = coding_by_week.get(w, 0)
        m = mcq_by_week.get(w, 0)
        total_coding += c
        total_mcq += m
        print(f"  Week {w:<4} {c:<10} {m:<10} {c + m:<10}")

    grand_total = total_coding + total_mcq
    print("-" * 55)
    print(f"  {'TOTAL':<8} {total_coding:<10} {total_mcq:<10} {grand_total:<10}")
    print("=" * 55)

if __name__ == '__main__':
    main()
