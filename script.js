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
  // Initial random placement - avoids edges a bit
  const startTop = Math.random() * (window.innerHeight - 220);
  const startLeft = Math.random() * (window.innerWidth - 220);
  project.style.top = `${startTop}px`;
  project.style.left = `${startLeft}px`;

  // Random gentle drift
  let dx = (Math.random() - 0.5) * 0.3;
  let dy = (Math.random() - 0.5) * 0.3;

  setInterval(() => {
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

  // DRAGGING vs CLICK LOGIC
  let isDragging = false;
  let clickStartX = 0;
  let clickStartY = 0;

  project.addEventListener('mousedown', e => {
    isDragging = true;
    clickStartX = e.clientX;
    clickStartY = e.clientY;
    project.style.zIndex = 1000;
    e.preventDefault(); // Stops text/image selection
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      const offsetX = e.clientX - clickStartX;
      const offsetY = e.clientY - clickStartY;

      const newTop = parseFloat(project.style.top) + offsetY;
      const newLeft = parseFloat(project.style.left) + offsetX;

      project.style.top = `${newTop}px`;
      project.style.left = `${newLeft}px`;

      clickStartX = e.clientX;
      clickStartY = e.clientY;
    }
  });

  document.addEventListener('mouseup', e => {
    if (isDragging) {
      isDragging = false;
      project.style.zIndex = 1;

      const distMoved = Math.hypot(e.clientX - clickStartX, e.clientY - clickStartY);
      if (distMoved < 5) {
        // Considered a true click
        window.location.href = project.dataset.link;
      }
    }
  });
});
