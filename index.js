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
