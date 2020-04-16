import sampleImage from './sample.png';
import './sampleImage.scss';

class AddImage {
  render() {
    const img = document.createElement('img');
    img.src = sampleImage;
    img.alt = 'sampleImage';
    img.classList.add('sample-image');

    const bodyDomElement = document.querySelector('body');
    bodyDomElement.appendChild(img);
  }
}

export default AddImage;