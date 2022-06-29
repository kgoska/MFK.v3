
function changeVar(value, min, max) {
  var range = max - min;
  var progressW = (value-min)/range*100 +'%';
  $('rangeField').css('--progressW', progressW);
}