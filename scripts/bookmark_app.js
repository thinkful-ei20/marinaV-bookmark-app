'use strict';

/* global state, api, validation */


const bookmark_app = (function() {
  const handleServerError = (e) => {
    console.log(e);
  };

  const handleUserError = (e) => {
    console.log(e);
  };

  // Return HTML string for new bookmark submit event
  const generateBookmarkSubmitForm = () => {
    console.log('generateBookmarkSubmitForm ran');
    return `
      <form id="js-bookmark-submit-form" action>
        <fieldset>
          <legend>Create a Bookmark</legend>
          <label for="bookmark-title">Title:</label>
          <input type="text" name="bookmark-title" class="js-bookmark-title" placeholder="Bookmark Title" required>
          <label for="bookmark-url">Site url:</label>
          <input type="text" name="bookmark-url" class="js-bookmark-url" placeholder="www.site-url.com" required>
          <label for="bookmark-desc">Short description (max 140 characters):</label>
          <textarea name="bookmark-desc" class="js-bookmark-desc" cols="30" rows="5"></textarea>
          <span id="js-char-count" class="hide">140</span>
          <!--<input type="text" name="bookmark-desc" class="js-bookmark-desc" placeholder="Bookmark description">-->
          <button type="submit">Add new</button>
          <button id='js-bttn-cancel-submit' type="button">Cancel</button>
          <label for="rating-select">Rating:</label>
          <select id="rating-select" name="rating">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
         </fieldset>
      </form>`;
  };

  const generateBookmarkElement = (bm) => {
    console.log('generateBookmarkElement ran');
    // let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    // if (!item.checked) {
      //itemTitle = `<!---->
        <!--<form class="js-edit-item">-->
          <!--<input class="shopping-item type="text" value="" />-->
        //<!--</form>-->
      // `;
    // }
    // let hideClass;
    //
    // if (bm.expanded) {
    //   hideClass = 'hide';
    // }


    return `
       <article>
        <h3>
            <button class='js-collapsible' aria-expanded="${bm.expanded}" aria-controls="">${bm.title}</button>
        </h3>
        <div class="${!bm.expanded ? 'hide' : ''} js-collapsible">
            <p>${bm.desc}</p>
            <a href="${bm.url}" class='button-link' target="_blank">Visit Site</a>
            <!--<button type="button">Visit Site</button>-->
        </div>
        <label for="rating-select">Rating:</label>
            <select id="rating-select" name="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
    </article>`;
  };

  const generateBookmarkString = (arr) => {
    const bookmarks = arr.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  // Render bookmark list in the DOM
  function render() {
    console.log('`render` ran');
    let bmArr = state.filterBm();

    const bookmarksString = generateBookmarkString(bmArr);

    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarksString);
  }


  const handleNewBookmarkSubmit = () => {
    console.log('handleNewBookmarkSubmit ran');
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
      const formHtml = generateBookmarkSubmitForm();
      $('#js-bookmark-form').toggleClass('hide');
      $('.js-header').append(formHtml);
      handleAddBookmarkSubmit();
      handleCancelBookmarkSubmit();
      // const newItemName = $('.js-shopping-list-entry').val();
      // $('.js-shopping-list-entry').val('');
      // api.createItem(newItemName,
      //   (newItem) => {
      //     store.addItem(newItem);
      //     render();
      //   },
      //   (err) => {
      //     console.log(err);
      //     store.setError(err);
      //     render();
      //   }
      // );
    });
  };

  const handleAddBookmarkSubmit = () => {
    console.log('handleAddBookmarkSubmit ran');
    $('#js-bookmark-submit-form').submit(function (event) {
      event.preventDefault();
      const newTitle = $('.js-bookmark-title').val().trim();
      const newUrl = $('.js-bookmark-url').val().trim();
      const newDesc = $('.js-bookmark-desc').val().trim();
      const newRating = $('#rating-select').val().trim();
      console.log(newTitle, newUrl, newDesc, newRating);
      validation.validateTitle(newTitle);
      api.createBookmark(newTitle, newUrl, newDesc, newRating,
        (newBookmark) => {
          console.log(newBookmark);
          state.addBookmark(newBookmark);
          $('#js-bookmark-form').toggleClass('hide');
          $('#js-bookmark-submit-form').remove();
          render();
        },
        (err) => {
          console.log(err);
          // store.setError(err);
          render();
        }
      );
    });
  };

  // Remove 'Create a bookmark' view on 'cancel'. Display 'Bookmark form'
  const handleCancelBookmarkSubmit = () => {
    console.log('handleCancelBookmarkSubmit ran');
    $('#js-bttn-cancel-submit').click((e) => {
      $('#js-bookmark-submit-form').remove();
      $('#js-bookmark-form').toggleClass('hide');
    });
  };

  const handleCollapsing = () => {
    console.log('handleCollapsing ran');
    $('.js.js-bookmark-list').on('click', 'js-collapsible', function(event) {
     const foo = event.currentTarget;
     console.log(foo);
     $('.js-collapsible').toggleClass('hide');

    })
  };


  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleCollapsing();
  }

  return {
    handleServerError,
    handleUserError,
    render,
    handleCollapsing,
    bindEventListeners,
  };
}());