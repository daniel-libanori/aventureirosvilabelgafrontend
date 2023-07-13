export function returnMissingNumberOrNext(array) {
    array.sort((a, b) => {
      return a - b;
    });
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== array[i + 1] - 1) {
        return array[i] + 1;
      }
    }

    return array[array.length - 1] + 1;
}