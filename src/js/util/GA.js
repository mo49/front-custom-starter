import $ from 'jquery';

export default (() => {

  $('.js-facebookButton').on('click', () => {
    ga('send', 'event', 'share', 'click', 'facebook');
  });
  $('.js-twitterButton').on('click', () => {
    ga('send', 'event', 'share', 'click', 'twitter');
  });
  $('.js-lineButton').on('click', () => {
    ga('send', 'event', 'share', 'click', 'line');
  });

})();
