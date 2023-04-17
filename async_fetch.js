const test = async () => {
  // try {
  //   await sleep(1000);
  //   console.log("test 2");
  // } catch (error) {
  //   console.log(error);
  // }
  console.log("test");
  await sleep(2000);
  console.log("test");
  // console.log("aa");

  return 1;
  // console.log(Math.random(1000));
};

console.log("Before Foo Call");

const testPromise = test();

console.log(testPromise);
testPromise.then(
  (number) => {
    console.log("ready");
    console.log(number);
    console.log(testPromise);
  },
  (error) => console.log(error)
);

console.log("After Foo Call");
