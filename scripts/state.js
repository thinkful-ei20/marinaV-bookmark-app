'use strict';

const state = (function() {

  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = (bm) => {
    console.log('addBookmark ran');
    bm.expanded = false;
    state.bookmarks.splice(0, 0, bm);
  };

  const findAndDelete = (id) => {
    console.log('findAndDelete ran');
    state.bookmarks = state.bookmarks.filter(bm => bm.id !== id);
  };

  const setMinRating = (newRating) => {
    console.log('setMinRating ran');
    console.log(newRating);
    state.minRating = newRating;
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
    findAndDelete,
    setMinRating,
    filterBm,
  };
}());