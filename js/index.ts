import '../css/index.css';
import {Observable} from "rxjs/index";
import {distinct, switchMap} from "rxjs/internal/operators";
import { interval } from 'rxjs';
const L = require('leaflet');

const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';

const quakesObservable = new Observable((observer) => {
  (window as any).eqfeed_callback = (response: any) => {
    observer.next(response);
    observer.complete();
  };
  loadJSONP(QUAKE_URL);
});

const quakes = interval(2000).pipe(
  switchMap(() => quakesObservable),
  switchMap((res: any) => res.features),
  distinct((quake: any) => quake.properties.code),
);

function loadJSONP(url) {
  const script = document.createElement('script');
  script.src = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

(() => {
  const map = L.map('map').setView([33.858631, -118.279602], 7);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

  quakes.subscribe((quake: any) => {
    const coords = quake.geometry.coordinates;
    const size = quake.properties.mag * 10000;
    L.circle([coords[1], coords[0]], size).addTo(map);
  });
})();