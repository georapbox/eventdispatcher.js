(function () {
  'use strict';

  // eventDispatcher.apply
  describe('eventDispatcher.apply', function () {
    it('eventDispatcher methods should be properties of the prototype of the event target', function () { // eslint-disable-line
      var car = Object.create({});
      var proto = Object.getPrototypeOf(car);

      eventDispatcher.apply(proto);

      expect('addEventListener' in proto);
      expect('removeEventListener' in proto);
      expect('hasEventListener' in proto);
      expect('dispatcgEvent' in proto);
    });

    it('should throw TypeError if event target\'s prototype is not extensible', function () {
      var car = Object.create({});
      var proto = Object.getPrototypeOf(car);

      Object.freeze(proto);

      expect(function () {
        return eventDispatcher.apply(proto);
      }).toThrow();
    });

    it('should throw TypeError if event target was created by "Object.create(null)"', function () {
      var car = Object.create(null);
      var proto = Object.getPrototypeOf(car);

      expect(function () {
        return eventDispatcher.apply(proto);
      }).toThrow();
    });
  });

  // eventDispatcher.addEventListener
  describe('eventDispatcher.addEventListener', function () {
    it('should add one or more listeners in event target object', function () {
      var car = Object.create({});

      eventDispatcher.apply(Object.getPrototypeOf(car));

      expect(!('_listeners' in car));

      car.addEventListener('start', function () {});

      expect('_listeners' in car);
    });

    it('should throw TypeError if event target is not extensible', function () {
      var car = Object.create({});
      Object.seal(car);

      eventDispatcher.apply(Object.getPrototypeOf(car));

      expect(function () {
        car.addEventListener('start', function () {});
      }).toThrow();
    });
  });

  // eventDispatcher.hasEventListener
  describe('eventDispatcher.hasEventListener', function () {
    it('should check if event listener exists in event target object', function () {
      var car = Object.create({});

      function onStartHandler() {}

      eventDispatcher.apply(Object.getPrototypeOf(car));

      car.addEventListener('start', onStartHandler);

      expect(car.hasEventListener('start', onStartHandler)).toBe(true);
      expect(car.hasEventListener('start')).toBe(false);
      expect(car.hasEventListener('started', onStartHandler)).toBe(false);
    });
  });

  // eventDispatcher.removeEventListener
  describe('eventDispatcher.removeEventListener', function () {
    it('should remove listener from event target object', function () {
      var car = Object.create({});

      function onStartHandler() {}

      eventDispatcher.apply(Object.getPrototypeOf(car));

      car.addEventListener('start', onStartHandler);

      // first check that listener was successfully registered
      expect(car.hasEventListener('start', onStartHandler)).toBe(true);

      // now remove the listener
      car.removeEventListener('start', onStartHandler);

      expect(car.hasEventListener('start', onStartHandler)).toBe(false);
    });
  });

  // eventDispatcher.dispatchEvent
  describe('eventDispatcher.dispatchEvent', function () {
    it('should dispatch an event at the specified event target', function () {
      var car = {
        start: function () {
          this.dispatchEvent({type: 'start', message: 'Start engines'});
        }
      };

      function onStartHandler(event) {
        expect(event.type).toEqual('start');
        expect(event.message).toEqual('Start engines');
      }

      eventDispatcher.apply(Object.getPrototypeOf(car));

      car.addEventListener('start', onStartHandler);

      car.start();
    });
  });
}());
