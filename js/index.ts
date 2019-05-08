import '../css/index.css';
import {map, switchMap} from "rxjs/operators";
import {interval, Observable} from 'rxjs';
import {zip} from 'rxjs/internal/observable/zip';
import {of} from 'rxjs/internal/observable/of';
import {filter} from 'rxjs/internal/operators/filter';

const L = require('leaflet');

const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';

const timer = interval(300);

const quakesObservable = new Observable((observer) => {
  (window as any).eqfeed_callback = (response: any) => {
    observer.next(response);
    observer.complete();
  };
  loadJSONP(QUAKE_URL);
});

function loadJSONP(url) {
  const script = document.createElement('script');
  script.src = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

(() => {
  const quakeMap = L.map('map').setView([33.858631, -118.279602], 7);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(quakeMap);

  quakesObservable.subscribe(res => {
    timer.pipe(
      switchMap((t) => {
        return zip(of(t), of(res));
      }),
      switchMap(([time, quakes]) => {
        const resQuakes = (quakes as any).features;
        return zip(of(time), of(resQuakes));
      }),
      filter(([time, quakes]) => {
        return quakes[time];
      }),
      map(([time, quakes]) => {
        return quakes[time];
      })
    ).subscribe((quake: any) => {
      console.log(quake);
      const coords = quake.geometry.coordinates;
      const size = quake.properties.mag * 10000;
      L.circle([coords[1], coords[0]], size).addTo(quakeMap);
    });
  });
})();
