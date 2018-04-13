'use strict';

const state = (function() {

  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = (bm) => {
    console.log('addBookmark ran');
    bm.expanded = false;
    state.bookmarks.push(bm);
  };

  const filterBm = () => {
    return state.bookmarks.filter(bm =>
      bm.rating >= state.minRating
    );
  };



  return {
    bookmarks: [],
    minRating: 1,
    serverError: null,
    userError: null,

    addBookmark,
    filterBm,
  };
}());