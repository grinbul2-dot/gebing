'use strict';
// Lives and clocks belong to the current run. Learning scores remain separate.
function missionSeconds(){return db.settings.relaxed?90:60;}
function testSeconds(){return db.settings.relaxed?60:45;}
function paintClock(selector,seconds){const el=$(selector);if(!el)return;el.textContent='⏱ '+Math.max(0,Math.ceil(seconds))+'s';el.classList.toggle('urgent',seconds<=10);}
function storeRunHealth(){const cp=profile()?.checkpoints[area];if(cp){cp.lives=game.lives;cp.over=!!game.over;}else if(profile())profile().checkpoints[area]={index:game.index,correct:Math.max(0,game.correct-(game.recorded&&!game.helped&&game.options?.[game.selected]===game.q?.answer?1:0)),answered:Math.max(0,game.answered-(game.recorded?1:0)),assisted:Math.max(0,game.assisted-(game.recorded&&game.helped?1:0)),points:game.points,lives:game.lives,over:!!game.over};save();}
function loseLife(reason){if(!game||game.over)return true;game.lives=Math.max(0,game.lives-1);$('#lives').textContent='♥ '+game.lives;sfx(false);storeRunHealth();if(game.lives===0){showGameOver();return true;}toast(reason+' −1 life. '+game.lives+' left.');return false;}
function showGameOver(){game.over=true;game.lives=0;game.feedback=true;storeRunHealth();engine?.stop();modal(`<div class="eyebrow">NO LIVES LEFT</div><h2 class="game-over-title">GAME OVER</h2><p>You reached mission ${Math.min(game.index+1,12)} in ${AREA_META[area].name}.</p><p style="margin-top:15px">Try this area again with 3 lives. Your badges and finished test results stay saved.</p><div class="row">${button('Try area again','restart-area','btn primary')}${button('Back to map','leave-play','btn ghost')}</div>`);}
function restartArea(){if(!profile())return;profile().checkpoints[area]=null;save();startPlay();}
function confirmReset(){if(!profile())return;modal(`<div class="eyebrow">A FRESH START</div><h2>Reset your progress?</h2><p>This clears all scores, badges, stars, word cards, styles, test results and saved missions for <b>${esc(profile().name)}</b>. Your name and picture stay.</p><p style="margin-top:15px">Other players keep their progress. Test mode will turn off. This cannot be undone.</p><div class="row">${button('Keep my progress','close','btn primary')}${button('Yes, reset my progress','confirm-reset','btn danger')}</div>`);}
function resetProgress(){const p=profile();if(!p)return;const fresh=newProfile(p.name,p.avatar);fresh.id=p.id;db.profiles[db.profiles.findIndex(x=>x.id===p.id)]=fresh;db.settings.unlockMaps=false;game=null;quiz=null;clearControls();stopEngine();save();closeModal();world();toast('Your fresh start is ready.');}
function missionTimeout(){if(game.over||game.feedback)return;if(!game.recorded){game.recorded=true;game.selected=-1;game.answered++;}if(loseLife('Time is up.'))return;game.feedback=true;modal(`<div class="eyebrow">TIME IS UP</div><h2>Watch the clock!</h2><p>You lost 1 life. You have ${game.lives} left.</p><p style="margin-top:15px">Try this mission again. The clock will start again.</p><div class="row">${button('Try again','timeout-retry','btn primary')}</div>`);}
function tickQuiz(dt){if(screen!=='test'||!quiz||quiz.locked||document.hidden||!$('#overlay').hidden)return;quiz.timeLeft=Math.max(0,quiz.timeLeft-dt);paintClock('#test-clock',quiz.timeLeft);if(quiz.timeLeft===0)testAnswer(-1);}
let quizClockLast=performance.now();
setInterval(()=>{const now=performance.now(),dt=(now-quizClockLast)/1000;quizClockLast=now;tickQuiz(Math.min(dt,1));},100);
const AnimatedEngine=GameEngine;
GameEngine=class extends AnimatedEngine{
 constructor(...args){super(...args);this.human=new Image();this.human.src='assets/runner-six-frame.png';this.runCycle=0;}
 update(dt){if(game?.over||this.paused)return;
  // Finish an impact/cut before the clock can charge another life.
  if(!game.feedback&&!this.pendingFinish){game.timeLeft=Math.max(0,game.timeLeft-dt);paintClock('#mission-clock',game.timeLeft);if(!game.timeLeft){missionTimeout();return;}}
  super.update(dt);if(game.over||game.feedback)return;
  if(this.type===2&&this.ready)this.runCycle+=dt*(5+this.speed*6);
 }
 drawHumanRunner(){const c=this.ctx,active=this.ready&&this.speed>.1,phase=active?Math.floor(this.runCycle)%6:0,frame=phase%3,bob=active?Math.sin(this.runCycle*Math.PI)*2:0;
  c.save();c.fillStyle='#071b2566';c.beginPath();c.ellipse(this.carX,320,22,6,0,0,Math.PI*2);c.fill();c.translate(this.carX,267+bob);c.rotate(this.lean*.7);
  if(this.human.complete&&this.human.naturalWidth){if(phase>=3)c.scale(-1,1);c.drawImage(this.human,frame*256+24,288,216,516,-25,-57,50,119);}else{this.text('🏃',0,32,75,'white','center');}c.restore();
 }
};
