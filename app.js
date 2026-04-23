let currentQ=null,currentWeek=1,solved=new Set();

// ── Editor helpers (hoisted so all functions can use them) ──
function getCode(){return(typeof cmEditor!=='undefined'&&cmEditor)?cmEditor.getValue():(document.getElementById('code-area')||{value:''}).value;}
function setCode(val){if(typeof cmEditor!=='undefined'&&cmEditor)cmEditor.setValue(val||'');else{const ta=document.getElementById('code-area');if(ta)ta.value=val||'';} }

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

function qKey(q){return`${q.week}-${q.num}`;}

// ── Week & Question Tabs ──
function buildWeekTabs(){
  const container=document.getElementById('week-tabs');
  const weeks=[...new Set(questions.map(q=>q.week))];
  weeks.forEach(w=>{
    const btn=document.createElement('button');
    btn.className='week-tab'+(w===1?' active':'');
    btn.id=`week-tab-${w}`;
    btn.textContent=`Week ${w}`;
    btn.onclick=()=>switchWeek(w);
    container.appendChild(btn);
  });
}

function switchWeek(w){
  currentWeek=w;
  document.querySelectorAll('.week-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById(`week-tab-${w}`).classList.add('active');
  buildQuestionTabs(w);
  const first=questions.find(q=>q.week===w);
  if(first)selectQ(first);
}

function buildQuestionTabs(w){
  const container=document.getElementById('q-tabs');
  container.innerHTML='';
  questions.filter(q=>q.week===w).forEach(q=>{
    const btn=document.createElement('button');
    btn.className='q-tab';
    if(solved.has(qKey(q)))btn.classList.add('solved');
    btn.id=`qtab-${q.week}-${q.num}`;
    btn.innerHTML=`<span class="dot"></span>Q${q.num} · ${q.title}`;
    btn.onclick=()=>selectQ(q);
    container.appendChild(btn);
  });
}

function updateProgress(){
  const pct=Math.round(solved.size/questions.length*100);
  document.getElementById('progress-fill').style.width=pct+'%';
  document.getElementById('progress-text').textContent=`${solved.size}/${questions.length} solved`;
}

// ── Select Question ──
function selectQ(q){
  currentQ=q;
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
  document.getElementById('output-area').innerHTML='<div class="result-block result-neutral">Write your code and press <kbd>Ctrl+Enter</kbd> or click \'Run Tests\' to check.</div>';
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

  const runBtn=document.querySelector('.run-bar .btn-primary');
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
  if(!currentQ)return;
  const weekQs=questions.filter(q=>q.week===currentWeek);
  const idx=weekQs.findIndex(q=>q.num===currentQ.num);
  const next=idx+dir;
  if(next>=0&&next<weekQs.length){
    selectQ(weekQs[next]);
  }else if(dir>0){
    const nextWeek=currentWeek+1;
    const nq=questions.find(q=>q.week===nextWeek);
    if(nq){switchWeek(nextWeek);selectQ(nq);}
  }else{
    const prevWeek=currentWeek-1;
    const pqs=questions.filter(q=>q.week===prevWeek);
    if(pqs.length){switchWeek(prevWeek);selectQ(pqs[pqs.length-1]);}
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

// ── CodeMirror IDE ──
let cmEditor=null;
let _fontSize=13;
let _darkTheme=true;

function initCodeMirror(){
  const ta=document.getElementById('code-area');
  cmEditor=CodeMirror.fromTextArea(ta,{
    mode:'python',
    theme:'dracula',
    lineNumbers:true,
    matchBrackets:true,
    autoCloseBrackets:true,
    styleActiveLine:true,
    indentUnit:4,
    tabSize:4,
    indentWithTabs:false,
    lineWrapping:false,
    extraKeys:{
      'Tab':function(cm){
        if(cm.somethingSelected())cm.indentSelection('add');
        else cm.replaceSelection('    ','end');
      },
      'Shift-Tab':function(cm){cm.indentSelection('subtract');},
      'Ctrl-Enter':function(){runTests();},
      'Cmd-Enter':function(){runTests();},
      'Ctrl-/':function(cm){cm.toggleComment();},
      'Cmd-/':function(cm){cm.toggleComment();},
    }
  });
  cmEditor.on('change',()=>{
    saveCode();
    showAutosave();
    updateStatusBar();
  });
  cmEditor.on('cursorActivity',()=>updateStatusBar());
  cmEditor.setSize('100%','100%');
  // Refresh after first render so gutters/layout are correct
  setTimeout(()=>cmEditor.refresh(),50);
}

function updateStatusBar(){
  if(!cmEditor)return;
  const cur=cmEditor.getCursor();
  document.getElementById('cursor-pos').textContent=`Ln ${cur.line+1}, Col ${cur.ch+1}`;
  const chars=cmEditor.getValue().length;
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
  document.body.classList.toggle('light-theme',!_darkTheme);
  if(cmEditor)cmEditor.setOption('theme',_darkTheme?'dracula':'eclipse');
  document.getElementById('theme-btn').textContent=_darkTheme?'☀️':'🌙';
}

function changeFontSize(delta){
  _fontSize=Math.max(10,Math.min(20,_fontSize+delta));
  if(cmEditor){
    const wrapper=cmEditor.getWrapperElement();
    wrapper.style.fontSize=_fontSize+'px';
    cmEditor.refresh();
  }
}

// ── Patch saveCode to use cmEditor ──
function saveCode(){
  if(!currentQ)return;
  try{
    localStorage.setItem(codeKey(qKey(currentQ)),getCode());
  }catch(e){
    console.warn('Could not save code:',e);
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded',()=>{
  initCodeMirror();
  buildWeekTabs();
  buildQuestionTabs(1);
  selectQ(questions[0]);
  updateProgress();
  initResizer();
  if(isMobile()||isTablet()){
    document.querySelector('.left-panel').style.width='';
    document.querySelector('.left-panel').style.flexShrink='';
  }
});
