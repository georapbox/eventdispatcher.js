# eventDispatcher

JavaScript events for custom objects

[![Build Status](https://travis-ci.org/georapbox/eventdispatcher.js.svg?branch=master)](https://travis-ci.org/georapbox/eventdispatcher.js)
[![npm version](https://badge.fury.io/js/eventdispatcher.js.svg)](http://badge.fury.io/js/eventdispatcher.js)
[![devDependency Status](https://david-dm.org/georapbox/eventdispatcher.js/dev-status.svg)](https://david-dm.org/georapbox/eventdispatcher.js#info=devDependencies)
[![Dependencies](https://david-dm.org/georapbox/eventdispatcher.js.svg?theme=shields.io)](https://david-dm.org/georapbox/eventdispatcher.js)

## Install

### npm

```bash
$ npm install gr-event-dispatcher
```


## API

* [eventDispatcher](#module_eventDispatcher)
    * [~addEventListener(type, listener)](#module_eventDispatcher..addEventListener) ⇒ <code>Object</code>
    * [~hasEventListener(type, listener)](#module_eventDispatcher..hasEventListener) ⇒ <code>Boolean</code>
    * [~removeEventListener(type, listener)](#module_eventDispatcher..removeEventListener) ⇒ <code>Object</code>
    * [~dispatchEvent(event)](#module_eventDispatcher..dispatchEvent) ⇒ <code>Object</code>
    * [~apply(object)](#module_eventDispatcher..apply) ⇒ <code>Object</code>

<a name="module_eventDispatcher..addEventListener"></a>

### eventDispatcher~addEventListener(type, listener) ⇒ <code>Object</code>
Registers the specified `listener` on the event target it's called on.

**Kind**: inner method of <code>[eventDispatcher](#module_eventDispatcher)</code>  
**Returns**: <code>Object</code> - The `eventDispatcher` object.  
**Throws**:

- <code>TypeError</code> If the object that `eventDispatcher` is applied to is not extensible.


| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | A string representing the event type to listen for. |
| listener | <code>function</code> | A function to be executed when an event of the specified `type` occurs. |

<a name="module_eventDispatcher..hasEventListener"></a>

### eventDispatcher~hasEventListener(type, listener) ⇒ <code>Boolean</code>
Checks if the target object has a `listener` registered on for specific event `type`.

**Kind**: inner method of <code>[eventDispatcher](#module_eventDispatcher)</code>  
**Returns**: <code>Boolean</code> - True if target object has `listener` registered for specific event `type`; otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | A string representing the event type. |
| listener | <code>function</code> | The event listener to check if registered for the specified event `type`. |

<a name="module_eventDispatcher..removeEventListener"></a>

### eventDispatcher~removeEventListener(type, listener) ⇒ <code>Object</code>
Removes the previously registered event `listener` from the event target.

**Kind**: inner method of <code>[eventDispatcher](#module_eventDispatcher)</code>  
**Returns**: <code>Object</code> - The `eventDispatcher` object.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | A string representing the event type to remove. |
| listener | <code>function</code> | The event listener function to remove from the event target. |

<a name="module_eventDispatcher..dispatchEvent"></a>

### eventDispatcher~dispatchEvent(event) ⇒ <code>Object</code>
Dispatches an event at the specified event target.

**Kind**: inner method of <code>[eventDispatcher](#module_eventDispatcher)</code>  
**Returns**: <code>Object</code> - The `eventDispatcher` object.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | The event object to be dispatched. |

<a name="module_eventDispatcher..apply"></a>

### eventDispatcher~apply(object) ⇒ <code>Object</code>
Applies the `eventDispatcher` prototype methods to the event target.

**Kind**: inner method of <code>[eventDispatcher](#module_eventDispatcher)</code>  
**Returns**: <code>Object</code> - The `eventDispatcher` object.  
**Throws**:

- <code>TypeError</code> If the object that `eventDispatcher` is applied to is not extensible.


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The event target object. |


## Example

```js
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
```
