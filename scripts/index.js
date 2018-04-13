'use strict';

/* global bookmark_app, api */

$(document).ready(function() {
  bookmark_app.bindEventListeners();
  api.getBookmarks((bm) => {
    bm.forEach((bm) => state.addBookmark(bm));
    bookmark_app.render();
  }, bookmark_app.handleServerError);
});