let currentQ=null,currentWeek=1,solved=new Set();
let isMCQMode=false;
let shuffledMCQs={}; // per-week shuffled MCQ arrays

// ── Shuffle utility (Fisher-Yates) — fresh random every page load ──
function shuffleArray(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

// Build shuffled MCQs per week — randomized every time the page loads
function buildShuffledMCQs(){
  const weeks=[...new Set(mcqQuestions.map(q=>q.week))];
  weeks.forEach(w=>{
    const weekQs=mcqQuestions.filter(q=>q.week===w);
    // Shuffle question order
    const shuffled=shuffleArray(weekQs);
    // Shuffle options for each question (correct answer is tracked by value, not index)
    shuffled.forEach(q=>{
      q._shuffledOptions=shuffleArray(q.options);
    });
    // Re-number for display
    shuffled.forEach((q,i)=>{q._displayNum=i+1;});
    shuffledMCQs[w]=shuffled;
  });
}

function getAllQuestionCount(){
  return questions.length + mcqQuestions.length;
}

let monacoEditor=null;
let _pendingCode='';

// ── Editor helpers (hoisted so all functions can use them) ──
function getCode(){return monacoEditor?monacoEditor.getValue():_pendingCode;}
function setCode(val){
  if(monacoEditor) monacoEditor.setValue(val||'');
  else _pendingCode=val||'';
}

// Get current user ID for user-specific storage keys
let _userId='';
try{
  const u=JSON.parse(localStorage.getItem('sb_user')||'{}');
  _userId=u.id||'';
}catch(e){}

function solvedKey(){return _userId?'sb_solved_'+_userId:'sb_solved';}
function codeKey(qk){return (_userId?'sb_code_'+_userId+'_':'sb_code_')+qk;}

// Safe localStorage read — prevents app crash if data is corrupt
try{
  const saved=JSON.parse(localStorage.getItem(solvedKey())||'[]');
  saved.forEach(k=>solved.add(k));
}catch(e){
  console.warn('Could not load saved progress, starting fresh:',e);
  localStorage.removeItem(solvedKey());
}

function qKey(q){
  if(q.type==='mcq') return`mcq-${q.week}-${q.num}`;
  return`${q.week}-${q.num}`;
}

// ── Week & Question Tabs ──
function buildWeekTabs(){
  const container=document.getElementById('week-tabs');
  // Collect all weeks from both coding and MCQ questions
  const allWeeks=[...new Set([...questions.map(q=>q.week),...mcqQuestions.map(q=>q.week)])];
  allWeeks.sort((a,b)=>a-b);
  allWeeks.forEach(w=>{
    const btn=document.createElement('button');
    btn.className='week-tab'+(w===1?' active':'');
    btn.id=`week-tab-${w}`;
    btn.textContent=`Week ${w}`;
    btn.onclick=()=>{switchWeek(w);};
    container.appendChild(btn);
  });
}

function switchWeek(w){
  currentWeek=w;
  isMCQMode=false;
  // Reset MCQ session score for new week
  mcqSessionCorrect=0;
  mcqSessionTotal=0;
  document.querySelectorAll('.week-tab').forEach(b=>b.classList.remove('active'));
  const tab=document.getElementById(`week-tab-${w}`);
  if(tab) tab.classList.add('active');
  buildQuestionTabs(w);
  const first=questions.find(q=>q.week===w);
  if(first){
    selectQ(first);
  }else{
    // Week has only MCQs, no coding questions
    const mcqs=shuffledMCQs[w];
    if(mcqs&&mcqs.length){
      isMCQMode=true;
      selectMCQ(mcqs[0]);
    }
  }
}

function toggleIDEVisibility(show){
  const els=document.querySelectorAll('.ide-header,.editor-wrapper,.status-bar,.run-bar,.results-resizer,.results-panel,.hint-box,.solution-box');
  els.forEach(el=>{el.style.display=show?'':'none';});
  const mcqPanel=document.getElementById('mcq-answer-panel');
  if(mcqPanel) mcqPanel.style.display=show?'none':'flex';
}

function buildQuestionTabs(w){
  const container=document.getElementById('q-tabs');
  container.innerHTML='';
  // Coding question tabs
  questions.filter(q=>q.week===w).forEach(q=>{
    const btn=document.createElement('button');
    btn.className='q-tab';
    if(solved.has(qKey(q)))btn.classList.add('solved');
    btn.id=`qtab-${q.week}-${q.num}`;
    btn.innerHTML=`<span class="dot"></span>Q${q.num} · ${q.title}`;
    btn.onclick=()=>{isMCQMode=false;selectQ(q);};
    container.appendChild(btn);
  });
  // MCQ tabs (appended after coding questions within the same week)
  const mcqs=shuffledMCQs[w]||[];
  if(mcqs.length){
    // Add a visual separator
    const sep=document.createElement('span');
    sep.className='q-tab-separator';
    sep.textContent='MCQ';
    container.appendChild(sep);
    mcqs.forEach(q=>{
      const btn=document.createElement('button');
      btn.className='q-tab q-tab-mcq';
      if(solved.has(qKey(q)))btn.classList.add('solved');
      btn.id=`qtab-mcq-${q.week}-${q.num}`;
      btn.innerHTML=`<span class="dot"></span>MCQ ${q._displayNum}`;
      btn.onclick=()=>{isMCQMode=true;selectMCQ(q);};
      container.appendChild(btn);
    });
  }
}

function updateProgress(){
  const total=getAllQuestionCount();
  const pct=Math.round(solved.size/total*100);
  document.getElementById('progress-fill').style.width=pct+'%';
  document.getElementById('progress-text').textContent=`${solved.size}/${total} solved`;
}

// ── Select Question ──
function selectQ(q){
  currentQ=q;
  currentMCQ=null; // clear MCQ state
  // Ensure IDE is visible when selecting a coding question
  toggleIDEVisibility(true);
  document.querySelectorAll('.q-tab').forEach(b=>b.classList.remove('active'));
  const tab=document.getElementById(`qtab-${q.week}-${q.num}`);
  if(tab)tab.classList.add('active');

  const content=document.getElementById('q-content');
  let html=`<div class="q-title">Q${q.num} — ${q.title}</div>`;
  html+=`<div class="q-desc">${q.desc}</div>`;
  if(q.inputFmt){
    html+=`<div class="q-section"><div class="q-section-title">📥 Input Format</div><div class="q-section-body">${q.inputFmt}</div></div>`;
  }
  if(q.outputFmt){
    html+=`<div class="q-section"><div class="q-section-title">📤 Output Format</div><div class="q-section-body">${q.outputFmt}</div></div>`;
  }
  if(q.tests.length){
    let s='<div class="q-section"><div class="q-section-title">📝 Sample Test Cases</div>';
    q.tests.forEach((t,i)=>{
      s+=`<div class="q-sample">`;
      if(t.input) s+=`<div class="q-sample-block"><div class="q-sample-label">Input ${i+1}</div><div class="q-sample-code">${t.input}</div></div>`;
      s+=`<div class="q-sample-block"><div class="q-sample-label">Output ${i+1}</div><div class="q-sample-code">${t.expected}</div></div></div>`;
    });
    s+='</div>';
    html+=s;
  }
  content.innerHTML=html;

  const hintBox=document.getElementById('hint-box');
  const solBox=document.getElementById('solution-box');
  hintBox.style.display='none';
  hintBox.textContent=q.hint||'';
  solBox.style.display='none';
  // Use textContent for solution (plain code — no HTML injection risk)
  solBox.textContent=q.solution||'';
  const savedCode=localStorage.getItem(codeKey(qKey(q)));
  setCode(savedCode||'');
  document.getElementById('output-area').innerHTML='<div class="result-block result-neutral">Write your code and press <kbd>Ctrl+Enter</kbd> or click "Run Tests" to check.</div>';
  document.getElementById('results-count').textContent='';
}

// ── IDE Actions ──
function toggleHint(){
  const h=document.getElementById('hint-box');
  const s=document.getElementById('solution-box');
  // Close answer when opening hint
  if(h.style.display==='none') s.style.display='none';
  h.style.display=h.style.display==='none'?'block':'none';
}
function toggleSolution(){
  const s=document.getElementById('solution-box');
  const h=document.getElementById('hint-box');
  // Close hint when opening answer
  if(s.style.display==='none') h.style.display='none';
  s.style.display=s.style.display==='none'?'block':'none';
}
function loadSolution(){
  if(!currentQ)return;
  setCode(currentQ.solution);
  document.getElementById('hint-box').style.display='none';
  document.getElementById('solution-box').style.display='none';
  saveCode();
}
function clearCode(){
  setCode('');
  if(currentQ)localStorage.removeItem(codeKey(qKey(currentQ)));
  document.getElementById('hint-box').style.display='none';
  document.getElementById('solution-box').style.display='none';
  document.getElementById('output-area').innerHTML='<div class="result-block result-neutral">Write your code and press <kbd>Ctrl+Enter</kbd> or click "Run Tests" to check.</div>';
  document.getElementById('results-count').textContent='';
}


// ── Detailed Error Analysis ──
function analyzeError(got, expected, input){
  // Null-safe: handle undefined/null output
  got=got||'';
  expected=expected||'';

  const gotLines=got.trim().split('\n');
  const expLines=expected.trim().split('\n');
  let errors=[];

  // Check line count mismatch
  if(gotLines.length!==expLines.length){
    errors.push(`⚠ Line count mismatch: got ${gotLines.length} line(s), expected ${expLines.length} line(s)`);
  }

  const maxLen=Math.max(gotLines.length,expLines.length);
  for(let i=0;i<maxLen;i++){
    const g=(gotLines[i]||'').trimEnd();
    const e=(expLines[i]||'').trimEnd();
    if(g!==e){
      let detail=`Line ${i+1}:`;
      if(i>=gotLines.length){
        detail+=` MISSING — expected: "${e}"`;
      }else if(i>=expLines.length){
        detail+=` EXTRA — got: "${g}" (should not exist)`;
      }else{
        // Find exact character difference
        let diffPos=-1;
        for(let c=0;c<Math.max(g.length,e.length);c++){
          if(g[c]!==e[c]){diffPos=c;break;}
        }
        detail+=`\n  Got:      "${g}"`;
        detail+=`\n  Expected: "${e}"`;
        if(diffPos>=0){
          detail+=`\n  ─── Difference at position ${diffPos}: got '${g[diffPos]||'(end)'}', expected '${e[diffPos]||'(end)'}'`;
        }
        // Check common mistakes
        if(g.toLowerCase()===e.toLowerCase()){
          detail+=`\n  💡 Hint: Case mismatch — check uppercase/lowercase`;
        }else if(g.replace(/\s/g,'')=== e.replace(/\s/g,'')){
          detail+=`\n  💡 Hint: Spacing issue — check extra or missing spaces`;
        }else if(g.includes(e)||e.includes(g)){
          detail+=`\n  💡 Hint: Your output ${g.length>e.length?'has extra characters':'is missing characters'}`;
        }
      }
      errors.push(detail);
    }
  }

  // Check for common code issues if no output at all
  if(got.trim()===''){
    errors.push('💡 Hint: No output generated — make sure you use print() to display results');
  }

  return errors;
}

// ── Run Python with Skulpt ──
function runPython(code, inputStr){
  return new Promise((resolve,reject)=>{
    // Check if Skulpt is loaded
    if(typeof Sk==='undefined'){
      reject(new Error('Skulpt library failed to load. Check your internet connection and refresh the page.'));
      return;
    }

    let output='';
    const inputLines=inputStr?inputStr.split('\n'):[];
    let inputIdx=0;

    Sk.configure({
      output:function(text){output+=text;},
      read:function(x){
        if(Sk.builtinFiles===undefined||Sk.builtinFiles["files"][x]===undefined)
          throw"File not found: '"+x+"'";
        return Sk.builtinFiles["files"][x];
      },
      inputfun:function(){
        return new Promise((res)=>{
          if(inputIdx<inputLines.length){
            res(inputLines[inputIdx++]);
          }else{
            res('');
          }
        });
      },
      inputfunTakesPrompt:true,
      __future__:Sk.python3,
      execLimit:5000
    });

    Sk.misceval.asyncToPromise(function(){
      return Sk.importMainWithBody("<stdin>",false,code,true);
    }).then(()=>{
      // Remove trailing newline if present
      resolve(output.replace(/\n$/,''));
    }).catch((err)=>{
      reject(err);
    });
  });
}

// ── Run Tests ──
let isRunning=false;
async function runTests(){
  if(!currentQ||isRunning)return;

  const runBtn=document.querySelector('.run-bar .btn-run');
  const out=document.getElementById('output-area');

  // Lock button to prevent double-clicks
  isRunning=true;
  if(runBtn){
    runBtn.disabled=true;
    runBtn.textContent='⏳ Running...';
  }

  try{
    saveCode();
    out.innerHTML='<div class="result-block result-neutral">⏳ Running tests...</div>';
    let passed=0,total=currentQ.tests.length;
    const code=getCode();

    // Check if code is empty
    if(!code.trim()){
      out.innerHTML='<div class="result-block result-fail">⚠ No code written yet. Write your Python code and try again.</div>';
      document.getElementById('results-count').textContent='0/'+total;
      document.getElementById('results-count').style.color='var(--red)';
      // NOTE: use return inside finally-guarded block — must reset button
      isRunning=false;
      if(runBtn){runBtn.disabled=false;runBtn.textContent='▶ Run Tests';}
      return;
    }

    out.innerHTML='';
    for(let i=0;i<currentQ.tests.length;i++){
      const t=currentQ.tests[i];
      let got='';

      try{
        got=await runPython(code,t.input||'');
      }catch(e){
        got='';
        const errMsg=e.toString();

        const div=document.createElement('div');
        div.className='result-block result-fail';
        let text=`✗ Test ${i+1}: ERROR`;
        if(t.input) text+=`\nInput:    ${t.input.replace(/\n/g, ' | ')}`;
        text+=`\n\n🐛 Python Error:\n${errMsg}`;

        // Parse common Python errors and give hints
        if(errMsg.includes('TimeLimitError')||errMsg.includes('time limit')||errMsg.includes('Program exceeded')){
          text+=`\n\n💡 Fix: Your code took too long (>5s). Check for infinite loops — make sure while/for loops have a proper exit condition.`;
        }else if(errMsg.includes('Skulpt library failed')){
          text+=`\n\n💡 Fix: Skulpt could not be loaded. Check your internet connection and refresh the page.`;
        }else if(errMsg.includes('SyntaxError')){
          text+=`\n\n💡 Fix: Check for missing quotes, parentheses, colons, or indentation errors.`;
        }else if(errMsg.includes('NameError')){
          const varMatch=errMsg.match(/name '(\w+)' is not defined/);
          text+=`\n\n💡 Fix: Variable ${varMatch?`'${varMatch[1]}'`:''} is not defined. Check spelling or define it before use.`;
        }else if(errMsg.includes('TypeError')){
          text+=`\n\n💡 Fix: Type mismatch. Check if you're mixing strings and numbers without conversion.`;
        }else if(errMsg.includes('IndentationError')){
          text+=`\n\n💡 Fix: Check your indentation. Python uses spaces (4 spaces per level).`;
        }else if(errMsg.includes('ValueError')){
          text+=`\n\n💡 Fix: Invalid value conversion. Check int()/float() calls.`;
        }else if(errMsg.includes('ZeroDivisionError')){
          text+=`\n\n💡 Fix: You're dividing by zero. Add a check before dividing.`;
        }else if(errMsg.includes('IndexError')){
          text+=`\n\n💡 Fix: List/string index out of range. Check your loop bounds.`;
        }else if(errMsg.includes('KeyError')){
          text+=`\n\n💡 Fix: Dictionary key not found. Check the key exists before accessing it.`;
        }
        div.textContent=text;
        out.appendChild(div);
        continue;
      }

      const pass=got.trim()===t.expected.trim();
      if(pass)passed++;

      const div=document.createElement('div');
      div.className='result-block '+(pass?'result-pass':'result-fail');

      if(pass){
        div.textContent=`✓ Test ${i+1}: PASSED`;
        if(t.input) div.textContent+=`\nInput:    ${t.input.replace(/\n/g, ' | ')}`;
        div.textContent+=`\nOutput:   ${got}`;
      }else{
        let text=`✗ Test ${i+1}: FAILED`;
        if(t.input) text+=`\nInput:    ${t.input.replace(/\n/g, ' | ')}`;
        text+=`\nGot:      ${got}`;
        text+=`\nExpected: ${t.expected}`;
        div.textContent=text;

        // Add detailed error analysis
        const errors=analyzeError(got,t.expected,t.input);
        if(errors.length){
          const errDiv=document.createElement('div');
          errDiv.className='error-detail';
          errDiv.textContent=errors.join('\n\n');
          div.appendChild(errDiv);
        }
      }
      out.appendChild(div);
    }

    // Summary
    const summary=document.createElement('div');
    summary.className='result-summary '+(passed===total?'pass':'fail');
    if(passed===total){
      summary.textContent=`🎉 All ${total} test(s) passed!`;
    }else{
      summary.textContent=`❌ ${passed}/${total} passed — check errors above for details`;
    }
    out.appendChild(summary);

    document.getElementById('results-count').textContent=`${passed}/${total}`;
    document.getElementById('results-count').style.color=passed===total?'var(--green)':'var(--red)';

    if(passed===total){
      solved.add(qKey(currentQ));
      try{
        localStorage.setItem(solvedKey(),JSON.stringify([...solved]));
      }catch(e){
        console.warn('Could not save progress:',e);
      }
      const tab=document.getElementById(`qtab-${currentQ.week}-${currentQ.num}`);
      if(tab)tab.classList.add('solved');
      updateProgress();
    }
  }catch(err){
    // Catch-all: prevent UI from getting stuck in broken state
    console.error('Unexpected error in runTests:',err);
    out.innerHTML=`<div class="result-block result-fail">⚠ Unexpected error: ${err.message||err}\n\nTry refreshing the page.</div>`;
  }finally{
    // Always re-enable the button
    isRunning=false;
    if(runBtn){
      runBtn.disabled=false;
      runBtn.textContent='▶ Run Tests';
    }
  }
}

// ── Navigation ──
function navQuestion(dir){
  if(isMCQMode){
    navMCQ(dir);
    return;
  }
  if(!currentQ)return;
  const weekQs=questions.filter(q=>q.week===currentWeek);
  const idx=weekQs.findIndex(q=>q.num===currentQ.num);
  const next=idx+dir;
  if(next>=0&&next<weekQs.length){
    selectQ(weekQs[next]);
  }else if(dir>0){
    // At end of coding questions — jump to MCQ 1 if available
    const mcqs=shuffledMCQs[currentWeek]||[];
    if(mcqs.length){
      isMCQMode=true;
      selectMCQ(mcqs[0]);
    }
  }else{
    // At beginning — no previous week jump for now
  }
}

// ── Resizable Divider ──
function initResizer(){
  const divider=document.getElementById('divider');
  const left=document.querySelector('.left-panel');
  const app=document.querySelector('.app');
  let isResizing=false;

  function startResize(e){
    if(isMobile()||isTablet()) return;
    isResizing=true;
    divider.classList.add('active');
    document.body.classList.add('no-select');
    e.preventDefault();
  }
  function doResize(e){
    if(!isResizing)return;
    const clientX=e.touches?e.touches[0].clientX:e.clientX;
    const appRect=app.getBoundingClientRect();
    let newWidth=clientX-appRect.left;
    const min=280,max=appRect.width-300;
    newWidth=Math.max(min,Math.min(max,newWidth));
    left.style.width=newWidth+'px';
    left.style.flexShrink='0';
  }
  function stopResize(){
    if(isResizing){
      isResizing=false;
      divider.classList.remove('active');
      document.body.classList.remove('no-select');
    }
  }

  divider.addEventListener('mousedown',startResize);
  divider.addEventListener('touchstart',startResize,{passive:false});
  document.addEventListener('mousemove',doResize);
  document.addEventListener('touchmove',doResize,{passive:false});
  document.addEventListener('mouseup',stopResize);
  document.addEventListener('touchend',stopResize);
}

// ── Mobile Panel Toggle ──
let showingIDE=false;
function isMobile(){return window.innerWidth<=600;}
function isTablet(){return window.innerWidth<=900;}

function togglePanel(){
  const app=document.querySelector('.app');
  const btn=document.getElementById('panel-toggle');
  showingIDE=!showingIDE;
  if(showingIDE){
    app.classList.add('show-ide');
    btn.textContent='📖';
    btn.title='Show Question';
  }else{
    app.classList.remove('show-ide');
    btn.textContent='📝';
    btn.title='Show Code Editor';
  }
}

// Reset panel state on resize (e.g., rotating phone or resizing window)
window.addEventListener('resize',()=>{
  const app=document.querySelector('.app');
  const left=document.querySelector('.left-panel');
  if(!isMobile()&&!isTablet()){
    app.classList.remove('show-ide');
    showingIDE=false;
    // Don't override desktop width if user was just on mobile
  }else{
    // Remove any inline width from resizer on mobile/tablet
    left.style.width='';
    left.style.flexShrink='';
  }
});

// ── Vertical Results Resizer (drag up/down) ──
function initResultsResizer(){
  const resizer=document.getElementById('results-resizer');
  const panel=document.getElementById('results-panel');
  const rightPanel=document.querySelector('.right-panel');
  if(!resizer||!panel)return;
  let isResizing=false;
  let startY=0;
  let startH=0;

  function startResize(e){
    if(isMobile())return;
    isResizing=true;
    resizer.classList.add('active');
    document.body.classList.add('no-select');
    startY=e.touches?e.touches[0].clientY:e.clientY;
    startH=panel.offsetHeight;
    e.preventDefault();
  }
  function doResize(e){
    if(!isResizing)return;
    const clientY=e.touches?e.touches[0].clientY:e.clientY;
    const diff=startY-clientY; // drag up = bigger panel
    let newH=startH+diff;
    const minH=60;
    const maxH=rightPanel?rightPanel.offsetHeight*0.75:500;
    newH=Math.max(minH,Math.min(maxH,newH));
    panel.style.height=newH+'px';
  }
  function stopResize(){
    if(isResizing){
      isResizing=false;
      resizer.classList.remove('active');
      document.body.classList.remove('no-select');
    }
  }

  resizer.addEventListener('mousedown',startResize);
  resizer.addEventListener('touchstart',startResize,{passive:false});
  document.addEventListener('mousemove',doResize);
  document.addEventListener('touchmove',doResize,{passive:false});
  document.addEventListener('mouseup',stopResize);
  document.addEventListener('touchend',stopResize);
}

// ── Collapsible Sidebar ──
let sidebarCollapsed=false;
function toggleSidebar(){
  const left=document.querySelector('.left-panel');
  const divider=document.getElementById('divider');
  sidebarCollapsed=!sidebarCollapsed;
  left.classList.toggle('collapsed',sidebarCollapsed);
  if(divider)divider.style.display=sidebarCollapsed?'none':'';
  setTimeout(()=>{if(monacoEditor)monacoEditor.layout();},350);
}

// ── Floating Results Panel ──
let isFloating=false;
function toggleFloatResults(){
  const panel=document.getElementById('results-panel');
  const btn=document.getElementById('toggle-float-btn');
  isFloating=!isFloating;
  if(isFloating){
    panel.classList.add('floating');
    panel.style.left='50%';panel.style.top='50%';
    panel.style.transform='translate(-50%,-50%)';
    btn.title='Dock Panel';
  }else{
    panel.classList.remove('floating');
    panel.style.left='';panel.style.top='';
    panel.style.transform='';panel.style.bottom='';panel.style.right='';
    panel.style.width=''; // Clear width if resized while floating
    btn.title='Float Panel';
  }
}
function makeDraggable(el,header){
  let x=0,y=0,x2=0,y2=0;
  header.onmousedown=function(e){
    if(!isFloating)return;
    if(e.target.tagName==='BUTTON'||e.target.closest('button'))return;
    e.preventDefault();x2=e.clientX;y2=e.clientY;
    document.onmouseup=function(){document.onmouseup=null;document.onmousemove=null;};
    document.onmousemove=function(ev){
      ev.preventDefault();x=x2-ev.clientX;y=y2-ev.clientY;x2=ev.clientX;y2=ev.clientY;
      el.style.transform='none';
      el.style.top=(el.offsetTop-y)+'px';el.style.left=(el.offsetLeft-x)+'px';
      el.style.bottom='auto';el.style.right='auto';
    };
  };
}

// ── Monaco IDE ──
let _darkTheme=localStorage.getItem('sb_theme')!=='light';

function initMonaco(){
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    const wrapper = document.getElementById('editor-wrapper');
    wrapper.innerHTML = '';
    
    // Add custom theme matching our Dracula colors if desired, or use default vs-dark
    monacoEditor = monaco.editor.create(wrapper, {
      value: _pendingCode || '',
      language: 'python',
      theme: _darkTheme ? 'vs-dark' : 'vs',
      automaticLayout: true,
      fontSize: 14,
      fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
      fontLigatures: false,
      minimap: { enabled: false },
      wordWrap: 'on',
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      formatOnPaste: true,
      suggestOnTriggerCharacters: true,
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10
      }
    });

    monacoEditor.onDidChangeModelContent(() => {
      saveCode();
      showAutosave();
      updateStatusBar();
    });

    monacoEditor.onDidChangeCursorPosition(() => updateStatusBar());

    monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function() {
      runTests();
    });
    
    updateStatusBar();
  });
}

