/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {

  const $tweet = $(`
  <article>
  <div class="username">
  <h4>${tweetData.user.handle}</h4> 
  </div>
  <div class="top-row">
      <img src="${tweetData.user.avatars}" />
        <h4>${tweetData.user.name}</h4>
  </div>
  <div class="wrap">
  <h4 class="test">${escape(tweetData.content.text)}</h4>
  </div>
  <hr>
  <div class="bot-row">
      <h6 class="date-tweet">${getDate(tweetData.created_at)}</h6>
      <div class="socials">
          <img src="https://www.flaticon.com/svg/static/icons/svg/25/25669.svg" alt="report tweet">
          <img src="https://www.flaticon.com/svg/static/icons/svg/59/59528.svg" alt="respond to tweet">
          <img src="https://www.flaticon.com/svg/static/icons/svg/535/535234.svg" alt="like">
      </div>
  </div>
</article>
  `);

  $(".user-tweets").prepend($tweet);
};

// I took this from stack overflow!! I understand the idea its just a bit overwhelming!
const getDate = milliseconds => {
  const datePosted = new Date(milliseconds);
  const dateNow = new Date().getTime();
  const time = Math.abs(dateNow - datePosted);
  let sum;
  if (time < 1000 * 60) {
    sum = Math.floor(time / (1000));
    unit = "S";
  } else if (time < 1000 * 60 * 60) {
    sum = Math.floor(time / (1000 * 60));
    unit = "m";
  } else if (time < 1000 * 60 * 60 * 60) {
    sum = Math.floor(time / (1000 * 60 * 60));
    unit = "h";
  } else {
    sum = Math.floor(time / (1000 * 60 * 60 * 60));
    unit = "d";
  }
  return `${sum} ${unit}`;
};

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = (tweetData) => {
  $(".user-tweets").empty();
  for (const item of tweetData) {
    createTweetElement(item);
  }
};

$(document).ready(function() {
  // $(".container").prepend(`<h1>HELLOS</h1>`);
  $('.prevent').submit(function(event) {
    const text = $(this).serialize();
    const currentLength = $("#tweet-text").val().length;
    event.preventDefault();

    if (currentLength > 140) {
      $('.error-msg').slideDown();
    } else if ((currentLength === 0)) {
      $('.error-msg').slideDown();

    } else {
      $('#tweet-text').val('');
      $(".counter").text("140");
      $(".counter").removeClass("max-characters");
      $('.error-msg').slideUp();

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: text
      })
        .then(function() {
          loadTweets();
        })
        .catch(function(error) {
          console.log("Submit error", error);
        });
    }
  });

  const loadTweets = function() {
    $.ajax('/tweets') // ajax ={ method: 'GET' } by default this still works if we remove { method: 'GET' } and just pass the path!
      .then(function(data) { // SHOULD I Call this function AGAIN in the  submit post req??
        // console.log('Success: ', data);
        renderTweets(data);
      })
      .catch(function(error) {
        console.log("Load Tweets error", error);
      });
  };
  loadTweets();

});