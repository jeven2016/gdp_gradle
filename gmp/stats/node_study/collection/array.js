let arr = Array.of(1, 2, 3, 4);

console.log(arr.length);

console.dir(Array);
console.log('sum=' + arr.reduce((numA, numB)=> {
        return numA + numB
    }));

let arr2 = arr.slice(1, 3);
console.log("arr2=" + arr2.join(","));

let concatArray = arr.concat(arr2);
console.log("concatArray=" + concatArray.join(","));

// The splice() method adds/removes items to/from an array,
// and returns the removed item(s).
//array.splice(index,howmany,item1,.....,itemX)
//remove 3 items from existing array and
//add two items then from the position where 3 items is removed from
let spliceArray = concatArray.splice(0, 3, 'item1', 'item2');
console.log(`spliceArray=${spliceArray.join(",")}`);//print the removed items
console.log("new concatArray=" + concatArray.join(","));//print the existing array

//unshift
//Add new items to the beginning of an array:
arr.unshift('ua1','ua2');
console.log("unshiftArray=" + arr.join(","));

//filter:
// Return an array of all the values in the ages array that are 18 or over:
let ageArray= [25,2,34,20,11,16,17];
let filteredArray = ageArray.filter((value,index,arr)=>{
    return value > 18;
});
console.log("filteredArray=" + filteredArray.join(","));

//shift
//Remove the first item of an array: