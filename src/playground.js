const humanizrr = require('./index');

console.log("======================================================");

for (i = 0; i < 10; i++) {
    const text = "Live is like a box of chocolates. You never know what you're gonna get.";
    console.log(humanizrr.typos.make(text, { types: { swap: 0, map: 0.01, duplicate: 0, drop: 0 } }));
}
console.log("======================================================");

const text = "Hey 😊! This is a test string with emojis 🚀🔥 and other characters 🎉.";
console.log(humanizrr.format.all(text));