/* eslint-disable camelcase */

const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;

  const tweetHTML = `
    <article class="tweet-container">
      <header id="posted-tweet-header">
        <div class="tweet-left-header">
          <img src="${user.avatars}" style="width: 3em; height: 3em" />
          <h4 style="padding: 0 0.3em; font-weight: lighter">${user.name}</h4>
        </div>
        <h4 style="padding: 0 0.3em; font-weight: lighter" id="tweet-right-header">
          ${user.handle}
        </h4>
      </header>
      <p>${content.text}</p>
      <footer id="posted-tweet-footer">
        <p id="posted-time" style="font-size: medium;">
          ${timeago.format(new Date(created_at))}
        </p>
        <div class="logo">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-arrows-rotate"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
`;

  return tweetHTML;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#posted-tweet').append($tweet);
  }
};

const submitForm = (event) => {
  event.preventDefault();

  const serializedData = $('form').serialize();
  console.log(serializedData);

  $.post('/tweets', serializedData)
    .then((response) => {
      console.log('Tweet submitted successfully:', response);
    })
    .catch((error) => {
      console.log('Error submitting tweet:', error);
    });
};

const loadTweets = () => {
  $.ajax({
    url: 'http://localhost:3000/tweets',
    method: 'GET',
  }).then((tweets) => {
    renderTweets(tweets);
  });
};

$(document).ready(() => {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  $('form').on('submit', submitForm);

  loadTweets();
});
