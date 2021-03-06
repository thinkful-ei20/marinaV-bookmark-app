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
    if (newRating === 'Minimum rating') {
      state.minRating = 1;
    } else {
      state.minRating = newRating;
    }
  };

  const updateDesc = () => {
    console.log('updateDesc ran');
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
    userTitleError: false,
    userUrlError: false,

    addBookmark,
    findAndDelete,
    setMinRating,
    updateDesc,
    filterBm,
  };
}());