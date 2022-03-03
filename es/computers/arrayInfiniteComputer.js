'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  return (_typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        }), _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  Object.defineProperty(subClass, 'prototype', { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var InfiniteComputer = require('./infiniteComputer.js'),
  bs = require('../utils/binaryIndexSearch.js');

var ArrayInfiniteComputer = /* #__PURE__ */ (function(_InfiniteComputer) {
  _inherits(ArrayInfiniteComputer, _InfiniteComputer);

  var _super = _createSuper(ArrayInfiniteComputer);

  function ArrayInfiniteComputer(heightData, numberOfChildren) {
    var _this;

    _classCallCheck(this, ArrayInfiniteComputer);

    _this = _super.call(this, heightData, numberOfChildren);
    _this.prefixHeightData = _this.heightData.reduce(function(acc, next) {
      if (acc.length === 0) {
        return [next];
      } else {
        acc.push(acc[acc.length - 1] + next);
        return acc;
      }
    }, []);
    return _this;
  }

  _createClass(ArrayInfiniteComputer, [
    {
      key: 'maybeIndexToIndex',
      value: function maybeIndexToIndex(index) {
        if (typeof index === 'undefined' || index === null) {
          return this.prefixHeightData.length - 1;
        } else {
          return index;
        }
      }
    },
    {
      key: 'getTotalScrollableHeight',
      value: function getTotalScrollableHeight() {
        var length = this.prefixHeightData.length;
        return length === 0 ? 0 : this.prefixHeightData[length - 1];
      }
    },
    {
      key: 'getDisplayIndexStart',
      value: function getDisplayIndexStart(windowTop) {
        var foundIndex = bs.binaryIndexSearch(
          this.prefixHeightData,
          windowTop,
          bs.opts.CLOSEST_HIGHER
        );
        return this.maybeIndexToIndex(foundIndex);
      }
    },
    {
      key: 'getDisplayIndexEnd',
      value: function getDisplayIndexEnd(windowBottom) {
        var foundIndex = bs.binaryIndexSearch(
          this.prefixHeightData,
          windowBottom,
          bs.opts.CLOSEST_HIGHER
        );
        return this.maybeIndexToIndex(foundIndex);
      }
    },
    {
      key: 'getTopSpacerHeight',
      value: function getTopSpacerHeight(displayIndexStart) {
        var previous = displayIndexStart - 1;
        return previous < 0 ? 0 : this.prefixHeightData[previous];
      }
    },
    {
      key: 'getBottomSpacerHeight',
      value: function getBottomSpacerHeight(displayIndexEnd) {
        if (displayIndexEnd === -1) {
          return 0;
        }

        return (
          this.getTotalScrollableHeight() -
          this.prefixHeightData[displayIndexEnd]
        );
      }
    }
  ]);

  return ArrayInfiniteComputer;
})(InfiniteComputer);

module.exports = ArrayInfiniteComputer;
