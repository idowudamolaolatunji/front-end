'use strict';

const token = localStorage.getItem('userToken');
const user = localStorage.getItem('userObj');
console.log(token)



document.addEventListener("DOMContentLoaded", function() {
    if(!token || !user) {
        window.location.href = '../index.html';
    }
});





