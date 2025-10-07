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
      console.error('Audio element not found');
      alert('Audio player not found. Please refresh the page.');
      return;
    }
  }

  if (!isPlaying) {
    // Try to load and play audio
    console.log('Attempting to play audio...');

    // Show loading indicator
    toggleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // First try to load the audio
    audio.load();

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        musicPlayer.classList.add('playing');
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        console.log('Music started successfully');

        // Visual confirmation for mobile
        musicPlayer.style.borderColor = 'var(--accent)';
      }).catch(error => {
        console.error('Error playing audio:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);

        // Reset button
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';

        // Visual error indicator
        toggleBtn.style.background = 'red';
        setTimeout(() => {
          toggleBtn.style.background = '';
        }, 2000);

        // More specific error messages
        let errorMsg = '';
        if (error.name === 'NotAllowedError') {
          errorMsg = 'Audio blocked by browser.\n\nPlease:\n1. Tap "Open in Safari" or "Open in Chrome"\n2. Or enable audio permissions for this site';
        } else if (error.name === 'NotSupportedError') {
          errorMsg = 'Audio format not supported.\n\nPlease open in Safari or Chrome.';
        } else {
          errorMsg = 'Cannot play audio: ' + error.message + '\n\nFor Messenger:\n1. Tap the ••• menu\n2. Choose "Open in Safari/Chrome"';
        }

        alert(errorMsg);
      });
    } else {
      // play() didn't return a promise
      toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
      alert('Audio playback not supported in this browser.\n\nPlease open the link in Safari or Chrome.');
    }
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

  // Add audio event listeners for debugging
  audio = document.getElementById('wedding-audio');
  if (audio) {
    audio.addEventListener('loadeddata', () => {
      console.log('Audio loaded successfully');
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      const error = audio.error;
      if (error) {
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);

        let errorMsg = 'Audio failed to load: ';
        switch(error.code) {
          case 1: errorMsg += 'MEDIA_ERR_ABORTED - Loading aborted'; break;
          case 2: errorMsg += 'MEDIA_ERR_NETWORK - Network error'; break;
          case 3: errorMsg += 'MEDIA_ERR_DECODE - Decoding error'; break;
          case 4: errorMsg += 'MEDIA_ERR_SRC_NOT_SUPPORTED - Format not supported'; break;
          default: errorMsg += 'Unknown error';
        }

        // Show error in a visible way
        const musicPlayer = document.querySelector('.music-player');
        if (musicPlayer) {
          musicPlayer.style.border = '3px solid red';
          musicPlayer.title = errorMsg;
        }
      }
    });

    audio.addEventListener('canplay', () => {
      console.log('Audio can play');
    });
  }
});
