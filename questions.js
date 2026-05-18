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
solution:`class CharacterChecker:\n    def setCharacter(self,c):\n        self.c = c\n\n    def checkVowelOrConsonant(self):\n        if self.c.lower() in "aeiou":\n            return f"The character '{self.c}' is a vowel"\n        else:\n            return f"The character '{self.c}' is a consonant"\n\nobj = CharacterChecker()\nobj.setCharacter(input())\nprint(obj.checkVowelOrConsonant())`},

{week:6,num:1,title:"Library late fines",desc:"Develop a program to calculate late fines for library items. The program should utilize a base class 'LibraryItem' with a due and return date and derive two classes 'Book' and 'DVD' to calculate and display the late fine for each type of library item.\n\n• The fine for 'Book' is 1 per day overdue.\n• The fine for 'DVD' is 2 per day overdue.",
inputFmt:"Line 1: due date as a string (YYYY-MM-DD)\nLine 2: return date as a string (YYYY-MM-DD)",
outputFmt:"For each library item (Book and DVD):\nDue Date: (Due Date)\nReturn Date: (Return Date)\nLate Fine: (Late Fine)",
hint:"Use inheritance. Extract last 2 chars of date for day difference. Book fine = days*1, DVD fine = days*2.",
tests:[{input:"2023-11-01\n2023-11-05",expected:"Due Date: 2023-11-01\nReturn Date: 2023-11-05\nLate Fine: 4\nDue Date: 2023-11-01\nReturn Date: 2023-11-05\nLate Fine: 8"},{input:"2023-11-15\n2023-11-15",expected:"Due Date: 2023-11-15\nReturn Date: 2023-11-15\nLate Fine: 0\nDue Date: 2023-11-15\nReturn Date: 2023-11-15\nLate Fine: 0"}],
solution:`class LibraryItem:\n    def __init__(self,dd,rd):\n        self.dd=dd\n        self.rd=rd\n    def display_details(self):\n        print(f"Due Date: {self.dd}")\n        print(f"Return Date: {self.rd}")\n\nclass Book(LibraryItem):\n    def __init__(self,dd,rd):\n        super().__init__(dd,rd)\n    def get_fine(self):\n        ans = int(self.rd[-2:]) - int(self.dd[-2:])\n        return ans*1\n\nclass DVD(LibraryItem):\n    def __init__(self,dd,rd):\n        super().__init__(dd,rd)\n    def get_fine(self):\n        ans = int(self.rd[-2:]) - int(self.dd[-2:])\n        return ans*2\n\ndd=input()\nrd=input()\nb=Book(dd,rd)\nb.display_details()\nprint(f"Late Fine: {b.get_fine()}")\nd=DVD(dd,rd)\nd.display_details()\nprint(f"Late Fine: {d.get_fine()}")`},

