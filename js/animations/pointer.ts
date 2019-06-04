import {TweenMax} from 'gsap';
import {_createElement} from './util';

export function pointer() {
  _createElement('div', 'pointer');
  TweenMax.set('.pointer', {xPercent: -50, yPercent: -50});
  document.addEventListener('mousemove', (e) => {
    const {x, y} = e;
    TweenMax.to('.pointer', .5, {x, y});
  });
}
