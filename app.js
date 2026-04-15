const panels=document.querySelectorAll(".panel");function showPanel(id){panels.forEach(p=>p.classList.remove("active"));document.getElementById(id).classList.add("active")}
const drawer=document.getElementById("drawer");const drawerMask=document.getElementById("drawerMask");const openDrawer=document.getElementById("hamburger");const linkDraw=document.getElementById("navDraw");const linkCollage=document.getElementById("navCollage");const linkInfo=document.getElementById("navInfo");openDrawer.addEventListener("click",()=>{drawer.classList.toggle("open")});drawerMask.addEventListener("click",()=>{drawer.classList.remove("open")});linkDraw.addEventListener("click",()=>{drawer.classList.remove("open");showPanel("view-draw")});linkCollage.addEventListener("click",()=>{drawer.classList.remove("open");showPanel("view-collage")});linkInfo.addEventListener("click",()=>{drawer.classList.remove("open");showPanel("view-info")});
const fortuneTitle=document.getElementById("fortuneTitle");const fortuneGrade=document.getElementById("fortuneGrade");const fortuneText=document.getElementById("fortuneText");const fortuneCard=document.getElementById("fortuneCard");const tube=document.querySelector(".lottery-tube");const sticks=document.querySelector(".sticks-img");const tapHint=document.getElementById("tapHint");const btnRetry=document.getElementById("btnRetry");const btnAccept=document.getElementById("btnAccept");
const terms=[{key:"春分",month:3,day:20},{key:"清明",month:4,day:4}];const fortunes={"春分":[{grade:"上上签",text:"日夜均分，万物向新"},{grade:"大吉",text:"春光正好，宜出发行"},{grade:"中吉",text:"平衡自得，心境安宁"},{grade:"小吉",text:"播种今日，收获不远"}],"清明":[{grade:"上上签",text:"清风拂柳，心愿可期"},{grade:"大吉",text:"踏青问春，好事相随"},{grade:"中吉",text:"且念先人，行止得当"},{grade:"小吉",text:"雨润大地，静待花开"}]};function currentTerm(){const d=new Date();const y=d.getFullYear();const m=d.getMonth()+1;const ds=terms.filter(t=>t.month===m).map(t=>({name:t.key,date:new Date(y,t.month-1,t.day)})).sort((a,b)=>a.date-b.date);if(ds.length===0)return"春分";let n=ds[0].name;if(ds.length===2&&d>=ds[1].date)n=ds[1].name;return n}
function randomFortune(){const t=currentTerm();const pool=fortunes[t]||fortunes["春分"];return pool[Math.floor(Math.random()*pool.length)]}
function randomLotSrc(){const n=Math.floor(Math.random()*6)+1;return `./assets/lots/lots-${n}.svg`}
function playShakeThenDraw(){tapHint.classList.add("hide");sticks.classList.add("shake-once");tube.classList.add("shake-once");setTimeout(()=>{sticks.classList.remove("shake-once");tube.classList.remove("shake-once");drawFortune()},1000)}
function drawFortune(){const img=document.getElementById("fortuneImg");const src=bust(randomLotSrc());img.src=src;fortuneTitle.style.display="none";fortuneGrade.style.display="none";fortuneText.style.display="none";fortuneCard.classList.remove("show");fortuneCard.style.zIndex="5";void fortuneCard.offsetWidth;fortuneCard.classList.add("show");showActions()}
let canTapToDraw=true;function onAreaTap(){if(!canTapToDraw)return;canTapToDraw=false;playShakeThenDraw()}document.getElementById("lotteryArea").addEventListener("click",onAreaTap);btnRetry.addEventListener("click",()=>{fortuneCard.classList.remove("show");setTimeout(playShakeThenDraw,50)});btnAccept.addEventListener("click",()=>{showPanel("view-collage")});
if(window.DeviceMotionEvent){let last=0;window.addEventListener("devicemotion",e=>{if(!canTapToDraw)return;const a=e.accelerationIncludingGravity;if(!a)return;const mag=Math.abs(a.x)+Math.abs(a.y)+Math.abs(a.z);const now=Date.now();if(mag>30&&now-last>1500){last=now;canTapToDraw=false;playShakeThenDraw()}},false)}
const canvas=document.getElementById("collageCanvas");const ctx=canvas.getContext("2d");const stickerLayer=document.getElementById("stickerLayer");const limitTip=document.getElementById("limitTip");const btnBg=document.getElementById("btnBg");const btnStickerNature=document.getElementById("btnStickerNature");const btnStickerXiaSun=document.getElementById("btnStickerXiaSun");const btnStickerLayout=document.getElementById("btnStickerLayout");const btnSave=document.getElementById("btnSave");const btnClear=document.getElementById("btnClear");const bgModal=document.getElementById("bgModal");const bgGrid=document.getElementById("bgGrid");const bgClose=document.getElementById("bgClose");const stickerModal=document.getElementById("stickerModal");const stickerGrid=document.getElementById("stickerGrid");const modalTitle=document.getElementById("modalTitle");const modalClose=document.getElementById("modalClose");const drawActions=document.getElementById("drawActions");const previewWrap=document.querySelector(".preview-wrap");const collageLayout=document.querySelector(".collage-layout");const sideMenu=document.querySelector(".side-menu");const bgPreview=document.getElementById("bgPreview");
const backgrounds=[
"./assets/backgrounds/bg1.jpg",
"./assets/backgrounds/bg2.jpg",
"./assets/backgrounds/bg3.jpg",
"./assets/backgrounds/bg4.jpg",
"./assets/backgrounds/bg5.jpg",
"./assets/backgrounds/bg6.jpg"
];const MAX_STICKERS=10;const CACHE_TAG=Date.now();const bust=u=>u+(u.includes("?")?"&":"?")+"v="+CACHE_TAG;let state={bg:backgrounds[0],items:[]};
if('ontouchstart' in window || navigator.maxTouchPoints > 0) document.body.classList.add('is-touch');

