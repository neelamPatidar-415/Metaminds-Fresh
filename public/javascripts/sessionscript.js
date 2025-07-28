const phaseheading = document.getElementById("phaseheading");
const timeleft = document.getElementById("timeleft");
const totaltime = document.getElementById("totaltime");
const pausebtn = document.getElementById("pausebtn");
const bgVideo = document.getElementById("bgVideo");
// const canvasEle = document.getElementById("doodleCanvas");
const timerbar = document.getElementById("timerbar");

let timerInterval, paused = false, remainingTime = 0, phase = 0, canvas, totalduration = 0;
let currentMedia = { video: null, audioKey: null };

const config = {
    firstSessionTime: (Session.duration - breakduration)/2,  /// for now lets divide duration into 3 equal parts only
    breakTime: breakduration,
    secondSessionTime: (Session.duration - breakduration)/2,
    breakType: Session.breakType,  //walk , breath, doodle
    theme : Session.theme.themeName,
};

// console.log(Session.duration);
// console.log(Session.breakType);
// console.log(Session.theme.themeName);
// console.log(Session.theme.firstaudio);
// console.log(Session.theme.animation);
// https://drive.google.com/file/d/1ihv6LgdIVuV5TkhAoSB0ty_hKaitUnLl/view?usp=drive_link
// 'https://drive.google.com/uc?export=download&id=1D8IwG0fiO8BvrV_rw1A_bMk7rEQMVCyz'


const videos = {
    session: Session.theme.animation,
    // secondsession: Session.theme.animation,
    deepbreath : 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/videos/deepbreathing.mp4',
    breathing: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/videos/boxbreathing.mp4',
    doodling: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/videos/doodling.mp4',
    walking:  'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/videos/walking.mp4',
};

// const sounds = {
//     firstsession : new Howl({src:[Session.theme.firstaudio], loop:true}),
//     secondsession : new Howl({src:[Session.theme.secondaudio], loop:true}),
//     walking : new Howl({src:['/assets/default/audio/walking.mp3'], loop:true}),
//     breathing : new Howl({src:['/assets/default/audio/breathing.mp3'], loop:true}),
//     doodling : new Howl({src:['/assets/default/audio/doodling.mp3'], loop:true}),
//     tick : new Howl({src:['/assets/default/audio/tick.mp3'], loop:true}),  
// };
const sounds = {
    firstsession : new Howl({src:[Session.theme.firstaudio], loop:true}),
    secondsession : new Howl({src:[Session.theme.secondaudio], loop:true}),
    walking : new Howl({src:['https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/audios/walking.mp3'], loop:true}),
    breathing : new Howl({src:['https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/audios/breathing.mp3'], loop:true}),
    doodling : new Howl({src:['https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/audios/doodling.mp3'], loop:true}),
    tick : new Howl({src:['https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/default%20themes/audios/tick.mp3'], loop:true}),  
};

function updateTime(){
    const min = String(Math.floor(remainingTime/60)).padStart(2,"0");
    const sec = String(remainingTime % 60).padStart(2,"0");
    timeleft.innerText = `${min}:${sec}`;
    timerbar.style.width = 100 - (remainingTime/totalduration * 100) + "%";
}

function playMedia(videoSrc, audioKey) {
    if (bgVideo.src !== videoSrc) bgVideo.src = videoSrc;
    bgVideo.play();

    sounds[audioKey]?.play();

    currentMedia.video = videoSrc;
    currentMedia.audioKey = audioKey;
}


function stopAllAudio(){
    Object.values(sounds).forEach(sound => sound.stop());
}

function startTimer(){
    clearInterval(timerInterval);
    timerInterval = setInterval(()=>{
        if(!paused && remainingTime >0){
            remainingTime--;
            updateTime();

            if(remainingTime == 5) sounds.tick.play();
        }
        else if(remainingTime <= 0){
            clearInterval(timerInterval);
            // sounds.tick.stop();
            stopAllAudio();
            nextPhase();
        }
    },1000);
}

