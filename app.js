const contacts = [
  {name:"Princess",subtitle:"Magic Friend",avatar:"👸",bg:"#d85f9b",audio:"audio/princess.mp3"}
];

const contactsEl=document.getElementById("contacts");
const emptyState=document.getElementById("emptyState");
const searchInput=document.getElementById("searchInput");
const incomingScreen=document.getElementById("incomingScreen");
const callScreen=document.getElementById("callScreen");
const callerName=document.getElementById("callerName");
const callerAvatar=document.getElementById("callerAvatar");
const callStatus=document.getElementById("callStatus");
const callLabel=document.getElementById("callLabel");
const endCall=document.getElementById("endCall");
const muteButton=document.getElementById("muteButton");
const incomingButton=document.getElementById("incomingButton");
const answerCall=document.getElementById("answerCall");
const declineCall=document.getElementById("declineCall");
const clock=document.getElementById("clock");
const incomingClock=document.getElementById("incomingClock");
const callClock=document.getElementById("callClock");

let currentAudio=null;
let muted=false;
let callToken=0;

function renderContacts(filter=""){
  const q=filter.trim().toLowerCase();
  const visible=contacts.filter(c=>c.name.toLowerCase().includes(q)||c.subtitle.toLowerCase().includes(q));
  contactsEl.innerHTML=visible.map(c=>`
    <button class="contact" data-name="${c.name}" type="button">
      <div class="avatar" style="background:${c.bg}">${c.avatar}</div>
      <div class="contact-info"><h3>${c.name}</h3><small>${c.subtitle}</small></div>
      <div class="chevron">›</div>
    </button>`).join("");
  emptyState.classList.toggle("hidden",visible.length!==0);
  document.querySelectorAll(".contact").forEach(btn=>{
    btn.addEventListener("click",()=>startOutgoingCall(contacts.find(c=>c.name===btn.dataset.name)));
  });
}

function startOutgoingCall(character){
  if(!character)return;
  stopAudio(); callToken++;
  callerName.textContent=character.name;
  callerAvatar.textContent=character.avatar;
  callerAvatar.style.background=character.bg;
  callLabel.textContent="CALLING";
  callStatus.textContent="Connecting…";
  callScreen.classList.remove("hidden");
  const token=callToken;
  setTimeout(()=>{if(token===callToken&&!callScreen.classList.contains("hidden"))playRecording(character,token)},800);
}

function simulateIncomingCall(){
  stopAudio(); callToken++;
  incomingScreen.classList.remove("hidden");
  startRing();
}

let ringTimer=null;
function startRing(){
  stopRing();
  // Gentle visual pulsing is handled by CSS/browser; no permission or external sound required.
}
function stopRing(){if(ringTimer){clearInterval(ringTimer);ringTimer=null}}

function answerIncoming(){
  stopRing();
  incomingScreen.classList.add("hidden");
  const princess=contacts[0];
  callerName.textContent=princess.name;
  callerAvatar.textContent=princess.avatar;
  callerAvatar.style.background=princess.bg;
  callLabel.textContent="CONNECTED";
  callStatus.textContent="Princess is talking…";
  callScreen.classList.remove("hidden");
  callToken++;
  playRecording(princess,callToken);
}

function declineIncoming(){
  stopRing();
  incomingScreen.classList.add("hidden");
}

function playRecording(character,token){
  currentAudio=new Audio(character.audio);
  currentAudio.preload="auto";
  currentAudio.muted=muted;
  currentAudio.addEventListener("canplay",()=>{
    if(token!==callToken)return;
    callLabel.textContent="CONNECTED";
    callStatus.textContent="Princess is talking…";
  },{once:true});
  currentAudio.addEventListener("ended",()=>{
    if(token!==callToken)return;
    callLabel.textContent="CALL ENDED";
    callStatus.textContent="Princess finished her message";
  },{once:true});
  currentAudio.addEventListener("error",()=>{
    if(token!==callToken)return;
    callLabel.textContent="RECORDING NOT FOUND";
    callStatus.textContent="Add audio/princess.mp3 to your GitHub repository.";
  },{once:true});
  currentAudio.play().catch(()=>{
    callLabel.textContent="READY";
    callStatus.textContent="Tap Answer or Call again to play the recording.";
  });
}

function stopAudio(){
  if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null}
}
function closeCall(){callToken++;stopAudio();stopRing();callScreen.classList.add("hidden");incomingScreen.classList.add("hidden")}

incomingButton.addEventListener("click",simulateIncomingCall);
answerCall.addEventListener("click",answerIncoming);
declineCall.addEventListener("click",declineIncoming);
endCall.addEventListener("click",closeCall);

muteButton.addEventListener("click",()=>{
  muted=!muted;
  muteButton.querySelector("span").textContent=muted?"🔇":"🎙️";
  muteButton.querySelector("small").textContent=muted?"unmute":"mute";
  if(currentAudio)currentAudio.muted=muted;
});

searchInput.addEventListener("input",()=>renderContacts(searchInput.value));

function updateClock(){
  const value=new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});
  clock.textContent=value;incomingClock.textContent=value;callClock.textContent=value;
}
renderContacts();updateClock();setInterval(updateClock,30000);
