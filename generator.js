// function properFractions(n){
//     //your code here
//     let res = 0;
//     if(n === 1 ) return 0;
//     for (let i =0;i<n;i++) {
//       if(gcd(i, n) === 1) {
//         res++;
//       }
//     }
//     function gcd(a,b){
//       return b ? gcd(b, a%b) : a;
//     };
//     return res;
//   }

//   console.log(properFractions(6637344));
function* hello() {
  yield 'hello';
  yield 'world';
  return 'end';
}

var hw = hello();
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    console.log(reset);
    if(reset) { i = -1; }
  }
}

var g = f();

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.next(true)) // { value: 0, done: false }

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
