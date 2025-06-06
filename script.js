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
  