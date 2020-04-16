import sampleImg from './sample.png';

function addImage() {
  const img = document.createElement('img');
  img.alt = 'sample';
  img.width = 300;
  img.src = sampleImg;

  const body = document.querySelector('body');
  body.appendChild(img);
}

export default addImage;