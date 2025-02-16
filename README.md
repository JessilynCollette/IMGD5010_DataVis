# Overview
This project is a p5.js visualization of some JSON data about Animal Crossing characters. The variables I used from the dataset include a characters Name, Birthday Month, and Personality type. 

## Concept
This code creates a spherical visualization of JSON data about Animal Crossing characters. Represented in a spherical shape are smaller circles with the names of some animal crossing characters (the number can be changed using the numCircles variable in the code). Animal Crossing characters that have the same personality type (e.g. "Cranky" or "Peppy") are connected using Blue lines. Animal Crossing characters that share the same Birthday Month are connected by Green lines. 

## Link to p5.js editor
https://editor.p5js.org/JessilynCollette/sketches/F6QdWyNnf

## Goal / Inspiration
My goalk was to create a type of artwork from visualizing data. i was inspired by visualizations from Michelle Chandra: https://www.michellechandra.com/category/data-visualization/page/2/


## Code
``` p5.js
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

```

## Data
Dataset: https://www.kaggle.com/datasets/nookipedia/animal-crossing-series-villagers

