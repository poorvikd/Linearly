var inputdone=false;
var points=[];
var i,j,p=1,q=0,v=0,adj,distance,visited;
var unvisited = [];
var path = {};
var src,min_dist=999999,unvis;
var mySound, End, pop;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('/static/assets/jump');
  End = loadSound('/static/assets/success');
  pop = loadSound('/static/assets/pop');
}
function setup() {
  canvas=createCanvas((windowWidth*2)/3, windowHeight-100);
  canvas.parent("sketch-holder")
  frameRate(10);
}

function doubleClicked(){
  if(!inputdone){
    var ptr = createVector(mouseX,mouseY);
    points.push(ptr);
    pop.play();
    loop();
  }
}
function draw() {
  clear();
  if(inputdone==false){
    var sbt = createButton('Start');
    sbt.position((windowWidth*1)/3.1, windowHeight-80);
    sbt.mousePressed(start_algo);
    for(i=0;i<points.length;i++){
      fill(218, 68, 83, 220);
      noStroke()
      circle(points[i].x,points[i].y,15);
    }
    noLoop();
  }else{
    var n = points.length;
    textAlign(CENTER)
    fill(93, 212, 204)
    textFont("Roboto Mono");
    textSize(25)
    text("Source: "+src,width/2,10)
    if(p < n) {
      if(q < n) {
          if (visited[q]==0 && distance[q] < min_dist && adj[src][q]!=999999) {
            unvis = q;
            min_dist = distance[q];
            stroke(255);
            strokeWeight(3);
            line(points[src].x,points[src].y,points[q].x,points[q].y)
          }
        q++;
      }else{
        visited[unvis] = 1;
        path[unvis] = [unvis]
        if(v < n) {
          if (visited[v]==0 && distance[unvis] + adj[unvis][v] < distance[v]) {
            distance[v] = distance[unvis] + adj[unvis][v];
            path[v] = [unvis,v]
          }
        }else{
          v=0;
          q=0;
          p++;
          min_dist = 999999;
        }
        v++;
      }
    }else{
      textAlign(CENTER)
      text("Shortest path from "+src+" to all other nodes are as follows: ",width/2,40)
      End.play();
      noLoop();
    }
    for(var z in path){
      var arr = path[z];
      stroke(93, 212, 204, 200);
      strokeWeight(5);
      if (arr.length == 1){
        mySound.stop();
        mySound.play();
        line(points[src].x,points[src].y,points[arr[0]].x,points[arr[0]].y);
      }else{
        mySound.stop();
        mySound.play();
        line(points[src].x,points[src].y,points[arr[0]].x,points[arr[0]].y);
        for(i=0;i<arr.length-1;i++){
          mySound.play();
          line(points[arr[i]].x,points[arr[i]].y,points[arr[i+1]].x,points[arr[i+1]].y);
        }
      }
    }
    for(i=0;i<n;i++){
      for(j=0;j<n;j++){
        if(adj[i][j]!=999999){
          stroke(93, 212, 204, 200);
          strokeWeight(1);
          line(points[i].x,points[i].y,points[j].x,points[j].y);
        }
      }
    }
    for(i=0;i<points.length;i++){
        if(src==i){
          fill(93, 212, 204, 200);
        }else{
          fill(218, 68, 83, 220);
          noStroke();
        }
        circle(points[i].x,points[i].y,30);
        textSize(20);
        textAlign(CENTER,CENTER)
        fill(93, 212, 204, 200);
        if(src==i)
        fill(218, 68, 83, 220); 
        text(i,points[i].x,points[i].y)
    }
  }
}
function create_adj(){
  var n = points.length;
  src = floor(random(0,n));
  adj = new Array(n)
  distance = new Array(n);
  visited = new Array(n);
  for(i=0;i<n;i++){
    adj[i]=new Array(n);
    visited[i]=0;
    for(j=0;j<n;j++){
      adj[i][j] = round(dist(points[i].x,points[i].y,points[j].x,points[j].y));
      if(adj[i][j]==0){
        adj[i][j]=999999
      }
    }
  }
  var aa;
  if (n>=5){
    var a = floor(random(n))
    var b = floor(random(n))
    adj[src][a] = adj[a][src]=999999;
    while(a==b){
      b = floor(random(n))
    }
    adj[src][b] = adj[b][src]=999999;
    aa = floor(random(1,n-n%4));
  }else{
    aa=1;
  }
  for(i=0;i<aa-1;i++){
    var a = floor(random(n))
    var b = floor(random(n))
    while(a==b){
      b = floor(random(n))
    }
    adj[a][b] =adj[b][a]= 999999;
  }
  for(i=0;i<n;i++){
    distance[i] = adj[src][i];
  }
  visited[src] = 1
}
function start_algo(){
  inputdone=true;
  create_adj();
  clear();
  loop();
}