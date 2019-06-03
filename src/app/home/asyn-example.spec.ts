import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';



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
  it('Asynchronous test - promise + setTimeout()', fakeAsync(() => {
    let counter = 0;
    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => {
          counter += 1;
        }, 1000);
      });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it('Asynchronous - observable', fakeAsync(() => {
    let test = false;
    console.log('Creating observables');
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log('Running test Assertions');
    expect(test).toBe(true);
  }));

});
