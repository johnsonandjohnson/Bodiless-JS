const fileDownloadHeaders = [
  'application/octet-stream',
  'application/pdf',
  'application/msword',
  'application/zip',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg',
];

const isFileResponse = response => {
  const responseContentType = response.headers()['content-type'];
  return fileDownloadHeaders.includes(responseContentType);
};

module.exports = isFileResponse;
