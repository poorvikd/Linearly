var j = 0;
var vals = [];
var k = 0;
var n;
var w,sp;
var jsonData,mySound,End;
var rn;
var slider;
var arr= [];
function loadJson(selector) {
  return JSON.parse(document.querySelector(selector).getAttribute('data-json'));
}
function preload() {
  j=0;
  k=0;
  arr=[];
  vals=[];
  jsonData = loadJson('#jsonData');
  soundFormats('mp3', 'ogg');
  mySound = loadSound('/static/assets/qs-ping');
  End = loadSound('/static/assets/success');
  if (jsonData.type == "r"){
    rn = true;
    n = jsonData.size;
    sp = jsonData.speed;
  }
  if (jsonData.type == "c"){
    rn = false;
    vals = jsonData.scaled_array;
    sp = jsonData.speed;
    arr = jsonData.array;
  }
}
function setup() {
  createCanvas(windowWidth-(0.015*windowWidth), 500);
  if(rn==true){
    w = width / n;
    for (var i = 0; i < n; i++) {
      vals.push(round(random(400)));
    }
    arr = vals;
  }else{
    w = width / vals.length;
    n = vals.length;
  }
  slider = createSlider(1, 100, sp, 1);
  slider.position(windowWidth/2.35,windowHeight/2.2);
  slider.style('width', '200px');
  frameRate(slider.value());
}

function draw() {
  clear();
  frameRate(slider.value());
  if (vals[k] > vals[k + 1]){
    swap(k, k + 1);
    if(rn==false){
      swaparr(k,k+1);
    }
  }
  if (j < n) {
    k = k + 1;
    if (k >= n - j - 1) {
      k = 0;
      j = j + 1;
    }
  } else {
    noLoop();
    End.play();
  }
  textSize(20);
  textAlign(CENTER);
  for (var i = 0; i < n; i++) {
    if (i == k) {
      stroke(218, 68, 83);
      fill('rgba(218, 68, 83,0.6)');
      if(n<=20){
        text(arr[i], (i * w), 0, w, 100);}
      rect(i * w, 20, w, vals[i]);
    }
    else {
      stroke(93, 212, 204);
      fill('rgba(93, 212, 204,0.2)');
      if(n<=20)
      text(arr[i],(i * w), 0, w, 100);
      rect(i * w, 20, w, vals[i]);
    }
  }
}
async function swap(a, b){
  await sleep(100);
  mySound.stop();
  mySound.play();
  var temp = vals[a];
  vals[a] = vals[b];
  vals[b] = temp;
}
function swaparr(a,b){
  var temp1 = arr[a];
  arr[a] = arr[b];
  arr[b] = temp1;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}