{week:6,num:2,title:"Student record mgmt",desc:"Helen wants to create a program for student record management with a class hierarchy using hybrid inheritance.\n\n• Base class Person holds name and ID.\n• Base class Score contains the student's score.\n• UndergraduateStudent inherits from both, calculates grade (A≥90, B≥80, C≥70, D≥60, F<60).\n• PostgraduateStudent inherits from both, calculates result (Pass≥60, Fail<60).",
inputFmt:"Line 1: UG student name\nLine 2: UG student ID\nLine 3: UG student score (int)\nLine 4: PG student name\nLine 5: PG student ID\nLine 6: PG student score (int)",
outputFmt:"Line 1: \"Student [name] with ID [id] received grade [grade].\"\nLine 2: \"Student [name] with ID [id] [Pass/Fail] the course.\"",
hint:"Use multiple inheritance: class UndergraduateStudent(Person, Score). Call Person.__init__ and Score.__init__ explicitly.",
tests:[{input:"John\nCS101\n75\nAlice\nECE111\n55",expected:"Student John with ID CS101 received grade C.\nStudent Alice with ID ECE111 Fail the course."},{input:"Mary\nEEE65\n85\nDavid\nCSE13\n92",expected:"Student Mary with ID EEE65 received grade B.\nStudent David with ID CSE13 Pass the course."},{input:"Ella\nECE20\n45\nGeorge\nMech101\n30",expected:"Student Ella with ID ECE20 received grade F.\nStudent George with ID Mech101 Fail the course."}],
solution:`class Person:\n    def __init__(self, name, student_id):\n        self.name = name\n        self.student_id = student_id\n\nclass Score:\n    def __init__(self, score):\n        self.score = score\n\nclass UndergraduateStudent(Person, Score):\n    def __init__(self, name, student_id, score):\n        Person.__init__(self, name, student_id)\n        Score.__init__(self, score)\n    def displayGrade(self):\n        if self.score >= 90:\n            grade = 'A'\n        elif self.score >= 80:\n            grade = 'B'\n        elif self.score >= 70:\n            grade = 'C'\n        elif self.score >= 60:\n            grade = 'D'\n        else:\n            grade = 'F'\n        print(f"Student {self.name} with ID {self.student_id} received grade {grade}.")\n\nclass PostgraduateStudent(Person, Score):\n    def __init__(self, name, student_id, score):\n        Person.__init__(self, name, student_id)\n        Score.__init__(self, score)\n    def displayResult(self):\n        if self.score >= 60:\n            result = "Pass"\n        else:\n            result = "Fail"\n        print(f"Student {self.name} with ID {self.student_id} {result} the course.")\n\nug_name=input()\nug_id=input()\nug_score=int(input())\npg_name=input()\npg_id=input()\npg_score=int(input())\nug=UndergraduateStudent(ug_name,ug_id,ug_score)\nug.displayGrade()\npg=PostgraduateStudent(pg_name,pg_id,pg_score)\npg.displayResult()`},

{week:6,num:3,title:"Vehicle collection",desc:"Sneha needs to manage a collection of vehicles. Each vehicle has brand and year. Cars have seats, Bikes have electric status.\n\n• Class Vehicle (base) with brand and year.\n• Class Car(Vehicle) with seats.\n• Class Bike(Vehicle) with is_electric.\n• Invalid type prints an error message.",
inputFmt:"Line 1: integer n (number of vehicles)\nNext n lines: type brand year attribute (space-separated)",
outputFmt:"For Car: \"Brand: <brand>, Year: <year>\" and \"Seats: <seats>\"\nFor Bike: \"Brand: <brand>, Year: <year>\" and \"Electric: <true/false>\"\nFor invalid: \"Invalid vehicle type. Please enter 'Car' or 'Bike'.\"",
hint:"Use inheritance. Check type string, create Car or Bike accordingly. Use str.lower() for boolean.",
tests:[{input:"2\nCar Toyota 2022 5\nBike Tesla 2021 true",expected:"Brand: Toyota, Year: 2022\nSeats: 5\nBrand: Tesla, Year: 2021\nElectric: true"},{input:"3\nCar Honda 2023 4\nBike Yamaha 2022 false\nCar BMW 2021 7",expected:"Brand: Honda, Year: 2023\nSeats: 4\nBrand: Yamaha, Year: 2022\nElectric: false\nBrand: BMW, Year: 2021\nSeats: 7"},{input:"1\nBus Ford 2020 9",expected:"Invalid vehicle type. Please enter 'Car' or 'Bike'."}],
solution:`class Vehicle:\n    def __init__(self, brand, year):\n        self.brand = brand\n        self.year = year\n\nclass Car(Vehicle):\n    def __init__(self, brand, year, seats):\n        super().__init__(brand, year)\n        self.seats = seats\n    def print_car_details(self):\n        print(f"Brand: {self.brand}, Year: {self.year}")\n        print(f"Seats: {self.seats}")\n\nclass Bike(Vehicle):\n    def __init__(self, brand, year, is_electric):\n        super().__init__(brand, year)\n        self.is_electric = is_electric\n    def print_bike_details(self):\n        print(f"Brand: {self.brand}, Year: {self.year}")\n        print(f"Electric: {str(self.is_electric).lower()}")\n\nn=int(input())\nfor _ in range(n):\n    parts=input().split()\n    vtype=parts[0]\n    if vtype=="Car":\n        c=Car(parts[1],int(parts[2]),int(parts[3]))\n        c.print_car_details()\n    elif vtype=="Bike":\n        b=Bike(parts[1],int(parts[2]),parts[3]=="true")\n        b.print_bike_details()\n    else:\n        print("Invalid vehicle type. Please enter 'Car' or 'Bike'.")`},

