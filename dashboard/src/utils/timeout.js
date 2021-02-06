export function wait(timeInMilliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, timeInMilliseconds);
  });
}
