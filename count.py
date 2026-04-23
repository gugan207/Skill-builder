import PyPDF2
reader = PyPDF2.PdfReader('MIT-Skill Builder Q & A.pdf')
text = ""
for page in reader.pages:
    text += page.extract_text() or ""
import re
print("Occurrences of 'Input 1':", len(re.findall(r'(?i)Input\s*1', text)))
print("Occurrences of 'Output 1':", len(re.findall(r'(?i)Output\s*1', text)))
print("Occurrences of 'Solution':", len(re.findall(r'(?i)Solution', text)))
