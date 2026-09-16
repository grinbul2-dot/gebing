'use strict';
// Animation layer: uses the original local sprite atlas and the same collision engine.
// All effect clocks advance only while gameplay is active, so pause freezes every effect.
const PhysicsEngine=GameEngine;
GameEngine=class extends PhysicsEngine{
 constructor(...args){super(...args);this.runPhase=0;this.facing=1;this.landSquash=0;this.dustClock=0;this.recoil=0;this.ballSpin=0;this.shotTrail=[];this.debris=[];this.hitTargets=new Set();this.pendingFinish=0;this.cutPieces=[];this.slash=null;this.focusCard=0;this.speed=0;this.roadTravel=0;this.wheelAngle=0;this.lean=0;this.lastSwipe=null;this.keyboardAim=false;}
 keyDown(raw){const key=canonicalKey(raw);if(this.paused)return;
  if(this.type===0){super.keyDown(key==='Fire'?'Space':key);return;}
  if(this.type===1){this.keys.add(key);if((key==='Space'||key==='Fire')&&this.ready&&!this.ball.flying&&!this.pendingFinish){if(this.drag)this.releaseShot();else this.assistShot();}return;}
  if(this.type===2){super.keyDown(key);return;}
  if(this.type===3){this.keys.add(key);if(['ArrowLeft','ArrowUp'].includes(key))this.focusCard=(this.focusCard+2)%3;if(['ArrowRight','ArrowDown'].includes(key))this.focusCard=(this.focusCard+1)%3;if((key==='Space'||key==='Fire')&&!game.solved){const p=this.cardPos(this.focusCard);this.slash={a:{x:p.x-140,y:p.y+55},b:{x:p.x+140,y:p.y-55}};answerByMove(this.focusCard);}}
 }
 keyUp(raw){const key=canonicalKey(raw);super.keyUp(this.type===0&&key==='Fire'?'Space':key);}
 pointerDown(e){if(this.paused)return;const p=this.point(e);if(p.x>1180&&p.y<45){this.findEgg();return;}
  if(this.type===3){this.canvas.setPointerCapture?.(e.pointerId);this.swiping=true;this.lastSwipe=p;this.swipeStart=p;this.swipePointer=e.pointerId;this.trail.push({...p,life:.28});return;}
  super.pointerDown(e);if(this.drag){this.drag={x:this.ball.x,y:this.ball.y};this.keyboardAim=false;}
 }
 pointerMove(e){if(this.paused)return;const p=this.point(e);
  if(this.type===3){if(!this.swiping||e.pointerId!==this.swipePointer)return;const from=this.lastSwipe||p;this.trail.push({...p,life:.28});this.slash={a:from,b:p};this.hitSegment(from,p);this.lastSwipe=p;return;}
  if(this.type===1&&this.drag){this.drag={x:Math.max(20,Math.min(155,p.x)),y:Math.max(180,Math.min(315,p.y))};return;}
  super.pointerMove(e);
 }
 pointerUp(e){if(this.paused)return;
  if(this.type===3){if(!this.swiping||e.pointerId!==this.swipePointer)return;const p=this.point(e),from=this.lastSwipe||p;if(Math.hypot(p.x-(this.swipeStart?.x||p.x),p.y-(this.swipeStart?.y||p.y))<14){this.slash={a:{x:p.x-125,y:p.y+45},b:{x:p.x+125,y:p.y-45}};this.hitCards(p);}else {this.slash={a:from,b:p};this.hitSegment(from,p);}this.swiping=false;this.lastSwipe=null;return;}
  if(this.drag&&this.ready)this.releaseShot();
 }
 hitSegment(a,b){if(game.solved||game.feedback)return;let first=null;for(let i=0;i<this.options.length;i++){const p=this.cardPos(i);const t=this.segmentRect(a,b,{x:p.x-166,y:p.y-78,w:332,h:156});if(t!==null&&(!first||t<first.t))first={i,t};}if(first)answerByMove(first.i);}
 segmentRect(a,b,r){let low=0,high=1;for(const [p,q]of [[-(b.x-a.x),a.x-r.x],[b.x-a.x,r.x+r.w-a.x],[-(b.y-a.y),a.y-r.y],[b.y-a.y,r.y+r.h-a.y]]){if(Math.abs(p)<1e-8){if(q<0)return null;}else{const t=q/p;if(p<0)low=Math.max(low,t);else high=Math.min(high,t);if(low>high)return null;}}return low;}
 releaseShot(){if(!this.drag||this.ball.flying||this.pendingFinish)return;const p=this.drag,dx=100-p.x,dy=256-p.y;if(Math.hypot(dx,dy)<7){this.drag=null;return;}this.ball={x:p.x,y:p.y,vx:dx*10.5,vy:dy*10.5,flying:true};this.drag=null;this.keyboardAim=false;this.recoil=.4;this.shotTrail=[];tone(170,.18,'triangle');}
 assistShot(){if(this.pendingFinish||this.hitTargets.has(this.aimTarget??1))return;const before=this.ball.flying;super.assistShot();if(!before&&this.ball.flying){this.recoil=.4;this.shotTrail=[];this.drag=null;}}
 impact(index){this.hitTargets.add(index);const p=this.targetPosition(index);for(let i=0;i<10;i++)this.debris.push({x:p.x+(i%3-1)*43,y:i<6?255:210,vx:(Math.random()-.4)*190,vy:-90-Math.random()*140,angle:0,spin:(Math.random()-.5)*7,w:25+Math.random()*15,h:28+Math.random()*20,life:1.8});tone(115,.2,'triangle');}
 cut(index){const p=this.cardPos(index),s=this.slash||{a:{x:p.x-140,y:p.y+50},b:{x:p.x+140,y:p.y-50}},dx=s.b.x-s.a.x,dy=s.b.y-s.a.y,length=Math.hypot(dx,dy)||1;this.slash={...s,age:0};const nx=-dy/length,ny=dx/length;
  for(const sign of[-1,1])this.cutPieces.push({index,x:p.x,y:p.y,vx:nx*sign*165,vy:ny*sign*115-85,angle:0,spin:sign*1.8,age:0,sign,normal:{x:nx,y:ny}});
  this.trail=[{...s.a,life:.4},{...s.b,life:.4}];this.burst(index);this.pendingFinish=.9;tone(1100,.11,'triangle');setTimeout(()=>tone(680,.13,'sine'),70);
 }
 update(dt){
  const pending=this.pendingFinish>0;
  if(pending){this.pendingFinish=Math.max(0,this.pendingFinish-dt);if(!this.pendingFinish){finishMission();return;}}
  const oldGround=this.player.ground,oldVY=this.player.vy,oldX=this.carX;
  if(this.type===1&&this.ready&&!this.ball.flying&&!pending&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].some(k=>this.keys.has(k))){this.drag??={x:50,y:291};this.keyboardAim=true;this.drag.x=Math.max(20,Math.min(140,this.drag.x+((this.keys.has('ArrowRight')?1:0)-(this.keys.has('ArrowLeft')?1:0))*85*dt));this.drag.y=Math.max(180,Math.min(315,this.drag.y+((this.keys.has('ArrowDown')?1:0)-(this.keys.has('ArrowUp')?1:0))*85*dt));}
  if(this.type===2){const target=this.ready?(this.keys.has('ArrowDown')?.4:(this.keys.has('Boost')||this.keys.has('ArrowUp')||this.keys.has('Space')?1.65:1)):0;this.speed+=(target-this.speed)*Math.min(1,dt*4);this.roadTravel+=dt*150*this.speed;this.wheelAngle+=dt*this.speed*22;}
  // The base engine owns scoring, platform collisions, targets and lane success.
  super.update(this.type===2?dt*Math.max(.2,this.speed):this.type===3&&pending?dt*.45:dt);
  if(this.type===0){const p=this.player;if(Math.abs(p.vx)>1)this.facing=Math.sign(p.vx);if(p.ground&&Math.abs(p.vx)>1){this.runPhase+=Math.abs(p.vx)*dt*.045;this.dustClock+=dt;if(this.dustClock>.1){this.dustClock=0;this.particles.push({x:p.x-this.cam-this.facing*13,y:p.y-3,vx:-this.facing*35,vy:-18,life:.25,color:'#c5ded2'});}}if(!oldGround&&p.ground&&oldVY>70)this.landSquash=.2;this.landSquash=Math.max(0,this.landSquash-dt);}
  this.lean+=(((this.carX-oldX)*.015)-this.lean)*Math.min(1,dt*10);this.lean=Math.max(-.22,Math.min(.22,this.lean));
  this.recoil=Math.max(0,this.recoil-dt);if(this.ball.flying){this.ballSpin+=dt*this.ball.vx*.025;this.shotTrail.push({x:this.ball.x,y:this.ball.y,life:.25});}this.shotTrail.forEach(p=>p.life-=dt);this.shotTrail=this.shotTrail.filter(p=>p.life>0);
  this.debris.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=650*dt;p.angle+=p.spin*dt;p.life-=dt;if(p.y>297){p.y=297;p.vy=-Math.abs(p.vy)*.32;p.vx*=.8;}});this.debris=this.debris.filter(p=>p.life>0);
  this.cutPieces.forEach(p=>{const d=dt*.72;p.age+=dt;p.x+=p.vx*d;p.y+=p.vy*d;p.vy+=430*d;p.angle+=p.spin*d;});if(this.slash?.age!==undefined)this.slash.age+=dt;
 }
 sprite(index,x,y,size=60){
  if(index===12&&this.type===0&&this.atlas.complete&&this.atlas.naturalWidth){this.drawRunner(x,y,size);return true;}
  return super.sprite(index,x,y,size);
 }
 drawRunner(x,y,size){const c=this.ctx,sw=this.atlas.width/4,sh=this.atlas.height/4,srcX=0,srcY=3*sh-16,p=this.player,moving=p.ground&&Math.abs(p.vx)>1,phase=this.runPhase,bob=moving?Math.abs(Math.sin(phase))*2:Math.sin(this.t*2)*.5,crouch=this.keys.has('ArrowDown')&&p.ground,squash=this.landSquash>0?Math.sin(this.landSquash/.2*Math.PI)*.14:0;
  c.save();c.globalAlpha=.28;c.fillStyle='#06121b';c.beginPath();c.ellipse(x,p.y+2,24,5,0,0,Math.PI*2);c.fill();c.restore();
  c.save();c.translate(x,y-bob);c.scale(this.facing*(1+squash),crouch?.76:1-squash);c.rotate(!p.ground?Math.max(-.16,Math.min(.16,p.vy*.0003)):moving?.045*Math.sin(phase):0);
  const scale=1.35;
  const drawHeight = sh + 16;
  const W = size*scale;
  const H = size*scale*(drawHeight/sw);

  for(let side=1;side>=0;side--){
    const swing=moving?Math.sin(phase+(side?Math.PI:0))*.35:!p.ground?(side?.2:-.3):0;
    const lift=moving?Math.max(0,Math.cos(phase+(side?Math.PI:0))*.12):0;
    c.save();
    c.translate(0, H*.12 - H*lift);
    c.rotate(swing);
    if(side===1) c.filter='brightness(0.6)';
    c.drawImage(this.atlas,srcX,srcY+drawHeight*.52,sw,drawHeight*.48, -W*.5,0, W, H*.48);
    c.restore();
  }
  c.drawImage(this.atlas,srcX,srcY,sw,drawHeight*.65,-W*.5,-H*.5,W,H*.65);
  c.restore();
 }
 drawSchool(){super.drawSchool();this.text('A D / ← → move · W / Space jump · S duck',28,326,12,'#e9f6ff');}
 drawHouse(){const c=this.ctx;this.text(this.ready?'Pull the ball back and down. Let go to shoot.':'Read the clue. Choose an answer before you aim.',25,31,17,'#d0ddeb');this.rounded(0,307,1230,26,0,'#67526a');
  for(let i=0;i<this.options.length;i++){
    const p=this.targetPosition(i);
    const active=game.solved&&this.target===i;
    if(this.hitTargets.has(i))continue;
    c.beginPath();
    c.moveTo(p.x, p.y + 35);
    c.lineTo(p.x + Math.sin(this.t * 3 + i) * 10, p.y + 110);
    c.strokeStyle = '#8a9b9a';
    c.lineWidth = 2;
    c.stroke();
    const bounce = Math.sin(this.t * 2.5 + i * 2) * 5;
    const by = p.y + bounce;
    c.beginPath();
    c.ellipse(p.x, by - 10, 65, 50, 0, 0, Math.PI*2);
    c.fillStyle = active ? '#2b624c' : ['#8c4a4a', '#3f5d7d', '#7d683f', '#4f7d3f'][i % 4];
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = active ? '#baffd0' : '#b7c7d4';
    c.stroke();
    c.beginPath();
    c.moveTo(p.x - 6, by + 40);
    c.lineTo(p.x + 6, by + 40);
    c.lineTo(p.x, by + 30);
    c.fill();
    c.beginPath();
    c.ellipse(p.x - 30, by - 30, 10, 5, -Math.PI/6, 0, Math.PI*2);
    c.fillStyle = '#ffffff44';
    c.fill();
    this.wrap(`${i+1}. ${this.options[i]}`,p.x,by,110,16,'#fff');
  }
  const b=this.ball;this.rounded(88,258,26,49,6,'#a4bdc5');if(this.drag){c.beginPath();c.moveTo(100,256);c.lineTo(this.drag.x,this.drag.y);c.strokeStyle='#f7d899';c.lineWidth=5;c.stroke();const vx=(100-this.drag.x)*7,vy=(256-this.drag.y)*7;for(let t=.1;t<1.8;t+=.1){c.fillStyle='#ffd8999c';c.beginPath();c.arc(100+vx*t,256+vy*t+250*t*t,3,0,Math.PI*2);c.fill();}}const bx=this.drag?.x??b.x,by=this.drag?.y??b.y;c.beginPath();c.arc(bx,by,18,0,Math.PI*2);c.fillStyle='#b7f7ca';c.fill();this.text('Aa',bx,by+6,16,'#163e37','center');
 }
 drawRace(){const c=this.ctx;
  this.text(this.ready?'Move to catch the correct answer!':'Read the clue. Catch the right answer falling.',25,31,17,'#d0ddeb');
  for(let i=0;i<this.options.length;i++){
    const active=game.solved&&this.target===i,y=this.gateY;
    const w=1230/this.options.length;
    this.rounded(i*w+29,y,w-58,89,12,active?'#306350':'#0a2536',active?'#b2f3bf':'#5b8596');
    this.wrap(`${i+1}. ${this.options[i]}`,i*w+w/2,y+37,320,19);
  }
  if(!this.sprite(13,this.carX,277,96))this.text('🧺',this.carX,302,63,'white','center');
  if(!this.ready){
    this.rounded(368,158,494,51,12,'#0b1d30ed','#668b9b');
    this.text('Choose an answer to start playing.',615,190,21,'#def2ff','center');
  }
 }
 drawNinja(){const c=this.ctx;
  this.text('Press Space or Tap to fly! Hit the correct answer coin.',25,29,18,'#d1d3ef');
  c.save();
  c.translate(200, this.player.y);
  c.rotate(Math.min(0.5, Math.max(-0.5, this.player.vy * 0.002)));
  if(!this.sprite(15, 0, 0, 60)) this.text('🦅', 0, 15, 45, 'white', 'center');
  c.restore();
  if(!this.ready) {
    this.text('TAP TO START', 200, this.player.y - 50, 20, '#b9ffd0', 'center');
  }
  for(let i=0;i<this.options.length;i++){
    const active=game.solved&&this.target===i;
    const cx = this.gateX;
    const cy = 60 + i*(260/(this.options.length));
    this.rounded(cx-100, cy-30, 200, 60, 12, active?'#47664e':'#2d3559', active?'#b9ffd0':'#9e91d0');
    this.wrap(`${i+1}. ${this.options[i]}`, cx, cy+6, 180, 16, active?'#d8ffe7':'#f0eafd');
  }
  if(game.solved) this.text(`COMBO ×${game.combo} · CORRECT!`, 615, 320, 15, '#c4c0df', 'center');
 }
 drawSling(){
  const c=this.ctx;
  const pouch = this.drag || {x: 100, y: 256};
  c.lineCap='round';c.strokeStyle='#b78855';c.lineWidth=13;c.beginPath();c.moveTo(100,305);c.lineTo(100,273);c.lineTo(78,233);c.moveTo(100,273);c.lineTo(126,233);c.stroke();
  c.strokeStyle='#5b3430';c.lineWidth=6;for(const x of[78,126]){c.beginPath();c.moveTo(x,233);c.lineTo(pouch.x,pouch.y);c.stroke();}
  if(this.drag){const vx=(100-pouch.x)*10.5,vy=(256-pouch.y)*10.5;for(let t=.08;t<1.9;t+=.09){const x=pouch.x+vx*t,y=pouch.y+vy*t+250*t*t;if(y>306||x<0||x>1230)break;c.globalAlpha=Math.max(.12,.75-t*.32);c.fillStyle='#ffe0a4';c.beginPath();c.arc(x,y,3,0,Math.PI*2);c.fill();}c.globalAlpha=1;this.text(`Power ${Math.round(Math.min(100,Math.hypot(100-pouch.x,256-pouch.y)))}%`,190,291,16,'#ffdc9f');}
  this.shotTrail.forEach(p=>{c.globalAlpha=p.life*.8;c.fillStyle='#acffd0';c.beginPath();c.arc(p.x,p.y,9*p.life/.25,0,Math.PI*2);c.fill();});c.globalAlpha=1;
  if(!this.pendingFinish){const b=this.ball.flying?this.ball:pouch;c.save();c.translate(b.x,b.y);c.rotate(this.ball.flying?this.ballSpin:0);const g=c.createRadialGradient(-6,-6,1,0,0,19);g.addColorStop(0,'#f1ffcf');g.addColorStop(.4,'#a6f1ba');g.addColorStop(1,'#367a66');c.fillStyle=g;c.beginPath();c.arc(0,0,18,0,Math.PI*2);c.fill();this.text('Aa',0,6,16,'#173e31','center');c.restore();}
  this.debris.forEach(p=>{c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.globalAlpha=Math.min(1,p.life);this.rounded(-p.w/2,-p.h/2,p.w,p.h,4,'#bc9096','#ead0ae');c.restore();});
 }
 drawRace(){const c=this.ctx,top=45,bottom=333,road=(y)=>135+(y-top)/(bottom-top)*480;
  c.fillStyle='#173c3d';c.fillRect(0,0,1230,333);c.fillStyle='#304758';c.beginPath();c.moveTo(480,top);c.lineTo(750,top);c.lineTo(1230,bottom);c.lineTo(0,bottom);c.closePath();c.fill();
  for(let i=0;i<12;i++){const z=((i/12+this.roadTravel*.0015)%1),y=top+z*z*(bottom-top),half=road(y);for(const side of[-1,1]){const x=615+side*half;c.strokeStyle=i%2?'#d8e2b7':'#69bc92';c.lineWidth=2+z*6;c.beginPath();c.moveTo(x,y);c.lineTo(x+side*(8+z*10),y+5+z*8);c.stroke();}const lanes=this.options.length; for(let n=1;n<lanes;n++){const divX=615-half+(n/lanes)*half*2;const laneOff=(n/lanes)*2-1; c.strokeStyle='#d5e4dc';c.lineWidth=1+z*3;c.beginPath();c.moveTo(divX,y);c.lineTo(divX+laneOff*z*5,y+4+z*9);c.stroke();}}
  for(let i=0;i<this.options.length;i++){const y=this.gateY+8,z=Math.max(0,Math.min(1,(y-20)/250)),w=170+z*177,x=615+(i-(this.options.length-1)/2)*(205+z*205),active=game.solved&&this.target===i;this.rounded(x-w/2,y,w,84,10,active?'#2b624c':'#10283d',active?'#baffd0':'#7297aa');this.wrap(`${i+1}. ${this.options[i]}`,x,y+29,w-16,Math.round(13+z*5));this.text(active?'↓ YOUR TARGET':'GATE',x,y+74,12,active?'#caffcf':'#a7c6d7','center');}
  this.drawHumanRunner();
  this.text(`SPEED ${Math.round(this.speed*40)}`,30,28,16,'#bcf8d8');this.text('A D move · W / Shift run faster · S slow down',1210,28,15,'#c1dae5','right');if(this.keys.has('ArrowDown')&&this.ready)this.text('SLOW',this.carX,221,15,'#ffb8a4','center');
  if(!this.ready){this.rounded(368,170,494,51,12,'#0b1d30ed','#668b9b');this.text('Get ready to run into your answer.',615,202,21,'#def2ff','center');}
 }
 cardFace(index,x,y,active=false){this.rounded(x-166,y-78,332,156,21,active?'#39574f':'#2d3559',active?'#b9ffd0':'#9e91d0');this.object(this.options[index],x,y-43,55);this.wrap(`${index+1}. ${this.options[index]}`,x,y+3,310,18,'#f0eafd');}
 halfPolygon(normal,sign){let points=[{x:-168,y:-80},{x:168,y:-80},{x:168,y:80},{x:-168,y:80}],out=[];for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],da=(a.x*normal.x+a.y*normal.y)*sign,db=(b.x*normal.x+b.y*normal.y)*sign;if(da>=0)out.push(a);if((da>=0)!==(db>=0)){const t=da/(da-db);out.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}}return out;}
 drawNinja(){const c=this.ctx;this.text('Swipe across the card · A D choose · Space / X cut',615,29,18,'#d1d3ef','center');
  for(let i=0;i<this.options.length;i++){if(this.cutPieces.some(p=>p.index===i))continue;const p=this.cardPos(i);this.cardFace(i,p.x,p.y);if(i===this.focusCard&&!game.solved){c.save();c.setLineDash([8,6]);this.rounded(p.x-171,p.y-83,342,166,24,null,'#d1fbea');c.restore();}}
  for(const p of this.cutPieces){c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.globalAlpha=Math.max(0,1-p.age*.85);const poly=this.halfPolygon(p.normal,p.sign);c.beginPath();poly.forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.closePath();c.clip();this.cardFace(p.index,0,0,true);c.strokeStyle='#edffeb';c.lineWidth=3;c.beginPath();c.moveTo(-p.normal.y*240,p.normal.x*240);c.lineTo(p.normal.y*240,-p.normal.x*240);c.stroke();c.restore();}
  for(let i=1;i<this.trail.length;i++){const a=this.trail[i-1],b=this.trail[i];c.save();c.globalAlpha=Math.min(1,b.life/.28);c.lineCap='round';c.shadowColor='#7dfde4';c.shadowBlur=12;c.strokeStyle='#81efd9';c.lineWidth=9;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.shadowBlur=0;c.strokeStyle='#f6fff9';c.lineWidth=3;c.stroke();c.restore();}
  this.text(game.solved?`COMBO ×${game.combo} · CRYSTAL SLICED`:'Read carefully before you move.',615,322,15,'#d9d1ec','center');
};
}
