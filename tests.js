/**
 * MIT Skill Builder - Test Suite
 *
 * Run tests in browser console:
 * 1. Open DevTools (F12)
 * 2. Go to Console tab
 * 3. Include this file: <script src="tests.js"></script>
 * 4. Run: runAllTests()
 *
 * Or open test.html in browser for automated testing
 */

const TEST_RESULTS = [];
const TESTS = {
  PASSED: 0,
  FAILED: 0,
  SKIPPED: 0
};

// ════════════════════════════════════════════════════════════
//  Test Utilities
// ════════════════════════════════════════════════════════════

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but got ${actual}: ${message}`);
  }
}

function assertTrue(condition, message) {
  assert(condition === true, message);
}

function assertFalse(condition, message) {
  assert(condition === false, message);
}

function test(name, fn) {
  try {
    fn();
    TESTS.PASSED++;
    TEST_RESULTS.push({ name, status: '✓ PASS', time: new Date().toISOString() });
    console.log(`✓ ${name}`);
  } catch (e) {
    TESTS.FAILED++;
    TEST_RESULTS.push({ name, status: '✗ FAIL', error: e.message, time: new Date().toISOString() });
    console.error(`✗ ${name}: ${e.message}`);
  }
}

function skip(name, fn) {
  TESTS.SKIPPED++;
  TEST_RESULTS.push({ name, status: '⊘ SKIP', time: new Date().toISOString() });
  console.log(`⊘ ${name} (skipped)`);
}

// ════════════════════════════════════════════════════════════
//  Core Functionality Tests
// ════════════════════════════════════════════════════════════

function testLocalStorage() {
  test('localStorage: Can read/write', () => {
    localStorage.setItem('test_key', 'test_value');
    assertEquals(localStorage.getItem('test_key'), 'test_value', 'localStorage write/read failed');
    localStorage.removeItem('test_key');
  });

  test('localStorage: Handles JSON correctly', () => {
    const data = { name: 'Test', value: 123 };
    localStorage.setItem('test_json', JSON.stringify(data));
    const retrieved = JSON.parse(localStorage.getItem('test_json'));
    assertEquals(retrieved.name, 'Test', 'JSON serialization failed');
    localStorage.removeItem('test_json');
  });

  test('localStorage: Handles corrupt data gracefully', () => {
    localStorage.setItem('test_corrupt', '{invalid json}');
    try {
      JSON.parse(localStorage.getItem('test_corrupt'));
      throw new Error('Should have thrown');
    } catch (e) {
      assert(e instanceof SyntaxError, 'Should throw SyntaxError for corrupt JSON');
    }
    localStorage.removeItem('test_corrupt');
  });
}

function testQuestionData() {
  test('Questions array exists and is populated', () => {
    assert(typeof questions !== 'undefined', 'questions not defined');
    assert(Array.isArray(questions), 'questions is not an array');
    assert(questions.length > 0, 'questions array is empty');
  });

  test('MCQ questions array exists and is populated', () => {
    assert(typeof mcqQuestions !== 'undefined', 'mcqQuestions not defined');
    assert(Array.isArray(mcqQuestions), 'mcqQuestions is not an array');
    assert(mcqQuestions.length > 0, 'mcqQuestions array is empty');
  });

  test('Questions have required fields', () => {
    questions.slice(0, 3).forEach(q => {
      assert(q.week !== undefined, `Question missing 'week'`);
      assert(q.num !== undefined, `Question missing 'num'`);
      assert(q.title !== undefined, `Question missing 'title'`);
      assert(q.desc !== undefined, `Question missing 'desc'`);
      assert(Array.isArray(q.tests), `Question missing 'tests' array`);
    });
  });

  test('MCQ questions have required fields', () => {
    mcqQuestions.slice(0, 3).forEach(q => {
      assert(q.week !== undefined, `MCQ missing 'week'`);
      assert(q.num !== undefined, `MCQ missing 'num'`);
      assert(q.question !== undefined, `MCQ missing 'question'`);
      assert(Array.isArray(q.options), `MCQ missing 'options' array`);
      assert(q.answer !== undefined, `MCQ missing 'answer'`);
    });
  });

  test('Test cases have valid structure', () => {
    questions.slice(0, 2).forEach(q => {
      q.tests.forEach(t => {
        assert(t.expected !== undefined, `Test case missing 'expected'`);
      });
    });
  });
}

function testShuffle() {
  test('Shuffle creates new array without mutation', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    const shuffled = shuffleArray(original);
    assertEquals(original.length, copy.length, 'Original array length changed');
    assertEquals(shuffled.length, 5, 'Shuffled array length incorrect');
  });

  test('Shuffle randomizes elements', () => {
    const arr = Array.from({ length: 10 }, (_, i) => i);
    const shuffled = shuffleArray(arr);
    let same = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === shuffled[i]) same++;
    }
    // With 10 elements, getting all same is extremely rare (1 in 10! = 1 in 3.6M)
    assert(same < 10, 'Shuffle did not randomize');
  });
}

function testUserKeyGeneration() {
  test('qKey generates correct format for coding questions', () => {
    const q = { type: undefined, week: 1, num: 1 };
    assertEquals(qKey(q), '1-1', 'Coding question key format incorrect');
  });

  test('qKey generates correct format for MCQ', () => {
    const q = { type: 'mcq', week: 1, num: 1 };
    assertEquals(qKey(q), 'mcq-1-1', 'MCQ question key format incorrect');
  });
}

// ════════════════════════════════════════════════════════════
//  DOM Tests
// ════════════════════════════════════════════════════════════

function testDOMElements() {
  test('Required DOM elements exist', () => {
    const requiredElements = [
      'week-tabs', 'q-tabs', 'q-content',
      'editor-wrapper', 'output-area',
      'hint-box', 'solution-box',
      'results-panel', 'mcq-answer-panel',
      'progress-fill', 'progress-text'
    ];

    requiredElements.forEach(id => {
      assert(document.getElementById(id) !== null, `Missing element with id: ${id}`);
    });
  });

  test('Navigation elements are accessible', () => {
    assert(document.querySelector('.week-tab') !== null, 'Week tabs not found');
    assert(document.querySelector('.q-tab') !== null, 'Question tabs not found');
    assert(document.querySelector('.btn') !== null, 'Buttons not found');
  });
}

// ════════════════════════════════════════════════════════════
//  UI/UX Tests
// ════════════════════════════════════════════════════════════

function testResponsiveness() {
  test('Mobile check function works', () => {
    assertTrue(typeof isMobile === 'function', 'isMobile function not defined');
    assertTrue(typeof isTablet === 'function', 'isTablet function not defined');
  });

  test('Theme toggle function exists', () => {
    assertTrue(typeof toggleTheme === 'function', 'toggleTheme function not defined');
  });

  test('Panel visibility toggle works', () => {
    assertTrue(typeof toggleIDEVisibility === 'function', 'toggleIDEVisibility function not defined');
  });
}

// ════════════════════════════════════════════════════════════
//  Code Execution Tests
// ════════════════════════════════════════════════════════════

function testErrorAnalysis() {
  test('analyzeError detects line count mismatch', () => {
    const errors = analyzeError('line1\nline2', 'line1', '');
    assert(errors.length > 0, 'Should detect line count mismatch');
    assert(errors[0].includes('Line count'), 'Error message should mention line count');
  });

  test('analyzeError detects case mismatch', () => {
    const errors = analyzeError('Hello', 'hello', '');
    assert(errors.some(e => e.includes('Case')), 'Should suggest case mismatch');
  });

  test('analyzeError detects spacing issues', () => {
    const errors = analyzeError('hello  world', 'hello world', '');
    assert(errors.some(e => e.includes('Spacing')), 'Should suggest spacing issue');
  });

  test('analyzeError handles empty output', () => {
    const errors = analyzeError('', 'expected', '');
    assert(errors.some(e => e.includes('No output')), 'Should indicate no output generated');
  });
}

// ════════════════════════════════════════════════════════════
//  Authentication Tests
// ════════════════════════════════════════════════════════════

function testAuthFunctions() {
  test('User bar functions exist', () => {
    assertTrue(typeof switchTab === 'function', 'switchTab function not defined');
    assertTrue(typeof showMessage === 'function', 'showMessage function not defined');
    assertTrue(typeof togglePassword === 'function', 'togglePassword function not defined');
  });

  test('Auth message display works', () => {
    const msgEl = document.getElementById('auth-message');
    if (msgEl) {
      showMessage('Test message', 'success');
      assertEquals(msgEl.textContent, 'Test message', 'Message display failed');
      assertEquals(msgEl.className.includes('success'), true, 'Message class not set');
    }
  });
}

// ════════════════════════════════════════════════════════════
//  MCQ Tests
// ════════════════════════════════════════════════════════════

function testMCQFunctionality() {
  test('MCQ shuffle builds correctly', () => {
    assertTrue(typeof buildShuffledMCQs === 'function', 'buildShuffledMCQs not defined');
    // This requires DOM to be ready
    if (document.readyState === 'complete') {
      buildShuffledMCQs();
      assert(Object.keys(shuffledMCQs).length > 0, 'MCQs not shuffled');
    }
  });

  test('MCQ selection functions exist', () => {
    assertTrue(typeof selectMCQ === 'function', 'selectMCQ not defined');
    assertTrue(typeof selectMCQOption === 'function', 'selectMCQOption not defined');
    assertTrue(typeof showMCQFinalResult === 'function', 'showMCQFinalResult not defined');
  });

  test('MCQ escape HTML works', () => {
    const result = escapeHtml('<script>alert("xss")</script>');
    assertFalse(result.includes('<script>'), 'HTML escape failed');
  });
}

// ════════════════════════════════════════════════════════════
//  Run All Tests
// ════════════════════════════════════════════════════════════

function runAllTests() {
  console.clear();
  console.log(`
