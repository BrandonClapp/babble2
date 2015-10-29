'use strict'

var menus = {
  index: require('./index.js')
}

module.exports = {
  display: display
}

function display(windowName){
  menus[windowName || 'index'].display();
}
