const questions=[
{week:1,num:1,title:"Fruit counter",desc:"Sita wants to count the number of fruits she has: apples, bananas, and cherries. Declare variables to store these quantities and print each with an appropriate message.\n\n• apples (integer): stores number of apples, 10\n• bananas (integer): stores number of bananas, 20\n• cherries (integer): stores number of cherries, 30",
inputFmt:"No console input.",
outputFmt:"Line 1: \"Number of apples is <apples>\"\nLine 2: \"Number of bananas is <bananas>\"\nLine 3: \"Number of cherries is <cherries>\"",
hint:"Use integer variables and f-strings: print(f'Number of apples is {apple}')",
tests:[{input:"",expected:"Number of apples is 10\nNumber of bananas is 20\nNumber of cherries is 30"}],
solution:`apple = 10\nbanana = 20\ncherries = 30\nprint(f"Number of apples is {apple}")\nprint(f"Number of bananas is {banana}")\nprint(f"Number of cherries is {cherries}")`},

{week:1,num:2,title:"Personal details",desc:"Alice wants to share her personal details: name, age, and city of residence. Declare variables to store this information and print each detail on a new line with a descriptive message.\n\n• name (string): stores Alice's name, \"Alice\"\n• age (integer): stores Alice's age, 25\n• city (string): stores Alice's city, \"Delhi\"",
inputFmt:"No console input.",
outputFmt:"Line 1: \"Name is <name>\"\nLine 2: \"Age is <age>\"\nLine 3: \"City is <city>\"",
hint:"Use string and int variables: name='Alice', age=25, city='Delhi'",
tests:[{input:"",expected:"Name is Alice\nAge is 25\nCity is Delhi"}],
solution:`name = "Alice"\nage = 25\ncity = "Delhi"\nprint(f"Name is {name}")\nprint(f"Age is {age}")\nprint(f"City is {city}")`},

{week:1,num:3,title:"Boolean statuses",desc:"John's user profile tracks three boolean statuses: whether the user is active, an admin, and verified. Declare boolean variables to store these statuses and print each status with a descriptive message.\n\n• is_active (boolean): True\n• is_admin (boolean): False\n• is_verified (boolean): True",
inputFmt:"No console input.",
outputFmt:"Line 1: \"User active status is <is_active>\"\nLine 2: \"User admin status is <is_admin>\"\nLine 3: \"User verified status is <is_verified>\"",
hint:"In Python booleans are True/False (capital). Use f-strings to print them.",
tests:[{input:"",expected:"User active status is True\nUser admin status is False\nUser verified status is True"}],
solution:`is_active = True\nis_admin = False\nis_verified = True\nprint(f"User active status is {is_active}")\nprint(f"User admin status is {is_admin}")\nprint(f"User verified status is {is_verified}")`},

{week:1,num:4,title:"Triangle classifier",desc:"Fazil needs a triangle classification program. Given the lengths of the sides of a triangle (side1, side2, and side3), determine whether the triangle is Equilateral, Isosceles, or Scalene.\n\n• If all sides are equal → Equilateral\n• If exactly two sides are equal → Isosceles\n• If all sides are different → Scalene",
inputFmt:"Line 1: float A (first side)\nLine 2: float B (second side)\nLine 3: float C (third side)",
outputFmt:"\"The triangle is classified as X\" where X is Equilateral, Isosceles, or Scalene.",
hint:"Check: if A==B==C → Equilateral; elif A==B or B==C or A==C → Isosceles; else Scalene",
tests:[{input:"90.0\n90.0\n90.0",expected:"The triangle is classified as Equilateral"},{input:"4.5\n4.5\n6.8",expected:"The triangle is classified as Isosceles"},{input:"12.3\n15.7\n17.8",expected:"The triangle is classified as Scalene"}],
solution:`A = float(input())\nB = float(input())\nC = float(input())\n\nif A==B and B==C and C==A:\n    print("The triangle is classified as Equilateral")\nelif A==B or B==C or A==C:\n    print("The triangle is classified as Isosceles")\nelse:\n    print("The triangle is classified as Scalene")`},

{week:1,num:5,title:"Zodiac sign",desc:"Banu is an astrologer who wants to determine zodiac signs based on birthdates.\n\nZodiac Sign Ranges:\n• Aries: March 21 – April 19\n• Taurus: April 20 – May 20\n• Gemini: May 21 – June 20\n• Cancer: June 21 – July 22\n• Leo: July 23 – August 22\n• Other: For dates outside of the above ranges",
inputFmt:"Line 1: integer representing the day of birth (1–31)\nLine 2: string representing the month of birth",
outputFmt:"\"Your zodiac sign is <sign>\"",
hint:"Check month and day ranges: Aries = March 21–April 19, Taurus = April 20–May 20, etc.",
tests:[{input:"15\nApril",expected:"Your zodiac sign is Aries"},{input:"2\nMay",expected:"Your zodiac sign is Taurus"},{input:"21\nJune",expected:"Your zodiac sign is Cancer"},{input:"30\nJuly",expected:"Your zodiac sign is Leo"},{input:"23\nSeptember",expected:"Your zodiac sign is Other"}],
solution:`date = int(input())\nmonth = input()\nprint("Your zodiac sign is",end=" ")\n\nif date >=21 and month == "March" or date<=19 and month=="April":\n    print("Aries")\nelif date >=20 and month == "April" or date<=20 and month=="May":\n    print("Taurus")\nelif date >=21 and month == "May" or date<=20 and month=="June":\n    print("Gemini")\nelif date >=21 and month == "June" or date<=22 and month=="July":\n    print("Cancer")\nelif date >=23 and month == "July" or date<=22 and month=="August":\n    print("Leo")\nelse:\n    print("Other")`},

{week:2,num:1,title:"Digital root",desc:"Alice works at a digital marketing company where she analyzes large datasets. She needs to calculate the digital root of customer ID numbers. The digital root is obtained by repeatedly summing the digits of a number until a single digit remains.\n\nExample: 98675 → 9+8+6+7+5 = 35 → 3+5 = 8\n\nFunction prototype: def digital_root(num)",
inputFmt:"A single integer num.",
outputFmt:"An integer representing the sum of digits until a single digit is obtained.",
hint:"Use a while loop: while num > 9, sum its digits, then repeat.",
tests:[{input:"451110",expected:"3"},{input:"1234",expected:"1"},{input:"98675",expected:"8"}],
solution:`def digital_root(num):\n    sum = 0\n    while num:\n        last = num % 10\n        sum += last\n        num //= 10\n        if sum > 9 and num == 0:\n            num = sum\n            sum = 0\n    return sum\nprint(digital_root(int(input())))`},

{week:2,num:2,title:"Sum of digits",desc:"Sophia is developing a feature for her online banking application that calculates the total sum of digits in customers' account numbers. This sum is used to generate unique verification codes for secure transactions.\n\nFunction Specification: def sum_digits(num)",
inputFmt:"A single integer representing the customer's account number.",
outputFmt:"An integer representing the sum of the digits of the account number.",
hint:"Loop: extract last digit with num%10, add to sum, then num//=10.",
tests:[{input:"123245",expected:"17"},{input:"0",expected:"0"}],
solution:`def sum_digits(num):\n    sum = 0\n    while num:\n        last = num % 10\n        sum += last\n        num //= 10\n    return sum\nprint(sum_digits(int(input())))`},

{week:2,num:3,title:"Net salary",desc:"Sophia manages payroll at a local business where employees are paid based on monthly hours worked. She needs to calculate the monthly salary considering a fixed hourly rate and standard deductions of 15% of the gross salary.\n\nCalculation:\n• gross = hours × rate\n• deductions = gross × 0.15\n• net = gross − deductions",
inputFmt:"Line 1: positive float — number of hours worked\nLine 2: positive float — hourly rate",
outputFmt:"Line 1: \"Hours Worked: {hours:.2f} hours\"\nLine 2: \"Hourly Rate: {rate:.2f} per hour\"\nLine 3: \"Net Salary: {salary:.2f}\"",
hint:"gross = hours * rate; deductions = gross * 0.15; net = gross - deductions. Format to 2 decimal places.",
tests:[{input:"40.00\n12.50",expected:"Hours Worked: 40.00 hours\nHourly Rate: 12.50 per hour\nNet Salary: 425.00"},{input:"80.00\n30.75",expected:"Hours Worked: 80.00 hours\nHourly Rate: 30.75 per hour\nNet Salary: 2091.00"}],
solution:`def calculate_gross_salary(hours_worked, hourly_rate):\n    return hours_worked * hourly_rate\n\ndef calculate_deductions(gross_salary):\n    return gross_salary * 0.15\n\ndef calculate_net_salary(gross_salary, deductions):\n    return gross_salary - deductions\n\ndef print_salary_details(hours_worked, hourly_rate, monthly_salary):\n    print(f"Hours Worked: {hours_worked:.2f} hours")\n    print(f"Hourly Rate: {hourly_rate:.2f} per hour")\n    print(f"Net Salary: {monthly_salary:.2f}")\n\nhours_worked = float(input())\nhourly_rate = float(input())\ngross = calculate_gross_salary(hours_worked, hourly_rate)\ndeductions = calculate_deductions(gross)\nnet = calculate_net_salary(gross, deductions)\nprint_salary_details(hours_worked, hourly_rate, net)`},

{week:2,num:4,title:"Sales tax",desc:"Sarah works at a retail store and needs a program to calculate the total price after adding sales tax. The store applies a fixed sales tax rate of 8% (0.08), defined as a global constant.\n\nFunction Signature: total_cost(item_cost)",
inputFmt:"A single positive floating-point number representing the cost of the item.",
outputFmt:"Line 1: \"Item Cost: {cost:.2f}\"\nLine 2: \"Sales Tax Rate: 8.0%\"\nLine 3: \"Total Cost: {total:.2f}\"",
hint:"total = item_cost * 1.08. Use f-strings with :.2f formatting.",
tests:[{input:"50.00",expected:"Item Cost: 50.00\nSales Tax Rate: 8.0%\nTotal Cost: 54.00"},{input:"100.5",expected:"Item Cost: 100.50\nSales Tax Rate: 8.0%\nTotal Cost: 108.54"}],
solution:`def total_cost(item_cost):\n    total = item_cost + (item_cost * 0.08)\n    print(f"Item Cost: {item_cost:.2f}")\n    print("Sales Tax Rate: 8.0%")\n    print(f"Total Cost: {total:.2f}")\n\nitem_cost = float(input())\ntotal_cost(item_cost)`},

{week:2,num:5,title:"Count vowels",desc:"Arjun is building a text analyzer for his English assignment. He needs to create a function that counts how many vowels (a, e, i, o, u — both lowercase and uppercase) are present in a given string.\n\nFunction Signature: count_vowels(input_string)",
inputFmt:"A single line containing a string.",
outputFmt:"\"Number of vowels in the string: [count]\"",
hint:"Loop through each character and check if it's in 'aeiouAEIOU'.",
tests:[{input:"Hello, World!",expected:"Number of vowels in the string: 3"},{input:"Python is a great programming language.",expected:"Number of vowels in the string: 12"},{input:"APPle",expected:"Number of vowels in the string: 2"}],
solution:`def count_vowels(string):\n    vowels = "aeiouAEIOU"\n    count = 0\n    for i in string:\n        if i in vowels:\n            count +=1\n    print(f"Number of vowels in the string: {count}")\nstring = input()\ncount_vowels(string)`},

{week:3,num:1,title:"Replace characters",desc:"Sarah is a technical writer who needs to format two documents. Both contain a placeholder character that needs to be replaced with another character. She wants both modified documents printed in a single line, separated by a space.",
inputFmt:"Line 1: string1 (first document)\nLine 2: string2 (second document)\nLine 3: char1 (placeholder to replace)\nLine 4: char2 (replacement character)",
outputFmt:"A single line containing modified string1 and string2 separated by a space.",
hint:"Use str.replace(old, new) on both strings, then print with a space between.",
tests:[{input:"Hello\nWorld\no\na",expected:"Hella Warld"},{input:"12345\n45123\n1\n0",expected:"02345 45023"}],
solution:`str1 = input()\nstr2 = input()\n\nR = input()\nN = input()\n\nstr1 = str1.replace(R,N)\nstr2 = str2.replace(R,N)\nprint(str1,str2)`},

{week:3,num:2,title:"Email generator",desc:"John Smith is a new employee at company \"iamNeo\" with the role of admin. Generate an email address using the convention: first letter of first name + last name + domain.\n\n• Admins get: @admin.company.com\n• Other roles get: @company.com",
inputFmt:"Line 1: first_name (string)\nLine 2: last_name (string)\nLine 3: role (string)\nLine 4: company (string)",
outputFmt:"The generated email address: first_letter_of_firstname + lastname + domain",
hint:"name = firstname[0].lower() + lastname.lower(). Check if role == 'admin' for the domain.",
tests:[{input:"John\nSmith\nadmin\niamNeo",expected:"jsmith@admin.iamneo.com"},{input:"Anne\nCuthbert\nIT\niamNeo",expected:"acuthbert@iamneo.com"}],
solution:`firstname = input()\nlastname = input()\nrole = input()\ncompany = input()\n\nname = firstname[0].lower()+lastname.lower()\nif role == "admin":\n    print(f"{name}@{role}.{company.lower()}.com")\nelse:\n    print(f"{name}@{company.lower()}.com")`},

{week:3,num:3,title:"Alternating chars",desc:"Rekha needs to combine two strings by alternating their characters. She has two strings str1 and str2, both of equal length. Create a new string where characters alternate: str1[0]+str2[0]+str1[1]+str2[1]+...",
inputFmt:"Line 1: string str1\nLine 2: string str2 (same length as str1)",
outputFmt:"The concatenated string in alternating character format.",
hint:"Loop with range(len(str1)), concatenate str1[i]+str2[i] each iteration.",
tests:[{input:"abc\ndef",expected:"adbecf"},{input:"140401\n------",expected:"1-4-0-4-0-1-"}],
solution:`str1 = input()\nstr2 = input()\nfor i in range(len(str1)):\n    print(str1[i]+str2[i],end="")`},

{week:3,num:4,title:"Reverse & concat",desc:"Ram wants to create a program that takes two strings as input, reverses the second string, and then concatenates it with the first string.",
inputFmt:"Line 1: first string\nLine 2: second string",
outputFmt:"A string: first string + reversed second string.",
hint:"Use string slicing: str2[::-1] reverses a string in Python.",
tests:[{input:"hello\nword",expected:"hellodrow"},{input:"ram@123\nmailid",expected:"ram@123diliam"}],
solution:`str1 = input()\nstr2 = input()\n\nstr2 = str2[::-1]\nprint(str1+str2)`},

{week:3,num:5,title:"Valid area codes",desc:"Ravi is designing a contact list parser that processes phone numbers in (XXX) XXX-XXXX format. Extract valid area codes.\n\nA phone number is valid only if:\n• Format: (XXX) XXX-XXXX\n• All X positions are digits only\n• Total length is exactly 14 characters",
inputFmt:"Line 1: integer n (number of phone numbers)\nNext n lines: one phone number string each",
outputFmt:"\"Valid area codes: \" followed by comma-separated area codes from valid numbers.",
hint:"Check: s[0]='(' s[4]=')' s[5]=' ', digits at [1:4], [6:9], [10:14]. Length must be 14.",
tests:[{input:"3\n(123) 456-7890\n(abc) 111-2222\n(987) 654-3210",expected:"Valid area codes: 123,987"},{input:"3\n(000) 000-0000\n(999) 999-9999\n(123 456-7890",expected:"Valid area codes: 000,999"}],
solution:`n = int(input())\nvalid = ""\nfor i in range(n):\n    s = input()\n    if s[0] == "(" and s[4] == ")" and s[1:4].isdigit() and s[6:9].isdigit() and s[-4:].isdigit():\n        valid +=s[1:4] +","\n\nprint(f"Valid area codes: {valid.rstrip(',')}")`},

{week:4,num:1,title:"First n primes",desc:"Tom wants to create a dictionary that lists the first n prime numbers, where each key represents the position of the prime number, and the value is the prime number itself.",
inputFmt:"A single integer n — the number of prime numbers to generate.",
outputFmt:"A dictionary where each key is an integer from 1 to n, and the value is the corresponding prime number.\nExample: {1: 2, 2: 3, 3: 5, 4: 7}",
hint:"Check primality by testing divisibility from 2 to num-1. Build dict as {1:2, 2:3, ...}",
tests:[{input:"4",expected:"{1: 2, 2: 3, 3: 5, 4: 7}"}],
solution:`n = int(input())\nd = {}\n\nnum = 2\ncount = 1\n\nwhile count <= n:\n    prime = True\n    for i in range(2,num):\n        if num % i == 0:\n            prime = False\n            break\n\n    if prime:\n        d[count] = num\n        count +=1\n\n    num += 1\nprint(d)`},

{week:4,num:2,title:"Merge expense dicts",desc:"Arjun is a financial analyst managing quarterly expense reports from two departments — Marketing and Operations. He needs to combine both reports into a single consolidated summary.\n\n• For common categories: add the values together\n• For unique categories: retain as-is\n• Keys appear in order they are first encountered",
inputFmt:"Line 1: integer n (pairs in dict1)\nNext 2n lines: key-value pairs for dict1\nNext line: integer m (pairs in dict2)\nNext 2m lines: key-value pairs for dict2",
outputFmt:"\"Combined Dictionary: {key1: value1, key2: value2, ...}\"",
hint:"Start with dict1, then for each key in dict2: if key exists, add values; else insert new key.",
tests:[{input:"2\nhardware\n1000\nmaintenance\n700\n3\nmaintenance\n300\nstationery\n200\ntravel\n500",expected:"Combined Dictionary: {'hardware': 1000, 'maintenance': 1000, 'stationery': 200, 'travel': 500}"}],
solution:`n = int(input())\nd = {}\nfor i in range(n):\n    key = input()\n    value = int(input())\n    d[key] = value\n\nm = int(input())\nfor i in range(m):\n    key = input()\n    value = int(input())\n    if key in d:\n        d[key] += value\n    else:\n        d[key] = value\n\nprint(f"Combined Dictionary: {d}")`},

{week:4,num:3,title:"Min/max order IDs",desc:"Alex manages an online store and needs to analyze customer orders. He wants to identify the smallest and largest order amounts and their corresponding order IDs.",
inputFmt:"Line 1: integer n (number of orders)\nNext 2n lines: alternating order ID (int) and order amount (int)",
outputFmt:"Line 1: \"Smallest Order ID: {id},\"\nLine 2: \"Largest Order ID: {id}\"",
hint:"Track min_amount and max_amount as you read each order.",
tests:[{input:"5\n101\n200\n102\n3000\n103\n100\n104\n20\n105\n500",expected:"Smallest Order ID: 104,\nLargest Order ID: 102"}],
solution:`n = int(input())\nmin_id = max_id = 0\nmin_amount = float("inf")\nmax_amount = float("-inf")\n\nfor i in range(n):\n    id = int(input())\n    amount = int(input())\n\n    if amount < min_amount:\n        min_amount = amount\n        min_id = id\n\n    if amount > max_amount:\n        max_amount = amount\n        max_id = id\n\nprint(f"Smallest Order ID: {min_id},")\nprint(f"Largest Order ID: {max_id}")`},

{week:4,num:4,title:"Warehouse boxes",desc:"At a warehouse, two delivery trucks bring boxes daily. Each truck reports boxes delivered to each section. Compute the element-wise sum and output as a tuple.",
inputFmt:"Line 1: integer n (number of sections)\nLine 2: n integers separated by commas (truck 1)\nLine 3: n integers separated by commas (truck 2)",
outputFmt:"A tuple of integers representing total boxes per section.\nExample: (5, 15, 17, 10, 15)",
hint:"Read both lines, split by comma, zip them together and sum each pair.",
tests:[{input:"5\n3, 8, 12, 4, 6\n2, 7, 5, 6, 9",expected:"(5, 15, 17, 10, 15)"},{input:"3\n0, 20, 10\n5, 15, 25",expected:"(5, 35, 35)"}],
solution:`n = int(input())\ndelivery_box1 = tuple(int(i) for i in input().split(","))\ndelivery_box2 = tuple(int(i) for i in input().split(","))\ntuple = ()\nfor i in range(n):\n    tuple += (delivery_box1[i] + delivery_box2[i],)\n\nprint(tuple)`},

{week:4,num:5,title:"Tuple concat string",desc:"Teju is exploring tuples and their manipulation. She is given a task to transform a list of integers into a tuple and concatenate its elements into a single string.",
inputFmt:"Line 1: integer n (number of elements)\nNext n lines: one integer per line",
outputFmt:"Line 1: tuple in format (element1, element2, ...)\nLine 2: concatenation of all elements as a string",
hint:"Build tuple with +=, build string with str(val). Print both on separate lines.",
tests:[{input:"3\n1\n20\n3",expected:"(1, 20, 3)\n1203"},{input:"5\n10\n20\n40\n5\n70",expected:"(10, 20, 40, 5, 70)\n102040570"}],
solution:`n = int(input())\ntuple = ()\ns = ""\nfor i in range(n):\n    val = int(input())\n    tuple += val,\n    s += str(val)\n\nprint(tuple)\nprint(s)`},

{week:5,num:1,title:"BMI calculator",desc:"A health organization is conducting a Health Check-Up Camp. Develop a program that records participants' details and calculates their BMI.\n\nClass Person methods:\n• bmi(): calculates BMI = weight / height²\n• __str__(): returns string representation of the person",
inputFmt:"Line 1: number of people\nFor each person: name (str), age (int), gender (str), height in meters (float), weight in kg (float)",
outputFmt:"\"Name: <name>, Age: <age>, Gender: <gender>, Height: <height> m, Weight: <weight> kg, BMI: <bmi>\"",
hint:"BMI = weight / height². Round to 2 decimal places.",
tests:[{input:"1\nAlice\n30\nFemale\n1.8\n75",expected:"Name: Alice, Age: 30, Gender: Female, Height: 1.8 m, Weight: 75.0 kg, BMI: 23.15"}],
solution:`class Person:\n    def __init__(self,n,a,g,h,w):\n        self.n = n\n        self.a = a\n        self.g = g\n        self.h = h\n        self.w = w\n\n    def bmi(self):\n        return round(self.w/self.h**2,2)\n\n    def __str__(self):\n        return f"Name: {self.n}, Age: {self.a}, Gender: {self.g}, Height: {self.h} m, Weight: {self.w} kg, BMI: {self.bmi()}"\n\ncount=int(input())\nfor _ in range(count):\n    n=input();a=int(input());g=input();h=float(input());w=float(input())\n    print(Person(n,a,g,h,w))`},

{week:5,num:2,title:"Money addition",desc:"A banking system allows customers to store money in rupees and paisa. When paisa sum exceeds 100, it needs to be converted into rupees. Implement using a class and objects.\n\nClass Money with method add(self, other) to add two amounts.",
inputFmt:"Line 1: two integers — rupees and paisa for first amount\nLine 2: two integers — rupees and paisa for second amount",
outputFmt:"The total sum rounded to two decimal places (e.g. 93.50)",
hint:"Sum paisa. If >= 100, add paisa//100 to rupees and take paisa%100.",
tests:[{input:"50 85\n42 65",expected:"93.50"},{input:"254 45\n845 65",expected:"1100.10"},{input:"54 25\n35 75",expected:"90.00"}],
solution:`class Money:\n    def __init__(self,r,p):\n        self.r = r\n        self.p = p\n\n    def add(self,other):\n        self.rupees = self.r + other.r\n        self.paisa = self.p + other.p\n\n        if self.paisa >= 100:\n            self.rupees += self.paisa // 100\n            self.paisa %=100\n\n        return f"{self.rupees}.{self.paisa:02d}"\n\nr1,p1=map(int,input().split())\nr2,p2=map(int,input().split())\nm1=Money(r1,p1)\nm2=Money(r2,p2)\nprint(m1.add(m2))`},

{week:5,num:3,title:"Count digits",desc:"A digital security firm analyzes numeric codes. Each time a user enters a code, the system must determine how many digits it contains.\n\nClass DigitsOpr with methods:\n• getNum(self): accepts a positive integer\n• countDigits(self): counts and returns the number of digits",
inputFmt:"A single positive integer N.",
outputFmt:"An integer representing the total number of digits in the input.",
hint:"Repeatedly do num//10 until num becomes 0, counting iterations.",
tests:[{input:"12345",expected:"5"},{input:"2",expected:"1"}],
solution:`class DigitsOpr:\n    count = 0\n    def getNum(self,n):\n        while n:\n            n//=10\n            self.count+=1\n\n    def countDigits(self):\n        return self.count\n\nobj = DigitsOpr()\nobj.getNum(int(input()))\nprint(obj.countDigits())`},

{week:5,num:4,title:"Vowel or consonant",desc:"A language learning app helps users understand vowels and consonants. Users enter a single alphabet and the system classifies it.\n\nClass CharacterChecker with method:\n• checkVowelOrConsonant(self, char): checks if vowel or consonant",
inputFmt:"A single alphabet character (uppercase or lowercase).",
outputFmt:"\"The character '<char>' is a consonant\" or \"The character '<char>' is a vowel\"",
hint:"Check if char.lower() is in 'aeiou'. Print with the char in single quotes.",
tests:[{input:"j",expected:"The character 'j' is a consonant"},{input:"E",expected:"The character 'E' is a vowel"}],
solution:`class CharacterChecker:\n    def setCharacter(self,c):\n        self.c = c\n\n    def checkVowelOrConsonant(self):\n        if self.c.lower() in "aeiou":\n            return f"The character '{self.c}' is a vowel"\n        else:\n            return f"The character '{self.c}' is a consonant"\n\nobj = CharacterChecker()\nobj.setCharacter(input())\nprint(obj.checkVowelOrConsonant())`}
];

