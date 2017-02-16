import $ from 'jquery';
import Modal from './Modal';

// -----------------------------------
// 初回訪問時の処理
// -----------------------------------
export function initialVisit() {

  new Modal({
    $modal: $('#initialVisitModal'),
    $openButton: $('.js-initialVisitModalOpenButton'),
    $toggleButton: $('.js-initialVisitModalToggleButton'),
    isAutoOpen: true,
    fadeDuration: 0
  });

}
