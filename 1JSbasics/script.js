//Fundamental of JS
//arrays :: forEach , map , filter

var arr = [1, 2, 3, 4];

arr.forEach(function (val) {
  console.log(val + "Hello");
});

var newarr = arr.map(function (val) {
  return val + 12;
});
console.log(newarr);

var newarr2 = arr.filter(function (val) {
  if (val > 3) {
    return true;
  }
});
console.log(newarr2);

var ans = arr.find(function (val) {
  if (val === 2) {
    return val;
  }
});
console.log(ans);

var ans2 = arr.indexOf(1);
console.log(ans2);

//objects key:value pairs

var obj = {
  name: "mayank",
  age: 12,
};

Object.freeze(obj); //cannot change object value
console.log(obj.name);

//async JS

async function abcd() {
  var blob = await fetch(`https://randomuser.me/api/`);
  var ans = await blob.json();
  console.log(ans);
}

abcd();
