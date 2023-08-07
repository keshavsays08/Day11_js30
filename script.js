// get our elements 

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const togglePP = player.querySelector('.togglePP');
const toggleV = player.querySelector('.toggleV');


// build function
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    togglePP.textContent = icon;
    console.log('Update the button')
}
function updateVolumeIcon() {
    const volume = video.volume;
  
    if (volume >= 0.6) {
      toggleV.textContent = '🕪'; // High volume icon
    } else if (volume >= 0.3) {
      toggleV.textContent = '🕩'; // Medium volume icon
    } else if (volume > 0) {
      toggleV.textContent = '🕨'; // Low volume icon
    } else {
      toggleV.textContent = '🕨'; // Mute or no volume icon
    }
  }
function handleRangeUpdate() {
    video[this.name] = this.value
    console.log(this.name);
    console.log(this.value);
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}



// hook event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
togglePP.addEventListener("click", togglePlay);
toggleV.addEventListener('input', updateVolumeIcon);
video.addEventListener("timeupdate", handleProgress);


skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate))

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
