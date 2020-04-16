import Heading from './components/heading/heading.js';
import AddImage from './components/sample-image/addImage.js';
import React from 'react';

const heading = new Heading();
const addImage = new AddImage();
heading.render('sample Image');
addImage.render();