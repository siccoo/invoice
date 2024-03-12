// let array = [1, 3, 2, 4, 7, 6, 8, 10, 12];

// function* fun(arr) {
//   let i = 0;
//   while (i < arr.length) {
//     yield arr[i++];
//   }
// }

// const A = fun(array);
// console.log(A);

// Implement a function that takes one or more values and returns a function that cycles through those values each time it is called.

// Examples

// const helloFn = cycle('hello');
// console.log(helloFn());
// console.log(helloFn());

// const onOffFn = cycle('on', 'off');
// console.log(onOffFn());
// console.log(onOffFn());
// console.log(onOffFn());



// export default function cycle(...values) {

//     let index = 0;

//   return () => {
//     const currentValue = values[index];
//     index = (index + 1) % values.length;
//     return currentValue;
//   };
// }

// const helloFn = cycle('hello');
// console.log(helloFn());