// ══════════════════════════════════════════════════════════════
//  Week 1 — One Mark MCQ Questions
//  Each question has: id, question text, options[], answer (correct option text)
// ══════════════════════════════════════════════════════════════
const mcqQuestions=[
{week:1,num:1,type:'mcq',
question:"What type of error is characterized by the program running without crashing but producing incorrect results due to flawed logic?",
options:["Syntax error","Runtime error","Logical error","Semantic error"],
answer:"Logical error"},

{week:1,num:2,type:'mcq',
question:"Which of the following is a best practice to prevent syntax errors?",
options:["Writing long functions","Using descriptive variable names","Avoiding the use of comments","Consistently following indentation rules"],
answer:"Consistently following indentation rules"},

{week:1,num:3,type:'mcq',
question:"Which of the following is NOT a valid Python variable name?",
options:["variable_1","varName","def","_myVar"],
answer:"def"},

{week:1,num:4,type:'mcq',
question:"How do you check the Python version installed on your system?",
options:["python --version","python get version","python -v","version python"],
answer:"python --version"},

{week:1,num:5,type:'mcq',
question:"How do you upgrade pip to the latest version?",
options:["pip upgrade","pip install --upgrade pip","python upgrade pip","pip update"],
answer:"pip install --upgrade pip"},

{week:1,num:6,type:'mcq',
question:"Where can you download the official Python installer?",
options:["python-downloads.com","pythonsite.net","python.org","python.com"],
answer:"python.org"},

{week:1,num:7,type:'mcq',
question:"How do you uninstall a package named flask?",
options:["pip delete flask","pip erase flask","pip remove flask","pip uninstall flask"],
answer:"pip uninstall flask"},

{week:1,num:8,type:'mcq',
question:"How can you run a Python script named app.py?",
options:["start python app.py","execute python app.py","python app.py","run app.py"],
answer:"python app.py"},

{week:1,num:9,type:'mcq',
question:"How can you check if pip is installed?",
options:["pip check","pip --version","python pip","pip test"],
answer:"pip --version"},

{week:1,num:10,type:'mcq',
question:"What is the file extension for Python scripts?",
options:[".pys",".pt",".python",".py"],
answer:".py"},

{week:1,num:11,type:'mcq',
question:"What will be the output of the following code?\n\nx = 15\ny = 20\nif x > 10 and y < 25:\n    if x % 5 == 0:\n        print(\"A\")\n    else:\n        print(\"B\")\nelif x < 10:\n    print(\"C\")\nelse:\n    print(\"D\")",
options:["A","B","C","A B"],
answer:"A"},

{week:1,num:12,type:'mcq',
question:"What will be the output of the following code?\n\nscore = 85\ngrade = \"A\" if score >= 90 else \"B\" if score >= 80 else \"C\" if score >= 70 else \"D\"\nresult = \"Pass\" if grade in [\"A\", \"B\", \"C\"] else \"Fail\"\nprint(grade + \"-\" + result)",
options:["B-Fail","A-Pass","C-Pass","B-Pass"],
answer:"B-Pass"},

{week:1,num:13,type:'mcq',
question:"What will be the output of the following code?\n\na = 12\nb = 8\nc = 15\n\nif a > b:\n    if b > c:\n        print(\"X\")\n    elif a > c:\n        print(\"Y\")\n    else:\n        print(\"Z\")\nelse:\n    if c > a:\n        print(\"P\")\n    else:\n        print(\"Q\")",
options:["Q","P","X","Z"],
answer:"Z"},

{week:1,num:14,type:'mcq',
question:"What will be the output of the following code?\n\nnum = 24\nif num % 2 == 0:\n    if num % 4 == 0:\n        if num % 8 == 0:\n            print(\"Multiple of 8\")\n        else:\n            print(\"Multiple of 4\")\n    else:\n        print(\"Multiple of 2\")\nelse:\n    print(\"Odd number\")",
options:["Multiple of 2","Multiple of 1","Multiple of 8","Multiple of 4"],
answer:"Multiple of 8"},

{week:1,num:15,type:'mcq',
question:"What will be the output of the following code?\n\nx = 5\ny = 10\nprint(x > y)",
options:["5","10","True","False"],
answer:"False"},

{week:1,num:16,type:'mcq',
question:"What will be the output of the following code?\n\nprint(bool([]))",
options:["None","Error","True","False"],
answer:"False"},

{week:1,num:17,type:'mcq',
question:"Which of the following expressions will return True?",
options:["bool(0)","bool(None)","bool(\"\")","bool(-5)"],
answer:"bool(-5)"},

{week:1,num:18,type:'mcq',
question:"Which of the following is a valid integer declaration in Python?",
options:["num = \"10\"","num = 10.0","num = 10","num = int(\"10.5\")"],
answer:"num = 10"},

{week:1,num:19,type:'mcq',
question:"What will be the data type of x in the following code?\n\nx = 12.0",
options:["int","float","complex","bool"],
answer:"float"},

{week:1,num:20,type:'mcq',
question:"Which of the following is a valid float value in Python?",
options:["10.5","10","\"10.5\"","True"],
answer:"10.5"},

// ══════════════════════════════════════════════════════════════
//  Week 2 — One Mark MCQ Questions
// ══════════════════════════════════════════════════════════════
{week:2,num:1,type:'mcq',
question:"What will be the output of the following code?\n\nnum = -5\nresult = abs(num)\nprint(result)",
options:["5","-5","0","25"],
answer:"5"},

{week:2,num:2,type:'mcq',
question:"What will be the output of the following code?\n\nnumber = 7\nresult = abs(number) + pow(number, 2)\nprint(result)",
options:["63","56","49","58"],
answer:"56"},

{week:2,num:3,type:'mcq',
question:"What will be the output of the following code?\n\nnum = 16\nresult = pow(num, 0.5)\nprint(result)",
options:["4.0","16.0","256","2.0"],
answer:"4.0"},

{week:2,num:4,type:'mcq',
question:"What will be the output of the following code?\n\nnum1 = 10\nnum2 = -10\nresult = abs(num1) + abs(num2)\nprint(result)",
options:["-20","0","20","10"],
answer:"20"},

{week:2,num:5,type:'mcq',
question:"What will be the output of the following code?\n\ntext = \"Hello, World!\"\nresult = len(text.split())\nprint(result)",
options:["5","6","13","2"],
answer:"2"},

{week:2,num:6,type:'mcq',
question:"What will be the output of the following code?\n\na = 10\nb = -9\nresult = min(a, abs(b))\nprint(result)",
options:["10","-9","0","9"],
answer:"9"},

{week:2,num:7,type:'mcq',
question:"What will be the output of the following code?\n\nvalue = 42\nresult = abs(value) + len(str(value))\nprint(result)",
options:["42","84","44","43"],
answer:"44"},

{week:2,num:8,type:'mcq',
question:"What will be the output of the following code?\n\nx = 2\ny = 3\nresult = max(x, x ** y)\nprint(result)",
options:["8","3","2","9"],
answer:"8"},

{week:2,num:9,type:'mcq',
question:"What is the output of the code shown?\n\ndef f1():\n    global x\n    x+=1\n    print(x)\nx=12\nprint(\"x\")",
options:["Compile time error","13","14","x"],
answer:"x"},

{week:2,num:10,type:'mcq',
question:"What is the output of the code shown below?\n\ndef f1(x):\n    x += 1\n    print(x)\nglobal_variable = 15\nf1(global_variable)\nprint(\"hello\")",
options:["Compile time error","hello","16\nhello","16 hello"],
answer:"16\nhello"},

{week:2,num:11,type:'mcq',
question:"What is the output of the code shown?\n\ndef f():\n    global a\n    print(a)\n    a = \"hello\"\n    print(a)\na = \"world\"\nf()\nprint(a)",
options:["hello hello world","world world hello","hello world world","world hello hello"],
answer:"world hello hello"},

{week:2,num:12,type:'mcq',
question:"What will be the output of the following code?\n\nimport math\nprint(math.ceil(3.4))",
options:["3","4","4.0","3.0"],
answer:"4"},

{week:2,num:13,type:'mcq',
question:"What will be the output of the given code?\n\nimport math\nprint(math.floor(0o10))",
options:["8","10","0","9"],
answer:"8"},

{week:2,num:14,type:'mcq',
question:"What will be the output of the given code?\n\nimport math\nprint(math.isinf(float('-inf')))",
options:["True","error, the minus sign shouldn't have been inside the brackets","error, there is no function called isinf","False"],
answer:"True"},

{week:2,num:15,type:'mcq',
question:"What will be the output of the following code?\n\ndata = [1, 2, 3, 4, 5, 6]\nresult = list(filter(lambda x: x % 2 == 0, data))\nresult = [x * 2 for x in result]\nprint(result)",
options:["[4, 8, 12]","[2, 4, 6, 8, 10, 12]","[2, 4, 6]","[4, 8, 12, 16, 20]"],
answer:"[4, 8, 12]"},

{week:2,num:16,type:'mcq',
question:"What will be the output of the following code?\n\nnumbers = [3, 5, 7, 2, 9]\nresult = list(map(lambda x: x + 5, numbers))\nresult = sorted(result, reverse=True)\nprint(result)",
options:["[14, 12, 11, 9, 7]","[14, 12, 10, 8, 7]","[14, 12, 10, 9, 7]","[4, 8, 12, 16, 20]"],
answer:"[14, 12, 10, 8, 7]"},

{week:2,num:17,type:'mcq',
question:"What will be the output of the following code?\n\ndata = [5, 4, 7, 2, 8]\nresult = list(map(lambda x: x * 2 if x % 2 == 0 else x + 1, data))\nprint(result)",
options:["[10, 8, 14, 4, 16]","[2, 4, 6, 8, 10, 12]","[5, 8, 7, 4, 16]","[6, 8, 8, 4, 16]"],
answer:"[6, 8, 8, 4, 16]"},

{week:2,num:18,type:'mcq',
question:"What will be the output of the following code?\n\nwords = ['hello', 'world', 'python', 'is', 'awesome']\nresult = list(map(lambda word: word.upper(), words))\nresult = sorted(result, key=lambda x: len(x))\nprint(result)",
options:["['HELLO', 'WORLD', 'PYTHON', 'AWESOME', 'IS']","['IS', 'HELLO', 'WORLD', 'AWESOME']","['AWESOME', 'PYTHON', 'WORLD', 'HELLO', 'IS']","['IS', 'HELLO', 'WORLD', 'PYTHON', 'AWESOME']"],
answer:"['IS', 'HELLO', 'WORLD', 'PYTHON', 'AWESOME']"},

{week:2,num:19,type:'mcq',
question:"What will be the output of the following code?\n\nnumbers = [10, 20, 30, 40, 50]\nresult = list(map(lambda x: x // 10, numbers))\nresult = sum(result)\nprint(result)",
options:["6","5","15","10"],
answer:"15"},

{week:2,num:20,type:'mcq',
question:"What will be the output of the following code?\n\nmultiply = lambda x: x * 3\nresult = multiply(5)\nprint(result)",
options:["18","9","12","15"],
answer:"15"},

// ══════════════════════════════════════════════════════════════
//  Week 3 — One Mark MCQ Questions (Strings)
// ══════════════════════════════════════════════════════════════
{week:3,num:1,type:'mcq',
question:"What is the output of the following Python code?\n\nname = \"John\"\nage = 25\nmessage = \"My name is %s and I am %d years old.\" % (name, age)\nprint(message)",
options:["My name is John and I am 25 years old.","My name is John and I am years old.","My name is %s and I am %d years old.","My name is %d and I am %s years old."],
answer:"My name is John and I am 25 years old."},

{week:3,num:2,type:'mcq',
question:"Which of the following is a valid way to use the '%' operator to concatenate strings in Python?",
options:["%s.join(string1, string2)","string1 * %s * string2","\"%s %s\" % (string1, string2)","string1 %s string2"],
answer:"\"%s %s\" % (string1, string2)"},

{week:3,num:3,type:'mcq',
question:"What is the output of the following Python code?\n\nword = \"programming\"\nanswer = word.index(\"gram\")\nprint(answer)",
options:["2","5","3","8"],
answer:"3"},

{week:3,num:4,type:'mcq',
question:"What is the output of the following Python code?\n\ntext = \"Python\"\nresult = text.center(10, \"*\")\nprint(result)",
options:["\"Python\"","*Python","**Python**","Python****"],
answer:"**Python**"},

{week:3,num:5,type:'mcq',
question:"What is the output of the following Python code?\n\nstring1 = \"Hello\"\nstring2 = \"World\"\nresult = string1 + string2\nprint(result)",
options:["Hello World","HelloWorld","World Hello","WorldHello"],
answer:"HelloWorld"},

{week:3,num:6,type:'mcq',
question:"What is the output of the following Python code?\n\ntext = \"python programming\"\nresult = text.capitalize()\nprint(result)",
options:["Python programming","Python Programming","python Programming","python programming"],
answer:"Python programming"},

{week:3,num:7,type:'mcq',
question:"What is the output of the following Python code?\n\ntext = \" Python \"\nanswer = text.strip()\nprint(answer)",
options:["Python","\"Python \"","\" Python\"","\" Python \""],
answer:"Python"},

{week:3,num:8,type:'mcq',
question:"What is the output of the following Python code?\n\nword = \"Python\"\nresult = word[::-1]\nprint(result)",
options:["Python","nohtyP","onhtyP","nohtyp"],
answer:"nohtyP"},

{week:3,num:9,type:'mcq',
question:"What is the output of the following Python code?\n\nsentence = \"Python is a powerful programming language.\"\ncount = sentence.count(\"o\")\nprint(count)",
options:["4","2","3","5"],
answer:"3"},

{week:3,num:10,type:'mcq',
question:"What is the output of the following Python code?\n\ntext = \"Python is easy.\"\nresult = len(text.split())\nprint(result)",
options:["3","4","1","2"],
answer:"3"},

{week:3,num:11,type:'mcq',
question:"What is the output of the following Python code?\n\ntxt = \"Hello, welcome to my world.\"\nx = txt.index(\"welcome\")\nprint(x)",
options:["3","4","8","7"],
answer:"7"},

{week:3,num:12,type:'mcq',
question:"What is the output of the following Python code?\n\ntext = \"Super hero\"\nx = text.index(\"e\")\nprint(x)",
options:["3","4","8","7"],
answer:"3"},

{week:3,num:13,type:'mcq',
question:"What is the output of the following Python code?\n\ntxt = \"My Classroom\"\nprint(txt.find(\"o\"))\nprint(txt.index(\"o\"))",
options:["9\n9","8\n8","7\n7","Compile Time Error"],
answer:"9\n9"},

{week:3,num:14,type:'mcq',
question:"What is the output of the following Python code?\n\na = \"Hello\"\nb = \"World\"\nc = a + \" \" + b\nprint(c)",
options:["Hello World","HelloWorld","Hello\nWorld","Compile Time Error"],
answer:"Hello World"},

{week:3,num:15,type:'mcq',
question:"What is the output of the following Python code?\n\nb = \"Projects!\"\nprint(b[2:5])",
options:["oje","roj","jec","Compile Time Error"],
answer:"oje"},

{week:3,num:16,type:'mcq',
question:"What is the output of the following Python code?\n\nmessage = \"Learn Programming\"\na = message.index(\"e\", 1, 10)\nprint(a)",
options:["3","4","1","2"],
answer:"2"},

{week:3,num:17,type:'mcq',
question:"What is the output of the following Python code?\n\nb = \"debugger Compiler\"\nprint(b[-5:-2])",
options:["pil","omp","mpi","Compile Time Error"],
answer:"pil"},

{week:3,num:18,type:'mcq',
question:"What is the first step in solving a problem using a computer?",
options:["Writing the code","Defining the problem","Testing the program","Choosing a programming language"],
answer:"Defining the problem"},

{week:3,num:19,type:'mcq',
question:"Which of the following best describes the concept of \"encapsulation\" in program design?",
options:["Separating the user interface from the business logic","Hiding the internal state of an object and requiring all interaction to be performed through methods","Breaking a program into modules","Using comments to explain code functionality"],
answer:"Hiding the internal state of an object and requiring all interaction to be performed through methods"},

{week:3,num:20,type:'mcq',
question:"What is the main purpose of using a \"test case\" in software development?",
options:["To write documentation","To specify the requirements","To verify that a part of the program works as intended","To improve the program's performance"],
answer:"To verify that a part of the program works as intended"},

// ══════════════════════════════════════════════════════════════
//  Week 4 — One Mark MCQ Questions (Dictionary, Sets, Tuple)
// ══════════════════════════════════════════════════════════════
{week:4,num:1,type:'mcq',
question:"What will be the output of the following code?\n\nmy_dict = {'a': 1, 'b': 2, 'c': 3}\nmy_dict['d'] = 4\nprint(my_dict)",
options:["{'a': 1, 'b': 2, 'c': 3, 'd': 4}","{'a': 1, 'b': 2, 'c': 3}","{'a': 1, 'b': 2, 'c': 3, 'd': '4'}","KeyError"],
answer:"{'a': 1, 'b': 2, 'c': 3, 'd': 4}"},

{week:4,num:2,type:'mcq',
question:"What will be the output of the following code?\n\nmy_dict = {'a': 1, 'b': 2, 'c': 3}\nmy_dict.update({'a': 4})\nprint(my_dict)",
options:["{'a': 4}","{'a': 1, 'b': 2, 'c': 3}","{'a': 4, 'b': 2, 'c': 3}","KeyError"],
answer:"{'a': 4, 'b': 2, 'c': 3}"},

{week:4,num:3,type:'mcq',
question:"What will be the output of the following code?\n\nmy_dict = {'a': 1, 'b': 2, 'c': 3}\nprint(list(my_dict.keys()))",
options:["['a', 'b', 'c']","['a', '1', 'b', '2']","['a', 'b', 'c', '1']","KeyError"],
answer:"['a', 'b', 'c']"},

{week:4,num:4,type:'mcq',
question:"What will be the output of the following code?\n\nmy_dict = {'a': 1, 'b': 2, 'c': 3}\nmy_dict['d'] = my_dict.get('e', 5)\nprint(my_dict)",
options:["{'a': 1, 'b': 2, 'c': 3, 'd': 5}","{'a': 1, 'b': 2, 'c': 3, 'd': None}","{'a': 1, 'b': 2, 'c': 3, 'd': 5, 'e': 5}","{'a': 1, 'b': 2, 'c': 3, 'd': 4}"],
answer:"{'a': 1, 'b': 2, 'c': 3, 'd': 5}"},

{week:4,num:5,type:'mcq',
question:"What will be the output of the following code?\n\nset1 = {1, 2, 3, 4}\nset2 = {3, 4, 5, 6}\nset3 = set1.intersection(set2)\nprint(sorted(set3))",
options:["[5, 6]","[1, 2]","[1, 2, 3, 4]","[3, 4]"],
answer:"[3, 4]"},

{week:4,num:6,type:'mcq',
question:"What will be the output of the following code?\n\nset1 = {1, 2, 3, 4}\nset2 = {2, 3, 4, 5}\nset1.symmetric_difference_update(set2)\nprint(sorted(set1))",
options:["[5, 6]","[1, 5, 6]","[1, 2, 5]","[1, 5]"],
answer:"[1, 5]"},

{week:4,num:7,type:'mcq',
question:"What will be the output of the following code?\n\nset1 = {1, 2, 3, 4, 5}\nset2 = {3, 4, 5, 6, 7}\nset3 = set1.isdisjoint(set2)\nprint(set3)",
options:["KeyError","None","True","False"],
answer:"False"},

{week:4,num:8,type:'mcq',
question:"What will be the output of the following code?\n\nmy_set = {10, 20, 30, 40}\nmy_set.discard(25)\nmy_set.add(15)\nprint(sorted(my_set))",
options:["[10, 15, 20, 30, 40]","[10, 15, 20, 25, 30, 40]","[25, 30, 40]","[10, 20, 30, 40]"],
answer:"[10, 15, 20, 30, 40]"},

{week:4,num:9,type:'mcq',
question:"What will be the output of the following code?\n\nmy_set = {1, 3, 5, 7}\nmy_set.update([2, 6])\nprint(sorted(my_set))",
options:["[1, 2, 3, 4, 5, 6, 7]","[1, 3, 5, 7, 8, 9]","[1, 2, 3, 5, 6, 7]","[1, 2, 3, 5]"],
answer:"[1, 2, 3, 5, 6, 7]"},

{week:4,num:10,type:'mcq',
question:"What will be the output of the following code?\n\nmy_dict = {'a': 1, 'b': 2, 'c': 3}\nfor key, value in my_dict.items():\n    print(key, value)",
options:["('a', 1)\n('b', 2)\n('c', 3)","a 1\nb 2\nc 3","a b c 1 2 3","a 1\nb 2\nc 3\n1 2 3"],
answer:"a 1\nb 2\nc 3"},

{week:4,num:11,type:'mcq',
question:"What will be the output for the following code?\n\na=(1,2,3)\nb=('A','B','C')\nc=zip(a,b)\nprint(tuple(c))",
options:["((1, 'A'), (2, 'B'), (3, 'C'))","((1,2,3),('A','B','C'))","(('A', 1), ('B', 2), ('C', 3))","None of the mentioned options"],
answer:"((1, 'A'), (2, 'B'), (3, 'C'))"},

{week:4,num:12,type:'mcq',
question:"What will be the output of the following code?\n\na=(1,2,3,4)\nprint(sum(a,3))",
options:["Too many arguments for sum() method","The method sum() doesn't exist for tuples","12","13"],
answer:"13"},

{week:4,num:13,type:'mcq',
question:"Which of the following is a Python tuple?",
options:["{1, 2, 3}","[1, 2, 3]","(1, 2, 3)","{ }"],
answer:"(1, 2, 3)"},

{week:4,num:14,type:'mcq',
question:"Which of the following statements is used to create an empty tuple?",
options:["{ }","set()","[ ]","( )"],
answer:"( )"},

{week:4,num:15,type:'mcq',
question:"What will be the output of the following code?\n\na = (1, 2, 3)\na[1] = 4\nprint(a)",
options:["Error: 'tuple' object does not support item assignment","(1, 2, 4)","(1, 2, 3, 4)","(1, 4, 3)"],
answer:"Error: 'tuple' object does not support item assignment"},

{week:4,num:16,type:'mcq',
question:"Suppose t = (1, 2, 4, 3), which of the following is incorrect?",
options:["print(t[3])","t[3] = 45","print(max(t))","print(len(t))"],
answer:"t[3] = 45"},

{week:4,num:17,type:'mcq',
question:"What will be the output of the following code?\n\na=(4,5,6)\nb=('D','E','F')\nc=zip(a,b)\nprint(tuple(c))",
options:["('D',4),('E',5),('F',6)","(4,5,6),('D','E','F')","Error","((4, 'D'), (5, 'E'), (6, 'F'))"],
answer:"((4, 'D'), (5, 'E'), (6, 'F'))"},

{week:4,num:18,type:'mcq',
question:"Predict the output for the following code:\n\na=(1,2,3,4)\nprint(a[1:-1])",
options:["Error, tuple slicing doesn't exist","[2, 3]","(2, 3, 4)","(2, 3)"],
answer:"(2, 3)"},

{week:4,num:19,type:'mcq',
question:"What is the output for the following code?\n\na=(\"Check\",)*3\nprint(a)",
options:["('Check', 'Check', 'Check')","* Operator not valid for tuples","CheckCheckCheck","Syntax error"],
answer:"('Check', 'Check', 'Check')"},

{week:4,num:20,type:'mcq',
question:"What is the output of the following code?\n\na=(1,2,(4,5))\nb=(1,2,(3,4))\nprint(a<b)",
options:["False","True","Error, < operator is not valid for tuples","Error, < operator is valid for tuples but not if there are sub-tuples"],
answer:"False"},

// ══════════════════════════════════════════════════════════════
//  Week 5 — One Mark MCQ Questions (Classes & Objects)
// ══════════════════════════════════════════════════════════════
{week:5,num:1,type:'mcq',
question:"What will be the output of the following code?\n\nclass Car:\n    def __init__(self, model, year):\n        self.model = model\n        self.year = year\n    def display_info(self):\n        print(f\"Model: {self.model}, Year: {self.year}\")\ncar = Car(\"Tesla\", 2020)\ncar.display_info()",
options:["Model: Tesla, Year: 2020","NameError: name 'car' is not defined","AttributeError: 'NoneType' object has no attribute 'display_info'","None"],
answer:"Model: Tesla, Year: 2020"},

{week:5,num:2,type:'mcq',
question:"What will be the output of the following code?\n\nclass Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\nbook1 = Book(\"1984\", \"George Orwell\")\nbook2 = Book(\"Brave New World\", \"Aldous Huxley\")\nprint(book1.title + \" by \" + book2.author)",
options:["1984 by George Orwell","Brave New World by Aldous Huxley","Brave New World by George Orwell","1984 by Aldous Huxley"],
answer:"1984 by Aldous Huxley"},

{week:5,num:3,type:'mcq',
question:"What will be the output of the following code?\n\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(f\"{self.name} says Hello\")\ndog = Animal(\"Dog\")\ncat = Animal(\"Cat\")\ndog.speak()\ncat.speak()",
options:["NoneCat says Hello","Dog says HelloNone","Dog says Hello\nCat says Hello","Dog says Hello Cat says Hello"],
answer:"Dog says Hello\nCat says Hello"},

{week:5,num:4,type:'mcq',
question:"What will be the output of the following code?\n\nclass Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\np1 = Person(\"John\", 25)\np2 = Person(\"John\", 25)\nprint(p1 == p2)",
options:["0","1","False","True"],
answer:"False"},

{week:5,num:5,type:'mcq',
question:"What will be the output of the following code?\n\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    def __del__(self):\n        print(\"Circle object deleted\")\ncircle = Circle(7)\ndel circle",
options:["Circle","Circle object created","Circle object deleted","None"],
answer:"Circle object deleted"},

{week:5,num:6,type:'mcq',
question:"What will be the output of the following code?\n\nclass Rectangle:\n    def __init__(self, length, width):\n        self.length = length\n        self.width = width\n    def area(self):\n        return self.length * self.width\nrect = Rectangle(5, 10)\nprint(rect.area())",
options:["5","15","10","50"],
answer:"50"},

{week:5,num:7,type:'mcq',
question:"What will be the output of the following code?\n\nclass Shape:\n    def __init__(self):\n        self.type = \"Shape\"\nclass Square(Shape):\n    def __init__(self):\n        super().__init__()\n        self.type = \"Square\"\nsquare = Square()\nprint(square.type)",
options:["Shape","Square","Error","None"],
answer:"Square"},

{week:5,num:8,type:'mcq',
question:"What will be the output of the following code?\n\nclass Counter:\n    def __init__(self):\n        self.value = 0\n    def increment(self):\n        self.value += 1\n    def reset(self):\n        self.value = 0\ncounter = Counter()\ncounter.increment()\ncounter.increment()\ncounter.increment()\ncounter.reset()\nprint(counter.value)",
options:["0","2","1","None"],
answer:"0"},

{week:5,num:9,type:'mcq',
question:"What will be the output of the following code?\n\nclass Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def display(self):\n        print(f\"{self.name} scored {self.marks}\")\ns = Student(\"Alice\", 85)\ns.display()",
options:["scored 85","Alice scored None","Alice scored 85","Alice"],
answer:"Alice scored 85"},

{week:5,num:10,type:'mcq',
question:"What will be the output of the following code?\n\nclass Employee:\n    salary = 50000\n    def display(self):\n        print(self.salary)\ne = Employee()\ne.salary = 60000\ne.display()",
options:["110000","60000","50000","Error"],
answer:"60000"}
];
