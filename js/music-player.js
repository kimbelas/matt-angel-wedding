// Audio Music Player
let isPlaying = false;
const audio = document.getElementById('wedding-audio');

// Toggle music playback
function toggleMusic() {
  const toggleBtn = document.querySelector('.music-toggle');
  const musicPlayer = document.querySelector('.music-player');

  if (!isPlaying) {
    // Play audio
    audio.play().then(() => {
      isPlaying = true;
      musicPlayer.classList.add('playing');
      toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
      console.log('Music started');
    }).catch(error => {
      console.error('Error playing audio:', error);
      alert('Unable to play music. Please try again.');
    });
  } else {
    // Pause audio
    audio.pause();
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    console.log('Music paused');
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
