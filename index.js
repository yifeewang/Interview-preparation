const obj = [1,2,3,4];
  
  const proxy = new Proxy(obj, {
    get: function (target, propKey) {
      console.log(`Getting the value of ${propKey}`);
      return target[propKey];
    },
  
    set: function (target, propKey, value) {
      console.log(`Setting the value of ${propKey}`);
      target[propKey] = value;
      return true;
    },
  });
  
  console.log(proxy[1]); //Getting the value of name, "Tom"
  proxy[0] = 18; //Setting the value of age
  console.log(proxy[0]); 
  console.log(proxy); 