function updateStatusBar(){
  if(!monacoEditor)return;
  const pos=monacoEditor.getPosition();
  if(pos) {
    document.getElementById('cursor-pos').textContent=`Ln ${pos.lineNumber}, Col ${pos.column}`;
  }
  const chars=monacoEditor.getValue().length;
  document.getElementById('char-count').textContent=`${chars} char${chars!==1?'s':''}`;
}

let _autosaveTimer=null;
function showAutosave(){
  const el=document.getElementById('autosave-indicator');
  el.textContent='● Saving...';
  el.style.color='var(--yellow)';
  clearTimeout(_autosaveTimer);
  _autosaveTimer=setTimeout(()=>{
    el.textContent='● Auto-saved';
    el.style.color='var(--green)';
  },600);
}

// getCode/setCode are hoisted at top of file — definitions here removed to avoid duplicates

function toggleTheme(){
  _darkTheme=!_darkTheme;
  localStorage.setItem('sb_theme', _darkTheme ? 'dark' : 'light');
  document.body.classList.toggle('light-theme',!_darkTheme);
  if(typeof monaco !== 'undefined' && monacoEditor) {
    monaco.editor.setTheme(_darkTheme?'vs-dark':'vs');
  }
  document.getElementById('theme-btn').textContent=_darkTheme?'☀️':'🌙';
}

