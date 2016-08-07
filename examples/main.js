/* eslint-disable no-console */

(function () {
  'use strict';

  var car = {
    start: function (afterStartCallback) {
      // Dispatch `start` event.
      this.dispatchEvent({type: 'start', message: 'Start engines'});
      afterStartCallback && afterStartCallback(this);
    },
    stop: function () {
      // Dispatch `stop` event.
      this.dispatchEvent({type: 'stop', message: 'Stop engines'});
    }
  };

  function startEngines(event) {
    console.log(event.message);
  }

  function stopEngines(event) {
    console.log(event.message);
  }

  // Apply `eventDispatcher` methods to the prototype of the event target.
  eventDispatcher.apply(Object.getPrototypeOf(car));

  // Register event listeners to event target.
  car
    .addEventListener('start', startEngines)
    .addEventListener('afterStart', startEngines)
    .addEventListener('stop', stopEngines);

  // `start` event fires first, then `afterStart` and finally
  // after two seconds `stop` events fires.

  car.start(function (self) {
    // Dispatch `afterStart` event.
    self.dispatchEvent({type: 'afterStart', message: 'Car has started'});
  });

  console.log(car.hasEventListener('start', startEngines));      // -> true
  console.log(car.hasEventListener('afterStart', startEngines)); // -> true
  console.log(car.hasEventListener('stop', startEngines));       // -> false
  console.log(car.hasEventListener('stop', stopEngines));        // -> true

  setTimeout(function () {
    car.stop();

    // Remove all event listeners from event target.
    car
      .removeEventListener('start', startEngines)
      .removeEventListener('afterStart', startEngines)
      .removeEventListener('stop', stopEngines);
  }, 2000);
}());
