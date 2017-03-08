import $ from 'jquery';
import { userClick } from './userEvent';

export default (() => {

  $('.js-facebookButton').on(userClick, () => {
    ga('send', 'event', 'share', 'click', 'facebook');
  });
  $('.js-twitterButton').on(userClick, () => {
    ga('send', 'event', 'share', 'click', 'twitter');
  });
  $('.js-lineButton').on(userClick, () => {
    ga('send', 'event', 'share', 'click', 'line');
  });

})();
