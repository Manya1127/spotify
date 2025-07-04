const songData = {
    song1: {
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
    },
    song2: {
        title: "Levitating",
        artist: "Dua Lipa",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS66anQAPLTqT5msqmA3bUgP8nU6L34JTvL1A&s"
    },
    song3: {
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    song4: {
        title: "Bad Habits",
        artist: "Ed Sheeran",
        cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    song5: {
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        cover: "/photos s/Screenshot 2025-03-30 121919.png"
    },
    song6: {
        title: "sukoon mila",
        artist: "Arijit Singh",
        cover: "https://c.saavncdn.com/143/Sukoon-Mila-Lo-Fi-Mix-Hindi-2023-20230606230325-500x500.jpg"
    },
    song7: {
        title: "patakha guddi",
        artist: "Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT583ahTSIDons2ZfP1cxtHw9WN4C-0V-P6gw&s"
    },
    song8: {
        title: "o boy charlie",
        artist: "Arijit Singh",
        cover: "https://img.youtube.com/vi/jXlNjZnnCgc/mqdefault.jpg"
    },
    song9: {
        title: "Titli",
        artist: "Vishal-Shekhar",
        cover: "https://c.saavncdn.com/525/Chennai-Express-2013-500x500.jpg"
    },
    song10: {
        title: "sukoon mila",
        artist: "Arijit Singh",
        cover: "https://c.saavncdn.com/143/Sukoon-Mila-Lo-Fi-Mix-Hindi-2023-20230606230325-500x500.jpg"
    },
    song11: {
        title: "o rangrez",
        artist: "Arijit Singh",
        cover: "https://i.scdn.co/image/ab67616d0000b273fd2df008046f04c32d9c0c2e"
    },
    song12: {
        title: "ve haniya",
        artist: "Arijit Singh",
        cover: "https://c.saavncdn.com/367/Ve-Haaniyaan-Punjabi-2024-20240212220137-500x500.jpg"
    },
    song13: {
        title: "slow motion angreja",
        artist: "Shankar-Eshan-Loy",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd9AW_MGHpVf0TbpiSh3bvu7Rq_c7T4Aopw&s"
    },
  
    song14: {
        title: "Maahi Ve",
        artist: "A.R Rahman",
        cover: "https://i.scdn.co/image/ab67616d0000b2731f4e9ecaf6913e207810093f"
    
  },
  
  song15: {
      title: "Softly",
      artist: "Karan Aujla",
      cover: "https://i1.sndcdn.com/artworks-swMUa9PnVOMP-0-t500x500.jpg"
  }
      };

// DOM Elements
const playlistItems = document.querySelectorAll('.item');
const playPauseBtn = document.querySelector('.play-pause');
const playPauseIcon = document.getElementById('playPauseIcon');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const currentCover = document.getElementById('currentCover');

// Audio setup
let currentAudio = null;
let currentSongId = null;
let isPlaying = false;

// Initialize volume
volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value / 100;
    if (currentAudio) {
        currentAudio.volume = volume;
    }
    
    // Update volume icon based on level
    if (volume === 0) {
        volumeIcon.className = 'fa fa-volume-off';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fa fa-volume-down';
    } else {
        volumeIcon.className = 'fa fa-volume-up';
    }
});

// Format time in MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}



// Load and play a song
function loadSong(songId) {
    // If there's a current audio playing, pause it
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Get the new audio element
    currentAudio = document.getElementById(songId);
    currentSongId = songId;
    
    // Set volume
    currentAudio.volume = volumeSlider.value / 100;
    
    // Update song info
    currentTitle.textContent = songData[songId].title;
    currentArtist.textContent = songData[songId].artist;
    currentCover.src = songData[songId].cover;
    
    // Play the song
    playSong();
    
    // Set up time update for progress bar
    currentAudio.addEventListener('timeupdate', updateProgress);
    
    // Update total duration once metadata is loaded
    currentAudio.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(currentAudio.duration);
        

    });
    
    // When song ends
    currentAudio.addEventListener('ended', () => {
        // Find next song
        const currentIndex = parseInt(currentSongId.replace('song', ''));
        const nextIndex = currentIndex % 5 + 1;
        loadSong(`song${nextIndex}`);
    });
}

// Play the current song
function playSong() {
    if (currentAudio) {
        currentAudio.play();
        isPlaying = true;
        playPauseIcon.className = 'fa fa-pause';
    }
}

// Pause the current song
function pauseSong() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        playPauseIcon.className = 'fa fa-play';
    }
}

// Update progress bar
function updateProgress() {
    const currentTime = currentAudio.currentTime;
    const duration = currentAudio.duration || 1;
    const progressPercent = (currentTime / duration) * 100;
    
    progress.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(currentTime);
}

// Event listeners for playlist items
playlistItems.forEach(item => {
    item.addEventListener('click', () => {
        const songId = item.getAttribute('data-song');
        loadSong(songId);
    });
});

// Play/Pause button
playPauseBtn.addEventListener('click', () => {
    if (!currentAudio) {
        // If no song is selected, play the first one
        loadSong('song1');
        return;
    }
    
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Next button
nextBtn.addEventListener('click', () => {
    if (!currentSongId) return;
    
    const currentIndex = parseInt(currentSongId.replace('song', ''));
    const nextIndex = currentIndex % 15 + 1;
    loadSong(`song${nextIndex}`);
});

// Previous button
prevBtn.addEventListener('click', () => {
    if (!currentSongId) return;
    
    let prevIndex = parseInt(currentSongId.replace('song', '')) - 1;
    if (prevIndex < 1) prevIndex = 15;
    loadSong(`song${prevIndex}`);
});

// Click on progress bar to seek
progressBar.addEventListener('click', (e) => {
    if (!currentAudio) return;
    
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = currentAudio.duration;
    
    currentAudio.currentTime = (clickX / width) * duration;
});

  const toggleButton = document.getElementById('modeToggle');
  toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });

  const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-next');
const prevBtn = document.querySelector('.carousel-prev');
let currentSlide = 0;

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.style.transform = translateX(${100 * (index - currentSlide)}%);
  });
}

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

updateCarousel(); // initialize