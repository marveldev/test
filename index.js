const buttonsNav = document.querySelector('.items');
let mouseDown = false;
let previousScroll;
let scrollLeft;

buttonsNav.addEventListener('mousedown', (event) => {
  mouseDown = true;
  previousScroll = event.pageX - buttonsNav.offsetLeft;
  scrollLeft = buttonsNav.scrollLeft;
});

buttonsNav.addEventListener('mouseup', () => {
  mouseDown = false;
});

buttonsNav.addEventListener('mouseleave', () => {
  mouseDown = false;
});

buttonsNav.addEventListener('mousemove', (event) => {
  if (mouseDown = true) {
    event.preventDefault();
    const currentScroll = event.pageX - buttonsNav.offsetLeft;
    const scroll = (currentScroll - previousScroll) * 1;
    buttonsNav.scrollLeft = scrollLeft - scroll;
    mouseDown = false
  }
});

// if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
//   console.log("Let's get this party started")
// }

// navigator.mediaDevices.getUserMedia({
//   video: {
//     width: {
//       min: 1280,
//       ideal: 1920,
//       max: 2560,
//     },
//     height: {
//       min: 720,
//       ideal: 1080,
//       max: 1440
//     },
//     facingMode: 'user'
//   }
// })

// feather.replace();

const controls = document.querySelector('.controls');
const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
const buttons = [...controls.querySelectorAll('button')];
let streamStarted = false;

const [play, pause, screenshot] = buttons;

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
  }
};

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join('');
};

play.onclick = () => {
  if (streamStarted) {
    video.play();
    play.classList.add('d-none');
    pause.classList.remove('d-none');
    return;
  }
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    const updatedConstraints = {
      ...constraints,
      deviceId: {
        exact: cameraOptions.value
      }
    };
    startStream(updatedConstraints);
  }
};

const startStream = async (constraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

const handleStream = (stream) => {
  video.srcObject = stream;
  play.classList.add('d-none');
  pause.classList.remove('d-none');
  screenshot.classList.remove('d-none');
  streamStarted = true;
};

getCameraSelection();