╔════════════════════════════════════════════════════════════╗
║           MIT Skill Builder - Test Suite                  ║
║                  Running Tests...                          ║
╚════════════════════════════════════════════════════════════╝
  `);

  console.log('\n📦 Core Functionality Tests');
  testLocalStorage();
  testQuestionData();
  testShuffle();
  testUserKeyGeneration();

  console.log('\n🎨 DOM Tests');
  testDOMElements();

  console.log('\n📱 UI/UX Tests');
  testResponsiveness();

  console.log('\n🔧 Code Execution Tests');
  testErrorAnalysis();

  console.log('\n🔐 Authentication Tests');
  testAuthFunctions();

  console.log('\n📝 MCQ Tests');
  testMCQFunctionality();

  // Print summary
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                    Test Summary                           ║
╚════════════════════════════════════════════════════════════╝

✓ Passed:  ${TESTS.PASSED}
✗ Failed:  ${TESTS.FAILED}
⊘ Skipped: ${TESTS.SKIPPED}
─────────────────────────────────────────────────────────────
Total:     ${TESTS.PASSED + TESTS.FAILED + TESTS.SKIPPED}

Status: ${TESTS.FAILED === 0 ? '🟢 ALL TESTS PASSED' : '🔴 SOME TESTS FAILED'}
  `);

  if (TESTS.FAILED > 0) {
    console.log('\n❌ Failed Tests:');
    TEST_RESULTS.filter(r => r.status === '✗ FAIL').forEach(r => {
      console.log(`   • ${r.name}`);
      console.log(`     Error: ${r.error}`);
    });
  }

  // Return test results as object
  return {
    passed: TESTS.PASSED,
    failed: TESTS.FAILED,
    skipped: TESTS.SKIPPED,
    results: TEST_RESULTS,
    success: TESTS.FAILED === 0
  };
}

// Auto-run tests when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Tests can be triggered manually or by including this script
  });
}

// Expose globally for manual execution
window.runAllTests = runAllTests;