{week:6,num:4,title:"Game damage calc",desc:"Rekha is designing a game with three character classes: Warrior, Mage, and Archer. Each overrides calculate_damage(base_attack, weapon_mult, skill_bonus).\n\nFormulas:\n• Warrior: damage=(base_attack×weapon_mult)+skill_bonus; if skill_bonus>50: damage+=20\n• Mage: damage=(base_attack+skill_bonus)×weapon_mult; if skill_bonus>70: damage+=30\n• Archer: damage=(base_attack×weapon_mult)+(0.5×skill_bonus); if skill_bonus>40: damage+=15",
inputFmt:"Line 1: integer n (number of characters)\nNext n lines: char_type base_attack weapon_mult skill_bonus",
outputFmt:"For each valid character: damage rounded to 1 decimal place.\nFor invalid types: \"Invalid\"",
hint:"Use polymorphism — each class overrides calculate_damage. Parse floats from input.",
tests:[{input:"3\nwarrior 100.0 1.5 30.0\nmage 80.0 2.0 60.0\narcher 90.0 1.2 20.0",expected:"180.0\n280.0\n118.0"},{input:"2\nwarrior 50.0 1.0 10.0\nhand 40.0 1.5 80.0",expected:"60.0\nInvalid"}],
solution:`class Character:\n    def calculate_damage(self, base_attack, weapon_mult, skill_bonus):\n        pass\n\nclass Warrior(Character):\n    def calculate_damage(self, base_attack, weapon_mult, skill_bonus):\n        damage = (base_attack * weapon_mult) + skill_bonus\n        if skill_bonus > 50:\n            damage += 20\n        print(round(damage, 1))\n\nclass Mage(Character):\n    def calculate_damage(self, base_attack, weapon_mult, skill_bonus):\n        damage = (base_attack + skill_bonus) * weapon_mult\n        if skill_bonus > 70:\n            damage += 30\n        print(round(damage, 1))\n\nclass Archer(Character):\n    def calculate_damage(self, base_attack, weapon_mult, skill_bonus):\n        damage = (base_attack * weapon_mult) + (0.5 * skill_bonus)\n        if skill_bonus > 40:\n            damage += 15\n        print(round(damage, 1))\n\nn=int(input())\nfor _ in range(n):\n    parts=input().split()\n    t=parts[0]\n    ba=float(parts[1])\n    wm=float(parts[2])\n    sb=float(parts[3])\n    if t=="warrior":\n        Warrior().calculate_damage(ba,wm,sb)\n    elif t=="mage":\n        Mage().calculate_damage(ba,wm,sb)\n    elif t=="archer":\n        Archer().calculate_damage(ba,wm,sb)\n    else:\n        print("Invalid")`},

{week:6,num:5,title:"Payment system",desc:"Sita is designing a payment system with multiple payment methods: CreditCard, PayPal, and Bitcoin.\n\n• CreditCard adds a fixed fee of 5 to the amount.\n• PayPal doubles the amount.\n• Bitcoin adds a fixed fee of 50.",
inputFmt:"Line 1: integer n (number of transactions)\nNext n lines: method identifier amount",
outputFmt:"For valid: \"<MethodName> Paid <total>\" (rounded to 1 decimal)\nFor invalid: \"Invalid\"",
hint:"Use inheritance with PaymentMethod base class. Override process_payment in each subclass.",
tests:[{input:"3\ncreditcard 1234567890123456 100.5\npaypal user@example.com 200.0\nbitcoin 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa 300.0",expected:"CreditCard Paid 105.5\nPayPal Paid 400.0\nBitcoin Paid 350.0"},{input:"2\ncreditcard 1111222233334444 50.0\npalpay test@mail.com 75.25",expected:"CreditCard Paid 55.0\nInvalid"}],
solution:`class PaymentMethod:\n    def __init__(self, identifier):\n        self.identifier = identifier\n    def process_payment(self, amount):\n        pass\n\nclass CreditCard(PaymentMethod):\n    def process_payment(self, amount):\n        return amount + 5\n\nclass PayPal(PaymentMethod):\n    def process_payment(self, amount):\n        return amount * 2\n\nclass Bitcoin(PaymentMethod):\n    def process_payment(self, amount):\n        return amount + 50\n\nn=int(input())\nfor _ in range(n):\n    parts=input().split()\n    method=parts[0]\n    identifier=parts[1]\n    amount=float(parts[2])\n    if method=="creditcard":\n        p=CreditCard(identifier)\n        print(f"CreditCard Paid {round(p.process_payment(amount),1)}")\n    elif method=="paypal":\n        p=PayPal(identifier)\n        print(f"PayPal Paid {round(p.process_payment(amount),1)}")\n    elif method=="bitcoin":\n        p=Bitcoin(identifier)\n        print(f"Bitcoin Paid {round(p.process_payment(amount),1)}")\n    else:\n        print("Invalid")`},

