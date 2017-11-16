/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {

  var btn = document.querySelector('#startBtn');
  var sqrs = document.querySelectorAll('.square');
  var result = document.querySelector('.score');
  var difficulty = document.querySelector('#difficulty');
  var lighten = 0.3;
  var score = 0;
  var best = 0;

  sqrs.forEach(function (s) {
    return s.style.backgroundColor = getRandomRgb();
  });

  function getRandomNum() {
    return Math.floor(Math.random() * 16);
  }

  function getRandomRgb() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  function shadeRGBColor(color, percent) {
    var f = color.split(","),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = parseInt(f[0].slice(4)),
        G = parseInt(f[1]),
        B = parseInt(f[2]);
    return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
  }

  btn.addEventListener('click', startGame);
  difficulty.addEventListener('change', function () {
    best = 0;
    startGame();
  });

  function startGame() {
    lighten = 1 - difficulty.value;
    score = 0;
    prepareGame();
  }

  var color = void 0;
  var num = void 0;

  function prepareGame() {
    result.innerText = 'Points: ' + score + ' / Best: ' + best + ' points';
    color = getRandomRgb();
    sqrs.forEach(function (s) {
      return s.style.backgroundColor = color;
    });
    num = getRandomNum();
    console.log(num);
    sqrs[num].style.backgroundColor = shadeRGBColor(color, lighten);
  }

  sqrs.forEach(function (s) {
    return s.addEventListener('click', check);
  });

  function check(event) {
    if (color === undefined || lighten <= 0) {
      return;
    }
    if (event.target.style.backgroundColor !== color) {
      score++;
      lighten -= 0.01;
      score > best ? best = score : best = best;
      result.innerText = 'Points: ' + score + ' / Best: ' + best + ' points';
      if (lighten < 0) {
        result.innerText = 'Congratulations! You won!';
        sqrs.forEach(function (s) {
          return s.classList.add('correct');
        });
        sqrs[num].addEventListener("webkitAnimationEnd", function () {
          sqrs.forEach(function (s) {
            return s.classList.remove('correct');
          });
          startGame();
        });
        return;
      }
      prepareGame();
    } else {
      score > best ? best = score : best = best;
      sqrs[num].classList.add('correct');
      sqrs[num].removeEventListener('click', check);
      btn.removeEventListener('click', startGame);
      setTimeout(function () {
        sqrs[num].classList.remove('correct');
        sqrs[num].addEventListener('click', check);
        btn.addEventListener('click', startGame);
        startGame();
      }, 3000);
    }
  }
});

/***/ })
/******/ ]);