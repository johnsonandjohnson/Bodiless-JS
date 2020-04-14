const { parse } = require('content-type');

const isFileResponse = response => {
  const responseContentType = response.headers()['content-type'];
  if (!responseContentType) {
    return true;
  }
  const parsedContentType = parse(responseContentType);
  return parsedContentType['type'] !== 'text/html';;
};

module.exports = isFileResponse;
