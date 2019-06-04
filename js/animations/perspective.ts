import {TweenMax} from 'gsap';
import {_createElement} from './util';

export function perspective() {
  document.addEventListener('mousemove', (e) => {
    TweenMax.set(document.body, {perspective: e.x});
  });

  Array.from({length: 30}).forEach(() => {
    const b = _createElement('div', 'box-css');
    if (!TweenMax.isTweening(b)) {
      TweenMax.set(b, {rotationY: '30'});
    }
  });
}
