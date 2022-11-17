const delay = (time) =>
  new Promise((resolve, reject) => {
    // console.log('Promise created');
    setTimeout(() => {
      console.log('> delay -> setTimeout: ready');
      resolve(123);
    }, time);
  });
//   .then(() => {
//     console.log('Promise then 1');
//   })
//   .then(() => {                                  // выполнить когда resolved
//     console.log('Promise then 2');
//   })
//   .catch(() => {                                 // выполнить когда reject
//     console.log('Promise catch 1');
//   })
//   .finally(() => {                               // выполнить в любом  случае
//     console.log('Promise finally 1');
//   });
// delay.then(() => {
//   console.log('Promise then 3');
// });
export {delay};

