// Simple Music Player - Iframe only
let isPlaying = false;

// Toggle music playback
function toggleMusic() {
  const iframe = document.getElementById('youtube-iframe');
  const toggleBtn = document.querySelector('.music-toggle');
  const musicPlayer = document.querySelector('.music-player');

  if (!isPlaying) {
    // Start playing
    iframe.src = 'https://www.youtube.com/embed/18bjpktqFgM?autoplay=1&loop=1&playlist=18bjpktqFgM&controls=0&mute=0';
    isPlaying = true;
    musicPlayer.classList.add('playing');
    toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
    console.log('Music started');
  } else {
    // Stop playing
    iframe.src = '';
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    console.log('Music stopped');
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
