/* eslint-disable camelcase */
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const showErrorMessage = (message) => {
  $('#error-message').text(message);
  $('#error').show();
};

const hideErrorMessage = () => {
  $('#error').hide();
};

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
      <p>${escape(content.text)}</p>
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
    $('#posted-tweet').prepend($tweet);
  }
};

const submitForm = (event) => {
  event.preventDefault();

  const content = $('#tweet-text').val();
  if (!content) {
    showErrorMessage('Please enter tweet.');
    return;
  }
  if (content.length > 140) {
    showErrorMessage('Limited 140 characters.');
    return;
  }

  const serializedData = $('form').serialize();

  $.post('/tweets', serializedData)
    .then(() => {
      $('#tweet-text').val('');
      hideErrorMessage();
      loadTweets();
    })
    .catch((error) => {
      console.log('Error submitting tweet:', error);
    });
};

const loadTweets = () => {
  $.ajax({
    url: 'http://localhost:3000/tweets',
    method: 'GET',
    dataType: 'json',
  }).done((tweets) => {
    renderTweets(tweets);
  });
};

$(document).ready(() => {
  hideErrorMessage();
  $('form').on('submit', submitForm);
  loadTweets();
});
