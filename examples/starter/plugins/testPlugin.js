module.exports = {
  onPageCreate: (pagePath) => {
    console.log('=========hey from testPlugin========');
    console.log(`received ${pagePath}`);
  }
}