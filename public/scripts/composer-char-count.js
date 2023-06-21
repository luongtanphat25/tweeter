$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const maxLength = 140;
    let currentLength = $(this).val().length;

    let remainingLength = maxLength - currentLength;
    const counterText = $('output[name="counter"]');
    counterText.text(remainingLength);

    counterText.css('color', remainingLength < 0 ? 'red' : '');
  });
});
