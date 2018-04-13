'use strict';
/* global bookmark_app, state, api */

const validation = (function() {

  const validateTitle = (title) => {
    console.log('validateTitle ran');
    if (title.length === 0) {
      $('<span class="error">Must be at least 1 character</span>').insertAfter($('.js-bookmark-title'));
      // state.userError = 'Field is required';
    } else {
      $('.error').remove();
      console.log('remove error');
    }
  };

  const validateUrl = (url) => {
    if (url.length === 0) {

      // state.userError = 'Field is required';
      $('<span class="error">Error</span>').insertAfter($('.js-bookmark-title'));

    }
  };

  const validateDesc = (desc) => {

  };

  const validateRating = (rating) => {

  };

  // const
  return {
    validateTitle,
    validateUrl,
    validateDesc,
    validateRating,

  };
}());