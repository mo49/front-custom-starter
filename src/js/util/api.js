function apiRequest (method, url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: method,
      url: url
    }).done(resolve).fail(reject);
  });
}

function apiGet (url) {
  return apiRequest('get', url);
}

function apiPost (url) {
  return apiRequest('post', url);
}

module.exports = {
  get: apiGet,
  post: apiPost
};
