// Audio Music Player
let isPlaying = false;
let audio;

// Save playback state to localStorage
function savePlaybackState() {
  if (audio) {
    localStorage.setItem('musicPlaying', isPlaying);
    localStorage.setItem('musicTime', audio.currentTime);
  }
}

// Restore playback state from localStorage
function restorePlaybackState() {
  const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
  const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;

  if (audio && wasPlaying) {
    audio.currentTime = savedTime;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        document.querySelector('.music-player')?.classList.add('playing');
        const toggleBtn = document.querySelector('.music-toggle');
        if (toggleBtn) {
          toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
      }).catch(error => {
        console.error('Audio playback error:', error);
      });
    }
  }
}

// Toggle music playback
function toggleMusic() {
  const toggleBtn = document.querySelector('.music-toggle');
  const musicPlayer = document.querySelector('.music-player');

  // Get audio element
  if (!audio) {
    audio = document.getElementById('wedding-audio');
    if (!audio) {
      return;
    }
  }

  if (!isPlaying) {
    // Play audio
    audio.load();
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        musicPlayer.classList.add('playing');
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        savePlaybackState();
      }).catch(error => {
        // Silently handle errors
        console.error('Audio playback error:', error);
      });
    }
  } else {
    // Pause audio
    audio.pause();
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    savePlaybackState();
  }
}

// Create circular text
function createCircularText() {
  const text = "CLICK FOR MUSIC • PLAY ME • ";
  const circularText = document.getElementById('circularText');

  if (!circularText) {
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
}

// Initialize toggle button
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.music-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
  }

  createCircularText();

  // Get audio element and restore playback state
  audio = document.getElementById('wedding-audio');
  if (audio) {
    // Save state periodically while playing
    audio.addEventListener('timeupdate', savePlaybackState);

    // Restore playback state on load
    restorePlaybackState();
  }
});

// Save state before navigating away
window.addEventListener('beforeunload', savePlaybackState);
