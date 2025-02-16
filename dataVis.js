let data;

function preload() {
  data = loadJSON('animal-crossing-data.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noLoop();
}

function draw() {
  let names = [];
  let birthdays = [];
  let personalities = [];

  for (let i = 0; i < Object.keys(data).length; i++) {
    names.push(data[i].name);
    birthdays.push(data[i].birthday_month);
    personalities.push(data[i].personality);
  }

  let centerX = width / 2;
  let centerY = height / 2;
  let radius = min(width, height) / 3;
  let numCircles = min(names.length, 50);
  let angleStep = TWO_PI / numCircles;

  let positions = [];

  // Calculate circle positions
  for (let i = 0; i < numCircles; i++) {
    let angle = i * angleStep;
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    
    positions.push({ x, y, angle, month: birthdays[i], personality: personalities[i] });
  }

  // Draw lines between circles with the same birthday month (Green)
  stroke(0, 212, 80, 150);
  strokeWeight(2);
  for (let i = 0; i < numCircles; i++) {
    for (let j = i + 1; j < numCircles; j++) {
      if (positions[i].month && positions[i].month === positions[j].month) {
        line(positions[i].x, positions[i].y, positions[j].x, positions[j].y);
      }
    }
  }
  
  // Draw lines between circles with the same personality (Blue)
  stroke(51, 55, 255, 120);
  strokeWeight(2);
  for (let i = 0; i < numCircles; i++) {
    for (let j = i + 1; j < numCircles; j++) {
      if (positions[i].personality && positions[i].personality === positions[j].personality) {
        line(positions[i].x, positions[i].y, positions[j].x, positions[j].y);
      }
    }
  }

  // Draw circles and names
  noStroke();
  for (let i = 0; i < numCircles; i++) {
    let { x, y, angle } = positions[i];

    fill(255);
    circle(x, y, 10);

    // Text position
    let textX = x + 25 * cos(angle);
    let textY = y + 20 * sin(angle);

    // Align text
    textAlign(CENTER, CENTER);
    textSize(11);
    fill(255);
    text(names[i], textX, textY);
  }
}
