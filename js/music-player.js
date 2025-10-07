// Audio Music Player
let isPlaying = false;
let audio;

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
});
