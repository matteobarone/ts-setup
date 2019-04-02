import Module from './module';
import '../css/index.css';

function fetchData(): Promise<any> {
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json());
}

function test(): void {
  const instance = new Module();
  console.log(instance.test);

  fetchData().then(res => {
    console.log(res);
  })
}

test();