{week:7,num:1,title:"Character frequency",desc:"Bob requires a program to automate the process of analyzing character frequency in a given text. This program should allow the user to input a string, calculate the frequency of each character within the text, save these character frequencies to a file named 'char_frequency.txt', and display the results.",
inputFmt:"A single string.",
outputFmt:"Line 1: \"Character Frequencies:\"\nFollowing lines: \"X: Y\" where X is the character and Y is the count.",
hint:"Use a dictionary to store counts or use string.count(). Iterate through characters. (File I/O might be simulated in this environment, but print the output as expected).",
tests:[{input:"aaabbbccc",expected:"Character Frequencies:\na: 3\nb: 3\nc: 3"},{input:"Data analyst job is challenging and fun",expected:"Character Frequencies:\nD: 1\na: 6\nt: 2\n : 6\nn: 5\nl: 3\ny: 1\ns: 2\nj: 1\no: 1\nb: 1\ni: 2\nc: 1\nh: 1\ne: 1\ng: 2\nd: 1\nf: 1\nu: 1"},{input:"\"~~~~!!!@@@@##$$$$%%%%&&&",expected:"Character Frequencies:\n\": 1\n~: 4\n!: 3\n@: 4\n#: 2\n$: 4\n%: 4\n&: 3"}],
solution:`user_input = input()\nprint("Character Frequencies:")\nd = {}\nfor key in user_input:\n    if key not in d and key != ' ':\n        d[key] = user_input.count(key)\nfor k, v in d.items():\n    print(f"{k}: {v}")`},

{week:7,num:2,title:"Whitespace Remover",desc:"Maria is working on a utility called \"Whitespace Remover\". Accept a string input, save it to a file named 'file.txt', read the content from 'file.txt', and display the string without any extra white spaces. Save the modified string back to 'file.txt'.",
inputFmt:"A single string containing alphabetic characters, spaces, and extra white spaces.",
outputFmt:"The modified string with extra white spaces removed.",
hint:"Use string.split() and \" \".join() to clean extra whitespaces.",
tests:[{input:"Hello   World!",expected:"Hello World!"},{input:"A  challenging   sentence  for   whitespace removal.",expected:"A challenging sentence for whitespace removal."},{input:"H3ll0 W0r1d!  W3lc0m3  t0  th3 w0rld 0f c0mpu7ers 4nd  pr0gramm1ng.",expected:"H3ll0 W0r1d! W3lc0m3 t0 th3 w0rld 0f c0mpu7ers 4nd pr0gramm1ng."}],
solution:`user_input = input()\ncleaned_string = " ".join(user_input.split())\nprint(cleaned_string)`},

{week:7,num:3,title:"Name Sorter",desc:"Alice is developing a program called \"Name Sorter\" that helps users organize and sort names alphabetically. The program takes names as input from the user (until 'q' is entered), saves them in a file 'sorted_names.txt', and then displays the names in sorted order.",
inputFmt:"Multiple lines, each containing a name. End input with 'q'.",
outputFmt:"The names in alphabetical order, each on a new line.",
hint:"Append names to a list until 'q' is received. Then list.sort() and print each name.",
tests:[{input:"Alice\nSmith\nJohn Doe\nEmma Johnson\nq",expected:"Alice\nEmma Johnson\nJohn Doe\nSmith"},{input:"David\nOliver\nSophia\nq",expected:"David\nOliver\nSophia"}],
solution:`names = []\nwhile True:\n    name = input()\n    if name == 'q':\n        break\n    names.append(name)\nnames.sort()\nfor n in names:\n    print(n)`},

