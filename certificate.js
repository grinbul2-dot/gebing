'use strict';
// One renderer is shared by the game screen, PNG export and review preview.
const CERTIFICATE_LOGOS=['logo-tut-wuri.png','logo-sobat-smp.png','logo-quality-education.png','logo-ramah.png'];
let certificateAssetsPromise;
function loadCertificateAssets(){
 if(!certificateAssetsPromise)certificateAssetsPromise=Promise.all(CERTIFICATE_LOGOS.map(file=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Could not load '+file));img.src='assets/'+file;}))).catch(error=>{certificateAssetsPromise=null;throw error;});
 return certificateAssetsPromise;
}
function drawCertificate(canvas,player,logos){
 canvas.width=1600;canvas.height=1000;const c=canvas.getContext('2d');
 const avg=player.tests.reduce((sum,t)=>sum+t.best,0)/4;
 const award=avg>=90?'Gold Explorer':avg>=80?'Silver Explorer':'Bronze Explorer';
 c.fillStyle='#10273b';c.fillRect(0,0,1600,1000);
 c.strokeStyle='#efc886';c.lineWidth=4;c.strokeRect(40,40,1520,920);c.lineWidth=1;c.strokeRect(55,55,1490,890);
 c.fillStyle='#ffffff';c.beginPath();c.roundRect(190,86,1220,146,15);c.fill();
 const boxes=[[225,100,190,118],[464,111,246,98],[752,111,287,98],[1080,108,284,103]];
 logos.forEach((img,i)=>{const [x,y,w,h]=boxes[i],ratio=Math.min(w/img.width,h/img.height),iw=img.width*ratio,ih=img.height*ratio;c.drawImage(img,x+(w-iw)/2,y+(h-ih)/2,iw,ih);});
 c.textAlign='center';c.fillStyle='#efc886';c.font='bold 48px Quest, Arial';c.fillText('CERTIFICATE OF COMPLETION',800,331);
 c.fillStyle='#d7e7f1';c.font='30px Arial';c.fillText('Things Around Me Explorer',800,389);
 c.fillStyle='#aac4d3';c.font='25px Arial';c.fillText('This certificate is for',800,463);
 c.fillStyle='#a8f2bd';let size=76;c.font=`bold ${size}px Quest, Arial`;while(c.measureText(player.name).width>1320&&size>24){size--;c.font=`bold ${size}px Quest, Arial`;}c.fillText(player.name,800,552);
 c.strokeStyle='#8db4b466';c.lineWidth=1;c.beginPath();c.moveTo(325,584);c.lineTo(1275,584);c.stroke();
 c.fillStyle='#e6f0f6';c.font='30px Arial';c.fillText('for completing all four areas of GEBING.',800,643);
 c.fillStyle='#efc886';c.font='bold 35px Arial';c.fillText(`${award} · Average best score ${avg}%`,800,720);
 c.fillStyle='#d7e7f1';c.font='27px Arial';c.fillText(new Date(player.completed).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}),800,779);
 c.fillStyle='#a7c2d5';c.font='22px Arial';c.fillText('A game award for learning',800,876);c.font='19px Arial';c.fillText('Not an official English qualification',800,911);
 return canvas;
}
async function makeCertificateCanvas(player){await document.fonts.ready;const logos=await loadCertificateAssets();return drawCertificate(document.createElement('canvas'),player,logos);}
function certificate(){
 if(completed()!==4){toast('Find all four crystals to get your certificate.');return;}
 setScreen('certificate');const player=JSON.parse(JSON.stringify(profile()));
 $('#main').innerHTML=`<section class="page certificate-page"><div id="certificate-view" class="certificate-view" role="img" aria-label="CERTIFICATE OF COMPLETION for ${esc(player.name)}"><p>Loading your certificate...</p></div><div class="row" style="justify-content:center;margin-top:16px">${button('↓ Download certificate PNG','download-cert','btn gold')}${button('Back to map','map','btn')}${button('View results','dashboard','btn')}</div></section>`;
 const holder=$('#certificate-view');
 makeCertificateCanvas(player).then(canvas=>{if(screen!=='certificate'||!holder.isConnected)return;const img=document.createElement('img');img.src=canvas.toDataURL('image/png');img.alt='Certificate of completion for '+player.name;holder.replaceChildren(img);}).catch(()=>{if(screen==='certificate'&&holder.isConnected)holder.innerHTML='<p>We could not load the logos. Please reopen your certificate.</p>';});confetti();
}
async function downloadCert(){if(completed()!==4){toast('Find all four crystals to get your certificate.');return;}const player=JSON.parse(JSON.stringify(profile()));try{const canvas=await makeCertificateCanvas(player);canvas.toBlob(blob=>{if(blob)download(blob,'Things-Around-Me-Certificate.png');else toast('Could not save the certificate. Please try again.');},'image/png');}catch{toast('Could not load the certificate logos. Please try again.');}}