// ── Patch saveCode to use Editor ──
function saveCode(){
  if(!currentQ)return;
  try{
    localStorage.setItem(codeKey(qKey(currentQ)),getCode());
  }catch(e){
    console.warn('Could not save code:',e);
  }
}

// ══════════════════════════════════════════════════════════════
//  MCQ Selection & Answer Handling
// ══════════════════════════════════════════════════════════════
let currentMCQ=null;
let mcqAnswered=false;
let mcqSessionCorrect=0;
let mcqSessionTotal=0;

function selectMCQ(q){
  currentQ=null; // clear coding question
  currentMCQ=q;
  mcqAnswered=false;
  document.querySelectorAll('.q-tab').forEach(b=>b.classList.remove('active'));
  const tab=document.getElementById(`qtab-mcq-${q.week}-${q.num}`);
  if(tab)tab.classList.add('active');

  // LEFT PANEL: question text only
  const content=document.getElementById('q-content');
  let html=`<div class="q-title">MCQ ${q._displayNum}</div>`;
  html+=`<div class="q-desc mcq-question">${escapeHtml(q.question)}</div>`;
  content.innerHTML=html;

  // RIGHT PANEL: ensure the MCQ panel structure exists (it may have been replaced by final result)
  const mcqPanel=document.getElementById('mcq-answer-panel');
  if(mcqPanel && !document.getElementById('mcq-options-area')){
    mcqPanel.innerHTML=`
      <div class="mcq-panel-header">
        <span class="mcq-panel-badge">📝 One Mark Question</span>
        <span class="mcq-panel-hint">Select the correct answer</span>
      </div>
      <div class="mcq-options-area" id="mcq-options-area"></div>
      <div class="mcq-result-bar">
        <div class="mcq-result" id="mcq-result"></div>
      </div>
      <div class="mcq-nav-bar">
        <button class="btn" onclick="navMCQ(-1)">← Prev</button>
        <button class="btn" onclick="navMCQ(1)">Next →</button>
      </div>
    `;
  }

  // Populate options in the mcq-options-area
  const optArea=document.getElementById('mcq-options-area');
  if(optArea){
    let optHtml='';
    const opts=q._shuffledOptions||q.options;
    opts.forEach((opt,i)=>{
      const letter=String.fromCharCode(65+i);
      optHtml+=`<button class="mcq-option" id="mcq-opt-${i}" onclick="selectMCQOption(${i})">
        <span class="mcq-letter">${letter}</span>
        <span class="mcq-text">${escapeHtml(opt)}</span>
      </button>`;
    });
    optArea.innerHTML=optHtml;
  }

  // Show MCQ answer panel, hide IDE elements
  toggleIDEVisibility(false);
  if(mcqPanel){
    mcqPanel.style.display='flex';
    const resultEl=document.getElementById('mcq-result');
    if(resultEl){
      resultEl.innerHTML='';
      resultEl.className='mcq-result';
    }
  }
}

