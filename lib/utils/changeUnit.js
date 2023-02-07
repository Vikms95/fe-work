'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showMeasure = showMeasure;
exports.convertMeasureToOriginal = convertMeasureToOriginal;
function showMeasure(number, measure) {
  var numberToShow = void 0;
  if (measure === 'mm') {
    numberToShow = (number * 10).toFixed(0);
  } else if (measure === 'cm') {
    numberToShow = number.toFixed(1);
  } else if (measure === 'dm') {
    numberToShow = (number / 10).toFixed(2);
  } else if (measure === 'm') {
    numberToShow = (number / 100).toFixed(3);
  } else if (measure === 'pt') {
    numberToShow = (number * 0.394).toFixed(2);
  }

  return numberToShow;
}

function convertMeasureToOriginal(number, measure) {
  var numberCM = void 0;
  if (measure === 'mm') {
    numberCM = number.toFixed(14);
  } else if (measure === 'cm') {
    numberCM = number.toFixed(14);
  } else if (measure === 'dm') {
    numberCM = number.toFixed(14);
  } else if (measure === 'm') {
    numberCM = number.toFixed(14);
  } else if (measure === 'pt') {
    numberCM = number / 10;
  }

  return parseFloat(numberCM);
}