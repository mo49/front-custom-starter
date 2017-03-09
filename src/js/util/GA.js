import $ from 'jquery';
import { userEvent } from './userEvent';

export default (() => {

  $('.js-facebookButton').on(userEvent.click, () => {
    ga('send', 'event', 'share', 'click', 'facebook');
  });
  $('.js-twitterButton').on(userEvent.click, () => {
    ga('send', 'event', 'share', 'click', 'twitter');
  });
  $('.js-lineButton').on(userEvent.click, () => {
    ga('send', 'event', 'share', 'click', 'line');
  });

})();
