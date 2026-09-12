'use strict';
// GEBING — aplikasi offline tanpa layanan, CDN, atau pengiriman data.
const $=s=>document.querySelector(s), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffled=arr=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const STORAGE='word-crystal-quest-v1';
let db={profiles:[],active:null,settings:{mute:false,volume:.35,relaxed:true,reduced:false}},storageOK=true;
try{const x=JSON.parse(localStorage.getItem(STORAGE));if(x&&Array.isArray(x.profiles)&&x.settings)db=x;}catch{storageOK=false;}
let screen='home',area=0,quiz=null,game=null,engine=null,prologStep=0,lastFocus=null,toastTimer=null,audioCtx=null,musicTimer=null,musicStep=0;
let selectedAvatar='🧑‍🚀';
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(db));}catch{storageOK=false;toast('Your browser cannot save your progress. Download your results before you leave.');}}
function profile(){return db.profiles.find(p=>p.id===db.active);}
function newProfile(name,avatar,school=''){return {id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),name,avatar,school,points:0,tests:[null,null,null,null],done:[false,false,false,false],checkpoints:[null,null,null,null],badges:[],history:[],streak:1,lastDate:new Date().toLocaleDateString('en-CA'),egg:[],completed:null};}
function completed(p=profile()){return p? p.tests.filter(t=>t&&t.best>=70).length:0;}
function isOpen(i){const p=profile();return !!(p&&(db.settings.unlockMaps||i===0||(p.tests[i-1]&&p.tests[i-1].best>=70)));}
// Debug map access does not forge assessment results or modify earned progress.
function secretCode(){modal(`<h2>SECRET CODE</h2><p>Enter the code to open all maps on this device.</p><label for="secret-code">Test code</label><input id="secret-code" type="text" autocomplete="off" spellcheck="false" placeholder="Type the secret code"><div id="secret-error" role="status" style="margin-top:12px;color:#ffd2a1"></div><div class="row">${button('Open all maps','unlock-maps','btn primary')}${db.settings.unlockMaps?button('Turn off test mode','lock-maps','btn'):''}${button('Close','close','btn ghost')}</div>`);}
function unlockMaps(){const code=$('#secret-code').value.trim().replace(/\s+/g,' ').toUpperCase();if(code==='EDITOR'){db.settings.editorMode=true;save();toast('Teacher Editor Unlocked.');teacherEditor();return true;}if(code!=='SURYO AGUNG'){$('#secret-error').textContent='Wrong code. Please try again.';return false;}db.settings.unlockMaps=true;save();closeModal();if(profile())world();else home();toast('Test mode is on. All maps are open.');return true;}
function lockMaps(){db.settings.unlockMaps=false;save();closeModal();if(profile())world();else home();toast('Test mode is off. Pass each test to open the next map.');}
const KEY_BINDINGS={KeyA:'ArrowLeft',KeyD:'ArrowRight',KeyW:'ArrowUp',KeyS:'ArrowDown',KeyZ:'Space',KeyX:'Fire',KeyF:'Fire',Enter:'Fire',NumpadEnter:'Fire',ShiftLeft:'Boost',ShiftRight:'Boost'};
const canonicalKey=code=>KEY_BINDINGS[code]||code;
const heldKeyboard=new Map();let pauseOpen=false;
function button(label,action,cls='btn',extra=''){return `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;}
function resize(){const scale=Math.min(innerWidth/1280,innerHeight/720);$('#stage').style.transform=`scale(${scale})`;}
addEventListener('resize',resize);resize();
function tone(f=660,d=.12,type='sine',gain=.12){if(db.settings.mute)return;try{audioCtx??=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(gain*db.settings.volume,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+d);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+d);}catch{}}
function sfx(ok){tone(ok?740:220,.15,'triangle');if(ok)setTimeout(()=>tone(990,.17,'sine'),100);}
function startMusic(){if(musicTimer)return;const notes=[261.63,329.63,392,523.25,440,392,329.63,293.66];musicTimer=setInterval(()=>{if(!document.hidden&&$('#overlay').hidden&&screen==='play'&&!engine?.paused)tone(notes[musicStep++%notes.length]*(1+area*.06),.35,'sine',.025);},560);}
function toast(msg){clearTimeout(toastTimer);$('#toast').textContent=msg;$('#toast').style.display='block';toastTimer=setTimeout(()=>$('#toast').style.display='none',4200);}
function fullscreen(){const el=$('#stage');if(!document.fullscreenElement&&el.requestFullscreen){el.requestFullscreen().catch(()=>toast('Full screen is not available. You can still play.'));}else if(document.fullscreenElement){document.exitFullscreen?.();}else toast('Turn your screen sideways for a wider view.');}
function header(){const p=profile();$('#header').innerHTML=`<div class="brand"><span class="sprite-ui" style="background-position:66.6667% 100%"></span><span>GEBING<small>THINGS AROUND ME · GRADE 7</small></span></div><nav class="nav" aria-label="Main menu">${p?`<span class="pill">${p.avatar} ${esc(p.name.length>18?p.name.slice(0,17)+'…':p.name)}</span><span class="pill">💎 ${completed()}/4</span>`:''}${['home','map'].includes(screen)?button(db.settings.unlockMaps?'TEST MODE ON':'SECRET CODE','secret','btn small ghost'):''}${screen==='home'?'':button('⌂ Map','map','btn small ghost')}${button('⛶','fullscreen','icon-btn','aria-label="Full screen"')}${button(db.settings.mute?'🔇':'♪','mute','icon-btn','aria-label="Sound on or off"')}${button('⚙','settings','icon-btn','aria-label="Settings"')}</nav>`;$('#footer').innerHTML=`<span>ENGLISH · GRADE 7 <span style="color:#5c829d">&nbsp; / &nbsp;</span> ${storageOK?'Progress saved on this device':'Progress cannot be saved on this device'}</span><div>${button('Guide','guide','')}&nbsp; · &nbsp;${button('Learning goals','learning','')}&nbsp; · &nbsp;${button('Credits & sources','credits','')}</div>`;}
function stopEngine(){engine?.stop();engine=null;}
function setScreen(s){stopEngine();screen=s;header();}
function home(){setScreen('home');const p=profile();$('#main').innerHTML=`<section class="start"><div class="home-logos" aria-label="Education logos"><img class="ministry-logo" src="assets/logo-tut-wuri.png" alt="Tut Wuri Handayani - Kemendikdasmen"><img src="assets/logo-sobat-smp.png" alt="Sobat SMP"><img src="assets/logo-quality-education.png" alt="Quality education for all"><img src="assets/logo-ramah.png" alt="Kemendikdasmen RAMAH"></div><div class="start-copy"><div class="eyebrow">SMALL STEPS. NEW WORDS.</div><h1>Explore.<br>Learn.<br><span>Find your words.</span></h1><p>Explore four worlds. Read the clues. Find the words and bring back the light.</p><div class="start-actions">${button(p?'Continue adventure &nbsp; ▶':'Start adventure &nbsp; ▶','start','btn primary')}${button('⛶ Full screen','start-fullscreen','btn ghost')}</div><div class="start-chips"><span class="pill">🗺️ 4 worlds</span><span class="pill">⚡ 48 missions</span><span class="pill">🏅 4 badges</span></div><div style="margin-top:19px">${button('↓ Download offline game','offline','btn small ghost')}</div></div><div class="floating-note"><div class="crystal">💎</div><div><b>The Word Crystals need you.</b><span>Read. Move. Explore.</span></div></div></section>`;}
function modal(html){if(engine){engine.keys.clear();engine.drag=null;engine.swiping=false;}heldKeyboard.clear();activePointers.clear();lastFocus=document.activeElement;$('#overlay').innerHTML=`<section class="modal" role="dialog" aria-modal="true" aria-label="Game message">${html}</section>`;$('#overlay').hidden=false;if(engine)engine.paused=true;setTimeout(()=>$('#overlay').querySelector('input,button')?.focus(),0);}
function closeModal(){pauseOpen=false; $('#overlay').hidden=true;$('#overlay').innerHTML='';if(engine)engine.paused=false;lastFocus?.focus?.();}
function start(){tone();startMusic();if(profile())selectPlayer(db.active);else nameModal();}
function nameModal(){selectedAvatar='🧑‍🚀';modal(`<div class="eyebrow">NEW PLAYER</div><h2 style="margin-top:12px">What is your name?</h2><p>We will use this name on your results and certificate.</p><label for="player-name">Player name</label><input id="player-name" type="text" maxlength="32" placeholder="Type your name" autocomplete="off"><label for="player-school">School name</label><input id="player-school" type="text" maxlength="64" placeholder="Type your school name" autocomplete="off"><label>Choose your picture</label><div class="avatars">${['🧑‍🚀','🧑‍🎓','🤖','🐱'].map((a,i)=>button(a,'avatar',i===0?'active':'',`data-value="${a}" aria-label="Avatar ${i+1}"`)).join('')}</div><div class="row">${button('Start exploring →','create','btn primary')}${button('Cancel','close','btn ghost')}</div>`);}
function createPlayer(){const name=$('#player-name').value.trim();const school=$('#player-school')?.value.trim()||'';if(!name){toast('Please type your name first.');$('#player-name').focus();return;}const p=newProfile(name,selectedAvatar,school);db.profiles.push(p);db.active=p.id;save();closeModal();prologStep=0;prolog();}
function prolog(){setScreen('prolog');const lines=[['Welcome to Nglipar!',`Hi, ${esc(profile().name)}! I am Kirana. We are looking for the Lost Word Crystals of Nglipar. Can you help us?`,'Kirana','👩🏽'],['Four Worlds. One Adventure.','We must visit the School, the House, and the Town before opening the Crystal Gate. Each place has clues!','Siti','🧕🏽'],['Read. Think. Act.','Read the clues carefully and choose the right answer. Do not give up! Let us start our adventure now!','Retno','👧🏽']];$('#main').innerHTML=`<section class="prolog"><div class="dialogue"><div class="mascot" style="font-size:76px;line-height:1;">${lines[prologStep][3]}</div><div style="flex:1;"><div class="eyebrow">${lines[prologStep][2]} · ${prologStep+1}/3</div><h2>${lines[prologStep][0]}</h2><p>${lines[prologStep][1]}</p></div>${button(prologStep===2?'Open map →':'Next →','prolog-next','btn primary')}</div></section>`;}
function world(){if(!profile()){home();return;}closeModal();setScreen('map');const pos=[[8,32],[37,58],[72,37],[56,8]];$('#main').innerHTML=`<section class="world"><div class="world-head"><div class="eyebrow">WORLD MAP</div><h2>Where next, ${esc(profile().name)}.</h2><p>Find all four crystals. Each answer helps you move on.</p></div>${AREA_META.map((a,i)=>`<button class="island ${isOpen(i)?'':'locked'}" style="left:${pos[i][0]}%;top:${pos[i][1]}%" data-action="area" data-i="${i}" aria-label="${a.name}${isOpen(i)?'':' locked'}"><span class="num">${a.icon} &nbsp; AREA 0${i+1}</span><h3>${a.name}</h3><p>${a.place}</p><span class="status">${profile().tests[i]?.best>=70?`✓ Crystal found · ${profile().tests[i].best}%`:isOpen(i)?(profile().done[i]?'Take the area test →':'Explore this area →'):'🔒 Pass the last area test'}</span></button>`).join('')}<div class="map-bottom"><span class="map-tip">✦ Game points: <b>${profile().points}</b> &nbsp; · &nbsp; 🔥 ${profile().streak} days</span><div class="row">${button('🏅 Profile & badges','profile','btn small')}${button('Rank','leaderboard','btn small')}${button('Teacher results','dashboard','btn small')}${button('Change player','players','btn small')}${button('Reset Progress','reset-progress','btn small danger')}</div></div></section>`;}
function openArea(i){if(!isOpen(i)){toast('Get 70 or more in the last area test to open this map.');return;}area=i;setScreen('intro');const a=AREA_META[i];$('#main').innerHTML=`<section class="page"><div class="page-title"><div><div class="eyebrow">AREA 0${i+1} · ${a.tag}</div><h2 style="margin-top:8px">${a.name}</h2></div>${button('← Map','map','btn small')}</div><div class="intro"><div class="intro-art"><div class="big-icon">${i===2?'<span aria-label="Runner">🏃</span>':`<span class="sprite-ui large" style="background-position:${[0,66.6667,33.3333,66.6667][i]}% ${[66.6667,66.6667,100,100][i]}%"></span>`}</div><h2>${a.guide} is waiting for you.</h2><p>${a.desc}</p></div><div class="card"><h3>12 missions. One crystal.</h3><div class="level-line"><b>Level 1 · Discover</b><br>Use words in everyday life.</div><div class="level-line"><b>Level 2 · Connect</b><br>Read clues about places, times and steps.</div><div class="level-line"><b>Level 3 · Solve</b><br>Use all the clues. Choose the best answer.</div><p style="margin-top:15px;font-size:16px">${a.controls}</p><div class="row">${button(profile().checkpoints[i]?'Continue mission →':'Start mission →','play','btn primary')}${button('Word help','vocab','btn')}${profile().done[i]?button('Area test','test','btn gold'):''}</div></div></div></section>`;}
function vocabulary(){modal(`<div class="eyebrow">WORD HELP · ${AREA_META[area].place}</div><h2 style="margin-top:12px">Words to help you</h2><div class="vocab">${AREA_META[area].vocab.map(v=>`<div><b>${v[0]}</b><small>${v[1]}</small></div>`).join('')}</div><p style="margin-top:18px;font-size:17px">This: one thing near you. That: one thing far away. These: two or more things near you. Those: two or more things far away.</p><div class="row">${button('Ready to play','close','btn primary')}</div>`);}
function learning(){setScreen('learning');$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>Your learning goals</h2><p>Things Around Me · Grade 7 · Simple English</p></div>${button('Back','back','btn small')}</div><div class="scroll"><div class="grid"><div class="card full"><h3>Read and understand</h3><p>${LEARNING.cp}</p><p class="source">${LEARNING.source}</p></div><div class="card"><h3>Curriculum Mapping</h3><p style="font-size:15px;line-height:1.5;margin-top:10px;">English – Phase D (Grade VII)<br>Theme: Things Around Me<br>Main Element: Reading–Viewing<br>Learning Focus: Understanding and responding to explicit and implicit information in short written and multimodal texts about everyday contexts.<br>CP:<br>Memahami alur informasi, informasi tersurat dan tersirat dari berbagai jenis teks tertulis atau teks multimodal tentang topik sehari-hari atau yang sesuai dengan minat dan meresponnya sesuai konteks.<br>TP:<br>Peserta didik mampu memahami dan merespons informasi tersurat dan tersirat dari teks pendek dan teks multimodal sederhana tentang benda, tempat, aktivitas, dan lingkungan sehari-hari melalui konteks petualangan interaktif<br><br></p><h3 style="margin-top:20px;">What you will learn</h3>${LEARNING.tp.map((t,i)=>`<div class="tp"><strong>0${i+1}</strong><span>${t}</span></div>`).join('')}</div><div class="card"><h3>Three steps</h3><p><b>Discover:</b> use words in daily life.<br><br><b>Connect:</b> read clues about places, times and steps.<br><br><b>Solve:</b> use all the clues to choose an answer.</p><h3 style="margin-top:20px">Your score</h3><p>Each correct test answer gives you 10 points. Get 70 or more to open the next area. Game points and lives are separate from your test score.</p></div></div></div></section>`;}
function guide(){setScreen('guide');$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>How to play</h2><p>Read the clue. Watch the clock. Make your move.</p></div>${button('Back','back','btn small')}</div><div class="scroll"><div class="grid">${AREA_META.map(a=>`<article class="card"><h3>${a.icon} ${a.name}</h3><p>${a.desc}</p><p style="margin-top:12px">${a.controls}</p></article>`).join('')}<article class="card full"><h3>Three lives. Every move matters.</h3><p>Start each area with 3 lives. A wrong answer, collision with an obstacle, missed shot, wrong lane or time-out costs 1 life. At 0 lives, it is Game Over. Try the area again or go to the map.</p><p style="margin-top:12px">Each mission has 60 seconds, or 90 in Easy mode. Each test question has 45 seconds, or 60 in Easy mode. In a test, time-out counts as a wrong answer. The clock stops during a pause, a message or when you leave the game window.</p><p style="margin-top:12px">In missions, press 1–3 to set your aim or lane. Move to give your answer. In tests, press 1–3 to answer. Press P or Esc to pause. Press M for sound. Use the mouse, touch buttons or keyboard. Your results stay on this browser. Download a CSV to keep a copy.</p></article><article class="card full"><h3>A fresh start</h3><p>Use Reset Progress on the map to start again with your current name. It clears your scores, badges, stars, word cards, styles and saved missions. You must confirm first. Other players keep their progress.</p><p style="margin-top:12px">For testing, open SECRET CODE and enter SURYO AGUNG. All maps open. This does not give you test scores or badges. Turn off test mode to use normal map rules again.</p></article></div></div></section>`;}
function credits(){setScreen('credits');$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>Credits & Sources</h2><p>Four worlds. New words. One great adventure.</p></div>${button('Back','back','btn small')}</div><div class="scroll"><div class="grid"><div class="card full"><div class="eyebrow">THE IDEA BEHIND THE QUEST</div><h3 style="font-size:27px;margin:15px 0">Suryo Agung Nugroho, S.Pd.</h3><p>Game creator and English teacher<br>SMP Negeri 1 Nglipar</p><p style="margin-top:16px">A game for young learners who love to explore, think and try again.</p></div><div class="card"><h3>World, characters & sound</h3><p>A world of islands, friendly characters and bright crystals. Music and game sounds play on your device. All game files are in the offline pack.</p></div><div class="card"><h3>Clear words. Clear type.</h3><p>The game uses DejaVu Sans Bold. The font licence is in FONT-LICENSE.txt. Some small icons may look different on each device.</p></div><div class="card full"><h3>Learning sources</h3><p>${LEARNING.source}</p><p style="margin-top:12px">Festival Biru Putih 2026 guide, Educational Games, pages 7–12. Teachers can use this game with their own class activities.</p></div></div></div></section>`;}
function settings(){modal(`<h2>Game settings</h2><div class="setting"><label style="margin:0" for="relaxed">Easy mode · slower moves, more time</label><input id="relaxed" type="checkbox" ${db.settings.relaxed?'checked':''}></div><div class="setting"><label style="margin:0" for="reduced">Less background movement</label><input id="reduced" type="checkbox" ${db.settings.reduced?'checked':''}></div><div class="setting"><label style="margin:0" for="muted">Sound off</label><input id="muted" type="checkbox" ${db.settings.mute?'checked':''}></div><div class="setting"><label style="margin:0" for="volume">Volume</label><input id="volume" type="range" min="0" max="1" step="0.05" value="${db.settings.volume}" aria-label="Volume"></div><p style="font-size:16px;margin-top:18px">Changes start now. Easy mode does not change your test score.</p><div class="row">${button('Save settings','save-settings','btn primary')}</div>`);}
function saveSettings(){db.settings.relaxed=$('#relaxed').checked;db.settings.reduced=$('#reduced').checked;db.settings.mute=$('#muted').checked;db.settings.volume=Number($('#volume').value);document.body.classList.toggle('reduce-motion',db.settings.reduced);save();closeModal();header();}
function players(){setScreen('players');$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>Choose a player</h2><p>Each player has their own progress on this device.</p></div>${button('+ New player','new-player','btn primary')}</div><div class="scroll"><div class="grid">${db.profiles.map(p=>`<div class="card"><h3>${p.avatar} ${esc(p.name)}</h3>${p.school?'<div style="font-size:14px;color:#99b8c8;margin-bottom:8px;">'+esc(p.school)+'</div>':''}<p>${completed(p)}/4 crystals · ${p.points} game points · ${p.streak} days of practice</p><div class="row" style="margin-top:15px">${button('Play as this player','select-player','btn small',`data-id="${p.id}"`)}</div></div>`).join('')||'<p>No players yet. Add your name to start.</p>'}</div></div></section>`;}
function selectPlayer(id){db.active=id;const p=profile(),today=new Date().toLocaleDateString('en-CA');if(p.lastDate!==today){const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);p.streak=p.lastDate===yesterday.toLocaleDateString('en-CA')?p.streak+1:1;p.lastDate=today;}save();world();}
function showProfile(){setScreen('profile');const p=profile();$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>${p.avatar} ${esc(p.name)}</h2>${p.school?'<p style="margin-top:5px;font-size:16px;color:#a1c6e1;">'+esc(p.school)+'</p>':''}<p>${p.points} game points · ${p.streak} days of practice · ${completed()}/4 Word Crystals</p></div>${button('← Map','map','btn small')}</div><div class="badges">${AREA_META.map((a,i)=>`<div class="badge ${p.badges.includes(i)?'earned':''}"><span class="emoji">${p.badges.includes(i)?a.icon:'🔒'}</span><b>${a.badge}</b><br>${p.tests[i]?`Best ${p.tests[i].best}% · Latest ${p.tests[i].last}%`:'No test results yet'}</div>`).join('')}</div><div class="card"><h3>Your adventure</h3><p>Get 70 or more in an area test to earn a badge. Your certificate uses your best score in each test. Your teacher can see your latest scores too.</p><div class="row" style="margin-top:18px">${completed()===4?button('View certificate','certificate','btn gold'):button('Find more crystals','map','btn primary')}${button('Download results CSV','csv','btn')}</div></div></section>`;}
function leaderboard(){setScreen('leaderboard');const rank=db.profiles.slice().sort((a,b)=>completed(b)-completed(a)||b.tests.reduce((s,t)=>s+(t?.best||0),0)-a.tests.reduce((s,t)=>s+(t?.best||0),0)||b.points-a.points);$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>Player scores</h2><p>Players are listed by crystals, test scores, then game points.</p></div>${button('Back to map','map','btn small')}</div><div class="scroll"><table class="score-table"><thead><tr><th>Rank</th><th>Player</th><th>Crystals</th><th>Best scores / 400</th><th>Game points</th></tr></thead><tbody>${rank.map((p,i)=>`<tr><td>${i+1}</td><td>${p.avatar} ${esc(p.name)}</td><td>${completed(p)}/4</td><td>${p.tests.reduce((s,t)=>s+(t?.best||0),0)}</td><td>${p.points}</td></tr>`).join('')}</tbody></table><p class="muted" style="margin-top:24px">These players use the same browser.</p></div></section>`;}
function dashboard(){setScreen('dashboard');$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>Teacher results</h2><p>This browser only · best / latest scores · game points are separate</p></div>${button('Download CSV','csv','btn primary')}</div><div class="scroll"><table class="score-table"><thead><tr><th>Player</th>${AREA_META.map(a=>`<th>${a.place}</th>`).join('')}<th>Points</th><th>History</th></tr></thead><tbody>${db.profiles.map(p=>`<tr><td>${p.avatar} ${esc(p.name)}</td>${p.tests.map(t=>`<td>${t?`${t.best} / ${t.last}<br><small>${t.attempts} tries</small>`:'—'}</td>`).join('')}<td>${p.points}</td><td>${button('Detail','history','btn small',`data-id="${p.id}"`)}</td></tr>`).join('')}</tbody></table>${db.profiles.length?'':'<div class="card"><p>No results yet. Play the game and finish a test.</p></div>'}<div class="card" style="margin-top:20px"><h3>Read the results</h3><p>Your best test scores open maps and earn badges. You can see every test and the skills to practise. Game points do not change test scores. Results stay on this device.</p></div></div></section>`;}
const SKILL_NAMES={'Fungsi benda':'Things we use','Tempat':'Places','Jadwal':'Times and lessons','Posisi':'Where things are','Struktur bahasa':'Sentences','Penalaran':'Use the clues','Instruksi':'Follow steps','Profesi':'Jobs','Konteks':'Meaning'};
const skillName=s=>SKILL_NAMES[s]||s;
function history(id){const p=db.profiles.find(x=>x.id===id);modal(`<h2>History: ${esc(p.name)}</h2><div style="max-height:400px;overflow:auto;padding-right:15px;">${p.history.slice().reverse().map(h=>`<div class="review"><b>${AREA_META[h.area].place} · ${h.score}%</b><span>${esc(new Date(h.date).toLocaleString('en-GB'))}</span><div class="skill-list" style="margin-top:10px;">${Object.entries(h.skills||{}).map(([k,v])=>{const pct = Math.round(v.correct/v.total * 100); const color = pct >= 70 ? '#69bc92' : '#f5a2a6'; return `<div class="skill-row"><div class="skill-label">${esc(skillName(k))}</div><div class="skill-bar-wrap"><div class="skill-bar" style="width:${pct}%; background:${color}"></div></div><div class="skill-score" style="min-width:35px;text-align:right;">${pct}%</div></div>`;}).join('')}</div></div>`).join('')||'<p>No tests yet.</p>'}</div><div class="row">${button('Close','close','btn primary')}</div>`);}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);}

