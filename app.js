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
const canvas=document.getElementById("collageCanvas");const ctx=canvas.getContext("2d");const stickerLayer=document.getElementById("stickerLayer");const limitTip=document.getElementById("limitTip");const btnBg=document.getElementById("btnBg");const btnStickerNature=document.getElementById("btnStickerNature");const btnStickerXiaSun=document.getElementById("btnStickerXiaSun");const btnStickerLayout=document.getElementById("btnStickerLayout");const btnText=document.getElementById("btnText");const btnSave=document.getElementById("btnSave");const btnClear=document.getElementById("btnClear");const bgModal=document.getElementById("bgModal");const bgGrid=document.getElementById("bgGrid");const bgClose=document.getElementById("bgClose");const stickerModal=document.getElementById("stickerModal");const stickerGrid=document.getElementById("stickerGrid");const modalTitle=document.getElementById("modalTitle");const modalClose=document.getElementById("modalClose");const textModal=document.getElementById("textModal");const textMask=document.getElementById("textMask");const textInput=document.getElementById("textInput");const textOk=document.getElementById("textOk");const textToggle=document.getElementById("textToggle");const textRand=document.getElementById("textRand");const exportModal=document.getElementById("exportModal");const exportMask=document.getElementById("exportMask");const exportImg=document.getElementById("exportImg");const exportOpen=document.getElementById("exportOpen");const exportClose=document.getElementById("exportClose");const drawActions=document.getElementById("drawActions");const previewWrap=document.querySelector(".preview-wrap");const collageLayout=document.querySelector(".collage-layout");const sideMenu=document.querySelector(".side-menu");const bgPreview=document.getElementById("bgPreview");let captionsData=null;let activeTextItem=null;
let activeTextDraftTheme=null;
let exportUrl=null;
const EXPORT_NAME="jieqi-720x1280.jpg";

