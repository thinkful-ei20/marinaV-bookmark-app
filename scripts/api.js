'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/marinaV';

  const getBookmarks = (onSuccess, onError) => {
    console.log('getBookmarks ran');
    const settings = {
      url: BASE_URL + '/bookmarks',
      dataType: 'json',
      success: onSuccess,
      error: onError,
    };
    $.ajax(settings);
  };

  const createBookmark = (title, url, desc, rating, onSuccess, onError) => {
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ title, url, desc, rating }),
      success: onSuccess,
      error: onError,
    });
  };

  // const updateItem = function(id, updateData, callback) {
  //   $.ajax({
  //     url: BASE_URL + '/items/' + id,
  //     method: 'PATCH',
  //     contentType: 'application/json',
  //     data: JSON.stringify(updateData),
  //     success: callback
  //   });
  // };

  const deleteBookmark = function(id, onSuccess, onError) {
    console.log('deleteBookmark ran');
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: onSuccess,
      error: onError
    });
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
}());