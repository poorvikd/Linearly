var values=[];
var scaled_values=[];
var scaled_value;
var n,mySound,End,fail;
var bar_width,i=0;
var flag=0,value;
function loadJson(selector) {
  return JSON.parse(document.querySelector(selector).getAttribute('data-json'));
}
function preload(){
  soundFormats('mp3', 'ogg');
  mySound = loadSound('/static/assets/qs-ping');
  End = loadSound('/static/assets/success');
  fail = loadSound('/static/assets/fail')
  i=0;
  flag=0;
  jsonData = loadJson('#jsonData');
  if (jsonData.type == "r") {
    rn = true;
    n = jsonData.size;
    values = jsonData.array;
    value = jsonData.value;
    scaled_values = values;
    if(round(random(2))==1)
      scaled_value = scaled_values[round(random(scaled_values.length))]
    else
      scaled_value = value;
  }
  if (jsonData.type == "c") {
    rn = false;
    values = jsonData.array;
    scaled_values = jsonData.scaled_values;
    value = jsonData.value;
    scaled_value = jsonData.scaled_value;
    n = scaled_values.length;
  }
}
function setup() {
  createCanvas(windowWidth-(0.015*windowWidth),500);
  bar_width = width/n;
  frameRate(5);
}

function draw() {
  clear();
  textSize(20);
  textAlign(CENTER);
  for(var k=0;k<n;k++){ 
      stroke(93, 212, 204);
      fill(93, 212, 204, 120);
      rect(bar_width*k,0,bar_width,scaled_values[k]);
  }
  if (i >= n) {
    stroke(256, 0, 0);
    fill(256, 0, 0);
    fail.play();
    var txt = "Element " + value + " not found";
    text(txt, 0, 400, width, 20)
    noLoop();
  }
  else if(scaled_values[i]==scaled_value){
    flag=1;
    stroke(119, 221, 119);
    fill(119, 221, 119, 120);
    End.play();
    var txt = "Element " + value + " found";
    text(txt, 0, 400, width, 20)
    rect(bar_width*i,0,bar_width,scaled_values[i]);   
  }
  else{
    stroke(255, 209, 220)
    fill(255, 209, 220,200);
    rect(bar_width*i,0,bar_width,scaled_values[i]); 
    mySound.play();  
    var txt = "Finding " + value;
    text(txt, 0, 400, width, 20)
  }
  if(i<n && flag==0){
    i++;
  }
  else if(flag==1){
    noLoop();
  }
}