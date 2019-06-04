import {_createElement} from './util';
import {TweenMax} from 'gsap';
import {TimelineMax} from 'gsap';

export function time() {
  _createElement('div', 'box');
  TweenMax.set('.box', {
    width: '50px',
    height: '50px',
    backgroundColor: 'green',
    x: '50px',
    y: '50px',
  });

  const timeline = new TimelineMax({repeat: -1});
  timeline.pause();

  timeline
    .to('.box', .5, {x: 100})
    .to('.box', .5, {y: 100})
    .to('.box', .5, {x: 50})
    .to('.box', .5, {y: 50});

  document.querySelector('.box').addEventListener('click', () => {
    timeline.isActive() ? timeline.pause() : timeline.resume();
  });

  document.addEventListener('wheel', (e) => {
    const newProgress = (e as any).wheelDelta > 0 ? '+=0.05' : '-=0.05';
    TweenMax.to(timeline, .25, {progress: newProgress});
  });
}
