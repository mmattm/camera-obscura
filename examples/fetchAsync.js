const test = async () => {
  try {
    await sleep(1000);
    console.log("Try Catch example");
  } catch (error) {
    console.log(error);
  }
  console.log("Before sleep");
  await sleep(2000);
  console.log("After sleep");

  return 1;
};

console.log("Before Foo Call");

const testPromise = test();

console.log(testPromise);
testPromise.then(
  (number) => {
    console.log("Ready");
    console.log(number);
    console.log(testPromise);
  },
  (error) => console.log(error)
);

console.log("After Foo Call");
