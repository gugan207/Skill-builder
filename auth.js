// ══════════════════════════════════════════════════════════════
//  Supabase Configuration
//  ⚠️  Replace these with YOUR Supabase project credentials!
//  Get them from: https://supabase.com → Your Project → Settings → API
// ══════════════════════════════════════════════════════════════
const SUPABASE_URL = 'https://qvdsyvqjckpbegyhzeyi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZHN5dnFqY2twYmVneWh6ZXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzgyOTQsImV4cCI6MjA5MjQ1NDI5NH0.J-jlxJLDvUHFWHhVH0VDOiRkfSQ6x4S1PrN5RxPCMiY';

let sbClient = null;

// Initialize Supabase client
function initSupabase() {
  try {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return true;
    }
    // Try the module-style import
    if (typeof supabaseJs !== 'undefined') {
      sbClient = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return true;
    }
  } catch (e) {
    console.error('Failed to init Supabase:', e);
  }
  return false;
}

// ══════════════════════════════════════════════════════════════
//  UI Helpers
// ══════════════════════════════════════════════════════════════
function switchTab(tab) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const indicator = document.getElementById('tab-indicator');
  const msg = document.getElementById('auth-message');
  msg.style.display = 'none';

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    indicator.classList.remove('right');
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    indicator.classList.add('right');
  }
}

function showMessage(text, type) {
  const msg = document.getElementById('auth-message');
  msg.textContent = text;
  msg.className = 'auth-message ' + type;
  msg.style.display = 'block';
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  const text = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  btn.disabled = loading;
  text.style.display = loading ? 'none' : 'inline';
  loader.style.display = loading ? 'block' : 'none';
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  btn.innerHTML = isPassword
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

// ══════════════════════════════════════════════════════════════
//  Auth Handlers
// ══════════════════════════════════════════════════════════════
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!sbClient) {
    showMessage('Database not connected. Check Supabase config.', 'error');
    return;
  }

  setLoading('login-btn', true);

  try {
    const { data, error } = await sbClient.auth.signInWithPassword({ email, password });

    if (error) {
      showMessage(error.message, 'error');
      setLoading('login-btn', false);
      return;
    }

    // Save user session info
    localStorage.setItem('sb_user', JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name || email.split('@')[0]
    }));

    // Sync progress from cloud
    await syncProgressFromCloud(data.user.id);

    showMessage('Welcome back! Redirecting...', 'success');
    setLoading('login-btn', false);
    setTimeout(() => { window.location.href = 'mit_skill_builder_practice.html'; }, 800);
  } catch (err) {
    showMessage('Something went wrong. Please try again.', 'error');
    setLoading('login-btn', false);
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (password !== confirm) {
    showMessage('Passwords do not match.', 'error');
    return;
  }

  if (!sbClient) {
    showMessage('Database not connected. Check Supabase config.', 'error');
    return;
  }

  setLoading('signup-btn', true);

  try {
    const { data, error } = await sbClient.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });

    if (error) {
      showMessage(error.message, 'error');
      setLoading('signup-btn', false);
      return;
    }

    // Check if email confirmation is required
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      showMessage('An account with this email already exists.', 'error');
      setLoading('signup-btn', false);
      return;
    }

    // Save user session
    if (data.session) {
      localStorage.setItem('sb_user', JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        name: name
      }));

      // Create initial profile in DB
      await createUserProfile(data.user.id, name, email);

      showMessage('Account created! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'mit_skill_builder_practice.html'; }, 800);
    } else {
      showMessage('Check your email to confirm your account, then sign in.', 'info');
      setLoading('signup-btn', false);
      switchTab('login');
    }
  } catch (err) {
    showMessage('Something went wrong. Please try again.', 'error');
    setLoading('signup-btn', false);
  }
}


// ══════════════════════════════════════════════════════════════
//  Database Helpers
// ══════════════════════════════════════════════════════════════
async function createUserProfile(userId, name, email) {
  if (!sbClient) return;
  try {
    await sbClient.from('profiles').upsert({
      id: userId,
      full_name: name,
      email: email,
      created_at: new Date().toISOString()
    });
  } catch (e) {
    console.warn('Could not create profile:', e);
  }
}

async function syncProgressFromCloud(userId) {
  if (!sbClient) return;
  try {
    const { data } = await sbClient
      .from('user_progress')
      .select('solved_questions, code_saves')
      .eq('user_id', userId)
      .single();

    if (data) {
      // Use user-specific localStorage keys
      const userSolvedKey = 'sb_solved_' + userId;
      const userCodePrefix = 'sb_code_' + userId + '_';

      // Merge cloud progress with local progress
      // Note: Supabase returns JSONB as objects, but may be strings if stored that way
      if (data.solved_questions) {
        const cloudSolved = typeof data.solved_questions === 'string'
          ? JSON.parse(data.solved_questions) : data.solved_questions;
        const localSolved = JSON.parse(localStorage.getItem(userSolvedKey) || '[]');
        const merged = [...new Set([...localSolved, ...cloudSolved])];
        localStorage.setItem(userSolvedKey, JSON.stringify(merged));
      }
      if (data.code_saves) {
        const cloudCode = typeof data.code_saves === 'string'
          ? JSON.parse(data.code_saves) : data.code_saves;
        Object.keys(cloudCode).forEach(key => {
          if (!localStorage.getItem(userCodePrefix + key)) {
            localStorage.setItem(userCodePrefix + key, cloudCode[key]);
          }
        });
      }
    }
  } catch (e) {
    console.warn('Could not sync progress:', e);
  }
}

// ══════════════════════════════════════════════════════════════
//  Init — runs after DOM is ready
// ══════════════════════════════════════════════════════════════
function initAuth() {
  initSupabase();

  // If user is already logged in, redirect
  const user = localStorage.getItem('sb_user');
  if (user) {
    window.location.href = 'mit_skill_builder_practice.html';
    return;
  }

  // Check Supabase config
  if (SUPABASE_URL.includes('YOUR_PROJECT_ID')) {
    showMessage('⚠️ Supabase not configured yet. See auth.js to add your API keys.', 'info');
  }

  // Bind tab switching
  document.getElementById('tab-login').addEventListener('click', function() { switchTab('login'); });
  document.getElementById('tab-signup').addEventListener('click', function() { switchTab('signup'); });

  // Bind form submissions
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleSignup);


  // Bind password toggles
  var toggleBtns = document.querySelectorAll('.toggle-pw');
  for (var i = 0; i < toggleBtns.length; i++) {
    (function(btn) {
      btn.addEventListener('click', function() { togglePassword(btn.dataset.target, btn); });
    })(toggleBtns[i]);
  }
}

// Handle case where DOMContentLoaded already fired (scripts loaded after DOM ready)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}
