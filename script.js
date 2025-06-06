const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg'
  ];
  
  const introDivs = document.querySelectorAll('.intro-image');
  
  images.forEach((img, i) => {
    introDivs[i].style.backgroundImage = `url(${img})`;
  });
  
  let current = 0;
  
  function showNextImage() {
    if (current > 0) introDivs[current - 1].style.opacity = 0;
    if (current < introDivs.length) {
      introDivs[current].style.opacity = 1;
      current++;
      setTimeout(showNextImage, 400); // BAM BAM BAM timing
    } else {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('main-content').style.display = 'flex';
    }
  }
  
  window.onload = showNextImage;
  
  // Slowly drifting and draggable projects
const projects = document.querySelectorAll('.project');

projects.forEach(project => {
  // Initial random position
  project.style.top = `${Math.random() * 80}vh`;
  project.style.left = `${Math.random() * 80}vw`;

  // Gentle random movement
  let dx = (Math.random() - 0.5) * 0.3;
  let dy = (Math.random() - 0.5) * 0.3;

  setInterval(() => {
    const rect = project.getBoundingClientRect();
    let top = parseFloat(project.style.top);
    let left = parseFloat(project.style.left);

    top += dy;
    left += dx;

    // Bounce off edges
    if (top < 0 || top > window.innerHeight - 200) dy *= -1;
    if (left < 0 || left > window.innerWidth - 200) dx *= -1;

    project.style.top = `${top}px`;
    project.style.left = `${left}px`;
  }, 40);

  // Draggable setup
  let isDragging = false;
  let offsetX, offsetY;

  project.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    project.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      project.style.top = `${e.clientY - offsetY}px`;
      project.style.left = `${e.clientX - offsetX}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    project.style.zIndex = 1;
  });

  // Click to open project
  project.addEventListener('click', () => {
    window.location.href = project.dataset.link;
  });
});