function escapeHtml(text){
  const div=document.createElement('div');
  div.textContent=text;
  return div.innerHTML.replace(/\n/g,'<br>');
}

function selectMCQOption(idx){
  if(mcqAnswered)return;
  mcqAnswered=true;
  const q=currentMCQ;
  if(!q)return;
  const opts=q._shuffledOptions||q.options;
  const selected=opts[idx];
  const correct=q.answer;
  const isCorrect=selected===correct;

  // Track session score
  mcqSessionTotal++;
  if(isCorrect) mcqSessionCorrect++;

  // Highlight all options
  opts.forEach((opt,i)=>{
    const btn=document.getElementById(`mcq-opt-${i}`);
    if(!btn)return;
    btn.classList.add('mcq-disabled');
    if(opt===correct){
      btn.classList.add('mcq-correct');
    }
    if(i===idx&&!isCorrect){
      btn.classList.add('mcq-wrong');
    }
  });

  // Show result
  const resultEl=document.getElementById('mcq-result');
  if(isCorrect){
    resultEl.className='mcq-result mcq-result-correct';
    resultEl.innerHTML='🎉 Correct!';
    // Mark as solved
    solved.add(qKey(q));
    try{
      localStorage.setItem(solvedKey(),JSON.stringify([...solved]));
    }catch(e){console.warn('Could not save progress:',e);}
    const tab=document.getElementById(`qtab-mcq-${q.week}-${q.num}`);
    if(tab)tab.classList.add('solved');
    updateProgress();
    // Check if this was the last MCQ — show final result instead of auto-advancing
    const mcqs=shuffledMCQs[currentWeek]||[];
    const currentIdx=mcqs.findIndex(mq=>mq.num===q.num);
    if(currentIdx>=mcqs.length-1){
      // Last question — show final result after brief delay
      setTimeout(()=>{showMCQFinalResult();},900);
    }else{
      // Auto-advance to next question after a short delay
      setTimeout(()=>{navMCQ(1);},800);
    }
  }else{
    resultEl.className='mcq-result mcq-result-wrong';
    resultEl.innerHTML=`❌ Incorrect. The correct answer is: <strong>${escapeHtml(correct)}</strong>`;
    // Check if this was the last MCQ
    const mcqs=shuffledMCQs[currentWeek]||[];
    const currentIdx=mcqs.findIndex(mq=>mq.num===q.num);
    if(currentIdx>=mcqs.length-1){
      // Last question — show final result after a longer delay so user can read the answer
      setTimeout(()=>{showMCQFinalResult();},2500);
    }
  }
}

