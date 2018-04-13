'use strict';
/* global state */

const validation = (function() {

  const validateTitle = (title) => {
    console.log('validateTitle ran');
    if ($('.title-error').length < 1 && title.length === 0) {
      $('<span class="error title-error">Title is required</span>').insertAfter($('.js-bookmark-title'));
      state.userTitleError = true;
    } else if (title.length > 0) {
      $('.title-error').remove();
      state.userTitleError = false;
    }
  };

  const validateUrl = (url) => {
    console.log('validateUrl  ran');
    let urlRegExp = url.match(/http/i);
    if ($('.url-error').length < 1 && !urlRegExp) {
      $('<span class="error url-error">http:// is required</span>').insertAfter($('.js-bookmark-url'));
      state.userUrlError = true
    } else if (urlRegExp) {
      $('.url-error').remove();
      state.userUrlError = false;
    }
  };

  return {
    validateTitle,
    validateUrl,
  };
}());