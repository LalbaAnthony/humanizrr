// src/index.js

const typos = require('./core/typos');
const format = require('./core/format');
const markdown = require('./core/markdown');

const humanizrr = {
    typos,
    format,
    markdown,
};

module.exports = humanizrr;