{week:7,num:4,title:"Textopia Symphony",desc:"Create a simple text editor that captures words and stores them in a .txt file. The program invites users to input their prose, and save this symphony of text to a file.",
inputFmt:"Line 1: string representing the text.\nLine 2: string representing the file name (without .txt).",
outputFmt:"Text saved successfully to \"<file_name.txt>\"",
hint:"Concatenate \".txt\" to the file name and print the success message.",
tests:[{input:"Magical words created by the user!\nMagicalWordsCreatedByUser",expected:"Text saved successfully to \"MagicalWordsCreatedByUser.txt\""},{input:"!@#$%^&*()_+{}[]\nSpecialCharacters",expected:"Text saved successfully to \"SpecialCharacters.txt\""}],
solution:`text = input()\nfilename = input()\nfilename += ".txt"\nprint(f'Text saved successfully to "{filename}"')`},

{week:7,num:5,title:"Count specific character",desc:"John is a data analyst who needs to count the number of times a specific character appears in a file. The program allows him to specify a file, the file's content, and a character to count.",
inputFmt:"Line 1: file name\nLine 2: string to write to the file\nLine 3: character to count",
outputFmt:"\"The character '[character]' appears [result] times in the file.\" or \"Character not found in the file.\"",
hint:"Use content.lower().count(char.lower()) for case-insensitive counting.",
tests:[{input:"test.txt\nThis is a test file to check the character count.\ne",expected:"The character 'e' appears 5 times in the file."},{input:"sample.txt\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nL",expected:"The character 'L' appears 3 times in the file."},{input:"data.txt\nSome random content with no special character.\n$",expected:"Character not found in the file."},{input:"document.txt\nThis document contains multiple spaces and a character count.\n ",expected:"The character ' ' appears 10 times in the file."}],
solution:`file_name = input()\ninput_string = input()\ncharacter_to_count = input()\ncount = input_string.lower().count(character_to_count.lower())\nif count > 0:\n    print(f"The character '{character_to_count}' appears {count} times in the file.")\nelse:\n    print("Character not found in the file.")`},

{week:8,num:1,title:"Average with Error Handling",desc:"Write a program that calculates the average of a list of integers. Prompt the user for the length (n) and each element. Use error handling.\n\n• Positive integer length validation.\n• Valid integer element validation.\n• Print the average rounded to 2 decimal places.",
inputFmt:"Line 1: integer n (length of the list)\nNext n lines: integers (each element)",
outputFmt:"\"Error: The length of the list must be a non-negative integer.\" OR \"Error: You must enter a numeric value.\" OR \"The average is: <average>\"",
hint:"Use try-except blocks. Handle ValueError for non-numeric input.",
tests:[{input:"3\n1\n2\n3",expected:"The average is : 2.00"},{input:"/\n1\n3",expected:"Error: You must enter a numeric value."},{input:"0\n0",expected:"Error: The length of the list must be a non-negative integer."}],
solution:`try:\n    n=int(input())\n    if n==0:\n        print("Error: The length of the list must be a non-negative integer.")\n    else:\n        sum=0\n        for i in range(n):\n            v=int(input())\n            sum+=v\n        print(f"The average is : {(sum/n):.2f}")\nexcept Exception:\n    print("Error: You must enter a numeric value.")`},

{week:8,num:2,title:"Voting Eligibility Exception",desc:"In a voting system, a person must be at least 18 years old to vote. If the user enters an age below 18, raise an exception.",
inputFmt:"A single positive integer representing age.",
outputFmt:"\"Eligible to vote\" or \"Not eligible to vote\"",
hint:"Raise a ValueError if age < 18, then catch it in an except block and print the error message.",
tests:[{input:"18",expected:"Eligible to vote"},{input:"12",expected:"Not eligible to vote"}],
solution:`try:\n    n=int(input())\n    if n>= 18:\n        print("Eligible to vote")\n    else:\n        raise ValueError()\nexcept ValueError:\n    print("Not eligible to vote")`},

