import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';


describe('Asyn Example ', () => {
  it('Asynchronously test example  with Jasmine done() ', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronously test example  - setTimeout() ', fakeAsync(() => {
    let test = false;
    setTimeout(() => {});
    setTimeout(() => {
      test = true;
      console.log('running assertions setTimeout()');
    }, 1000);
    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain promise ', fakeAsync(() => {
    let test = false;
    console.log('Creating promise');
    /*setTimeout(() => {
      console.log('setTimeout() first callback triggered');
    });
    setTimeout(() => {
      console.log('setTimeout() second callback triggered');
    });*/
    Promise.resolve().then(() => {
      console.log('promise first then() evaluate successfully ');
      // test = true;
      return Promise.resolve();
    }).then(() => {
      console.log('promise second then() evaluate successfully ');
      test = true;
    });
    flushMicrotasks();
    console.log('Running test successfully');

    expect(test).toBeTruthy();
  }));
});
