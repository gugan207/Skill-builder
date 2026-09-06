<![CDATA[<div align="center">

# 🎓 MIT Skill Builder

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-22C55E?style=for-the-badge&logo=github)](https://gugan207.github.io/Skill-builder/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Questions](https://img.shields.io/badge/Questions-134-orange?style=for-the-badge)](#question-breakdown)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

**An interactive Python coding practice platform built for exam preparation.**  
Browser-based IDE · Real-time code execution · Auto-graded test cases · MCQ quizzes · Cloud sync

[**🚀 Try the Live Demo →**](https://gugan207.github.io/Skill-builder/)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| **🖥️ Browser IDE** | Monaco Editor (VS Code engine) with Python syntax highlighting, auto-complete, and bracket matching |
| **🐍 In-Browser Python** | Code runs via [Skulpt](https://skulpt.org/) — no server or installation needed |
| **📚 134 Questions** | 44 coding problems + 90 MCQs across 9 weeks of curriculum |
| **✅ Auto-Grading** | Test cases run automatically with detailed error analysis (line diffs, case/spacing hints) |
| **📝 MCQ Quizzes** | Shuffled questions & options every session, auto-advance, animated score ring visualization |
| **☁️ Cloud Auth** | Supabase authentication with sign-up/sign-in and cross-device progress sync |
| **💾 Auto-Save** | Code saves to localStorage on every keystroke, syncs to cloud every 30 seconds |
| **🌗 Dark/Light Theme** | Toggle between dark and light themes with persistent preference |
| **📱 Responsive** | Works on desktop, tablet, and mobile with resizable panels |
| **⌨️ Keyboard Shortcuts** | `Ctrl+Enter` to run tests, `Ctrl+/` to toggle comments |

## 📊 Question Breakdown

| Week | Coding | MCQ | Total | Topics |
|------|--------|-----|-------|--------|
| Week 1 | 5 | 20 | 25 | Variables, I/O, Operators |
| Week 2 | 5 | 20 | 25 | Conditionals, Loops |
| Week 3 | 5 | 20 | 25 | Strings, Lists |
| Week 4 | 5 | 20 | 25 | Functions, Scope |
| Week 5 | 4 | 10 | 14 | Tuples, Dictionaries |
| Week 6 | 5 | — | 5 | File Handling |
| Week 7 | 5 | — | 5 | OOP Basics |
| Week 8 | 5 | — | 5 | Exception Handling |
| Week 9 | 5 | — | 5 | Pandas (offline) |
| **Total** | **44** | **90** | **134** | |

> [!NOTE]
> Week 9 questions use `pandas` which cannot run in the browser interpreter (Skulpt). These are designed for offline practice — use Python 3.10+ locally or Google Colab.

## 🚀 Quick Start

### Prerequisites

- [Node.js 14+](https://nodejs.org/) (for local dev server) **or** Python 3.x (for `http.server`)
- A modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/gugan207/Skill-builder.git
cd Skill-builder

# Option 1: Node.js server (recommended)
node server.js

# Option 2: Python server
python -m http.server 8000

# Option 3: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then open **http://localhost:8000** in your browser.

### Available Routes

| Route | Page |
|---|---|
| `/` or `/index.html` | Course dashboard |
| `/login.html` | Sign in / Sign up |
| `/mit_skill_builder_practice.html` | Practice IDE |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                 │
│  ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐  │
│  │  login.html │────▸│  index.html  │────▸│  practice.html  │  │
│  │  (auth.js)  │     │  (dashboard) │     │  (app.js)       │  │
│  └──────┬──────┘     └──────────────┘     │  (questions.js) │  │
│         │                                  │  (app-sync.js)  │  │
│         │                                  └────────┬────────┘  │
│         │                                           │           │
│         │    ┌──────────────────┐   ┌──────────┐    │           │
│         │    │  Monaco Editor   │   │  Skulpt   │   │           │
│         │    │  (VS Code core)  │   │  (Py→JS)  │   │           │
│         │    └──────────────────┘   └──────────┘    │           │
└─────────┼───────────────────────────────────────────┼───────────┘
          │                                           │
          ▼                                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SUPABASE (Backend)                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   Auth       │  │   profiles       │  │  user_progress   │  │
│  │  (email/pw)  │  │  (name, email)   │  │  (solved, code)  │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                 │
│  Row Level Security (RLS) — users can only access own data      │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Full VS Code editing experience in the browser |
| **Python Runtime** | [Skulpt](https://skulpt.org/) | Python 3.x interpreter compiled to JavaScript |
| **Auth & Database** | [Supabase](https://supabase.com/) | Authentication, PostgreSQL database, Row Level Security |
| **Fonts** | Google Fonts | JetBrains Mono (code) + IBM Plex Sans (UI) |
| **Deployment** | GitHub Pages | Static site hosting with CI/CD |

## 📁 Project Structure

```
Skill-builder/
├── index.html                      # Course dashboard (landing page)
├── login.html                      # Authentication page (sign-in / sign-up)
├── mit_skill_builder_practice.html  # Main practice IDE
│
├── app.js                          # Core app logic (IDE, navigation, test runner)
├── auth.js                         # Supabase authentication handlers
├── app-sync.js                     # Cloud progress sync (auto-save to Supabase)
├── questions.js                    # All 134 questions (coding + MCQ data)
├── tests.js                        # Browser-based test suite (88 tests)
├── server.js                       # Zero-dependency local dev server (Node.js)
│
├── style.css                       # Practice page styles (dark/light themes)
├── login.css                       # Login page styles
├── index.css                       # Dashboard page styles
├── favicon.svg                     # Terminal-style favicon
│
├── supabase_setup.sql              # Database schema + RLS policies
├── count.py                        # Question counter utility
├── export_data.py                  # Admin data export tool (CSV)
│
├── .gitignore                      # Git ignore rules
└── .github/
    └── workflows/
        └── keepalive.yml           # Cron job to ping Supabase (prevents hibernation)
```

## 🔐 Supabase Setup

If you're forking this project with your own Supabase instance:

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Run the Database Schema

Open **SQL Editor → New Query** and paste the contents of [`supabase_setup.sql`](supabase_setup.sql):

```sql
-- User profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Progress tracking
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  solved_questions JSONB DEFAULT '[]'::jsonb,
  code_saves JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

Both tables have **Row Level Security** enabled — users can only read/write their own rows.

### 3. Update Credentials

Get your keys from **Settings → API** in the Supabase dashboard, then update:

| File | Variables |
|------|-----------|
| [`auth.js`](auth.js) | `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| [`app-sync.js`](app-sync.js) | `SYNC_SUPABASE_URL`, `SYNC_SUPABASE_ANON_KEY` |
| [`.github/workflows/keepalive.yml`](.github/workflows/keepalive.yml) | URL and key in the `curl` command |

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 4. Keepalive Workflow

The GitHub Actions workflow pings Supabase every 3 days to prevent free-tier hibernation. Update the URL and key in [`keepalive.yml`](.github/workflows/keepalive.yml) with your own credentials.

## 📈 Admin: Exporting Student Data

Export all users' progress and points per week as a CSV file:

### One-Time Setup

Run in Supabase **SQL Editor** to grant read access for the export script:

```sql
CREATE POLICY "Allow read all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow read all progress" ON public.user_progress FOR SELECT USING (true);
```

### Run the Exporter

```bash
python export_data.py
```

Generates a timestamped CSV file like `SkillBuilder_Advanced_Export_2026-09-06_15-30-00.csv`.

## 🧪 Testing

### Automated Tests (88 tests)

The project includes comprehensive tests covering:

- ✅ File existence (15 files)
- ✅ HTML structure and DOM elements
- ✅ JavaScript cross-references (all functions called from HTML exist)
- ✅ Content accuracy (question counts match)
- ✅ Security headers and XSS protection
- ✅ CSS coverage (themes, responsive, MCQ styles)
- ✅ Git configuration
- ✅ Supabase config consistency

### Browser Tests

Open the practice page and run in the DevTools console:

```javascript
// Load and run all tests
const s = document.createElement('script');
s.src = 'tests.js';
document.head.appendChild(s);
setTimeout(() => runAllTests(), 500);
```

### Manual Testing Checklist

<details>
<summary>Click to expand</summary>

- [ ] Sign up with email/password
- [ ] Sign in with existing account
- [ ] Navigate between weeks (Week 1–9)
- [ ] Select coding questions and view descriptions
- [ ] Write Python code and run tests
- [ ] Verify test results show pass/fail with error details
- [ ] Toggle hint, answer, and load solution
- [ ] Test MCQ quiz flow with auto-advance
- [ ] Verify MCQ final result screen with score ring
- [ ] Toggle dark/light theme
- [ ] Resize panels on desktop
- [ ] Test mobile panel toggle
- [ ] Sign out and verify redirect to login
- [ ] Refresh page and verify progress persists

</details>

## 🚢 Deployment

### GitHub Pages (Recommended)

1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root directory
4. Your site will be live at `https://username.github.io/Skill-builder/`

### Netlify / Vercel

Drag and drop the project folder — no build step needed. The app is fully static.

## 🛡️ Security

| Aspect | Implementation |
|--------|---------------|
| **API Key** | Supabase anon key is a public key — safe to expose client-side |
| **Database** | All access protected by Row Level Security (RLS) |
| **Data Isolation** | Users can only read/write their own data |
| **Server** | Directory traversal protection + security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) |
| **XSS Prevention** | All user output escaped via `escapeHtml()` |

## 🔧 Development

### Adding Questions

Edit [`questions.js`](questions.js):

```javascript
// Coding question
{ week: 10, num: 1, title: "New Question",
  desc: "Description here",
  inputFmt: "Input format",
  outputFmt: "Output format",
  hint: "A helpful hint",
  tests: [{ input: "test input", expected: "expected output" }],
  solution: `python code here` }

// MCQ question
{ week: 10, num: 1, type: 'mcq',
  question: "What is the output?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: "Option A" }
```

### CSS Design Tokens

The design system uses CSS custom properties defined in each stylesheet's `:root`:

```css
--bg: #0F172A;           /* Background */
--text: #F8FAFC;         /* Primary text */
--accent: #22C55E;       /* Green accent */
--border: #475569;       /* Border color */
--mono: 'JetBrains Mono', monospace;
--sans: 'IBM Plex Sans', sans-serif;
```

## 🌐 Browser Compatibility

| Browser | Minimum Version |
|---------|-----------------|
| Chrome  | 90+             |
| Firefox | 88+             |
| Safari  | 14+             |
| Edge    | 90+             |

## ❓ Troubleshooting

| Issue | Solution |
|---|---|
| Monaco editor won't load | Check internet connection — Monaco loads from CDN |
| Python code hangs | Code has infinite loop — execution timeout is 5 seconds |
| "Unsupported module" error | Week 9 uses pandas — run locally with `python3` |
| Progress not syncing | Verify Supabase project is active (check for hibernation) |
| Login fails | Check Supabase dashboard for auth settings and email confirmation |
| Mobile layout issues | Clear cache and reload — CSS is responsive down to 320px |
| Supabase hibernated | Go to Supabase dashboard and resume the project, or trigger the keepalive workflow manually |

## 📜 License

MIT License — see individual files for details.

## 🙏 Credits

| Technology | Purpose |
|-----------|---------|
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Browser-based code editor (Microsoft) |
| [Skulpt](https://skulpt.org/) | Python-to-JavaScript compiler |
| [Supabase](https://supabase.com/) | Open-source Firebase alternative |
| [Google Fonts](https://fonts.google.com/) | JetBrains Mono + IBM Plex Sans |

---

<div align="center">

**Version:** 2.1.0 &nbsp;·&nbsp; **Last Updated:** 2026-09-06 &nbsp;·&nbsp; **Questions:** 134 (44 Coding + 90 MCQ across 9 Weeks)

Made with ❤️ for MIT students

</div>
]]>
