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
          <!--<label for="bookmark-desc">Short description (max 140 characters):</label>-->
          <textarea name="bookmark-desc" class="js-bookmark-desc" cols="30" rows="5"></textarea>
          <span id="js-char-count" class="hide">140</span>
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

    const myArr = [
      '<option value="1">1</option>',
      '<option value="2">2</option>',
      '<option value="3">3</option>',
      '<option value="4">4</option>',
      '<option value="5">5</option>',
    ];

    let num = bm.rating;
    const myNewArr = myArr
      .map((str, ind) => {
        let myInd = ind + 1;
        if (myInd === num) {
          let leftPrt = `${str.slice(0, 17)} selected`;
          let rightPrt = `${str.slice(17)}`;
          return leftPrt + rightPrt;
        }
        return str;
      })
      .join('');

    return `
       <article class="flex-item" data-bm-id="${bm.id}">
        <h3>
            <button class='header-button js-collapsible-button' aria-expanded="${bm.expanded}" aria-controls="">${bm.title}</button>
        </h3>
        <div class="${!bm.expanded ? 'hide' : ''} js-collapsible">
            <p class="js-edit-desc">${bm.desc}</p>
            <a href="${bm.url}" class='button-link' target="_blank">Visit Site</a>
            <button class='js-save-button' type="button">Save</button>
            <button class='js-delete-button' type="button">Delete</button>
        </div>
        <div>
            <label for="rating-select">Rating:</label>
            <select id="rating-select" name="rating">
                ${myNewArr}
            </select>
        </div>
        
        
    </article>`;
  };

  const generateBookmarkString = (arr) => {
    const bookmarks = arr.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  // Render bookmark list in the DOM
  const render = () => {
    console.log('`render` ran');
    let bmArr = state.filterBm();
    const bookmarksString = generateBookmarkString(bmArr);
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarksString);
  };

  const handleNewBookmarkSubmit = () => {
    console.log('handleNewBookmarkSubmit ran');
    $('#js-bookmark-form').submit(function (event) {
      event.preventDefault();
      const formHtml = generateBookmarkSubmitForm();
      $('#js-bookmark-form').toggleClass('hide');
      $('.js-header').append(formHtml);
      handleAddBookmarkSubmit();
      handleCancelBookmarkSubmit();
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
      validation.validateTitle(newTitle);
      validation.validateUrl(newUrl);
      if(!state.userTitleError && !state.userUrlError) {
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
            // state.serverError = true;
            render();
          }
        );
      }
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
    $('.js-bookmark-list').on('click', '.js-collapsible-button', function(event) {
      event.stopPropagation();
      const target = $(event.target);
      if (target.attr( 'aria-expanded') === 'true') {
        $(this).attr( 'aria-expanded', 'false');
      } else {
        $(this).attr( 'aria-expanded', 'true');
      }
      const collapsEl = target.parent().next();
      $(collapsEl).toggleClass('hide');
    })
  };

  const getIdFromElement = (bm) => {
    console.log('getIdFromElement ran');
    return $(bm)
      .closest('article')
      .data('bm-id');
  };

  const handleDeleteClicked = () => {
    console.log('handleDeleteClicked ran');
    $('.js-bookmark-list').on('click', '.js-delete-button', event => {
      event.stopPropagation();
      console.log(event.target);
      const id = getIdFromElement(event.target);
      console.log(id);
      api.deleteBookmark(id, () => {
        state.findAndDelete(id);
        render();
      });
    });
  };

  // const handleEditDescMode = () => {
  //   console.log('handleEditDescClicked ran');
  //   $('.js-bookmark-list').on('click', '.js-edit-desc', event => {
  //     event.stopPropagation();
  //     console.log(event.target);
  //     $(event.target).attr('contentEditable', true).focus();
  //     const id = getIdFromElement(event.target);
  //     console.log(id);
  //   });
  // };
  //
  // const handleEditDescUpdate = () => {
  //   console.log('handleEditDescUpdate ran');
  //   $('.js-bookmark-list').on('click', '.js-save-button', event => {
  //     event.stopPropagation();
  //     console.log(event.target);
  //     console.log(event.currentTarget);
  //     console.log('hi');
  //     const val = $(event.currentTarget).find('.js-edit-desc').text();
  //     console.log(val);
  //     render();
  //   });
  // };

  const handleRatingFilter = () => {
    $('#js-rating-filter').change(function(event) {
      state.setMinRating($(event.target).val());
      render();
    });
  };

  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleRatingFilter();
    handleCollapsing();
    handleDeleteClicked();
    // handleEditDescMode();
    // handleEditDescUpdate();
  }

  return {
    handleServerError,
    render,
    bindEventListeners,
  };
}());