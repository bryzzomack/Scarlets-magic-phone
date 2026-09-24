const contacts = [
  // Change the audio file names to match your recordings in /audio/.
  { name: "Princess", subtitle: "Royal Friend", avatar: "👸", bg: "#c95d9b", audio: "audio/princess.mp3" },
  { name: "Unicorn", subtitle: "Sparkle Friend", avatar: "🦄", bg: "#7c6be8", audio: "audio/unicorn.mp3" },
  { name: "Mermaid", subtitle: "Ocean Friend", avatar: "🧜‍♀️", bg: "#39a7bb", audio: "audio/mermaid.mp3" },
  { name: "Fairy", subtitle: "Magic Friend", avatar: "🧚‍♀️", bg: "#62b875", audio: "audio/fairy.mp3" },
  { name: "Superhero", subtitle: "Hero Friend", avatar: "🦸‍♀️", bg: "#4f78d8", audio: "audio/superhero.mp3" },
  { name: "Santa", subtitle: "Christmas Friend", avatar: "🎅", bg: "#c84c4c", audio: "audio/santa.mp3" }
];

const contactsEl = document.getElementById("contacts");
const callScreen = document.getElementById("callScreen");
const callerName = document.getElementById("callerName");
const callerAvatar = document.getElementById("callerAvatar");
const callStatus = document.getElementById("callStatus");
const endCall = document.getElementById("endCall");
const cancelCall = document.getElementById("cancelCall");
const soundToggle = document.getElementById("soundToggle");

let currentAudio = null;
let soundsEnabled = true;

function renderContacts() {
  contactsEl.innerHTML = contacts.map((c, i) => `
    <button class="contact" data-index="${i}">
      <div class="avatar" style="--avatar-bg:${c.bg}">${c.avatar}</div>
      <h3>${c.name}</h3>
      <small>${c.subtitle}</small>
      <span class="call-button">CALL</span>
    </button>
  `).join("");

  document.querySelectorAll(".contact").forEach(btn => {
    btn.addEventListener("click", () => startCall(contacts[Number(btn.dataset.index)]));
  });
}

function startCall(character) {
  stopAudio();

  callerName.textContent = character.name;
  callerAvatar.textContent = character.avatar;
  callerAvatar.style.background = character.bg;
  callStatus.textContent = "Calling...";

  callScreen.classList.remove("hidden");

  // Small delay makes it feel like a real call is connecting.
  setTimeout(() => {
    if (callScreen.classList.contains("hidden")) return;
    playRecording(character);
  }, 650);
}

function playRecording(character) {
  if (!soundsEnabled) {
    callStatus.textContent = "Call connected";
    return;
  }

  currentAudio = new Audio(character.audio);
  currentAudio.preload = "auto";

  currentAudio.addEventListener("canplay", () => {
    callStatus.textContent = "Connected";
  }, { once: true });

  currentAudio.addEventListener("ended", () => {
    callStatus.textContent = "Call ended";
  }, { once: true });

  currentAudio.addEventListener("error", () => {
    callStatus.textContent = "Add the recording to: " + character.audio;
  }, { once: true });

  currentAudio.play().catch(() => {
    callStatus.textContent = "Tap CALL again if your browser blocked audio.";
  });
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function closeCall() {
  stopAudio();
  callScreen.classList.add("hidden");
}

endCall.addEventListener("click", closeCall);
cancelCall.addEventListener("click", closeCall);

soundToggle.addEventListener("click", () => {
  soundsEnabled = !soundsEnabled;
  soundToggle.textContent = soundsEnabled ? "🔊" : "🔇";
  if (!soundsEnabled) stopAudio();
});

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

renderContacts();
updateClock();
setInterval(updateClock, 30000);
