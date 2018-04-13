'use strict';

/* global bookmark_app, state, api */

$(document).ready(function() {
  bookmark_app.bindEventListeners();
  // shoppingList.render();
  api.getBookmarks((bm) => {
    bm.forEach((bm) => state.addBookmark(bm));
    bookmark_app.render();
  }, bookmark_app.handleServerError);
});