function showMCQFinalResult(){
  const mcqs=shuffledMCQs[currentWeek]||[];
  const totalQ=mcqs.length;
  const pct=totalQ>0?Math.round((mcqSessionCorrect/totalQ)*100):0;
  const isPerfect=mcqSessionCorrect===totalQ;
  const isGood=pct>=70;

  // Build the final result overlay inside the MCQ answer panel
  const mcqPanel=document.getElementById('mcq-answer-panel');
  if(!mcqPanel)return;

  let emoji='😔';
  let message='Keep practicing! You\'ll get better.';
  let gradientClass='final-result-low';
  if(isPerfect){
    emoji='🏆';
    message='Perfect score! Outstanding work!';
    gradientClass='final-result-perfect';
  }else if(isGood){
    emoji='🎉';
    message='Great job! You\'re doing well!';
    gradientClass='final-result-good';
  }else if(pct>=50){
    emoji='👍';
    message='Good effort! Review and try again.';
    gradientClass='final-result-mid';
  }

  mcqPanel.innerHTML=`
    <div class="mcq-final-overlay ${gradientClass}">
      <div class="mcq-final-card">
        <div class="mcq-final-emoji">${emoji}</div>
        <div class="mcq-final-title">Quiz Complete!</div>
        <div class="mcq-final-subtitle">Week ${currentWeek} — MCQ Results</div>
        <div class="mcq-final-score-ring">
          <svg viewBox="0 0 120 120" class="mcq-score-svg">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="${isPerfect?'#22c55e':isGood?'#3b82f6':'#ef4444'}" stroke-width="8" stroke-linecap="round"
              stroke-dasharray="${Math.round(326.7*(pct/100))} 326.7"
              transform="rotate(-90 60 60)"
              class="mcq-score-circle"/>
          </svg>
          <div class="mcq-score-text">${pct}%</div>
        </div>
        <div class="mcq-final-stats">
          <div class="mcq-stat"><span class="mcq-stat-num mcq-stat-correct">${mcqSessionCorrect}</span><span class="mcq-stat-label">Correct</span></div>
          <div class="mcq-stat-divider"></div>
          <div class="mcq-stat"><span class="mcq-stat-num mcq-stat-wrong">${totalQ - mcqSessionCorrect}</span><span class="mcq-stat-label">Wrong</span></div>
          <div class="mcq-stat-divider"></div>
          <div class="mcq-stat"><span class="mcq-stat-num mcq-stat-total">${totalQ}</span><span class="mcq-stat-label">Total</span></div>
        </div>
        <div class="mcq-final-message">${message}</div>
        <button class="btn mcq-restart-btn" onclick="restartMCQ()">
          🔄 Restart & Practice Again
        </button>
      </div>
    </div>
  `;
  mcqPanel.style.display='flex';
}

