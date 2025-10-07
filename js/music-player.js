// YouTube Music Player
let player;
let isPlaying = false;

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTube API callback
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('youtube-player', {
    height: '1',
    width: '1',
    videoId: '18bjpktqFgM',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      loop: 1,
      playlist: '18bjpktqFgM' // Required for looping
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  console.log('Music player ready');
}

function onPlayerStateChange(event) {
  const toggleBtn = document.querySelector('.music-toggle');
  const musicPlayer = document.querySelector('.music-player');

  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    musicPlayer.classList.add('playing');
    toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Toggle music playback
function toggleMusic() {
  if (!player || !player.playVideo) {
    console.log('Player not ready yet');
    return;
  }

  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

// Create circular text
function createCircularText() {
  const text = "CLICK FOR MUSIC • PLAY ME • ";
  const circularText = document.getElementById('circularText');

  if (!circularText) return;

  const chars = text.split('');
  const deg = 360 / chars.length;

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.innerText = char;
    span.style.transform = `rotate(${deg * i}deg)`;
    circularText.appendChild(span);
  });
}

// Initialize toggle button
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.music-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
  }

  createCircularText();
});
