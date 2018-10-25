const promisify = require('util').promisify;

// 1 : display number after 2 seconds

// using callback
function resolveCallback(x) {
  setTimeout(err=>{
    console.log(x);
  }, 1000)
};

// using promise
const resolvePromise = (x) => new Promise( 
  function(res,rej){
    setTimeout(err => {
      if(err){
        rej(err);
      } else {
        res(x);
      }
    }, 1000);
  }
);

// use promisif
util.promisify(

// execute(catch, then의 차이점 구별하기) 
const promise = (x) => new Promise(
  function(res, rej){
    if( x > 0 )
      res(x);
    else
      throw new Error(x);
  }
);

promise(-1).then(
  (x) => console.log(`then ${x}`), 
  (x) => console.log(`reject then ${x}`)
).catch(x => {
  console.log(`catch ${x}`);
  return x;
}).then(x => {
  console.log(`then after catch ${x}`);
});
