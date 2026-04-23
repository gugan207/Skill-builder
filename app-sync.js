// ══════════════════════════════════════════════════════════════
//  App Sync — Cloud progress sync for logged-in users
//  This file runs on the practice page after app.js
// ══════════════════════════════════════════════════════════════

const SYNC_SUPABASE_URL = 'https://qvdsyvqjckpbegyhzeyi.supabase.co';
const SYNC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZHN5dnFqY2twYmVneWh6ZXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzgyOTQsImV4cCI6MjA5MjQ1NDI5NH0.J-jlxJLDvUHFWHhVH0VDOiRkfSQ6x4S1PrN5RxPCMiY';

let syncClient = null;
let currentUser = null;

// Initialize sync after DOM is ready
function initSync() {
  // Check if user is logged in
  const userStr = localStorage.getItem('sb_user');
  if (!userStr) {
    // Not logged in — no sync needed
    return;
  }

  try {
    currentUser = JSON.parse(userStr);
  } catch (e) {
    return;
  }

  // Show user bar
  const userBar = document.getElementById('user-bar');
  const greeting = document.getElementById('user-greeting');
  if (userBar && greeting) {
    greeting.textContent = '👋 Hello, ' + (currentUser.name || currentUser.email);
    userBar.style.display = 'flex';
  }

  // Initialize Supabase client for sync
  try {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      syncClient = window.supabase.createClient(SYNC_SUPABASE_URL, SYNC_SUPABASE_ANON_KEY);
    }
  } catch (e) {
    console.warn('Sync client init failed:', e);
  }

  // Auto-save progress to cloud every 30 seconds
  setInterval(syncProgressToCloud, 30000);

  // Also sync when user closes the page
  window.addEventListener('beforeunload', syncProgressToCloud);
}

// Handle case where DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSync);
} else {
  initSync();
}

// Sync local progress to cloud
async function syncProgressToCloud() {
  if (!syncClient || !currentUser) return;

  try {
    // Use user-specific localStorage keys
    const userSolvedKey = 'sb_solved_' + currentUser.id;
    const userCodePrefix = 'sb_code_' + currentUser.id + '_';

    const solvedRaw = localStorage.getItem(userSolvedKey) || '[]';
    // Parse to ensure valid JSON, then send as a proper object for JSONB column
    const solvedArray = JSON.parse(solvedRaw);

    // Collect all saved code for this user
    const codeSaves = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(userCodePrefix)) {
        codeSaves[key.replace(userCodePrefix, '')] = localStorage.getItem(key);
      }
    }

    await syncClient.from('user_progress').upsert({
      user_id: currentUser.id,
      solved_questions: solvedArray,
      code_saves: codeSaves,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  } catch (e) {
    console.warn('Cloud sync failed (will retry):', e);
  }
}

// Logout handler
function handleLogout() {
  // Save progress before logout
  syncProgressToCloud().finally(() => {
    localStorage.removeItem('sb_user');
    window.location.href = 'login.html';
  });
}

// Expose to global scope for onclick handler
window.handleLogout = handleLogout;