function openExportModal(url){
  if(!exportModal||!exportImg)return false;
  if(exportUrl&&String(exportUrl).startsWith("blob:")){try{URL.revokeObjectURL(exportUrl)}catch(e){}}
  exportUrl=url;
  exportImg.src=url;
  if(exportOpen){exportOpen.href=url;exportOpen.download=EXPORT_NAME}
  exportModal.classList.remove("hidden");
  exportModal.setAttribute("aria-hidden","false");
  return true
}
function closeExportModal(){
  if(!exportModal)return;
  exportModal.classList.add("hidden");
  exportModal.setAttribute("aria-hidden","true");
  if(exportImg)exportImg.removeAttribute("src");
  if(exportOpen)exportOpen.removeAttribute("href");
  if(exportUrl&&String(exportUrl).startsWith("blob:")){try{URL.revokeObjectURL(exportUrl)}catch(e){}}
  exportUrl=null
}
if(exportMask)exportMask.addEventListener("click",closeExportModal);
if(exportClose)exportClose.addEventListener("click",closeExportModal);
const backgrounds=[
"./assets/backgrounds/bg1.jpg",
"./assets/backgrounds/bg2.jpg",
"./assets/backgrounds/bg3.jpg",
"./assets/backgrounds/bg4.jpg",
"./assets/backgrounds/bg5.jpg",
"./assets/backgrounds/bg6.jpg"
];const MAX_STICKERS=10;const CACHE_TAG=Date.now();const bust=u=>u+(u.includes("?")?"&":"?")+"v="+CACHE_TAG;let state={bg:backgrounds[0],items:[]};fetch(bust("./assets/copy/captions.json")).then(r=>r.ok?r.json():null).then(j=>{if(j)captionsData=j}).catch(()=>{});
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
function setActiveButton(btn){[btnBg,btnStickerNature,btnStickerXiaSun,btnStickerLayout,btnText,btnClear,btnSave].forEach(b=>b.classList.remove("active"));btn.classList.add("active")}
function clearActiveButtons(){[btnBg,btnStickerNature,btnStickerXiaSun,btnStickerLayout,btnText,btnClear,btnSave].forEach(b=>b.classList.remove("active"))}
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
function updateStickerControls(){const disabled=state.items.length>=MAX_STICKERS;const msg=`贴纸/文字超过${MAX_STICKERS}个，不能再加了`;btnStickerNature.classList.toggle("disabled",disabled);btnStickerXiaSun.classList.toggle("disabled",disabled);btnStickerLayout.classList.toggle("disabled",disabled);btnText.classList.toggle("disabled",disabled);if(disabled){limitTip.textContent=msg;limitTip.style.display="block";setTimeout(()=>{limitTip.style.display="none"},1800)}}
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
    img.src=bust(src);
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
function addSticker(src){const wrap=document.createElement("div");wrap.className="sticker";wrap.style.width="120px";const img=document.createElement("img");img.src=bust(src);img.className="sticker-img";wrap.appendChild(img);const rect=stickerLayer.getBoundingClientRect();const cx=rect.width/2;const cy=rect.height/2;const jitterX=(Math.random()-0.5)*rect.width*0.1;const jitterY=(Math.random()-0.5)*rect.height*0.1;const item={type:"img",el:wrap,src,baseW:120,x:cx+jitterX,y:cy+jitterY,scale:1,rot:0,lastTap:0,dragging:false};stickerLayer.appendChild(wrap);state.items.push(item);gesture(item);updateStickerControls()}
function sceneCounts(){let campus=0,jieqi=0;state.items.forEach(i=>{if((i.type||"img")!=="img")return;const s=i.src||"";if(s.includes("/assets/stickers/campus"))campus++;if(s.includes("/assets/stickers/jieqi"))jieqi++});return{campus,jieqi}}
function hasStickerKey(key){
  return state.items.some(i=>{
    const t=i.type||"img";
    if(t!=="img")return false;
    const s=i.src||"";
    return s.includes(`/assets/stickers/${key}.svg`)||s.includes(`/assets/stickers/${key}`);
  })
}
function pickCaption(){
  const counts=sceneCounts();
  const data=captionsData||{};

  const def=Array.isArray(data.default)?data.default:[];
  let pool=[];

  if(data&&data.pools){
    const pools=data.pools||{};
    if(counts.campus>counts.jieqi&&Array.isArray(pools.campus))pool=pool.concat(pools.campus);
    else if(counts.jieqi>counts.campus&&Array.isArray(pools.jieqi))pool=pool.concat(pools.jieqi);
    pool=pool.concat(def);
    if(hasStickerKey("campus-10")){
      const egg=(data.easterEgg&&data.easterEgg.text)||"吸溜吸溜米线🍞喵";
      pool.push(egg)
    }
    if(pool.length)return pool[Math.floor(Math.random()*pool.length)];
    return "今日心晴"
  }

  const rules=Array.isArray(data.rules)?data.rules:[];
  for(let i=0;i<rules.length;i++){
    const rule=rules[i]||{};
    const when=rule.when||{};
    let ok=true;
    if(when.campusGte!=null&&counts.campus<when.campusGte)ok=false;
    if(when.jieqiGte!=null&&counts.jieqi<when.jieqiGte)ok=false;
    if(ok){
      const rp=Array.isArray(rule.pool)?rule.pool:[];
      if(rp.length)return rp[Math.floor(Math.random()*rp.length)]
    }
  }
  if(def.length)return def[Math.floor(Math.random()*def.length)];
  return "今日心晴"
}
function applyTextToItem(item,text){item.text=text;const inner=item.el.querySelector(".text-inner");inner.textContent=text||"点击输入文字";const align=(text||"").length>=18?"right":"center";item.align=align;inner.style.textAlign=align;inner.style.justifyContent=align==="right"?"flex-end":"center"}
function applyThemeToItem(item,theme){item.theme=theme;item.el.classList.toggle("light",theme==="light")}
function applyTextPreviewToEl(item,text,theme){
  const inner=item.el.querySelector(".text-inner");
  const v=String(text||"");
  inner.textContent=v||"点击输入文字";
  const align=v.trim().length>=18?"right":"center";
  inner.style.textAlign=align;
  inner.style.justifyContent=align==="right"?"flex-end":"center";
  item.el.classList.toggle("light",theme==="light");
}
function syncTextEditorUI(){
  if(!activeTextItem)return;
  const theme=activeTextDraftTheme||activeTextItem.theme||"dark";
  textInput.classList.toggle("light",theme==="light");
  const v=(textInput.value||"").trim();
  textInput.style.textAlign=v.length>=18?"right":"center";
  applyTextPreviewToEl(activeTextItem,textInput.value,theme);
}
function openTextEditor(item,focus){activeTextItem=item;textModal.classList.remove("hidden");textModal.setAttribute("aria-hidden","false");textInput.value=item.text||"";setActiveButton(btnText);syncTextEditorUI();if(focus){setTimeout(()=>{textInput.focus();textInput.setSelectionRange(textInput.value.length,textInput.value.length)},50)}}
function closeTextEditor(commit){
  if(activeTextItem&&!commit){
    applyThemeToItem(activeTextItem,activeTextItem.theme||"dark");
    applyTextToItem(activeTextItem,activeTextItem.text||"");
  }
  textModal.classList.add("hidden");
  textModal.setAttribute("aria-hidden","true");
  activeTextItem=null;
  activeTextDraftTheme=null;
  textInput.classList.remove("light");
  textInput.style.textAlign="center";
  clearActiveButtons()
}
textMask.addEventListener("click",()=>closeTextEditor(false));
textOk.addEventListener("click",()=>{if(!activeTextItem)return;const theme=activeTextDraftTheme||activeTextItem.theme||"dark";applyThemeToItem(activeTextItem,theme);applyTextToItem(activeTextItem,(textInput.value||"").trim());closeTextEditor(true)});
textToggle.addEventListener("click",()=>{if(!activeTextItem)return;const cur=activeTextDraftTheme||activeTextItem.theme||"dark";activeTextDraftTheme=cur==="light"?"dark":"light";syncTextEditorUI()});
textRand.addEventListener("click",()=>{textInput.value=pickCaption();syncTextEditorUI();textInput.focus()});
textInput.addEventListener("input",syncTextEditorUI);
function addTextBox(){if(state.items.length>=MAX_STICKERS){updateStickerControls();return}const wrap=document.createElement("div");wrap.className="sticker text-sticker";wrap.style.width="220px";const inner=document.createElement("div");inner.className="text-inner";inner.textContent="点击输入文字";wrap.appendChild(inner);const rect=stickerLayer.getBoundingClientRect();const cx=rect.width/2;const cy=rect.height/2;const item={type:"text",el:wrap,src:null,baseW:220,fontSize:22,pad:12,theme:"dark",text:"",align:"center",x:cx,y:cy,scale:1,rot:0,lastTap:0,dragging:false};stickerLayer.appendChild(wrap);state.items.push(item);gesture(item);updateStickerControls();openTextEditor(item,true)}
btnText.addEventListener("click",addTextBox);
function gesture(item){let touches=[];let handles=null;let draggingHandle=null;let startScale=1,startDist=1,startRot=0,startAngle=0;let moved=false;function sel(s){if(s){clearSelections();item.el.classList.add("selected");addHandles()}else{item.el.classList.remove("selected");removeHandles()}}function apply(){item.el.style.transform=`translate(${item.x}px,${item.y}px) rotate(${item.rot}rad) scale(${item.scale}) translate(-50%,-50%)`;if(handles)handles.style.setProperty("--inv",String(1/item.scale))}function ensureRemove(){}function toggleRemove(){}
function addHandles(){if(handles){handles.style.display="block";apply();return}handles=document.createElement("div");handles.className="handles";const tl=document.createElement("div");tl.className="handle corner tl";const tr=document.createElement("div");tr.className="handle corner tr";const bl=document.createElement("div");bl.className="handle corner bl";const br=document.createElement("div");br.className="handle corner br";const rot=document.createElement("div");rot.className="handle rotate";const del=document.createElement("div");del.className="handle delete";[tl,tr,bl,br].forEach(h=>h.addEventListener("mousedown",e=>startScaleHandle(e)));rot.addEventListener("mousedown",e=>startRotateHandle(e));del.addEventListener("mousedown",e=>{e.preventDefault();deleteItem()});handles.appendChild(tl);handles.appendChild(tr);handles.appendChild(bl);handles.appendChild(br);handles.appendChild(rot);handles.appendChild(del);item.el.appendChild(handles);apply()}
function removeHandles(){if(handles){handles.style.display="none"}}
function layerPoint(e){const r=stickerLayer.getBoundingClientRect();const x=e.clientX-r.left;const y=e.clientY-r.top;return{x,y}}
function startScaleHandle(e){e.preventDefault();draggingHandle="scale";const p=layerPoint(e);const dx=p.x-item.x;const dy=p.y-item.y;startDist=Math.hypot(dx,dy)||1;startScale=item.scale;document.addEventListener("mousemove",onHandleMove);document.addEventListener("mouseup",endHandle)}
function startRotateHandle(e){e.preventDefault();draggingHandle="rotate";const p=layerPoint(e);startAngle=Math.atan2(p.y-item.y,p.x-item.x)-item.rot;document.addEventListener("mousemove",onHandleMove);document.addEventListener("mouseup",endHandle)}
function onHandleMove(e){const p=layerPoint(e);if(draggingHandle==="scale"){const d=Math.hypot(p.x-item.x,p.y-item.y)||1;const s=startScale*(d/startDist);item.scale=Math.max(0.3,Math.min(3,s));apply()}else if(draggingHandle==="rotate"){const ang=Math.atan2(p.y-item.y,p.x-item.x);item.rot=ang-startAngle;apply()}}
function endHandle(){draggingHandle=null;document.removeEventListener("mousemove",onHandleMove);document.removeEventListener("mouseup",endHandle)}
function deleteItem(){if(item.el.parentNode===stickerLayer){stickerLayer.removeChild(item.el)}state.items=state.items.filter(i=>i!==item);document.removeEventListener("mousemove",moveMouse);document.removeEventListener("mouseup",endMouse);item.el.removeEventListener("touchstart",startTouch);item.el.removeEventListener("touchmove",moveTouch);item.el.removeEventListener("touchend",endTouch);item.el.removeEventListener("mousedown",startMouse);updateStickerControls()}
function startTouch(e){e.preventDefault();sel(true);touches=[...e.touches];item.dragging=true;moved=false}
function moveTouch(e){e.preventDefault();moved=true;const ts=[...e.touches];if(touches.length===1&&ts.length===1){const dx=ts[0].clientX-touches[0].clientX;const dy=ts[0].clientY-touches[0].clientY;item.x+=dx;item.y+=dy;touches=ts;apply()}else if(touches.length>=2&&ts.length>=2){const d0=Math.hypot(touches[0].clientX-touches[1].clientX,touches[0].clientY-touches[1].clientY);const d1=Math.hypot(ts[0].clientX-ts[1].clientX,ts[0].clientY-ts[1].clientY);const s=d1/d0;item.scale=Math.max(0.3,Math.min(3,item.scale*s));const a0=Math.atan2(touches[0].clientY-touches[1].clientY,touches[0].clientX-touches[1].clientX);const a1=Math.atan2(ts[0].clientY-ts[1].clientY,ts[0].clientX-ts[1].clientX);item.rot+=a1-a0;touches=ts;apply()}}
function outOfBounds(){const layerRect=stickerLayer.getBoundingClientRect();const r=item.el.getBoundingClientRect();return r.right<layerRect.left||r.left>layerRect.right||r.bottom<layerRect.top||r.top>layerRect.bottom}
function endTouch(e){touches=[...e.touches];if(touches.length!==0)return;item.dragging=false;if(outOfBounds()){deleteItem();return}sel(true);if(item.type==="text"&&!moved){const now=Date.now();if(now-item.lastTap<350){openTextEditor(item,true);item.lastTap=0;return}item.lastTap=now}}
function startMouse(e){if(e.target&&e.target.closest(".handle"))return;e.preventDefault();sel(true);item.dragging=true;moved=false;if(!handles)addHandles();item._mx=e.clientX;item._my=e.clientY}
function moveMouse(e){if(!item.dragging)return;const dx=e.clientX-item._mx;const dy=e.clientY-item._my;if(Math.abs(dx)>2||Math.abs(dy)>2)moved=true;item.x+=dx;item.y+=dy;item._mx=e.clientX;item._my=e.clientY;apply()}
function endMouse(){if(draggingHandle)return; if(item.dragging){item.dragging=false;if(outOfBounds()){deleteItem()}}}
item.el.addEventListener("touchstart",startTouch,{passive:false});item.el.addEventListener("touchmove",moveTouch,{passive:false});item.el.addEventListener("touchend",endTouch,{passive:false});item.el.addEventListener("mousedown",startMouse);item.el.addEventListener("click",e=>{if(document.body.classList.contains("is-touch"))return;if(moved)return;sel(true);if(item.type==="text"){const now=Date.now();if(now-item.lastTap<350){openTextEditor(item,true);item.lastTap=0;return}item.lastTap=now;return}if(!handles)addHandles()});document.addEventListener("mousemove",moveMouse);document.addEventListener("mouseup",endMouse);apply()}
btnClear.addEventListener("click",()=>{btnClear.classList.add("flash");setTimeout(()=>btnClear.classList.remove("flash"),200);state.items.forEach(i=>i.el.remove());state.items=[];render();updateStickerControls()});
stickerLayer.addEventListener("mousedown",e=>{if(e.target===stickerLayer){clearSelections()}});
function saveImage(){const BASE_W=720,BASE_H=1280;const off=document.createElement("canvas");off.width=BASE_W;off.height=BASE_H;const octx=off.getContext("2d");function rr(x,y,w,h,r){octx.beginPath();octx.moveTo(x+r,y);octx.arcTo(x+w,y,x+w,y+h,r);octx.arcTo(x+w,y+h,x,y+h,r);octx.arcTo(x,y+h,x,y,r);octx.arcTo(x,y,x+w,y,r);octx.closePath()}function wrap(text,maxW){const parts=String(text||"").split("\n");const out=[];for(let p=0;p<parts.length;p++){let line="";for(let k=0;k<parts[p].length;k++){const test=line+parts[p][k];if(octx.measureText(test).width>maxW&&line){out.push(line);line=parts[p][k]}else line=test}out.push(line)}return out}function drawBg(next){if(state.bg){const bg=new Image();bg.src=bust(state.bg);bg.onload=()=>{octx.drawImage(bg,0,0,BASE_W,BASE_H);next()};bg.onerror=next}else next()}function drawItemAt(idx){if(idx>=state.items.length)return finish();const i=state.items[idx];const type=i.type||"img";const cRect=canvas.getBoundingClientRect();const sx=BASE_W/cRect.width;const sy=BASE_H/cRect.height;const r=i.el.getBoundingClientRect();const centerX=r.left+r.width/2;const centerY=r.top+r.height/2;const cx=(centerX-cRect.left)*sx;const cy=(centerY-cRect.top)*sy;const w=r.width*sx;const h=r.height*sy;if(type==="text"){const text=(i.text||"").trim();if(!text){drawItemAt(idx+1);return}const baseW=i.baseW||220;const scaleW=r.width/baseW;const fontSize=(i.fontSize||22)*scaleW*sx;const pad=(i.pad||12)*scaleW*sx;const radius=14*scaleW*sx;octx.save();octx.translate(cx,cy);octx.rotate(i.rot);if(i.theme==="light"){octx.fillStyle="#a7d07a";rr(-w/2,-h/2,w,h,Math.min(radius,Math.min(w,h)/2));octx.fill()}octx.fillStyle=i.theme==="light"?"#fff":"#1e5e35";octx.textBaseline="alphabetic";octx.font=`700 ${fontSize}px \"Songti SC\",\"SimSun\",\"Noto Serif SC\",serif`;octx.textAlign=i.align==="right"?"right":"center";const maxW=w-2*pad;const lines=wrap(text,Math.max(10,maxW));const lh=fontSize*1.25;const total=lines.length*lh;let y=-total/2+lh*0.9;for(let li=0;li<lines.length;li++){const x=i.align==="right"?w/2-pad:0;octx.fillText(lines[li],x,y);y+=lh}octx.restore();drawItemAt(idx+1);return}const img=new Image();img.src=bust(i.src||"");img.onload=()=>{octx.save();octx.translate(cx,cy);octx.rotate(i.rot);octx.drawImage(img,-w/2,-h/2,w,h);octx.restore();drawItemAt(idx+1)};img.onerror=()=>drawItemAt(idx+1)}function finish(){const show=url=>{if(!openExportModal(url)){const a=document.createElement("a");a.href=url;a.download=EXPORT_NAME;document.body.appendChild(a);a.click();a.remove()}};if(off.toBlob){off.toBlob(b=>{if(b){show(URL.createObjectURL(b));return}show(off.toDataURL("image/jpeg",0.92))},"image/jpeg",0.92)}else{show(off.toDataURL("image/jpeg",0.92))}}drawBg(()=>drawItemAt(0))}
btnSave.addEventListener("click",saveImage);
function showActions(){drawActions.classList.add("show")}