function restartMCQ(){
  // Reset session counters
  mcqSessionCorrect=0;
  mcqSessionTotal=0;
  // Re-shuffle MCQs for the current week
  const weekQs=mcqQuestions.filter(q=>q.week===currentWeek);
  const shuffled=shuffleArray(weekQs);
  shuffled.forEach(q=>{q._shuffledOptions=shuffleArray(q.options);});
  shuffled.forEach((q,i)=>{q._displayNum=i+1;});
  shuffledMCQs[currentWeek]=shuffled;

  // Rebuild the MCQ panel to its original structure
  const mcqPanel=document.getElementById('mcq-answer-panel');
  if(mcqPanel){
    mcqPanel.innerHTML=`
      <div class="mcq-panel-header">
        <span class="mcq-panel-badge">📝 One Mark Question</span>
        <span class="mcq-panel-hint">Select the correct answer</span>
      </div>
      <div class="mcq-options-area" id="mcq-options-area"></div>
      <div class="mcq-result-bar">
        <div class="mcq-result" id="mcq-result"></div>
      </div>
      <div class="mcq-nav-bar">
        <button class="btn" onclick="navMCQ(-1)">← Prev</button>
        <button class="btn" onclick="navMCQ(1)">Next →</button>
      </div>
    `;
  }

  // Rebuild tabs and select first MCQ
  buildQuestionTabs(currentWeek);
  if(shuffled.length) selectMCQ(shuffled[0]);
}

