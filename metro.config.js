// metro.config.js
const path = require('path');

module.exports = {
  resolver: {
    alias: {
      '@': path.resolve(__dirname), 
    },
  },
};
