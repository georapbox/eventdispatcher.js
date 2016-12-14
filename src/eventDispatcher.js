/**
 * @module eventDispatcher
 * @desc JavaScript events for custom objects
 */
(function (name, context, definition) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    context[name] = definition(name, context);
  }
}('eventDispatcher', this, function (name) {
  'use strict';

  var errors = {
    nonExtensible: 'Cannot apply "' + name + '" on an non extensible object'
  };

  var eventDispatcherPrototype = {
    /**
     * Registers the specified `listener` on the event target it's called on.
     *
     * @function addEventListener
     * @param {String} type A string representing the event type to listen for.
     * @param {function} listener A function to be executed when an event of the specified `type` occurs.
     * @throws {TypeError} If the object that `eventDispatcher` is applied to is not extensible.
     * @return {Object} The `eventDispatcher` object.
     */
    addEventListener: function (type, listener) {
      var listeners;

      if (!Object.isExtensible(this)) {
        throw new TypeError(errors.nonExtensible);
      }

      if (typeof this._listeners === 'undefined') {
        this._listeners = {};
      }

      listeners = this._listeners;

      if (typeof listeners[type] === 'undefined') {
        listeners[type] = [];
      }

      if (listeners[type].indexOf(listener) === - 1) {
        listeners[type].push(listener);
      }

      return this;
    },

    /**
     * Checks if the target object has a `listener` registered on for specific event `type`..
     *
     * @function hasEventListener
     * @param {String} type A string representing the event type.
     * @param {function} listener The event listener to check if registered for the specified event `type`.
     * @return {Boolean} True if target object has `listener` registered for specific event `type`; otherwise false.
     */
    hasEventListener: function (type, listener) {
      var listeners;

      if (typeof this._listeners === 'undefined') {
        return false;
      }

      listeners = this._listeners;

      if (typeof listeners[type] !== 'undefined' && listeners[type].indexOf(listener) !== - 1) {
        return true;
      }

      return false;
    },

    /**
     * Removes the previously registered event `listener` from the event target.
     *
     * @function removeEventListener
     * @param {String} type A string representing the event type to remove.
     * @param {function} listener The event listener function to remove from the event target.
     * @return {Object} The `eventDispatcher` object.
     */
    removeEventListener: function (type, listener) {
      var listeners, listenerArray, index;

      if (typeof this._listeners === 'undefined') {
        return;
      }

      listeners = this._listeners;
      listenerArray = listeners[type];

      if (typeof listenerArray !== 'undefined') {
        index = listenerArray.indexOf(listener);

        if (index !== - 1) {
          listenerArray.splice(index, 1);
        }
      }

      return this;
    },

    /**
     * Dispatches an event at the specified event target.
     *
     * @function dispatchEvent
     * @param {Object} event The event object to be dispatched.
     * @return {Object} The `eventDispatcher` object.
     */
    dispatchEvent: function (event) {
      var listeners, listenerArray, i, length;

      if (typeof this._listeners === 'undefined') {
        return;
      }

      listeners = this._listeners;
      listenerArray = listeners[event.type];

      if (typeof listenerArray !== 'undefined') {
        event.target = this;

        length = listenerArray.length;

        for (i = 0; i < length; i += 1) {
          listenerArray[i].call(this, event);
        }
      }

      return this;
    }
  };

  var eventDispatcher = Object.create(eventDispatcherPrototype, {
    apply: {
      /**
       * Applies the `eventDispatcher` prototype methods to the event target.
       *
       * @function apply
       * @param {Object} object The event target object.
       * @throws {TypeError} If the object that `eventDispatcher` is applied to is not extensible.
       * @return {Object} The `eventDispatcher` object.
       */
      value: function applyEventDispatcher(object) {
        if (!Object.isExtensible(object)) {
          throw new TypeError(errors.nonExtensible);
        }

        object.addEventListener = eventDispatcherPrototype.addEventListener;
        object.hasEventListener = eventDispatcherPrototype.hasEventListener;
        object.removeEventListener = eventDispatcherPrototype.removeEventListener;
        object.dispatchEvent = eventDispatcherPrototype.dispatchEvent;

        return this;
      }
    }
  });

  return eventDispatcher;
}));
