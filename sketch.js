var mapimg;

var cX = 82;
var cY = 24;
var lat;
var lon;
var row;
var year;
var n = 0;
var buttons;
var type;
var slider;
var slider2;

function meX(lon) {
  lon = radians(lon);
  var c = (256 / PI) * pow(2, 3.8);
  var d = (lon + PI);
  return c * d;
}

function meY(lat) {
  lat = radians(lat);
  var c = (256 / PI) * pow(2, 3.8);
  var d = tan(PI / 4 + lat / 2);
  var f = PI - log(d);
  return c * f;
}

function preload() {

  mapimg = loadImage('https://api.mapbox.com/styles/v1/tkartik/cjhb05ja705hn2sr1a7sqkhhe/static/82,24,3.8,0,0/700x700?access_token=pk.eyJ1IjoidGthcnRpayIsImEiOiJjamg5bW93ankwaDNqMzVvNjBkNHp1ZTZwIn0.lNto7gkqs3ktuJgWNS9hcw');
  table = loadTable('data/india.csv', 'csv', 'header');
}

// function ass() {
//   year = this.value(); //assign year on button click
// }

function keyTyped() {
  if (key == 'a') {
    if (type == 0) {
      type = 1; //function to change color
    } else {
      type = 0;
    }
  }
}

function setup() {
  var canvas = createCanvas(700, 700);
  canvas.parent('sketch-holder');
  row = table.getRowCount();

  // buttons = selectAll('button');
  // for (var i = 0; i < buttons.length; i++) {
  //   buttons[i].mousePressed(ass);
  // }

  slider = createSlider(2, 30, 5)
  slider.parent('s1');
  slider2 = createSlider(1979, 2016, 1988)
  slider2.parent('s2')

  // year=int(slider2.value());
}



function draw() {
  cursor(CROSS);
  translate(350, 350);
  background(255);
  imageMode(CENTER);
  year = int(slider2.value());

  if (type == 0) {
    background(255);
  } else {
    image(mapimg, 0, 0);
  }
  var n = 0;
  for (var r = 0; r < row; r++) {

    var chk = table.getString(r, 0);

    if (chk == year) {

      lat = table.getString(r, 5);
      lon = table.getString(r, 6);
      loc = table.getString(r, 4);
      typ = table.getString(r, 11);
      var kill = table.getString(r, 19);
      var hkill = table.getString(r, 16);
      var x = meX(lon) - meX(cX);
      var y = meY(lat) - meY(cY);

      noStroke();
      if (kill > 0 || hkill > 0) {
        fill(10, 180, 200, 100);
      } //color for killed
      else {
        fill(160, 50, 20, 100);
      }

      ellipse(x, y, slider.value(), slider.value()); //drawing the location

      if (dist(mouseX - 350, mouseY - 350, x, y) < 3) {
        fill(100, 200);
        rect(mouseX - 344, mouseY - 352, typ.length * 7, 28);
        fill(255); //name of the place
        textSize(11);
        text(loc, mouseX - 340, mouseY - 340);
        textSize(11);
        text(typ, mouseX - 340, mouseY - 328);
      }

      n++
    }
  }

  noStroke();
  fill(255);
  rect(150, 210, 100, 180);
  fill(10, 180, 200, 100);
  ellipse(117, 175, 10, 10);
  fill(160, 50, 20, 100);
  ellipse(117, 205, 10, 10);
  fill(120);
  textSize(13);
  text("Attacks with no fatalities", 132, 180);
  text("Attacks with fatalities", 132, 210);
  text("                 INTERACTIVITY", 110, 260);
  text("A - Press A to toggle map on/off", 110, 310);
  text("Hover over the location to get more info",110,290);
  textSize(14);
  text("total number of attacks " + n, 110, -230);
  textSize(25);
  text("Year" + year,140,-250);



}