let editorArea = 0;
function teacherEditor(){
  closeModal();
  setScreen('editor');
  if(!db.customBanks) db.customBanks = [{}, {}, {}, {}]; // store overrides by area index and question ID

  $('#main').innerHTML = `<section class="page"><div class="page-title"><div><h2>Teacher Editor</h2><p>Modify questions, export banks, or restore defaults.</p></div><div>${button('Export JSON','editor-export','btn primary small')} ${button('Import JSON','editor-import','btn small')} ${button('Restore Defaults','editor-restore','btn small danger')} ${button('Back','back','btn small')}</div></div>
  <div class="book-tabs">${AREA_META.map((a,i)=>`${button(a.name,'editor-tab',i===editorArea?'btn active':'btn ghost',`data-i="${i}"`)}`).join('')}</div>
  <div class="scroll"><div style="display:flex;flex-direction:column;gap:12px;">
    ${MISSION_BANKS[editorArea].map((q, j) => {
      const custom = db.customBanks[editorArea][q.id];
      const activeQ = custom || q;
      return `<div class="card" style="padding:15px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <b style="font-size:16px;color:#a9f1cc">${activeQ.icon} ${esc(activeQ.text)}</b>
          <div style="font-size:14px;color:#adc4d8;margin-top:6px;">Ans: ${esc(activeQ.answer)} | Type: ${activeQ.type} ${custom?'<span style="color:#ffdb94;margin-left:10px;">(Modified)</span>':''}</div>
        </div>
        ${button('Edit','editor-edit','btn small ghost',`data-id="${q.id}"`)}
      </div>`;
    }).join('')}
  </div></div></section>`;
}
function editorEditModal(id) {
  const baseQ = [...MISSION_BANKS[editorArea], ...TESTS[editorArea]].find(x => x.id == id);
  const activeQ = db.customBanks[editorArea][id] || baseQ;
  modal(`<h2>Edit Question</h2>
  <div style="max-height:400px;overflow:auto;padding-right:15px;">
    <label>Prompt Text</label>
    <input type="text" id="edit-text" value="${esc(activeQ.text)}">
    <label>Options (Comma Separated)</label>
    <input type="text" id="edit-options" value="${esc(activeQ.options.join(','))}">
    <small style="color:#99b8c8;display:block;margin-bottom:10px;">The first option MUST be the correct answer. The game will shuffle them automatically.</small>
    <label>Explanation (Why)</label>
    <input type="text" id="edit-why" value="${esc(activeQ.why)}">
    <label>Icon Emoji</label>
    <input type="text" id="edit-icon" value="${esc(activeQ.icon)}">
    <label>Skill Category</label>
    <input type="text" id="edit-skill" value="${esc(activeQ.skill)}">
    <label>Type (choice / truefalse)</label>
    <input type="text" id="edit-type" value="${esc(activeQ.type)}">
    <label>Image URL / Path (Optional)</label>
    <input type="text" id="edit-img" value="${activeQ.image ? esc(activeQ.image) : ''}">
  </div>
  <div class="row" style="margin-top:20px;">
    ${button('Save Changes','editor-save','btn primary',`data-id="${id}"`)}
    ${db.customBanks[editorArea][id] ? button('Reset to Default','editor-reset-q','btn danger',`data-id="${id}"`) : ''}
    ${button('Cancel','close','btn ghost')}
  </div>`);
}
function editorSave(id) {
  const text = $('#edit-text').value.trim();
  const options = $('#edit-options').value.split(',').map(s=>s.trim()).filter(s=>s);
  const why = $('#edit-why').value.trim();
  const icon = $('#edit-icon').value.trim();
  const skill = $('#edit-skill').value.trim();
  const type = $('#edit-type').value.trim() || 'choice';
  const image = $('#edit-img').value.trim() || null;

  if(!text || options.length < 2) { toast('Prompt and at least 2 options are required.'); return; }

  db.customBanks[editorArea][id] = { id, text, options, answer: options[0], why, icon, skill, type, image };
  save();
  toast('Question updated.');
  teacherEditor();
}
function editorExport() {
  const safe = JSON.stringify(db.customBanks, null, 2);
  download(new Blob([safe], {type:'application/json'}), 'GEBING-Question-Bank.json');
}
function editorImport() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if(Array.isArray(data) && data.length === 4) {
          db.customBanks = data;
          save();
          toast('Question bank imported successfully.');
          teacherEditor();
        } else {
          toast('Invalid bank format.');
        }
      } catch { toast('Invalid JSON file.'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

function exportCSV(){const rows=[['Player','Area','Attempt','Date','Test score','Skill','Correct','Total','Game points']];db.profiles.forEach(p=>p.history.forEach((h,i)=>Object.entries(h.skills).forEach(([k,v])=>rows.push([p.name,AREA_META[h.area].place,i+1,h.date,h.score,skillName(k),v.correct,v.total,p.points]))));if(rows.length===1){toast('Finish a test before you download your results.');return;}const safe=v=>{let s=String(v);if(/^[=+@\-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};download(new Blob(['\uFEFF'+rows.map(r=>r.map(safe).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}),'GEBING-Results.csv');}
function checkpoint(index=game?.index){if(!game)return;profile().checkpoints[area]={index,correct:game.correct,answered:game.answered,assisted:game.assisted,points:game.points,lives:game.lives,over:!!game.over};save();}
function startPlay(){closeModal();setScreen('play');const cp=profile().checkpoints[area];game=cp?{...cp}:{index:0,correct:0,answered:0,assisted:0,points:0};game.questionIds=validMissionSet(cp?.questionIds,area)?cp.questionIds.slice():cp?MISSION_BANKS[area].slice(0,12).map(q=>q.id):drawMissionSet(area);game.resumeOptions=cp?.options;game.hints=3;game.lives=cp?.lives??3;game.combo=0;game.over=!!cp?.over;if(game.over||game.lives<=0){showGameOver();return;}nextMission();}
function nextMission(){if(game.index>=MISSIONS[area].length){finishPlay();return;}screen='play';const q=game.final?FINAL_TASKS[area][game.index]:missionQuestion(area,game);game.q=q;game.options=validOptionOrder(game.resumeOptions,q)?game.resumeOptions.slice():shuffled(q.options);game.resumeOptions=null;game.recorded=false;game.helped=false;game.solved=false;game.feedback=false;game.selected=-1;game.hints=3;game.over=false;game.timeLeft=missionSeconds();game.timeLimit=game.timeLeft;header();$('#main').innerHTML=`<div class="hud"><div class="row"><span class="eyebrow">${AREA_META[area].icon} ${AREA_META[area].name}</span><span>LEVEL <b>${Math.floor(game.index/4)+1}/3</b></span><span>MISSION <b>${game.index+1}/12</b></span></div><div class="row"><span>✦ Points <b id="game-points">${game.points}</b></span><span>Practice <b>${game.correct}/${game.answered}</b></span><span id="lives" aria-label="Lives">♥ ${game.lives}</span><span id="mission-clock" class="clock" role="timer" aria-label="Time left">⏱ ${Math.ceil(game.timeLeft)}s</span>${button('Ⅱ Pause','pause','btn small')}</div></div><div class="mission-prompt"><span class="symbol">${q.image?'<img src="'+esc(q.image)+'" style="height:60px;width:auto;border-radius:8px;">':q.icon}</span><div><small>${['DISCOVER · USE WORDS','CONNECT · FIND CLUES','SOLVE · THINK'][Math.floor(game.index/4)]} / ${q.skill.toUpperCase()}</small><p id="mission-text">${esc(q.text)}</p></div>${button('💡 Hint','hint','btn small')}</div>${q.type==='matching'||q.type==='sequence'?`<div id="interactive-arena" class="playfield" style="background:#112638;border-radius:0 0 17px 17px;position:relative;height:426px;"></div>`:`<div class="playfield"><canvas id="arena" width="1230" height="333" aria-label="Game area." role="img"></canvas></div><div class="play-controls"><div class="choice-bar">${game.options.map((v,i)=>button(`<b>${i+1}.</b> ${esc(v)}`,'mission-answer','answer-mini',`data-i="${i}"`)).join('')}</div>${area===0?'<span class="control-info">Drag left side to move.<br>Tap right side to jump.</span>':area===1?button('Help me shoot','assist-shot','btn gold'):area===2?'<span class="control-info">Tap a lane<br>to switch lanes.</span>':`<span class="control-info">Swipe a fruit box, click,<br>or press 1–3.</span>`}</div></div>`}</div>`;stopEngine();if(q.type==='matching'||q.type==='sequence'){startInteractivePuzzle(q.type);}else{engine=new GameEngine($('#arena'),area,game.options);engine.start();}}
function selectAnswer(i){if(screen!=='play'||game.feedback||game.solved||!$('#overlay').hidden||!engine)return;const q=game.q,ok=game.options[i]===q.answer;game.selected=i;if(!game.recorded){game.recorded=true;game.answered++;if(ok&&!game.helped)game.correct++;if(game.helped)game.assisted++;}if(!ok){game.combo=0;if(loseLife('Wrong answer.'))return;game.feedback=true;modal(`<div class="eyebrow">TRY AGAIN</div><h2 style="margin-top:12px">Read the clue again.</h2><p>${esc(q.why)}</p><p style="font-size:16px;margin-top:13px">Your choice: ${esc(game.options[i])}. Your first answer stays in your results. You can try again.</p><div class="row">${button('Choose again','retry-choice','btn primary')}</div>`);return;}game.solved=true;game.combo=(game.combo||0)+1;sfx(true);document.querySelectorAll('.answer-mini').forEach((b,j)=>{b.disabled=true;b.classList.toggle('selected',j===i);});engine.target=i;engine.ready=true;if(area===3){engine.cut(i);}else toast(area===0?'Correct! Run and jump to the bright platform.':area===1?'Correct! Aim at the bright target. You can also use Help me shoot.':'Correct! Run into the bright lane.');}

let interactiveState = null;

function startInteractivePuzzle(type) {
    const q = game.q;
    const container = $('#interactive-arena');

    let html = '<div style="padding:30px;height:100%;display:flex;flex-direction:column;">';

    if (type === 'sequence') {
        const items = shuffled(q.options.slice());
        interactiveState = { type, items, original: q.options };
        html += `
            <h3 style="color:#b9d6e5;margin-bottom:20px;">Drag the items up or down into the correct order.</h3>
            <div id="dnd-list" style="flex:1;display:flex;flex-direction:column;gap:10px;">
                ${items.map((item, i) => `
                    <div class="dnd-item" data-idx="${i}" style="padding:15px 20px;background:#203b4d;border:2px solid #4a6b81;border-radius:12px;color:white;font-size:18px;cursor:grab;user-select:none;touch-action:none;">${esc(item)}</div>
                `).join('')}
            </div>
        `;
    } else if (type === 'matching') {
        // Assume options are formatted as "Left Part -> Right Part"
        const pairs = q.options.map(o => o.split('->').map(s=>s.trim()));
        const lefts = shuffled(pairs.map(p => p[0]));
        const rights = shuffled(pairs.map(p => p[1]));

        interactiveState = { type, lefts, rights, pairs, drops: Array(rights.length).fill(null) };

        html += `
            <h3 style="color:#b9d6e5;margin-bottom:20px;">Drag the items from the left to match the right.</h3>
            <div style="display:flex;gap:30px;flex:1;">
                <div id="dnd-source" style="flex:1;display:flex;flex-direction:column;gap:10px;">
                    ${lefts.map((l, i) => `
                        <div class="dnd-item" data-val="${esc(l)}" style="padding:15px;background:#203b4d;border:2px solid #4a6b81;border-radius:12px;color:white;font-size:18px;cursor:grab;touch-action:none;">${esc(l)}</div>
                    `).join('')}
                </div>
                <div id="dnd-targets" style="flex:1;display:flex;flex-direction:column;gap:10px;">
                    ${rights.map((r, i) => `
                        <div class="dnd-target" data-idx="${i}" style="padding:15px;background:#152f43;border:2px dashed #4a6b81;border-radius:12px;color:#a1c6e1;font-size:18px;display:flex;justify-content:space-between;">
                            <span class="slot" style="color:#5f8298;">(Drop here)</span>
                            <b>${esc(r)}</b>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    html += `<div style="margin-top:20px;text-align:right;">${button('Check Answer','check-puzzle','btn primary')}</div></div>`;
    container.innerHTML = html;

    bindDnD();
}

function bindDnD() {
    let dragged = null;
    let placeholder = null;

    const items = document.querySelectorAll('.dnd-item:not(.bound)');
    items.forEach(el => { el.classList.add('bound');
        el.addEventListener('pointerdown', e => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            dragged = el;
            el.setPointerCapture(e.pointerId);
            el.style.opacity = '0.5';

            if (interactiveState.type === 'sequence') {
                placeholder = document.createElement('div');
                placeholder.className = 'dnd-placeholder';
                placeholder.style.height = el.offsetHeight + 'px';
                placeholder.style.background = '#152f43';
                placeholder.style.border = '2px dashed #4a6b81';
                placeholder.style.borderRadius = '12px';
            }
        });

        el.addEventListener('pointermove', e => {
            if (!dragged || dragged !== el) return;

            if (interactiveState.type === 'sequence') {
                const list = document.getElementById('dnd-list');
                const siblings = [...list.querySelectorAll('.dnd-item:not(.dragging)')];
                let nextSibling = siblings.find(sib => {
                    const rect = sib.getBoundingClientRect();
                    return e.clientY <= rect.top + rect.height / 2;
                });

                if (dragged.parentNode !== list) return;

                if (!placeholder.parentNode) {
                    list.insertBefore(placeholder, dragged);
                    dragged.style.position = 'absolute';
                    dragged.style.zIndex = 100;
                    list.appendChild(dragged); // Move out of flow visually
                }

                const rect = document.getElementById('interactive-arena').getBoundingClientRect(); dragged.style.top = (e.clientY - rect.top - dragged.offsetHeight/2) + 'px'; dragged.style.left = (e.clientX - rect.left - dragged.offsetWidth/2) + 'px';

                if (nextSibling !== placeholder) {
                    list.insertBefore(placeholder, nextSibling);
                }
            } else if (interactiveState.type === 'matching') {
                dragged.style.position = 'absolute';
                dragged.style.zIndex = 100;
                const rect = document.getElementById('interactive-arena').getBoundingClientRect(); dragged.style.top = (e.clientY - rect.top - dragged.offsetHeight/2) + 'px'; dragged.style.left = (e.clientX - rect.left - dragged.offsetWidth/2) + 'px';
            }
        });

        el.addEventListener('pointerup', e => {
            if (!dragged) return;
            dragged.releasePointerCapture(e.pointerId);
            dragged.style.opacity = '1';
            dragged.style.position = 'static';
            dragged.style.zIndex = 'auto';

            if (interactiveState.type === 'sequence') {
                if (placeholder && placeholder.parentNode) {
                    placeholder.parentNode.insertBefore(dragged, placeholder);
                    placeholder.remove();
                }
            } else if (interactiveState.type === 'matching') {
                // Find if dropped over target
                const targets = document.querySelectorAll('.dnd-target');
                let dropped = false;
                targets.forEach((t, i) => {
                    const r = t.getBoundingClientRect();
                    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
                        // Slot it in
                        const val = dragged.dataset.val;

                        // If replacing existing, put existing back
                        const existing = interactiveState.drops[i];
                        if (existing) {
                            const sourceDiv = document.createElement('div');
                            sourceDiv.className = 'dnd-item';
                            sourceDiv.dataset.val = existing;
                            sourceDiv.style = "padding:15px;background:#203b4d;border:2px solid #4a6b81;border-radius:12px;color:white;font-size:18px;cursor:grab;";
                            sourceDiv.textContent = existing;
                            document.getElementById('dnd-source').appendChild(sourceDiv);
                            bindDnD(); // rebind
                        }


                        interactiveState.drops[i] = val;
                        t.querySelector('.slot').textContent = val;
                        t.querySelector('.slot').style.color = '#fff';
                        t.style.cursor = 'pointer';
                        t.onclick = function() {
                            if(interactiveState.drops[i]) {
                                const sourceDiv = document.createElement('div');
                                sourceDiv.className = 'dnd-item';
                                sourceDiv.dataset.val = interactiveState.drops[i];
                                sourceDiv.style = "padding:15px;background:#203b4d;border:2px solid #4a6b81;border-radius:12px;color:white;font-size:18px;cursor:grab;";
                                sourceDiv.textContent = interactiveState.drops[i];
                                document.getElementById('dnd-source').appendChild(sourceDiv);
                                interactiveState.drops[i] = null;
                                t.querySelector('.slot').textContent = '(Drop here)';
                                t.querySelector('.slot').style.color = '#5f8298';
                                t.style.cursor = 'default';
                                t.onclick = null;
                                bindDnD();
                            }
                        };
                        dragged.remove();
                        dropped = true;

                    }
                });
            }
            dragged = null;
            placeholder = null;
        });
    });
}

function finishMission(){if(!game||game.feedback||game.over)return;game.feedback=true;const reward=100+(engine?.bonus||0)+Math.min(game.combo||0,5)*10;game.points+=reward;profile().points+=reward;sfx(true);modal(`<div class="eyebrow">MISSION ${game.index+1} DONE · +${reward} GAME POINTS</div><h2 style="margin-top:13px">${game.q.icon} ${esc(game.q.answer)}</h2><p>${esc(game.q.why)}</p><p style="font-size:16px;margin-top:13px">${game.helped?'You used a hint in this mission.':'Think about how we use these words.'}</p><div class="row">${button(game.index===11?'See practice results →':'Next mission →','next-mission','btn primary')}${button('Back to map','mission-map','btn ghost')}</div>`);checkpoint(game.index+1);}
function advanceMission(goMap=false){closeModal();game.index++;game.recorded=false;game.helped=false;game.failed=false;game.selected=-1;game.options=null;game.timeLeft=null;game.timeLimit=null;checkpoint();if(goMap)world();else nextMission();}
function finishPlay(){stopEngine();const p=profile();p.done[area]=true;p.checkpoints[area]=null;save();setScreen('practice-result');$('#main').innerHTML=`<section class="page"><div class="page-title"><div><div class="eyebrow">PRACTICE COMPLETE</div><h2 style="margin-top:10px">You are ready for the test.</h2></div><span style="font-size:65px">${AREA_META[area].icon}</span></div><div class="result-top"><div class="result-number">${game.correct}/12</div><div><h2>First answers without hints</h2><p>${game.assisted} missions with hints · ${game.points} game points.<br>The next test gives your learning score. Missed jumps and shots do not change that score.</p></div></div><div class="card"><h3>Area Test · 10 questions</h3><p>Answer on your own before time runs out. Get 7 answers right to find the crystal. You can take the test again without playing all the missions.</p><div class="row" style="margin-top:24px">${button('Start area test →','test','btn primary')}${button('Open word help','vocab','btn')}${button('Back to map','map','btn')}</div></div></section>`;}

function checkPuzzle() {
    if (game.solved) return;
    const q = game.q;
    let correct = false;

    if (interactiveState.type === 'sequence') {
        const currentOrder = [...document.querySelectorAll('#dnd-list .dnd-item')].map(el => el.textContent.trim());
        const expectedOrder = interactiveState.original;
        correct = currentOrder.join('|') === expectedOrder.join('|');
    } else if (interactiveState.type === 'matching') {
        const rights = interactiveState.rights;
        const pairs = interactiveState.pairs;

        // Ensure all slots filled
        if (interactiveState.drops.includes(null)) {
            toast('Please match all items first.');
            return;
        }

        correct = true;
        for (let i=0; i<rights.length; i++) {
            const l = interactiveState.drops[i];
            const r = rights[i];
            const valid = pairs.some(p => p[0] === l && p[1] === r);
            if (!valid) {
                correct = false;
                break;
            }
        }
    }

    // Simulate selectAnswer behavior
    if (!game.recorded){game.recorded=true;game.answered++;if(correct&&!game.helped)game.correct++;if(game.helped)game.assisted++;}

    if (!correct) {
        game.combo=0;if(loseLife('Wrong answer.'))return;game.feedback=true;
        modal(`<div class="eyebrow">TRY AGAIN</div><h2 style="margin-top:12px">Read the clue again.</h2><p>${esc(q.why)}</p><div class="row">${button('Choose again','retry-choice','btn primary')}</div>`);
        return;
    }

    game.solved=true;game.combo=(game.combo||0)+1;sfx(true);
    toast('Correct!');
    setTimeout(finishMission, 1000);
}

function hint(){if(!game||game.solved)return;if(game.hints<=0){toast('No hints left in this mission.');return;}game.hints--;game.helped=true;modal(`<div class="eyebrow">HINT FROM ${AREA_META[area].guide.toUpperCase()}</div><h2 style="margin-top:12px">Look at the clues.</h2><p>${esc(game.q.why)}</p><p style="font-size:16px;margin-top:15px">We mark answers with hints in your practice results. There are no hints in the area test.</p><div class="row">${button('Back to mission','close','btn primary')}</div>`);}
function pause(){if(game&&screen==='play'&&!game.feedback&&!game.solved)checkpoint();modal(`<h2>Game paused</h2><p>Take a short break. The clock is stopped.</p><div class="row">${button('▶ Continue','close','btn primary')}${button('Controls','play-help','btn')}${button('Go to map','leave-play','btn ghost')}</div>`);pauseOpen=true;}
function startTest(){if(!profile()?.done[area]){toast('Finish the 12 missions in this area first.');return;}closeModal();setScreen('test');TESTS[area].forEach((q,i)=>q.id='t'+area+'-'+i); quiz={questions:shuffled(TESTS[area].map(base => (db.customBanks && db.customBanks[area] && db.customBanks[area][base.id]) ? db.customBanks[area][base.id] : base)),index:0,answers:[],locked:false};renderQuiz();}
function renderQuiz(){const q=quiz.questions[quiz.index];quiz.options=shuffled(q.options);quiz.locked=false;quiz.timeLeft=testSeconds();quiz.timeLimit=quiz.timeLeft;header();$('#main').innerHTML=`<section class="page"><div class="page-title"><div><h2>Area Test</h2><p>${AREA_META[area].place} · Watch the clock · Goal: 70%</p></div>${button('Leave test','quit-test','btn small')}</div><div class="test-layout"><aside class="test-side"><div class="symbol">${AREA_META[area].icon}</div><h3>Find your crystal.</h3><p>Read carefully. Choose one answer.</p><div class="progress"><i style="width:${quiz.index*10}%"></i></div><p><b>Question ${quiz.index+1} of 10</b></p><p style="margin-top:17px;font-size:15px">Game points do not change your test score.</p></aside><article class="question-card"><div class="row" style="justify-content:space-between"><div class="eyebrow">${q.skill.toUpperCase()}</div><span id="test-clock" class="clock" role="timer" aria-label="Time left">⏱ ${quiz.timeLeft}s</span></div>${q.image?'<div style="margin:12px 0;text-align:center;"><img src="'+esc(q.image)+'" style="max-height:120px;border-radius:12px;"></div>':''}<h3>${esc(q.text)}</h3><div class="answers">${quiz.options.map((v,i)=>button(`<b>${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]}</b><span>${esc(v)}</span>`,'test-answer','answer',`data-i="${i}"`)).join('')}</div><div id="test-feedback" aria-live="polite"></div></article></div></section>`;}
function testAnswer(i){if(quiz.locked)return;quiz.locked=true;const q=quiz.questions[quiz.index],choice=i<0?'No answer (time is up)':quiz.options[i],correct=choice===q.answer;quiz.answers.push({question:q.text,choice,answer:q.answer,correct,why:q.why,skill:q.skill});document.querySelectorAll('.answer').forEach((b,j)=>{b.disabled=true;if(quiz.options[j]===q.answer)b.classList.add('correct');else if(j===i)b.classList.add('wrong');});sfx(correct);modal(`<h2>${i<0?'Time is up!':correct?'Correct!':'Read the answer.'}</h2><div class="feedback">${correct?'✓ Correct.':'↻ Not correct yet.'} ${esc(q.why)}</div><div style="margin-top:11px">${button(quiz.index===9?'See test results →':'Next question →','test-next','btn primary small')}</div>`);}
function finishTest(){const p=profile(),score=quiz.answers.filter(a=>a.correct).length*10,skills={};quiz.answers.forEach(a=>{skills[a.skill]??={correct:0,total:0};skills[a.skill].total++;if(a.correct)skills[a.skill].correct++;});const previous=p.tests[area];p.tests[area]={best:Math.max(previous?.best||0,score),last:score,attempts:(previous?.attempts||0)+1};p.history.push({area,score,date:new Date().toISOString(),skills,answers:quiz.answers});if(score>=70&&!p.badges.includes(area))p.badges.push(area);if(completed()===4&&!p.completed)p.completed=new Date().toISOString();save();setScreen('test-result');const weak=Object.entries(skills).filter(([k,v])=>v.correct<v.total).map(([k])=>k);$('#main').innerHTML=`<section class="page"><div class="result-top"><div class="result-number">${score}<span style="font-size:26px">%</span></div><div><div class="eyebrow">${score>=70?'CRYSTAL FOUND':'TRY ONCE MORE'}</div><h2 style="margin-top:8px">${score>=70?'Well done, '+esc(p.name)+'!':'You can try again.'}</h2><p>${score>=70?`Badge ${AREA_META[area].badge} earned. ${area<3?'The next area is open.':'You have visited all four areas.'}`:'Read the answers, then try the test again. You do not need to play the missions again.'}<br><div class="skill-list" style="margin-top:15px;">  ${Object.entries(skills).map(([k,v]) => {    const pct = Math.round(v.correct/v.total * 100);    const color = pct >= 70 ? '#69bc92' : '#f5a2a6';    return `    <div class="skill-row">      <div class="skill-label">${esc(skillName(k))}</div>      <div class="skill-bar-wrap"><div class="skill-bar" style="width:${pct}%; background:${color}"></div></div>      <div class="skill-score">${pct}%</div>    </div>`;  }).join('')}</div></p></div></div><div class="result-review">${quiz.answers.map((a,i)=>`<div class="review"><b>${a.correct?'✓':'↻'} ${i+1}. ${esc(a.question)}</b><span>Your answer: ${esc(a.choice)} · Correct answer: ${esc(a.answer)}</span><div class="why">${esc(a.why)}</div></div>`).join('')}</div><div class="result-actions">${completed()===4?button('🏅 View certificate','certificate','btn gold'):score>=70&&area<3?button('Next area →','next-area','btn primary'):button('Try test again','test','btn primary')}${button('World map','map','btn')}${button('Profile & badges','profile','btn')}</div></section>`;if(score>=70)confetti();}
function confetti(){if(db.settings.reduced)return;for(let i=0;i<26;i++){const e=document.createElement('i');e.className='confetti';e.style.left=(Math.random()*100)+'%';e.style.background=['#a0f1bf','#ffd78c','#c6aaff','#8dd9f6'][i%4];e.style.animationDelay=(Math.random()*1.3)+'s';$('#main').appendChild(e);setTimeout(()=>e.remove(),4400);}}
// Engine permainan memakai satu canvas. Geometri di bawah adalah arena/interaksi,
// sedangkan latar ilustrasi menggunakan aset raster lokal yang terdokumentasi.
const SCHOOL_OBSTACLES=[{x:586,y:280,w:48,h:28},{x:1046,y:280,w:48,h:28}];
class GameEngine{
 constructor(canvas,type,options){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.type=type;this.options=options;this.running=false;this.paused=false;this.ready=false;this.target=-1;this.bonus=0;this.keys=new Set();this.t=0;this.player={x:80,y:295,vx:0,vy:0,ground:true};this.cam=0;this.lane=1;this.carX=615;this.gateY=20;this.ball={x:100,y:256,vx:0,vy:0,flying:false};this.drag=null;this.joystick=null;this.jumpPointer=null;this.cooldown=0;this.particles=[];this.trail=[];this.bg=new Image();this.bg.src='assets/world.webp';this.atlas=new Image();this.atlas.src='assets/sprites.webp';this.abort=new AbortController();const signal=this.abort.signal;canvas.addEventListener('pointerdown',e=>this.pointerDown(e),{signal});canvas.addEventListener('pointermove',e=>this.pointerMove(e),{signal});canvas.addEventListener('pointerup',e=>this.pointerUp(e),{signal});canvas.addEventListener('pointercancel',()=>{this.drag=null;this.swiping=false;this.joystick=null;this.jumpPointer=null;},{signal});}
 start(){this.running=true;this.last=performance.now();const frame=now=>{if(!this.running)return;const dt=Math.min((now-this.last)/1000,.035);this.last=now;if(!this.paused&&!document.hidden){this.update(dt);this.draw();}this.raf=requestAnimationFrame(frame);};this.raf=requestAnimationFrame(frame);}
 stop(){this.running=false;cancelAnimationFrame(this.raf);this.abort.abort();this.keys.clear();}
 point(e){const r=this.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*1230/r.width,y:(e.clientY-r.top)*333/r.height};}
 pointerDown(e){if(this.paused)return;this.canvas.setPointerCapture?.(e.pointerId);const p=this.point(e);if(this.type===0){if(p.x<615){this.joystick={id:e.pointerId,origin:p,current:p};}else{this.jumpPointer=e.pointerId;if(this.player.ground){this.player.vy=-420;this.player.ground=false;tone(440,.1);}}}if(this.type===1&&this.ready&&!this.ball.flying&&Math.hypot(p.x-this.ball.x,p.y-this.ball.y)<95)this.drag=p;if(this.type===2){const w=1230/this.options.length; this.lane=Math.max(0,Math.min(this.options.length-1,Math.floor(p.x/w)));}if(this.type===3){this.swiping=true;this.hitCards(p);}if(p.x>1180&&p.y<45)this.findEgg();}
 pointerMove(e){if(this.paused)return;const p=this.point(e);if(this.joystick&&e.pointerId===this.joystick.id){this.joystick.current=p;}if(this.drag){const dx=p.x-100,dy=p.y-256,d=Math.hypot(dx,dy),s=Math.min(1,125/(d||1));this.drag={x:100+dx*s,y:256+dy*s};}if(this.swiping){this.trail.push({...p,life:.35});this.hitCards(p);}}
 pointerUp(e){if(this.joystick&&e.pointerId===this.joystick.id)this.joystick=null;if(this.jumpPointer===e.pointerId)this.jumpPointer=null;if(this.drag&&this.ready){this.ball.x=100;this.ball.y=256;this.ball.vx=(100-this.drag.x)*7;this.ball.vy=(256-this.drag.y)*7;this.ball.flying=true;this.drag=null;tone(330,.12);}this.swiping=false;}
 hitCards(p){if(game?.solved||game?.feedback)return;for(let i=0;i<this.options.length;i++){const pos=this.cardPos(i);if(p.x>pos.x-166&&p.x<pos.x+166&&p.y>pos.y-78&&p.y<pos.y+78){answerByMove(i);break;}}}
 findEgg(){if(profile().egg.includes(area))return;profile().egg.push(area);profile().points+=50;game.points+=50;this.bonus+=0;save();toast('✦ Secret crystal found! +50 game points.');tone(1320,.3);$('#game-points').textContent=game.points;}
 keyDown(key){if(this.paused)return;this.keys.add(key);if(this.type===0&&(key==='Space'||key==='ArrowUp')&&this.player.ground){this.player.vy=-420;this.player.ground=false;tone(440,.1);}if(this.type===2){if(key==='ArrowLeft')this.lane=Math.max(0,this.lane-1);if(key==='ArrowRight')this.lane=Math.min(this.options.length-1,this.lane+1);}}
 keyUp(key){this.keys.delete(key);}
 assistShot(){if(this.type!==1||!this.ready){toast('Read the clue. Aim at your answer.');return;}if(this.ball.flying)return;const target=this.targetPosition(this.aimTarget??1),t=1.75;this.ball={x:100,y:256,vx:(target.x-100)/t,vy:(target.y-256-250*t*t)/t,flying:true};tone(330,.15);}
 targetPosition(i){const w=255; const startX=600+(3-this.options.length)*(w/2); return{x:startX+i*w,y:140-(game.index%3)*12};}
 cardPos(i){const gap=1230/this.options.length; return{x:gap*i+gap/2,y:167+(db.settings.reduced?0:Math.sin(this.t*(db.settings.relaxed?.65:1.15)+i*2)*45)};}
 miss(){if((this.type===0&&this.cooldown>0)||game?.over)return;this.cooldown=1.6;loseLife('Missed move.');}

 burst(index){const p=this.type===3?this.cardPos(index):this.type===1?this.targetPosition(index):{x:615,y:170};for(let i=0;i<28;i++)this.particles.push({x:p.x,y:p.y,vx:(Math.random()-.5)*380,vy:-Math.random()*270,life:1+Math.random(),color:['#96f0b8','#ffd68c','#bda2f8'][i%3]});}
 update(dt){this.t+=dt;this.trail.forEach(p=>p.life-=dt);this.trail=this.trail.filter(p=>p.life>0);this.cooldown=Math.max(0,this.cooldown-dt);this.particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=420*dt;p.life-=dt;});this.particles=this.particles.filter(p=>p.life>0);if(this.type===0){const p=this.player,prev=p.y,speed=db.settings.relaxed?250:315;p.vx=(this.keys.has('ArrowRight')?speed:0)-(this.keys.has('ArrowLeft')?speed:0);if(this.joystick){const dx=this.joystick.current.x-this.joystick.origin.x;if(Math.abs(dx)>15){p.vx=(dx>0?speed:-speed)*Math.min(1,Math.abs(dx)/50);}}p.x=Math.max(25,Math.min(1660,p.x+p.vx*dt));p.vy+=950*dt;p.y+=p.vy*dt;p.ground=false;const platforms=[{x:0,y:307,w:1800},...Array.from({length:this.options.length},(_,i)=>({x:260+i*(1150/this.options.length),y:235-(game.index%3)*8,w:220}))];for(const a of platforms){if(p.vy>=0&&prev<=a.y+2&&p.y>=a.y&&p.x>a.x-8&&p.x<a.x+a.w+8){p.y=a.y;p.vy=0;p.ground=true;break;}}this.cam=Math.max(0,Math.min(500,p.x-380));if(this.ready&&!game.solved&&!game.feedback&&this.cooldown===0){for(let i=0;i<this.options.length;i++){const x=370+i*(1150/this.options.length),y=235-(game.index%3)*8;if(Math.abs(p.x-x)<42&&Math.abs(p.y-y)<30){this.bonus=game.lives*10;answerByMove(i);return;}}}for(const box of SCHOOL_OBSTACLES){const overlaps=p.x+12>box.x&&p.x-12<box.x+box.w&&p.y>box.y&&p.y-48<box.y+box.h;if(overlaps&&this.cooldown===0){const side=p.x<box.x+box.w/2?-1:1;p.x=Math.max(25,Math.min(1660,p.x+side*70));this.miss();break;}}}
 if(this.type===1&&this.ball.flying){const b=this.ball;b.vy+=500*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;for(let i=0;i<this.options.length;i++){const p=this.targetPosition(i);if(Math.abs(b.x-p.x)<92&&Math.abs(b.y-p.y)<51){b.flying=false;this.bonus=40;answerByMove(i);if(!game.solved)this.ball={x:100,y:256,vx:0,vy:0,flying:false};break;}}if(b.y>350||b.x>1280||b.x<0){this.ball={x:100,y:256,vx:0,vy:0,flying:false};this.miss();}}
 if(this.type===2){const w=1230/this.options.length; this.carX+=(w/2+this.lane*w-this.carX)*Math.min(1,dt*12);if(this.ready){this.gateY+=dt*(db.settings.relaxed?45:80)*(1+Math.floor(game.index/4)*.13);if(this.gateY>270){this.bonus=game.lives*15;this.gateY=20;answerByMove(this.lane);}}}
 }
 rounded(x,y,w,h,r,fill,stroke){const c=this.ctx;c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}}
 sprite(index,x,y,size=60){if(this.atlas.complete&&this.atlas.naturalWidth){const d=this.atlas.width/4;this.ctx.drawImage(this.atlas,(index%4)*d,Math.floor(index/4)*d,d,d,x-size/2,y-size/2,size,size);return true;}return false;}
 object(text,x,y,size=52){const icon=objectIcon(text),map={'📘':0,'📚':9,'📏':1,'✏️':2,'🎒':3,'🥄':4,'🍽️':5,'🍲':6,'🪥':7,'🏫':8,'🏥':11,'🌳':15};if(map[icon]!==undefined&&this.sprite(map[icon],x,y,size))return;this.text(icon,x,y+size*.3,size*.65,'#fff','center');}
 text(t,x,y,size=20,color='#e8f7ff',align='left',font='Arial'){const c=this.ctx;c.font=`bold ${size}px ${font}`;c.fillStyle=color;c.textAlign=align;c.fillText(t,x,y);}
 wrap(text,x,y,maxWidth,size=20,color='#f1f7fb',align='center'){const c=this.ctx;c.font=`bold ${size}px Arial`;c.fillStyle=color;c.textAlign=align;const words=text.split(' '),lines=[];let line='';words.forEach(w=>{const test=line?line+' '+w:w;if(c.measureText(test).width>maxWidth&&line){lines.push(line);line=w;}else line=test;});lines.push(line);lines.forEach((l,i)=>c.fillText(l,x,y+i*(size+5)));}
 draw(){const c=this.ctx;c.clearRect(0,0,1230,333);c.fillStyle=['#152f43','#29334b','#163b43','#222846'][this.type];c.fillRect(0,0,1230,333);if(this.bg.complete&&this.bg.naturalWidth){c.globalAlpha=this.type===3?.2:.14;c.drawImage(this.bg,0,0,1230,333);c.globalAlpha=1;}if(this.type===0)this.drawSchool();if(this.type===1)this.drawHouse();if(this.type===2)this.drawRace();if(this.type===3)this.drawNinja();this.particles.forEach(p=>{c.globalAlpha=Math.max(0,p.life/2);c.fillStyle=p.color;c.fillRect(p.x,p.y,9,9);});c.globalAlpha=1;if(!profile()?.egg.includes(this.type)){this.text('✦',1202,27,23,'#b3cfaaa0','center');}if(this.paused){c.fillStyle='#07162770';c.fillRect(0,0,1230,333);}}
 drawSchool(){const c=this.ctx;this.rounded(0,308,1230,25,0,'#416477');this.text('Jump onto the platform with your answer.',25,32,17,'#b9d6e5');for(let i=0;i<this.options.length;i++){const x=370+i*(1150/this.options.length)-this.cam,y=235-(game.index%3)*8,active=game.solved&&this.target===i;this.rounded(x-110,y,220,18,7,active?'#91edb7':'#477287',active?'#b7ffd0':'#74a4b1');this.rounded(x-140,66,280,75,12,active?'#234f49':'#0b2135','#4a6b81');this.wrap(`${i+1}. ${this.options[i]}`,x,95,260,18);this.object(this.options[i],x,y-39,65);if(active&&!this.sprite(14,x+48,y-35,36))this.text('◇',x+48,y-28,27,'#b1ffc9','center');}for(const box of SCHOOL_OBSTACLES){this.rounded(box.x-this.cam,box.y,box.w,box.h,6,'#df9870');this.text('!',box.x+box.w/2-this.cam,box.y+21,21,'#472d27','center');}const p=this.player;c.globalAlpha=this.cooldown>0?.6:1;if(!this.sprite(12,p.x-this.cam,p.y-28,64))this.text(profile()?.avatar||'A',p.x-this.cam,p.y-5,48,'white','center');c.globalAlpha=1;if(this.joystick){c.beginPath();c.arc(this.joystick.origin.x,this.joystick.origin.y,45,0,Math.PI*2);c.fillStyle='#ffffff22';c.fill();c.strokeStyle='#ffffff44';c.lineWidth=2;c.stroke();c.beginPath();c.arc(this.joystick.current.x,this.joystick.current.y,20,0,Math.PI*2);c.fillStyle='#ffffff66';c.fill();}}
 drawHouse(){const c=this.ctx;this.text(this.ready?'Pull the ball back and down. Let go to shoot.':'Read the clue. Choose an answer before you aim.',25,31,17,'#d0ddeb');this.rounded(0,307,1230,26,0,'#67526a');for(let i=0;i<this.options.length;i++){const p=this.targetPosition(i),active=game.solved&&this.target===i;for(let n=0;n<3;n++){this.rounded(p.x-62+n*43,258,39,48,4,'#86667b','#c396a0');}this.rounded(p.x-69,214,138,38,6,'#8c737c','#b79da4');this.rounded(p.x-111,p.y-39,222,86,12,active?'#6c542f':'#192d43',active?'#ffdb94':'#7691a4');this.object(this.options[i],p.x,p.y-17,39);this.wrap(`${i+1}. ${this.options[i]}`,p.x,p.y+17,204,16,active?'#ffebbd':'#e2eef4');}const b=this.ball;this.rounded(88,258,26,49,6,'#a4bdc5');if(this.drag){c.beginPath();c.moveTo(100,256);c.lineTo(this.drag.x,this.drag.y);c.strokeStyle='#f7d899';c.lineWidth=5;c.stroke();const vx=(100-this.drag.x)*7,vy=(256-this.drag.y)*7;for(let t=.1;t<1.8;t+=.1){c.fillStyle='#ffd8999c';c.beginPath();c.arc(100+vx*t,256+vy*t+250*t*t,3,0,Math.PI*2);c.fill();}}const bx=this.drag?.x??b.x,by=this.drag?.y??b.y;c.beginPath();c.arc(bx,by,18,0,Math.PI*2);c.fillStyle='#b7f7ca';c.fill();this.text('Aa',bx,by+6,16,'#163e37','center');}
 drawRace(){const c=this.ctx;for(let i=0;i<this.options.length;i++){c.fillStyle=i%2?'#254651':'#203b4c';const w=1230/this.options.length; c.fillRect(i*w+9,0,w-18,333);}c.strokeStyle='#a1c7c66b';c.lineWidth=3;c.setLineDash([20,20]);c.lineDashOffset=-this.t*(this.ready?90:20);for(let i=1;i<this.options.length;i++){const w=1230/this.options.length; c.beginPath();c.moveTo(i*w,0);c.lineTo(i*w,333);c.stroke();}c.setLineDash([]);for(let i=0;i<this.options.length;i++){const active=game.solved&&this.target===i,y=this.gateY;const w=1230/this.options.length; this.rounded(i*w+29,y,w-58,89,12,active?'#306350':'#0a2536',active?'#b2f3bf':'#5b8596');this.wrap(`${i+1}. ${this.options[i]}`,i*w+w/2,y+37,320,19);this.text(active?'↓ YOUR TARGET':'GATE',i*w+w/2,y+74,13,active?'#bdffcb':'#8eb4c4','center');}if(!this.sprite(13,this.carX,277,96))this.text('🛵',this.carX,302,63,'white','center');if(!this.ready){this.rounded(368,158,494,51,12,'#0b1d30ed','#668b9b');this.text('Choose an answer to start running.',615,190,21,'#def2ff','center');}}
 drawNinja(){const c=this.ctx;this.text('Choose the right word card. Swipe, click, or press 1–3.',615,29,18,'#d1d3ef','center');for(let i=0;i<this.options.length;i++){const p=this.cardPos(i),active=game.solved&&this.target===i;this.rounded(p.x-166,p.y-78,332,156,21,active?'#47664e':'#2d3559',active?'#b9ffd0':'#9e91d0');this.object(this.options[i],p.x,p.y-45,55);this.wrap(`${i+1}. ${this.options[i]}`,p.x,p.y+1,310,18,active?'#d8ffe7':'#f0eafd');}if(this.trail.length>1){c.beginPath();this.trail.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.strokeStyle='#c5fff1';c.lineWidth=5;c.lineCap='round';c.stroke();}this.text(game.solved?`COMBO ×${game.combo} · CRYSTAL RESTORED`:'Read carefully before you move.',615,320,15,'#c4c0df','center');}
}
// Event tunggal menjaga semua tampilan tetap berada pada index.html (SPA).
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action,i=Number(b.dataset.i);if(a==='start')start();else if(a==='home')home();else if(a==='secret')secretCode();else if(a==='unlock-maps')unlockMaps();else if(a==='lock-maps')lockMaps();else if(a==='start-fullscreen'){fullscreen();start();}else if(a==='offline'){if(location.protocol==='file:')toast('This game is already offline. Keep all files in the same folder.');else {const a=document.createElement('a');a.href='downloads/GEBING.zip';a.download='GEBING.zip';a.click();}}else if(a==='fullscreen')fullscreen();else if(a==='mute'){db.settings.mute=!db.settings.mute;save();header();}else if(a==='settings')settings();else if(a==='save-settings')saveSettings();else if(a==='close')closeModal();else if(a==='avatar'){selectedAvatar=b.dataset.value;document.querySelectorAll('.avatars button').forEach(x=>x.classList.toggle('active',x===b));}else if(a==='create')createPlayer();else if(a==='prolog-next'){if(++prologStep>=3)world();else prolog();}else if(a==='map'){if(screen==='play')pause();else if(screen==='test')quitTest();else world();}else if(a==='back'){if(profile())world();else home();}else if(a==='area')openArea(i);else if(a==='vocab')vocabulary();else if(a==='play')startPlay();else if(a==='learning'||a==='guide'||a==='credits'){if(screen==='play'||screen==='test'){modal(`<h2>Your game is still open</h2><p>${screen==='play'?'Pause and go to the map to open the guide. Finished missions are saved.':'Finish or leave the test to open the guide.'}</p><div class="row">${button('Continue','close','btn primary')}</div>`);}else ({learning,guide,credits})[a]();}else if(a==='players')players();else if(a==='new-player')nameModal();else if(a==='select-player')selectPlayer(b.dataset.id);else if(a==='profile')showProfile();else if(a==='dashboard')dashboard();else if(a==='leaderboard')leaderboard();else if(a==='csv')exportCSV();else if(a==='history')history(b.dataset.id);else if(a==='mission-answer')selectAnswer(i);else if(a==='retry-choice'){game.feedback=false;closeModal();}else if(a==='hint')hint();else if(a==='pause')pause();else if(a==='play-help'){modal(`<h2>Controls: ${AREA_META[area].name}</h2><p>${AREA_META[area].controls}</p><p style="margin-top:15px">Your move is your answer. Read the clue, then jump, shoot, run or cut. Easy mode is in Settings.</p><div class="row">${button('Continue','close','btn primary')}</div>`);}else if(a==='leave-play'){world();}else if(a==='restart-area')restartArea();else if(a==='reset-progress')confirmReset();else if(a==='confirm-reset')resetProgress();else if(a==='timeout-retry'){closeModal();game.feedback=false;game.timeLeft=missionSeconds();game.timeLimit=game.timeLeft;}else if(a==='assist-shot')engine?.assistShot();else if(a==='next-mission')advanceMission();else if(a==='mission-map')advanceMission(true);else if(a==='test')startTest();else if(a==='test-answer')testAnswer(i);else if(a==='test-next'){closeModal();if(++quiz.index>=10)finishTest();else renderQuiz();}else if(a==='quit-test')quitTest();else if(a==='confirm-quit'){closeModal();world();}else if(a==='next-area')openArea(area+1);else if(a==='certificate')certificate();else if(a==='download-cert')downloadCert();else if(a==='editor-tab'){editorArea=i;teacherEditor();}else if(a==='editor-edit')editorEditModal(b.dataset.id);else if(a==='editor-save')editorSave(b.dataset.id);else if(a==='editor-export')editorExport();else if(a==='editor-import')editorImport();else if(a==='editor-restore'){delete db.customBanks;save();toast('Restored defaults.');teacherEditor();}else if(a==='check-puzzle')checkPuzzle();else if(a==='editor-reset-q'){delete db.customBanks[editorArea][b.dataset.id];save();toast('Question reset.');teacherEditor();}});
function quitTest(){modal(`<h2>Leave this test?</h2><p>This test is not saved yet. Your earlier test results will stay.</p><div class="row">${button('Continue test','close','btn primary')}${button('Leave and open map','confirm-quit','btn')}</div>`);}
const activePointers=new Map();document.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-key]');if(!b)return;e.preventDefault();b.setPointerCapture?.(e.pointerId);activePointers.set(e.pointerId,b.dataset.key);engine?.keyDown(b.dataset.key);});
function releasePointer(e){const k=activePointers.get(e.pointerId);if(k){activePointers.delete(e.pointerId);if(![...activePointers.values(),...heldKeyboard.values()].includes(k))engine?.keyUp(k);}}document.addEventListener('pointerup',releasePointer);document.addEventListener('pointercancel',releasePointer);
document.addEventListener('keydown',e=>{
 const typing=/INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
 if(!$('#overlay').hidden){
  if(e.key==='Tab'){const els=[...$('#overlay').querySelectorAll('button,input,select,[tabindex="0"]')].filter(x=>!x.disabled),first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
  if(e.key==='Enter'&&e.target.id==='secret-code'){e.preventDefault();unlockMaps();}
  else if(e.key==='Enter'&&e.target.id==='player-name'){e.preventDefault();createPlayer();}
  else if(!typing&&pauseOpen&&(e.code==='Escape'||e.code==='KeyP')){e.preventDefault();closeModal();}
  return;
 }
 if(typing)return;
 if(e.code==='KeyM'){e.preventDefault();if(!e.repeat){db.settings.mute=!db.settings.mute;save();header();}return;}
 if(screen==='play'){
  if(e.code==='Escape'||e.code==='KeyP'){e.preventDefault();pause();return;}
  if(['1','2','3','4','5','6','7','8','9'].includes(e.key)){const i=Number(e.key)-1;if(game?.options&&i<game.options.length){e.preventDefault();if(!e.repeat)selectAnswer(i);return;}}
  const key=canonicalKey(e.code);
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','Fire','Boost'].includes(key)){
   // Let a focused button retain its standard Enter activation.
   if((e.code==='Enter'||e.code==='NumpadEnter')&&e.target.tagName==='BUTTON')return;
   e.preventDefault();if(!e.repeat){heldKeyboard.set(e.code,key);engine?.keyDown(key);}
  }
 }
 if(screen==='test'&&!quiz.locked&&['1','2','3','4','5','6','7','8','9'].includes(e.key)){const i=Number(e.key)-1;if(i<quiz.options.length){e.preventDefault();testAnswer(i);}}
});
document.addEventListener('keyup',e=>{const k=heldKeyboard.get(e.code)||canonicalKey(e.code);heldKeyboard.delete(e.code);if(![...heldKeyboard.values(),...activePointers.values()].includes(k))engine?.keyUp(k);});
function clearControls(){heldKeyboard.clear();activePointers.clear();engine?.keys.clear();if(engine){engine.drag=null;engine.swiping=false;}}
addEventListener('blur',()=>{clearControls();if(screen==='play'&&$('#overlay').hidden&&!game?.over)pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearControls();if(screen==='play'&&$('#overlay').hidden&&!game?.over)pause();}});
document.body.classList.toggle('reduce-motion',db.settings.reduced);home();