function navMCQ(dir){
  if(!currentMCQ)return;
  const mcqs=shuffledMCQs[currentWeek]||[];
  const idx=mcqs.findIndex(q=>q.num===currentMCQ.num);
  const next=idx+dir;
  if(next>=0&&next<mcqs.length){
    selectMCQ(mcqs[next]);
  }else if(dir<0&&idx===0){
    // At first MCQ, pressing Prev goes back to last coding question
    const weekQs=questions.filter(q=>q.week===currentWeek);
    if(weekQs.length){
      isMCQMode=false;
      selectQ(weekQs[weekQs.length-1]);
    }
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded',()=>{
  if(!_darkTheme) {
    document.body.classList.add('light-theme');
    const themeBtn = document.getElementById('theme-btn');
    if(themeBtn) themeBtn.textContent='🌙';
  }
  buildShuffledMCQs();
  initMonaco();
  buildWeekTabs();
  buildQuestionTabs(1);
  selectQ(questions[0]);
  updateProgress();
  initResizer();
  initResultsResizer();
  makeDraggable(document.getElementById('results-panel'),document.getElementById('results-header'));
  if(isMobile()||isTablet()){
    document.querySelector('.left-panel').style.width='';
    document.querySelector('.left-panel').style.flexShrink='';
  }
});