{week:8,num:3,title:"Validate Registration",desc:"Validate a student's register number and mobile number.\n\n• Reg No: exactly 9 chars. Format: 2 digits, 3 letters, 4 digits.\n• Mobile No: exactly 10 digits.\nIf invalid, raise custom exception and print \"Invalid with exception message: [message]\".",
inputFmt:"Line 1: Register number (string)\nLine 2: Mobile number (string)",
outputFmt:"\"Valid\" or \"Invalid with exception message: [message]\"",
hint:"Create custom exceptions InvalidRegisterNumberException and InvalidMobileNumberException.",
tests:[{input:"19ABC1001\n9949596920",expected:"Valid"},{input:"19ABC1001\n99495969209",expected:"Invalid with exception message: Mobile Number should have exactly 10 characters."},{input:"19ABC10019\n9949596920",expected:"Invalid with exception message: Register Number should have exactly 9 characters."},{input:"195AC1001\n9949596920",expected:"Invalid with exception message: Register Number should have the format: 2 numbers, 3 characters, and 4 numbers."},{input:"19ABC1001\n994C596920",expected:"Invalid with exception message: Mobile Number should only contain digits."}],
solution:`class InvalidRegisterNumberException(Exception): pass\nclass InvalidMobileNumberException(Exception): pass\nreg_no = input()\nmob_no = input()\ntry:\n    if len(reg_no) != 9:\n        raise InvalidRegisterNumberException("Register Number should have exactly 9 characters.")\n    if not (reg_no[0:2].isdigit() and reg_no[2:5].isalpha() and reg_no[5:9].isdigit()):\n        raise InvalidRegisterNumberException("Register Number should have the format: 2 numbers, 3 characters, and 4 numbers.")\n    if len(mob_no) != 10:\n        raise InvalidMobileNumberException("Mobile Number should have exactly 10 characters.")\n    if not mob_no.isdigit():\n        raise InvalidMobileNumberException("Mobile Number should only contain digits.")\n    print("Valid")\nexcept Exception as e:\n    print(f"Invalid with exception message: {e}")`},

{week:8,num:4,title:"Event Date Validation",desc:"Obtain the start and end time for an event. Time format must be 'YYYY-MM-DD HH:MM:SS'. Validate this format and raise an exception if it doesn't match.",
inputFmt:"Line 1: Start time string\nLine 2: End time string",
outputFmt:"Start and end time strings if valid, or \"Event time is not in the format\".",
hint:"Check string length (19) and specific index positions for '-', ' ', and ':'.",
tests:[{input:"2022-01-12 06:10:00\n2022-02-12 10:10:12",expected:"2022-01-12 06:10:00\n2022-02-12 10:10:12"},{input:"2022-01-12 06:10:00\n2022-02-12 10:00:",expected:"Event time is not in the format"},{input:"2022-01-12 06:10:00\n2022-02-31 10:10:12",expected:"Event time is not in the format"},{input:"2022-01-12 10:75:00\n2022-02-12 10:10:80",expected:"Event time is not in the format"}],
solution:`try:\n    start = input()\n    end = input()\n    for time_str in [start, end]:\n        if len(time_str) != 19: raise Exception\n        if time_str[4] != '-' or time_str[7] != '-' or time_str[10] != ' ' or time_str[13] != ':' or time_str[16] != ':': raise Exception\n        year = int(time_str[0:4])\n        month = int(time_str[5:7])\n        day = int(time_str[8:10])\n        hour = int(time_str[11:13])\n        minute = int(time_str[14:16])\n        second = int(time_str[17:19])\n        if not (1 <= month <= 12): raise Exception\n        if not (0 <= hour <= 23): raise Exception\n        if not (0 <= minute <= 59): raise Exception\n        if not (0 <= second <= 59): raise Exception\n        days_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]\n        if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0): days_list[1] = 29\n        if not (1 <= day <= days_list[month - 1]): raise Exception\n    print(start)\n    print(end)\nexcept:\n    print("Event time is not in the format")`},

