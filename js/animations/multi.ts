import {_createElement} from './util';
import {TweenMax} from 'gsap';

export function multi() {
  const divs = Array.from({length: 100}, () => {
    return _createElement('div', '');
  });

  divs.forEach((div) => {
    TweenMax.set(div, {
      position: 'absolute',
      x: `${Math.random() * window.innerWidth}px`,
      y: `${Math.random() * window.innerHeight}px`,
      width: 20,
      height: 20,
      backgroundColor: 'green',
      border: '2px solid gray',
    });
  });

  TweenMax.to(divs, 10, {x: 100, y: 100});

  document.addEventListener('click', (e) => {
    // TweenMax.killTweensOf(e.target); // termina l'animazione dell'elemento cliccato
    TweenMax.killAll(); // termina l'animazione e si fermano tutti allo stato in cui si trovano
    // TweenMax.killAll(true); // termina l'animazione e si fermano tutti allo stato finale dell'animazione
  })
}

