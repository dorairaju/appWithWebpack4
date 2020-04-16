import _ from 'lodash';
import Heading from './components/heading/heading.js';
import AddImage from './components/sample-image/addImage.js';

const heading = new Heading();
const addImage = new AddImage();
heading.render(_.upperFirst('sample Image'));
addImage.render();