// let data;
// let angle = 0;
// let fontSize = 21;
// let r = 400;
// let centerX, centerY;

// async function preload() {
//     data = await fetch("./assets/data/words.json").then(response => response.json());
// }

// function setup() {
//     createCanvas(width/2, height)
//     centerX = width / 2;
//     centerY = height / 2;
// }

// function draw() {  
//     background(4, 0, 255)
//     rotateWordList();
//     wordList();
//     fill(0)
// }

// function rotateWordList(){
//     translate(centerX, centerY);
//     rotate(angle);
//     angle+= 0.01
// }

// // function wordList(){
// //     for (let i = 0; i < data.length; i++) {
// //         let a = map(i, 0, data.length, 0, TWO_PI); // Calcola l'angolo per ogni parola in modo che siano distribuite uniformemente in un cerchio
// //         let x = cos(a) * r; // Calcola la posizione x sulla circonferenza
// //         let y = sin(a) * r; // Calcola la posizione y sulla circonferenza
        
// //         push();
// //         translate(x, y);
// //         rotate(a)
// //         fill(255);
// //         textAlign(LEFT, CENTER);
// //         textSize(fontSize);
// //         text(data[i].word, 0, 0);
// //         pop();
// //     }
// // }



// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     centerX = width / 2;
//     centerY = height / 2;
// }