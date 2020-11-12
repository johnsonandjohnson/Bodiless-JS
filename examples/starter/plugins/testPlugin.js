module.exports = {
  onPageCreate: ({
    document,
    pagePath,
    api,
  }) => {
    const $ = document;
    console.log(pagePath);
    console.log($('head').html());
    console.log($('body').html());
  }
}