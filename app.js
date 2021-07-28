'use strict'

const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function () {

    var className = document.body.className;

    console.log('current class name: ' + className);
});
