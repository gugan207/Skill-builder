// ══════════════════════════════════════════════════════════════
//  App Sync — Cloud progress sync for logged-in users
//  This file runs on the practice page after app.js
// ══════════════════════════════════════════════════════════════

// ⚠️  WARNING: For production use, these credentials should be moved server-side
// ⚠️  This anon key is visible to users but with RLS it's safe for demo use only
const SYNC_SUPABASE_URL = 'https://ygfcmcldroxjmlpiqhsj.supabase.co';
const SYNC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZmNtY2xkcm94am1scGlxaHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MDkwNzMsImV4cCI6MjEwNDI4NTA3M30.AcEY0aX-7AbqwT_Ham7XZDnXZx8Z8GAU9PVdnIggwqw';

let syncClient = null;
let currentUser = null;
let syncInProgress = false;
let syncIntervalId = null;

// Initialize sync after DOM is ready
function initSync() {
  try {
    // Check if user is logged in
    const userStr = localStorage.getItem('sb_user');
    if (!userStr) {
      // Not logged in — no sync needed
      return;
    }

    currentUser = JSON.parse(userStr);

    // Initialize Supabase client for sync
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      syncClient = window.supabase.createClient(SYNC_SUPABASE_URL, SYNC_SUPABASE_ANON_KEY);
    }

    // Auto-save progress to cloud every 30 seconds (only if client available)
    if (syncClient) {
      syncIntervalId = setInterval(() => {
        if (!syncInProgress) syncProgressToCloud();
      }, 30000);

      // Also sync when user closes the page
      window.addEventListener('beforeunload', () => {
        if (!syncInProgress) syncProgressToCloud();
      });
    }
  } catch (e) {
    console.warn('Sync initialization failed (non-fatal):', e);
  }
}

// Handle case where DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSync);
} else {
  initSync();
}

// Sync local progress to cloud
async function syncProgressToCloud() {
  if (!syncClient || !currentUser || syncInProgress) return;

  syncInProgress = true;
  try {
    // Use user-specific localStorage keys
    const userSolvedKey = 'sb_solved_' + currentUser.id;
    const userCodePrefix = 'sb_code_' + currentUser.id + '_';

    const solvedRaw = localStorage.getItem(userSolvedKey) || '[]';
    let solvedArray = [];
    try {
      solvedArray = JSON.parse(solvedRaw);
    } catch (e) {
      console.warn('Invalid solved data, skipping sync');
      return;
    }

    // Collect all saved code for this user
    const codeSaves = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(userCodePrefix)) {
        try {
          codeSaves[key.replace(userCodePrefix, '')] = localStorage.getItem(key);
        } catch (e) {
          // Skip invalid entries
        }
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
  } finally {
    syncInProgress = false;
  }
}

// Logout handler
async function handleLogout() {
  // Save progress before logout
  if (syncClient && currentUser) {
    try {
      await syncProgressToCloud();
    } catch (e) {
      console.warn('Logout sync failed:', e);
    }
  }
  localStorage.removeItem('sb_user');
  if (syncIntervalId) clearInterval(syncIntervalId);
  window.location.href = 'login.html';
}

// Expose to global scope for onclick handler
window.handleLogout = handleLogout;
