// YouTube Music Player
let player;
let isPlaying = false;
let playerReady = false;
let useFallback = false;

// Timeout to show player even if YouTube API doesn't load (5 seconds)
const apiTimeout = setTimeout(() => {
  if (!playerReady) {
    console.log('YouTube API timeout - using fallback');
    useFallback = true;
    showMusicPlayer();
  }
}, 5000);

// Show music player UI
function showMusicPlayer() {
  const musicPlayer = document.querySelector('.music-player');
  if (musicPlayer) {
    musicPlayer.classList.add('ready');
    console.log('Music player UI shown');
  }
}

// Load YouTube IFrame API
if (!window.YT) {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API callback
window.onYouTubeIframeAPIReady = function() {
  clearTimeout(apiTimeout);

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
  playerReady = true;
  showMusicPlayer();
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
  console.log('Toggle music clicked', { player, playerReady, isPlaying, useFallback });

  // Fallback: Use iframe if YouTube API fails
  if (useFallback || !playerReady || !player || !player.playVideo) {
    console.log('Using fallback iframe');
    toggleFallbackPlayer();
    return;
  }

  try {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  } catch (error) {
    console.error('Error toggling music:', error);
    toggleFallbackPlayer();
  }
}

// Fallback player using direct iframe
function toggleFallbackPlayer() {
  const fallbackIframe = document.getElementById('fallback-iframe');
  const toggleBtn = document.querySelector('.music-toggle');
  const musicPlayer = document.querySelector('.music-player');

  if (!isPlaying) {
    // Start playing
    fallbackIframe.src = 'https://www.youtube.com/embed/18bjpktqFgM?autoplay=1&loop=1&playlist=18bjpktqFgM&controls=0';
    isPlaying = true;
    musicPlayer.classList.add('playing');
    toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
    console.log('Fallback player started');
  } else {
    // Stop playing
    fallbackIframe.src = '';
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    console.log('Fallback player stopped');
  }
}

// Create circular text
function createCircularText() {
  const text = "CLICK FOR MUSIC • PLAY ME • ";
  const circularText = document.getElementById('circularText');

  if (!circularText) {
    console.error('Circular text element not found');
    return;
  }

  const chars = text.split('');
  const deg = 360 / chars.length;

  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.innerText = char;
    span.style.transform = `rotate(${deg * i}deg)`;
    circularText.appendChild(span);
  });

  console.log('Circular text created with', chars.length, 'characters');
}

// Initialize toggle button
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.music-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
    console.log('Music toggle button initialized');
  } else {
    console.error('Music toggle button not found');
  }

  createCircularText();
});
