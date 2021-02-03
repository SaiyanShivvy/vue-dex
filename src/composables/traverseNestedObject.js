// statement to test
function deepIterator(target) {
  if (typeof target === "object") {
    for (const key in target) {
      deepIterator(target[key]);
    }
  } else {
    console.log(target);
  }
}

deepIterator();

const iterate = obj => {
  Object.keys(obj).forEach(key => {
    console.log(`key: ${key}, value: ${obj[key]}`);
    if (typeof obj[key] === "object") {
      iterate(obj[key]);
    }
  });
};

return iterate;

function forEachNested(O, f, cur){
    O = [ O ]; // ensure that f is called with the top-level object
    while (O.length) // keep on processing the top item on the stack
        if(
           !f( cur = O.pop() ) && // do not spider down if `f` returns true
           cur instanceof Object && // ensure cur is an object, but not null 
           [Object, Array].includes(cur.constructor) //limit search to [] and {}
        ) O.push.apply(O, Object.values(cur)); //search all values deeper inside
}