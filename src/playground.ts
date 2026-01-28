import humanizrr from "./index";

let text = "";

console.log("======================================================");

for (let i = 0; i < 10; i++) {
    text = "Live is like a box of chocolates. You never know what you're gonna get.";
    console.log(humanizrr.typos.make(text, { types: { swap: 0, map: 0.01, duplicate: 0, drop: 0 } }));
}