{week:8,num:5,title:"Guardian of Arguments",desc:"Helen must input two pairs of coordinates (x1, y1) and (x2, y2). The enchanted map requires exactly 4 integers. If incorrect, throw CheckArgument exception.",
inputFmt:"A single line of space-separated strings/integers.",
outputFmt:"\"Treasure's Secret Location: [sum of squares]\" or \"Be aware!\nGuardian of Arguments awakens!\"",
hint:"Split input and check length. If valid, convert to ints and sum the squares.",
tests:[{input:"1 -2 -3 4",expected:"Treasure's Secret Location: 30"},{input:"25 12 -98",expected:"Be aware!\nGuardian of Arguments awakens!"}],
solution:`class CheckArgument(Exception): pass\ntry:\n    user_input = input().split()\n    if len(user_input) != 4:\n        raise CheckArgument("Guardian of Arguments awakens!")\n    coords = [int(x) for x in user_input]\n    sum_squares = sum(c**2 for c in coords)\n    print(f"Treasure's Secret Location: {sum_squares}")\nexcept (CheckArgument, ValueError):\n    print("Be aware!")\n    print("Guardian of Arguments awakens!")`},

{week:9,num:1,title:"Voter ID DataFrame",desc:"Ram is working on a project to validate voter IDs. Create a program that takes user input for voter IDs, processes the data, and outputs a data frame with the voter IDs using Pandas.",
inputFmt:"A space-separated string representing voter IDs.",
outputFmt:"A pandas DataFrame containing the voter IDs with column 'Voter ID'.",
hint:"Use pandas.DataFrame(data, columns=['Voter ID']).",
tests:[{input:"V12345 V23456 V34567 V45678 V56789",expected:"  Voter ID\n0   V12345\n1   V23456\n2   V34567\n3   V45678\n4   V56789"}],
solution:`import pandas as pd\nuser_input = input().split()\ndf = pd.DataFrame(user_input, columns=['Voter ID'])\nprint(df)`},

{week:9,num:2,title:"Employee Onboarding",desc:"Susi needs to streamline onboarding. The program takes employee details and stores them in a single row pandas DataFrame.\n\nDetails: Name, Age, Qualification, Salary, Performance.",
inputFmt:"Line 1: Name (string)\nLine 2: Age (int)\nLine 3: Qualification (string)\nLine 4: Salary (float)\nLine 5: Performance (string)",
outputFmt:"A single row DataFrame with columns 'Name', 'Age', 'Qualification', 'Salary', 'Performance'.",
hint:"Pass a dictionary with lists of length 1 to pd.DataFrame().",
tests:[{input:"John Doe\n28\nBachelor's Degree\n50000.0\nExcellent",expected:"       Name  Age      Qualification   Salary Performance\n0  John Doe   28  Bachelor's Degree  50000.0   Excellent"}],
solution:`import pandas as pd\nname = input()\nage = int(input())\nqualification = input()\nsalary = float(input())\nperformance = input()\ndata = {\n    'Name': [name],\n    'Age': [age],\n    'Qualification': [qualification],\n    'Salary': [salary],\n    'Performance': [performance]\n}\ndf = pd.DataFrame(data)\nprint(df)`},

{week:9,num:3,title:"Student Tracking",desc:"John wants to track his 5 students' information. Each student provides name, age, city, qualification, and a list of subject marks. Calculate average mark and display as DataFrame.",
inputFmt:"5 sets of 2 lines. Line 1: name age city qualification. Line 2: space-separated marks.",
outputFmt:"A DataFrame with columns 'Name', 'Age', 'City', 'Qualification', 'Average Mark'.",
hint:"Calculate average of marks. Round to 2 decimal places.",
tests:[{input:"Alice 25 NewYork PhD\n90 85 92 88 94\nBob 22 LosAngeles Master\n78 80 75 82 79\nCarol 28 Chicago Bachelor\n65 70 68 72 69\nDave 23 SanFrancisco Bachelor\n85 88 82 90 87\nEve 27 Miami Master\n93 89 94 91 96",expected:"    Name  Age          City Qualification Average Mark\n0  Alice   25       NewYork           PhD        89.80\n1    Bob   22    LosAngeles        Master        78.80\n2  Carol   28       Chicago      Bachelor        68.80\n3   Dave   23  SanFrancisco      Bachelor        86.40\n4    Eve   27         Miami        Master        92.60"}],
solution:`import pandas as pd\nnames = []\nages = []\ncities = []\nqualifications = []\naverages = []\nfor _ in range(5):\n    personal_info = input().split()\n    names.append(personal_info[0])\n    ages.append(int(personal_info[1]))\n    cities.append(personal_info[2])\n    qualifications.append(personal_info[3])\n    marks = list(map(int, input().split()))\n    avg = sum(marks) / len(marks)\n    averages.append(f"{avg:.2f}")\ndata = {\n    'Name': names,\n    'Age': ages,\n    'City': cities,\n    'Qualification': qualifications,\n    'Average Mark': averages\n}\ndf = pd.DataFrame(data)\nprint(df)`},

