const humanizrr = require('./index');

let text = "";

console.log("======================================================");

for (i = 0; i < 10; i++) {
    text = "Live is like a box of chocolates. You never know what you're gonna get.";
    console.log(humanizrr.typos.make(text, { types: { swap: 0, map: 0.01, duplicate: 0, drop: 0 } }));
}
console.log("======================================================");

text = "Hey 😊! This is a test string with emojis 🚀🔥 and other characters 🎉.";
console.log(text);
console.log(humanizrr.format.all(text));

console.log("======================================================");

text = "Here’s an example — with “quotes” and… special œ characters!";
console.log(text);
console.log(humanizrr.format.all(text));