'use strict';
// A selected fruit box is graded once, at sword impact. The timeline pauses with the game.
const CUT_POSES=[ [0,0,512,512],[512,0,512,512],[1024,0,512,512],[0,512,512,512],[512,512,590,512],[1024,512,512,512] ];
const cutImageCache={};
function cutImage(src){if(!cutImageCache[src]){const image=new Image();image.src=src;cutImageCache[src]=image;}return cutImageCache[src];}
const gradeCutImpact=answerByMove;
answerByMove=function(i){if(area===3&&engine?.type===3&&!engine.resolvingCut){engine.beginCut(i);return;}gradeCutImpact(i);};
const modalBeforeCut=modal;
modal=function(html){if(engine?.deferCutFeedback&&!game?.over){engine.cutMessage=html;return;}modalBeforeCut(html);};
const FlightBaseEngine=GameEngine;
GameEngine=class extends FlightBaseEngine{
 constructor(...args){super(...args);this.swordArt=cutImage('assets/robot-sword-black.png');this.fruitArt=cutImage('assets/fruit-crates-black.png');this.cutAttack=null;this.cutMessage=null;this.resolvingCut=false;this.deferCutFeedback=false;this.fruitPieces=[];this.woodBits=[];this.cutCount=0;}
 cardPos(i){if(this.type!==3)return super.cardPos(i);return {x:220+i*395,y:152};}
 beginCut(index){if(this.type!==3||this.cutAttack||this.paused||game.feedback||game.solved||game.over||!$('#overlay').hidden||!game.options[index])return;this.focusCard=index;const target=this.cardPos(index),slow=reducedEffects();this.cutAttack={index,age:0,hitAt:slow?.20:.58,endAt:slow?.62:1.34,target,slow,hit:false,slash:this.slash};this.keys.clear();this.swiping=false;this.pendingFinish=0;this.cutMessage=null;this.fruitPieces=[];this.woodBits=[];this.cutPieces=[];this.trail=[];this.cheer=0;syncAim();tone(350,.10,'triangle',.04);}
 cut(index){const attack=this.cutAttack;if(!attack)return;const p=this.cardPos(index),s=attack.slash;let nx=.55,ny=.84;if(s&&Math.hypot(s.b.x-s.a.x,s.b.y-s.a.y)>20){const dx=s.b.x-s.a.x,dy=s.b.y-s.a.y,len=Math.hypot(dx,dy);nx=-dy/len;ny=dx/len;}for(const sign of [-1,1])this.fruitPieces.push({index,x:p.x,y:p.y,vx:nx*sign*170,vy:ny*sign*90-100,angle:0,spin:sign*1.7,age:0,sign,normal:{x:nx,y:ny}});if(!attack.slow)for(let j=0;j<14;j++)this.woodBits.push({x:p.x+(Math.random()-.5)*90,y:p.y+15,vx:(Math.random()-.5)*330,vy:-50-Math.random()*200,angle:Math.random(),spin:(Math.random()-.5)*9,age:0});this.pendingFinish=0;this.cutCount++;tone(150,.16,'triangle',.08);}
 update(dt){if(!this.cutAttack){super.update(dt);return;}if(this.paused||document.hidden||game.over)return;const a=this.cutAttack;a.age+=dt;this.t+=dt;
  if(!a.hit&&a.age>=a.hitAt){a.hit=true;this.resolvingCut=true;this.deferCutFeedback=true;try{gradeCutImpact(a.index);if(!game.solved)this.cut(a.index);}finally{this.resolvingCut=false;this.deferCutFeedback=false;}this.cheer=0;this.pendingFinish=0;if(game.over)return;}
  for(const p of this.fruitPieces){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=420*dt;p.angle+=p.spin*dt;}
  for(const p of this.woodBits){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=550*dt;p.angle+=p.spin*dt;}
  if(a.age>=a.endAt){const message=this.cutMessage;this.cutAttack=null;this.cutMessage=null;this.fruitPieces=[];this.woodBits=[];this.cutPieces=[];this.pendingFinish=0;if(game.solved)finishMission();else if(message)modalBeforeCut(message);}
 }
 keyDown(raw){if(this.type===3&&this.cutAttack)return;super.keyDown(raw);}
 pointerDown(e){if(this.type===3&&this.cutAttack)return;super.pointerDown(e);}
 pointerMove(e){if(this.type===3&&this.cutAttack)return;super.pointerMove(e);}
 pointerUp(e){if(this.type===3&&this.cutAttack)return;super.pointerUp(e);}
 // Solid-black mattes are composited with screen. They need no network or alpha-key dependency.
 drawMatte(image,sx,sy,sw,sh,x,y,w,h){if(!image.complete||!image.naturalWidth)return false;const c=this.ctx;c.save();c.globalCompositeOperation='screen';c.drawImage(image,sx,sy,sw,sh,x,y,w,h);c.restore();return true;}
 fruitFace(index,x,y){const sheet=this.fruitArt,w=sheet.width/2||627,h=sheet.height/2||627;this.drawMatte(sheet,index%2*w,Math.floor(index/2)*h,w,h,x-156,y-88,312,176);this.rounded(x-150,y+3,300,76,10,'#102538f5','#ad8b56');this.wrap(`${index+1}. ${this.options[index]}`,x,y+28,278,17,'#f6f4e8');}
 drawSwordHero(pose,x,y,size=145,angle=0,flip=false){const c=this.ctx,art=this.swordArt,rect=CUT_POSES[pose],sx=art.width/1536||1,sy=art.height/1024||1;c.save();c.translate(x,y);c.rotate(angle);if(flip)c.scale(-1,1);c.filter='hue-rotate('+currentStyle().hue+'deg)';if(!this.drawMatte(art,rect[0]*sx,rect[1]*sy,rect[2]*sx,rect[3]*sy,-size/2,-size/2,size,size)){this.sprite(12,0,0,size*.65);}c.restore();}
 heroMotion(){const a=this.cutAttack;if(!a)return {pose:0,x:615,y:283,size:100,angle:0};const t=a.age,dir=a.target.x<615?-1:1,hit={x:a.target.x-dir*65,y:a.target.y-8};if(a.slow){return {pose:t<a.hitAt?2:t<a.hitAt+.16?3:5,x:hit.x,y:hit.y,size:155,angle:0,flip:dir<0};}
  if(t<.16)return {pose:1,x:615,y:287,size:115,angle:-dir*.12,flip:dir<0};
  if(t<a.hitAt){const u=(t-.16)/(a.hitAt-.16),e=1-Math.pow(1-u,2);return {pose:2,x:615+(hit.x-615)*e,y:283+(hit.y-283)*e-Math.sin(u*Math.PI)*87,size:160,angle:dir*.12,flip:dir<0};}
  if(t<a.hitAt+.13)return {pose:3,x:hit.x+dir*12,y:hit.y,size:180,angle:dir*.12,flip:dir<0};
  if(t<a.hitAt+.34)return {pose:4,x:hit.x+dir*32,y:hit.y+12,size:170,angle:dir*.20,flip:dir<0};
  const u=Math.min(1,(t-a.hitAt-.34)/(a.endAt-a.hitAt-.34)),e=u*u*(3-2*u);return {pose:u>.8?5:4,x:hit.x+dir*32+(615-hit.x-dir*32)*e,y:hit.y+12+(283-hit.y-12)*e-Math.sin(u*Math.PI)*38,size:160-55*e,angle:dir*.15*(1-e),flip:dir<0};
 }
 drawNinja(){const c=this.ctx;this.text('Cut the fruit box with your answer · A D choose · Space / X cut',615,25,16,'#d7e8ed','center');
  for(let i=0;i<3;i++){if(this.fruitPieces.some(p=>p.index===i))continue;const p=this.cardPos(i);this.fruitFace(i,p.x,p.y);if(i===this.focusCard&&!game.solved){c.save();c.setLineDash([7,5]);this.rounded(p.x-163,p.y-95,326,180,16,null,this.cutAttack?'#ffe2ac':'#a9edda');c.restore();}}
  for(const p of this.fruitPieces){c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.globalAlpha=Math.max(0,1-p.age*.8);const poly=this.halfPolygon(p.normal,p.sign);c.beginPath();poly.forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.closePath();c.clip();this.fruitFace(p.index,0,0);c.restore();}
  for(const p of this.woodBits){c.save();c.translate(p.x,p.y);c.rotate(p.angle);c.globalAlpha=Math.max(0,1-p.age);c.fillStyle='#e3b77e';c.fillRect(-3,-2,6,4);c.restore();}
  const hero=this.heroMotion();if(this.cutAttack&&!this.cutAttack.slow&&this.cutAttack.age<this.cutAttack.hitAt){c.save();c.globalAlpha=.18;this.drawSwordHero(hero.pose,hero.x-(hero.flip?-1:1)*24,hero.y+17,hero.size,hero.angle,hero.flip);c.restore();}this.drawSwordHero(hero.pose,hero.x,hero.y,hero.size,hero.angle,hero.flip);
  const a=this.cutAttack;if(a?.hit&&!a.slow&&a.age-a.hitAt<.22){const alpha=1-(a.age-a.hitAt)/.22;c.save();c.globalAlpha=alpha;c.lineCap='round';c.strokeStyle='#a6fff0';c.shadowColor='#8fffe5';c.shadowBlur=13;c.lineWidth=13;c.beginPath();c.moveTo(a.target.x-132,a.target.y-67);c.quadraticCurveTo(a.target.x+40,a.target.y+16,a.target.x+135,a.target.y+69);c.stroke();c.shadowBlur=0;c.lineWidth=4;c.strokeStyle='#ffffff';c.stroke();c.restore();}
  this.text(this.cutAttack?'Read. Fly. Cut!':'Click, swipe, or press 1–3 to choose a box.',28,320,14,'#c7d7e7');this.text(game.solved?'GREAT CUT!':'YOUR EXPLORER',1195,320,14,'#b4ecd3','right');
 }
};