{week:9,num:4,title:"Concatenate Scores",desc:"Sindhu needs to concatenate performance scores of Team A and Team B. Output the individual series and the concatenated series.",
inputFmt:"Line 1: space-separated integers (Team A)\nLine 2: space-separated integers (Team B)",
outputFmt:"Series 1:\n[series]\nSeries 2:\n[series]\nAfter concatenating:\n[series]",
hint:"Use pd.Series() and pd.concat(). Note that indices will reset if ignore_index is used, but keep default behavior.",
tests:[{input:"1 2 3 4\n5 6 7 8",expected:"Series 1:\n0    1\n1    2\n2    3\n3    4\ndtype: int64\nSeries 2:\n0    5\n1    6\n2    7\n3    8\ndtype: int64\nAfter concatenating:\n0    1\n1    2\n2    3\n3    4\n0    5\n1    6\n2    7\n3    8\ndtype: int64"}],
solution:`import pandas as pd\nteam_a_scores = list(map(int, input().split()))\nteam_b_scores = list(map(int, input().split()))\nseries1 = pd.Series(team_a_scores)\nseries2 = pd.Series(team_b_scores)\nconcatenated_series = pd.concat([series1, series2])\nprint("Series 1:")\nprint(series1)\nprint("Series 2:")\nprint(series2)\nprint("After concatenating:")\nprint(concatenated_series)`},

{week:9,num:5,title:"Match DataFrames",desc:"Jinu needs to collect performance data from Team A and Team B for multiple matches. Display separate data frames and a concatenated one with keys.",
inputFmt:"8 lines in total (4 for df1, 4 for df2). Each line contains two space-separated integers for Team A and Team B.",
outputFmt:"df1:\n[DataFrame]\ndf2:\n[DataFrame]\nAfter concatenating:\n[DataFrame]",
hint:"pd.concat([df1, df2], keys=['key1', 'key2'])",
tests:[{input:"1 2\n7 8\n6 7\n3 4\n1 9\n1 3\n7 8\n1 0",expected:"df1:\n   A  B\n0  1  2\n1  7  8\n2  6  7\n3  3  4\ndf2:\n   A  B\n0  1  9\n1  1  3\n2  7  8\n3  1  0\nAfter concatenating:\n        A  B\nkey1 0  1  2\n     1  7  8\n     2  6  7\n     3  3  4\nkey2 0  1  9\n     1  1  3\n     2  7  8\n     3  1  0"}],
solution:`import pandas as pd\nteam_a_df1 = []\nteam_b_df1 = []\nfor _ in range(4):\n    a, b = map(int, input().split())\n    team_a_df1.append(a)\n    team_b_df1.append(b)\nteam_a_df2 = []\nteam_b_df2 = []\nfor _ in range(4):\n    a, b = map(int, input().split())\n    team_a_df2.append(a)\n    team_b_df2.append(b)\ndf1 = pd.DataFrame({'A': team_a_df1, 'B': team_b_df1})\ndf2 = pd.DataFrame({'A': team_a_df2, 'B': team_b_df2})\nconcatenated_df = pd.concat([df1, df2], keys=['key1', 'key2'])\nprint("df1:")\nprint(df1)\nprint("df2:")\nprint(df2)\nprint("After concatenating:")\nprint(concatenated_df)`}
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
