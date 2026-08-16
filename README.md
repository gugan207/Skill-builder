# MIT Skill Builder

An interactive Python coding practice platform built for exam preparation. Features a browser-based IDE with real-time code execution, auto-graded test cases, and MCQ quizzes — all running entirely in the browser.

## Live Demo

**[https://gugan207.github.io/Skill-builder/](https://gugan207.github.io/Skill-builder/)**

## Features

| Feature | Description |
|---|---|
| **Browser IDE** | Monaco Editor (VS Code engine) with Python syntax highlighting, auto-complete, and bracket matching |
| **In-Browser Python** | Code runs via [Skulpt](https://skulpt.org/) — no server needed |
| **134 Questions** | 44 coding problems + 90 MCQs across 9 weeks |
| **Auto-Grading** | Test cases run automatically with detailed error analysis (line diffs, case/spacing hints) |
| **MCQ Quizzes** | Shuffled questions and options every session, auto-advance, score ring visualization |
| **Cloud Auth** | Supabase authentication with sign-up/sign-in and cross-device progress sync |
| **Auto-Save** | Code saves to localStorage on every keystroke, syncs to cloud every 30 seconds |
| **Dark/Light Theme** | Toggle between dark and light themes with persistent preference |
| **Responsive** | Works on desktop, tablet, and mobile with resizable panels |
| **Keyboard Shortcuts** | `Ctrl+Enter` to run tests, `Ctrl+/` to toggle comments |

## Question Breakdown

| Week | Coding | MCQ | Total |
|------|--------|-----|-------|
| Week 1 | 5 | 20 | 25 |
| Week 2 | 5 | 20 | 25 |
| Week 3 | 5 | 20 | 25 |
| Week 4 | 5 | 20 | 25 |
| Week 5 | 4 | 10 | 14 |
| Week 6 | 5 | — | 5 |
| Week 7 | 5 | — | 5 |
| Week 8 | 5 | — | 5 |
| Week 9 | 5 | — | 5 |
| **Total** | **44** | **90** | **134** |

> **Note:** Week 9 questions use `pandas` which cannot run in the browser interpreter. These are designed for offline practice — use Python 3.10+ locally or Google Colab.

## Project Structure

```
Skill-builder/
├── index.html                      # Course dashboard (landing page)
├── login.html                      # Authentication page (sign-in / sign-up)
├── mit_skill_builder_practice.html  # Main practice IDE
├── app.js                          # Core app logic (IDE, navigation, test runner)
├── auth.js                         # Supabase authentication handlers
├── app-sync.js                     # Cloud progress sync (auto-save to Supabase)
├── questions.js                    # All 134 questions (coding + MCQ data)
├── tests.js                        # Browser-based test suite
├── server.js                       # Local dev server (Node.js)
├── style.css                       # Practice page styles
├── login.css                       # Login page styles
├── index.css                       # Dashboard page styles
├── favicon.svg                     # Terminal-style favicon
├── supabase_setup.sql              # Database schema + RLS policies
├── count.py                        # Question counter utility
├── export_data.py                  # Admin data export tool (CSV)
├── .gitignore                      # Git ignore rules
└── .github/
    └── workflows/
        └── keepalive.yml           # Cron job to ping Supabase (prevents hibernation)
```

## Quick Start

### Prerequisites

- [Node.js 14+](https://nodejs.org/) (for local dev server) or any static file server
- A modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/gugan207/Skill-builder.git
cd Skill-builder

# Start the development server
node server.js

# Or use Python's built-in server
python -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

### Available Routes

| Route | Page |
|---|---|
| `/` or `/index.html` | Course dashboard |
| `/login.html` | Sign in / Sign up |
| `/mit_skill_builder_practice.html` | Practice IDE |

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌───────────────────┐
│  login.html │────▸│  index.html  │────▸│  practice.html    │
│  (auth.js)  │     │  (dashboard) │     │  (app.js)         │
└──────┬──────┘     └──────────────┘     │  (questions.js)   │
       │                                  │  (app-sync.js)    │
       ▼                                  └────────┬──────────┘
┌──────────────┐                                   │
│  Supabase    │◂──────────────────────────────────┘
│  (Auth + DB) │   Cloud sync: solved questions,
└──────────────┘   code saves, user profiles
```

**Client-Side Stack:**
- **Monaco Editor** — Full VS Code editing experience in the browser
- **Skulpt** — Python 3.x interpreter compiled to JavaScript
- **Supabase JS SDK** — Authentication and real-time database

**Backend (Supabase):**
- `profiles` table — User names and emails
- `user_progress` table — Solved questions (JSONB) and saved code (JSONB)
- Row Level Security (RLS) — Users can only access their own data

## Supabase Setup

If you're forking this project with your own Supabase instance:

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run [`supabase_setup.sql`](supabase_setup.sql)
3. Update credentials in [`auth.js`](auth.js) and [`app-sync.js`](app-sync.js):

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

4. Get your keys from **Settings → API** in the Supabase dashboard

### Database Schema

```sql
-- User profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Progress tracking
CREATE TABLE user_progress (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  solved_questions JSONB DEFAULT '[]',
  code_saves JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

Both tables have RLS enabled — users can only read/write their own rows.

## Testing

### Automated Tests (Node.js)

The project includes 88 automated tests covering:

- ✅ File existence (15 files)
- ✅ HTML structure and DOM elements
- ✅ JavaScript cross-references (all functions called from HTML exist)
- ✅ Content accuracy (question counts match)
- ✅ Security headers and XSS protection
- ✅ CSS coverage (themes, responsive, MCQ styles)
- ✅ Git configuration
- ✅ Supabase config consistency

### Browser Tests

Open the practice page and run in the console:

```javascript
// Include the test file
const s = document.createElement('script');
s.src = 'tests.js';
document.head.appendChild(s);

// Then run all tests
setTimeout(() => runAllTests(), 500);
```

Tests cover: localStorage, question data integrity, DOM elements, shuffle randomization, error analysis, MCQ functionality, and theme toggling.

### Manual Testing Checklist

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

## Deployment

### GitHub Pages (Recommended)

1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root directory
4. Your site will be live at `https://username.github.io/Skill-builder/`

### Netlify / Vercel

Drag and drop the project folder — no build step needed.

## Security Notes

- The Supabase **anon key** is a public key, safe to expose in client-side code
- All database access is protected by Row Level Security (RLS)
- Users can only read/write their own data
- The server includes directory traversal protection and security headers
- HTML output is escaped via `escapeHtml()` to prevent XSS

## Development

### Adding Questions

Edit [`questions.js`](questions.js):

```javascript
// Coding question
{week:10, num:1, title:"New Question",
 desc:"Description here",
 inputFmt:"Input format",
 outputFmt:"Output format",
 hint:"A helpful hint",
 tests:[{input:"test input", expected:"expected output"}],
 solution:`python code here`}

// MCQ question
{week:10, num:1, type:'mcq',
 question:"What is the output?",
 options:["Option A","Option B","Option C","Option D"],
 answer:"Option A"}
```

### CSS Variables

The design system uses CSS custom properties defined in each stylesheet's `:root`:

```css
--bg: #0F172A;        /* Background */
--text: #F8FAFC;      /* Primary text */
--accent: #22C55E;    /* Green accent */
--border: #475569;    /* Border color */
--mono: 'JetBrains Mono', monospace;
--sans: 'IBM Plex Sans', sans-serif;
```

### Keepalive Workflow

The GitHub Actions workflow (`.github/workflows/keepalive.yml`) pings Supabase every 3 days to prevent the free-tier project from hibernating.

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Troubleshooting

| Issue | Solution |
|---|---|
| Monaco editor won't load | Check internet connection — Monaco loads from CDN |
| Python code hangs | Code has infinite loop — execution timeout is 5 seconds |
| "Unsupported module" error | Week 9 uses pandas — run locally with `python3` |
| Progress not syncing | Verify Supabase project is active and credentials are correct |
| Login fails | Check Supabase dashboard for auth settings and email confirmation |
| Mobile layout issues | Clear cache and reload — CSS is responsive down to 320px |

## License

MIT License — see individual files for details.

## Credits

- **Monaco Editor** — Microsoft ([CDN](https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/))
- **Skulpt** — Python-to-JavaScript compiler ([skulpt.org](https://skulpt.org/))
- **Supabase** — Open-source Firebase alternative ([supabase.com](https://supabase.com/))
- **Fonts** — JetBrains Mono + IBM Plex Sans via Google Fonts

---

**Version:** 2.0.0  
**Last Updated:** 2026-08-16  
**Questions:** 134 (44 Coding + 90 MCQ across 9 Weeks)
