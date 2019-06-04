import {_createElement} from './util';
import {TweenMax} from 'gsap';

export function useCssClass() {
  const box = _createElement('div', 'box-css');
  box.addEventListener('mouseover', () => _setClass(box, '+=box-css-hover'));
  box.addEventListener('mouseleave', () => _setClass(box, '-=box-css-hover'));
  box.addEventListener('mousedown', () => _setClass(box, '+=box-css-down'));
  box.addEventListener('mouseup', () => _setClass(box, '-=box-css-down'));
}

function _setClass(el, className) {
  TweenMax.to(el, .25, {className});
}
