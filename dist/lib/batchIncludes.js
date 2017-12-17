export default ((strings = [], searchString) => {
  for (let i = 0; i < strings.length; i += 1) {
    const string = strings[i];
    if (searchString.includes(string)) return true;
  }
  return false;
});