function clearSelections(){state.items.forEach(it=>{it.el.classList.remove("selected");const h=it.el.querySelector(".handles");if(h)h.style.display="none"})}
function listSeq(prefix,start=1,end=12){const arr=[];for(let i=start;i<=end;i++){arr.push(`./assets/stickers/${prefix}-${i}.svg`)}return arr}
function listByLegacy(prefix,max=12){const arr=[];for(let i=0;i<=max;i++){arr.push(`./assets/stickers/${prefix}${i===0?"":`-${i}`}.svg`)}return arr}
function render(){const w=canvas.width;const h=canvas.height;ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";ctx.clearRect(0,0,w,h);if(state.bg){bgPreview.src=bust(state.bg)}}
function fitCanvas(){
  const wrap=document.querySelector(".preview-wrap");
  const w=wrap.clientWidth-16;
  const r=1280/720;
  let h=wrap.clientHeight?wrap.clientHeight-16:w*r;
  const dpr=window.devicePixelRatio||1;
  canvas.style.width=w+"px";
  canvas.style.height=h+"px";
  canvas.width=Math.round(w*dpr);
  canvas.height=Math.round(h*dpr);
  render()
}
window.addEventListener("resize",fitCanvas);fitCanvas();
function setActiveButton(btn){[btnBg,btnStickerNature,btnStickerXiaSun,btnStickerLayout,btnClear,btnSave].forEach(b=>b.classList.remove("active"));btn.classList.add("active")}
function clearActiveButtons(){[btnBg,btnStickerNature,btnStickerXiaSun,btnStickerLayout,btnClear,btnSave].forEach(b=>b.classList.remove("active"))}
function sizePicker(card, anchorBtn){const w=previewWrap.clientWidth;const h=Math.max(260,Math.min(previewWrap.clientHeight-40, Math.round(previewWrap.clientHeight*0.72)));card.style.width=w+"px";card.style.height=h+"px";const anchor=anchorBtn||btnStickerNature;const btnTop=anchor.getBoundingClientRect().top;const containerTop=collageLayout.getBoundingClientRect().top;const top=Math.max(12,btnTop-containerTop);card.style.top=top+"px"}
function openBg(){
  setActiveButton(btnBg);
  if(!stickerModal.classList.contains("hidden")){stickerModal.classList.remove("show");stickerModal.classList.add("hidden")}
  sizePicker(bgModal,btnStickerNature);
  bgModal.classList.remove("hidden");
  bgModal.classList.add("show");
  bgGrid.innerHTML="";
  backgrounds.forEach(src=>{
    const img=document.createElement("img");
    img.src=bust(src);
    img.addEventListener("click",()=>{
      state.bg=src;
      bgModal.classList.remove("show");
      bgModal.classList.add("hidden");
      clearActiveButtons();
      render()
    });
    bgGrid.appendChild(img)
  })
}
btnBg.addEventListener("click",openBg);bgClose.addEventListener("click",()=>{bgModal.classList.remove("show");bgModal.classList.add("hidden");clearActiveButtons()});
function updateStickerControls(){const disabled=state.items.length>=MAX_STICKERS;const msg=`贴纸超过${MAX_STICKERS}个，不能再加了`;btnStickerNature.classList.toggle("disabled",disabled);btnStickerXiaSun.classList.toggle("disabled",disabled);btnStickerLayout.classList.toggle("disabled",disabled);if(disabled){limitTip.textContent=msg;limitTip.style.display="block";setTimeout(()=>{limitTip.style.display="none"},1800)}}
function openSticker(cat){
  if(state.items.length>=MAX_STICKERS){updateStickerControls();return}
  const anchor=cat==="风物"?btnStickerNature:cat==="书院"?btnStickerXiaSun:btnStickerLayout;
  setActiveButton(anchor);
  if(!bgModal.classList.contains("hidden")){bgModal.classList.remove("show");bgModal.classList.add("hidden")}
  sizePicker(stickerModal,btnStickerNature);
  stickerModal.classList.remove("hidden");
  stickerModal.classList.add("show");
  const titleMap={ "风物":"风物贴纸","书院":"书院贴纸","排版":"排版素材" };
  modalTitle.textContent=titleMap[cat]||cat;
  stickerGrid.innerHTML="";
  let list=[];
  if(cat==="书院"){list=list.concat(listSeq("campus",1,12),listByLegacy("campus-name",12))}
  if(cat==="风物"){list=list.concat(listSeq("jieqi",1,12),listByLegacy("jieqi-name",12))}
  if(cat==="排版"){list=list.concat(listSeq("text",1,12),listByLegacy("text-name",12))}
  list.forEach(src=>{
    const img=document.createElement("img");
    img.src=src;
    img.addEventListener("error",()=>img.remove());
    img.addEventListener("click",()=>{
      addSticker(src);
      stickerModal.classList.remove("show");
      stickerModal.classList.add("hidden");
      clearActiveButtons()
    });
    stickerGrid.appendChild(img)
  })
}
btnStickerNature.addEventListener("click",()=>openSticker("风物"));btnStickerXiaSun.addEventListener("click",()=>openSticker("书院"));btnStickerLayout.addEventListener("click",()=>openSticker("排版"));modalClose.addEventListener("click",()=>{stickerModal.classList.remove("show");stickerModal.classList.add("hidden");clearActiveButtons()});
function addSticker(src){const wrap=document.createElement("div");wrap.className="sticker";wrap.style.width="120px";const img=document.createElement("img");img.src=bust(src);img.className="sticker-img";wrap.appendChild(img);const rect=stickerLayer.getBoundingClientRect();const cx=rect.width/2;const cy=rect.height/2;const jitterX=(Math.random()-0.5)*rect.width*0.1;const jitterY=(Math.random()-0.5)*rect.height*0.1;const item={el:wrap,src,x:cx+jitterX,y:cy+jitterY,scale:1,rot:0,lastTap:0,dragging:false};stickerLayer.appendChild(wrap);state.items.push(item);gesture(item);updateStickerControls()}
function gesture(item){let touches=[];let handles=null;let draggingHandle=null;let startScale=1,startDist=1,startRot=0,startAngle=0;let moved=false;function sel(s){if(s){clearSelections();item.el.classList.add("selected");addHandles()}else{item.el.classList.remove("selected");removeHandles()}}function apply(){item.el.style.transform=`translate(${item.x}px,${item.y}px) rotate(${item.rot}rad) scale(${item.scale}) translate(-50%,-50%)`;if(handles)handles.style.setProperty("--inv",String(1/item.scale))}function ensureRemove(){}function toggleRemove(){}
function addHandles(){if(handles){handles.style.display="block";apply();return}handles=document.createElement("div");handles.className="handles";const tl=document.createElement("div");tl.className="handle corner tl";const tr=document.createElement("div");tr.className="handle corner tr";const bl=document.createElement("div");bl.className="handle corner bl";const br=document.createElement("div");br.className="handle corner br";const rot=document.createElement("div");rot.className="handle rotate";const del=document.createElement("div");del.className="handle delete";[tl,tr,bl,br].forEach(h=>h.addEventListener("mousedown",e=>startScaleHandle(e)));rot.addEventListener("mousedown",e=>startRotateHandle(e));del.addEventListener("mousedown",e=>{e.preventDefault();deleteItem()});handles.appendChild(tl);handles.appendChild(tr);handles.appendChild(bl);handles.appendChild(br);handles.appendChild(rot);handles.appendChild(del);item.el.appendChild(handles);apply()}
function removeHandles(){if(handles){handles.style.display="none"}}
function layerPoint(e){const r=stickerLayer.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;return{x,y}}
function startScaleHandle(e){e.preventDefault();draggingHandle="scale";const p=layerPoint(e);const dx=p.x-item.x;const dy=p.y-item.y;startDist=Math.hypot(dx,dy)||1;startScale=item.scale;document.addEventListener("mousemove",onHandleMove);document.addEventListener("mouseup",endHandle)}
function startRotateHandle(e){e.preventDefault();draggingHandle="rotate";const p=layerPoint(e);startAngle=Math.atan2(p.y-item.y,p.x-item.x)-item.rot;document.addEventListener("mousemove",onHandleMove);document.addEventListener("mouseup",endHandle)}
function onHandleMove(e){const p=layerPoint(e);if(draggingHandle==="scale"){const d=Math.hypot(p.x-item.x,p.y-item.y)||1;const s=startScale*(d/startDist);item.scale=Math.max(0.3,Math.min(3,s));apply()}else if(draggingHandle==="rotate"){const ang=Math.atan2(p.y-item.y,p.x-item.x);item.rot=ang-startAngle;apply()}}
function endHandle(){draggingHandle=null;document.removeEventListener("mousemove",onHandleMove);document.removeEventListener("mouseup",endHandle)}
function deleteItem(){if(item.el.parentNode===stickerLayer){stickerLayer.removeChild(item.el)}state.items=state.items.filter(i=>i!==item);document.removeEventListener("mousemove",moveMouse);document.removeEventListener("mouseup",endMouse);item.el.removeEventListener("touchstart",startTouch);item.el.removeEventListener("touchmove",moveTouch);item.el.removeEventListener("touchend",endTouch);item.el.removeEventListener("mousedown",startMouse);updateStickerControls()}
function startTouch(e){e.preventDefault();sel(true);touches=[...e.touches];item.dragging=true}
function moveTouch(e){e.preventDefault();const ts=[...e.touches];if(touches.length===1&&ts.length===1){const dx=ts[0].clientX-touches[0].clientX;const dy=ts[0].clientY-touches[0].clientY;item.x+=dx;item.y+=dy;touches=ts;apply()}else if(touches.length>=2&&ts.length>=2){const d0=Math.hypot(touches[0].clientX-touches[1].clientX,touches[0].clientY-touches[1].clientY);const d1=Math.hypot(ts[0].clientX-ts[1].clientX,ts[0].clientY-ts[1].clientY);const s=d1/d0;item.scale=Math.max(0.3,Math.min(3,item.scale*s));const a0=Math.atan2(touches[0].clientY-touches[1].clientY,touches[0].clientX-touches[1].clientX);const a1=Math.atan2(ts[0].clientY-ts[1].clientY,ts[0].clientX-ts[1].clientX);item.rot+=a1-a0;touches=ts;apply()}}
function outOfBounds(){
  const layerRect=stickerLayer.getBoundingClientRect();
  const elRect=item.el.getBoundingClientRect();
  const w=elRect.width;
  const h=elRect.height;
  const r=Math.hypot(w/2,h/2);
  const x=item.x;
  const y=item.y;
  return (x+r<=0)||(y+r<=0)||(x-r>=layerRect.width)||(y-r>=layerRect.height)
}
function endTouch(e){const now=Date.now();if(now-item.lastTap<300){toggleRemove()}item.lastTap=now;touches=[...e.touches];if(touches.length===0){item.dragging=false;sel(false);if(outOfBounds()){deleteItem()}}}
function startMouse(e){if(e.target&&e.target.closest(".handle"))return;e.preventDefault();sel(true);item.dragging=true;moved=false;if(!handles)addHandles();item._mx=e.clientX;item._my=e.clientY}
function moveMouse(e){if(!item.dragging)return;const dx=e.clientX-item._mx;const dy=e.clientY-item._my;if(Math.abs(dx)>2||Math.abs(dy)>2)moved=true;item.x+=dx;item.y+=dy;item._mx=e.clientX;item._my=e.clientY;apply()}
function endMouse(){if(draggingHandle)return; if(item.dragging){item.dragging=false;if(outOfBounds()){deleteItem()}}}
item.el.addEventListener("touchstart",startTouch,{passive:false});item.el.addEventListener("touchmove",moveTouch,{passive:false});item.el.addEventListener("touchend",endTouch,{passive:false});item.el.addEventListener("mousedown",startMouse);item.el.addEventListener("click",e=>{if(state.mode==="delete")return;sel(true);if(!handles)addHandles()});document.addEventListener("mousemove",moveMouse);document.addEventListener("mouseup",endMouse);apply()}
btnClear.addEventListener("click",()=>{btnClear.classList.add("flash");setTimeout(()=>btnClear.classList.remove("flash"),200);state.items.forEach(i=>i.el.remove());state.items=[];render();updateStickerControls()});
stickerLayer.addEventListener("mousedown",e=>{if(e.target===stickerLayer){clearSelections()}});
function saveImage(){const BASE_W=720,BASE_H=1280;const off=document.createElement("canvas");off.width=BASE_W;off.height=BASE_H;const octx=off.getContext("2d");function drawBg(next){if(state.bg){const bg=new Image();bg.src=bust(state.bg);bg.onload=()=>{octx.drawImage(bg,0,0,BASE_W,BASE_H);next()}}else next()}function drawStickers(){let pending=state.items.length;if(pending===0)return finish();const cRect=canvas.getBoundingClientRect();const sx=BASE_W/cRect.width;const sy=BASE_H/cRect.height;state.items.forEach(i=>{const img=new Image();img.src=bust(i.src);img.onload=()=>{const r=i.el.getBoundingClientRect();const centerX=r.left+r.width/2;const centerY=r.top+r.height/2;const cx=(centerX-cRect.left)*sx;const cy=(centerY-cRect.top)*sy;const w=r.width*sx;const h=r.height*sy;octx.save();octx.translate(cx,cy);octx.rotate(i.rot);octx.drawImage(img,-w/2,-h/2,w,h);octx.restore();pending--;if(pending===0)finish()}})}function finish(){const url=off.toDataURL("image/png");const a=document.createElement("a");a.href=url;a.download="jieqi-720x1280.png";document.body.appendChild(a);a.click();a.remove()}drawBg(drawStickers)}
btnSave.addEventListener("click",saveImage);
function showActions(){drawActions.classList.add("show")}