pausebtn.addEventListener("click", () => {
    paused = !paused;
    pausebtn.innerText = paused ? "Resume" : "Pause";

    if (paused) {
        stopAllAudio();
        bgVideo.pause();
        clearInterval(timerInterval); // stop timer
    } else {
        // Resume current media only
        if (currentMedia.video) bgVideo.play();
        if (currentMedia.audioKey) sounds[currentMedia.audioKey]?.play();
        startTimer(); // resume timer
    }
});

function showVictoryScreen() {
    document.getElementById("winScreen").classList.remove("hidden");
    // document.getElementById("mainContent").classList.add("hidden"); // Optional: hide other stuff
}

function nextPhase() {
  switch (phase) {
    case 0:
      startBreathing(
        "Before Session 1",
        "Clear the desk, quiet the mind — let’s create a space that helps you win."
      );
      break;
    case 1:
      startSession(
        "Session 1",
        config.firstSessionTime,
        "Right here, right now — this is your shot. Make it count."
      );
      break;
    case 2:
      startBreak(
        "You just took a solid step forward — now recharge."
      );
      break;
    case 3:
      startBreathing(
        "Before Session 2",
        "Halfway done. Reset your mind — you’ve got more in you."
      );
      break;
    case 4:
      startSession(
        "Session 2",
        config.secondSessionTime,
        "Last push. Lock in. This is where winners are made.🚀"
      );
      break;
    case 5:
      phaseheading.innerText = "You Did It! 🏆🔥";
      phaseSubText.innerText = "Two full sessions. Zero excuses. This is the version of you that wins.";
      stopAllAudio();
      showVictoryScreen();
      return;
  }
  phase++;
}


function startBreathing(label, subText){
    document.body.classList.add("dark-text"); 

    phaseheading.innerText = `1 min Deep Breathing - ${label}`;
    playMedia(videos.deepbreath, "breathing");
    phaseSubText.innerText = subText;

    remainingTime = 60;  ///60
    totalduration = 60; ///60
    totaltime.innerText = `${Math.floor(remainingTime/60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}

function startSession(label, duration, subText){
    phaseheading.innerText = `${label}`;
    phaseSubText.innerText = subText;

    if(label === "Session 1") playMedia(videos.session, "firstsession");
    if(label === "Session 2") playMedia(videos.session, "secondsession");
    
    remainingTime = duration*60;
    totalduration = duration*60;
    totaltime.innerText = `${Math.floor(remainingTime/60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}


function startBreak(subText){
    phaseheading.innerText = `🍵Break - ${config.breakType}`;
    // phaseSubText.innerText = subText;

    let video;
    if(breakType === "doodle") {
        phaseSubText.innerText = "Keep doodling. Repeat simple patterns — it calms the mind and builds focus. No pressure to make it pretty.";
        video = videos.doodling;
        playMedia(video, "doodling");
    }
    else if(breakType === "walk") {
        phaseSubText.innerText = "Take this moment to walk with intention. Avoid the scroll — let your mind breathe as your body moves.";
        video = videos.walking;
        playMedia(video, "walking");
    }
    else if(breakType === "breath"){
        phaseSubText.innerText = "Sit tall. Breathe slow. Let your body relax with every exhale — this is how clarity begins.";
        video = videos.breathing;
        playMedia(video, "breathing");
    }
    remainingTime = config.breakTime*60;
    totaltime.innerText = `${Math.floor(remainingTime/60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}

// nextPhase();
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startOverlay").style.display = "none";

  // Now safe to start audio/video
  nextPhase(); // or your main session starter
});


// function playMedia(videoSrc, audioKey){
//     bgVideo.src = videoSrc;
//     bgVideo.play();
//     stopAllAudio();
//     if(audioKey) sounds[audioKey].play();
// }

// const canvasElement = document.getElementById("doodleCanvas");

// if (canvasElement) {
//   const canvas = new fabric.Canvas("doodleCanvas", {
//     isDrawingMode: true,
//     backgroundColor: "#fefcea",
//   });

//   canvas.freeDrawingBrush.width = 10;
//   canvas.freeDrawingBrush.color = "#bca6ff";
//   canvas.renderAll();
// }