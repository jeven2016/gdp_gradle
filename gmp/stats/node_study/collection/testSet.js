

let set = new Set();
let x = {
    id:1
};
let y = {
    id:2
};

set.add(x).add(y);

let keys = [...set.keys()];
let values = [...set.values()];
let entries = [...set.entries()];

console.log(keys.length,values.length,entries.length);