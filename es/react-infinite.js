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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var React = global.React || require('react');

var PropTypes = global.PropTypes || require('prop-types');

var window = require('./utils/window');

require('./utils/establish-polyfills');

var scaleEnum = require('./utils/scaleEnum');

var infiniteHelpers = require('./utils/infiniteHelpers');

var _isFinite = require('lodash.isfinite');

var checkProps = require('./utils/checkProps');

var Infinite = /* #__PURE__ */ (function(_React$Component) {
  _inherits(Infinite, _React$Component);

  var _super = _createSuper(Infinite);

  function Infinite(_props) {
    var _this;

    _classCallCheck(this, Infinite);

    _this = _super.call(this, _props);

    _defineProperty(
      _assertThisInitialized(_this),
      'shouldAttachToBottom',
      false
    );

    _defineProperty(_assertThisInitialized(_this), 'preservedScrollState', 0);

    _defineProperty(_assertThisInitialized(_this), 'loadingSpinnerHeight', 0);

    _defineProperty(
      _assertThisInitialized(_this),
      'generateComputedUtilityFunctions',
      function(props) {
        var utilities = {};

        utilities.getLoadingSpinnerHeight = function() {
          var loadingSpinnerHeight = 0;

          if (_this.loadingSpinner) {
            loadingSpinnerHeight = _this.loadingSpinner.offsetHeight || 0;
          }

          return loadingSpinnerHeight;
        };

        if (props.useWindowAsScrollContainer) {
          utilities.subscribeToScrollListener = function() {
            window.addEventListener('scroll', _this.infiniteHandleScroll);
          };

          utilities.unsubscribeFromScrollListener = function() {
            window.removeEventListener('scroll', _this.infiniteHandleScroll);
          };

          utilities.nodeScrollListener = function() {};

          utilities.getScrollTop = function() {
            return window.pageYOffset;
          };

          utilities.setScrollTop = function(top) {
            window.scroll(window.pageXOffset, top);
          };

          utilities.scrollShouldBeIgnored = function() {
            return false;
          };

          utilities.buildScrollableStyle = function() {
            return {};
          };
        } else {
          utilities.subscribeToScrollListener = function() {};

          utilities.unsubscribeFromScrollListener = function() {};

          utilities.nodeScrollListener = _this.infiniteHandleScroll;

          utilities.getScrollTop = function() {
            return _this.scrollable ? _this.scrollable.scrollTop : 0;
          };

          utilities.setScrollTop = function(top) {
            if (_this.scrollable) {
              _this.scrollable.scrollTop = top;
            }
          };

          utilities.scrollShouldBeIgnored = function(event) {
            return event.target !== _this.scrollable;
          };

          utilities.buildScrollableStyle = function() {
            return Object.assign(
              {},
              {
                height: _this.computedProps.containerHeight,
                overflowX: 'hidden',
                overflowY: 'scroll',
                WebkitOverflowScrolling: 'touch'
              },
              _this.computedProps.styles.scrollableStyle || {}
            );
          };
        }

        return utilities;
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'recomputeInternalStateFromProps',
      function(props) {
        checkProps(props);
        var computedProps = infiniteHelpers.generateComputedProps(props);

        var utils = _this.generateComputedUtilityFunctions(props);

        var newState = {};
        newState.numberOfChildren = React.Children.count(
          computedProps.children
        );
        newState.infiniteComputer = infiniteHelpers.createInfiniteComputer(
          computedProps.elementHeight,
          computedProps.children
        );

        if (computedProps.isInfiniteLoading !== undefined) {
          newState.isInfiniteLoading = computedProps.isInfiniteLoading;
        }

        newState.preloadBatchSize = computedProps.preloadBatchSize;
        newState.preloadAdditionalHeight =
          computedProps.preloadAdditionalHeight;
        newState = Object.assign(
          newState,
          infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(
            newState,
            utils.getScrollTop()
          )
        );
        return {
          computedProps: computedProps,
          utils: utils,
          newState: newState
        };
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'infiniteHandleScroll',
      function(e) {
        if (_this.utils.scrollShouldBeIgnored(e)) {
          return;
        }

        _this.computedProps.handleScroll(_this.scrollable);

        _this.handleScroll(_this.utils.getScrollTop());
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'manageScrollTimeouts',
      function() {
        // Maintains a series of timeouts to set this.state.isScrolling
        // to be true when the element is scrolling.
        if (_this.state.scrollTimeout) {
          clearTimeout(_this.state.scrollTimeout);
        }

        var that = _assertThisInitialized(_this),
          scrollTimeout = setTimeout(function() {
            that.setState({
              isScrolling: false,
              scrollTimeout: undefined
            });
          }, _this.computedProps.timeScrollStateLastsForAfterUserScrolls);

        _this.setState({
          isScrolling: true,
          scrollTimeout: scrollTimeout
        });
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'getLowestPossibleScrollTop',
      function() {
        return (
          _this.state.infiniteComputer.getTotalScrollableHeight() -
          _this.computedProps.containerHeight
        );
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'hasAllVisibleItems',
      function() {
        return !(
          _isFinite(_this.computedProps.infiniteLoadBeginEdgeOffset) &&
          _this.state.infiniteComputer.getTotalScrollableHeight() <
            _this.computedProps.containerHeight
        );
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'passedEdgeForInfiniteScroll',
      function(scrollTop) {
        var edgeOffset = _this.computedProps.infiniteLoadBeginEdgeOffset;

        if (typeof edgeOffset !== 'number') {
          return false;
        }

        if (_this.computedProps.displayBottomUpwards) {
          return !_this.shouldAttachToBottom && scrollTop < edgeOffset;
        } else {
          return (
            scrollTop >
            _this.state.infiniteComputer.getTotalScrollableHeight() -
              _this.computedProps.containerHeight -
              edgeOffset
          );
        }
      }
    );

    _defineProperty(
      _assertThisInitialized(_this),
      'onInfiniteLoad',
      function() {
        _this.setState({
          isInfiniteLoading: true
        });

        _this.computedProps.onInfiniteLoad();
      }
    );

    _defineProperty(_assertThisInitialized(_this), 'handleScroll', function(
      scrollTop
    ) {
      _this.shouldAttachToBottom =
        _this.computedProps.displayBottomUpwards &&
        scrollTop >= _this.getLowestPossibleScrollTop();

      _this.manageScrollTimeouts();

      var newApertureState = infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(
        _this.state,
        scrollTop
      );

      if (
        _this.passedEdgeForInfiniteScroll(scrollTop) &&
        !_this.state.isInfiniteLoading
      ) {
        _this.setState(Object.assign({}, newApertureState));

        _this.onInfiniteLoad();
      } else {
        _this.setState(newApertureState);
      }
    });

    var nextInternalState = _this.recomputeInternalStateFromProps(_props);

    _this.computedProps = nextInternalState.computedProps;
    _this.utils = nextInternalState.utils;
    _this.shouldAttachToBottom = _props.displayBottomUpwards;
    var state = nextInternalState.newState;
    state.scrollTimeout = undefined;
    state.isScrolling = false;
    _this.state = state;
    return _this;
  } // Properties currently used but which may be
  // refactored away in the future.

  _createClass(
    Infinite,
    [
      {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var nextInternalState = this.recomputeInternalStateFromProps(
            nextProps
          );
          this.computedProps = nextInternalState.computedProps;
          this.utils = nextInternalState.utils;
          this.setState(nextInternalState.newState);
        }
      },
      {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
          if (this.props.displayBottomUpwards) {
            this.preservedScrollState =
              this.utils.getScrollTop() - this.loadingSpinnerHeight;
          }
        }
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
          this.loadingSpinnerHeight = this.utils.getLoadingSpinnerHeight();

          if (
            !prevProps.useWindowAsScrollContainer &&
            this.props.useWindowAsScrollContainer
          ) {
            this.utils.subscribeToScrollListener();
          }

          if (this.props.displayBottomUpwards) {
            var lowestScrollTop = this.getLowestPossibleScrollTop();

            if (
              this.shouldAttachToBottom &&
              this.utils.getScrollTop() < lowestScrollTop
            ) {
              this.utils.setScrollTop(lowestScrollTop);
            } else if (
              prevProps.isInfiniteLoading &&
              !this.props.isInfiniteLoading
            ) {
              this.utils.setScrollTop(
                this.state.infiniteComputer.getTotalScrollableHeight() -
                  prevState.infiniteComputer.getTotalScrollableHeight() +
                  this.preservedScrollState
              );
            }
          }

          var hasLoadedMoreChildren =
            this.state.numberOfChildren !== prevState.numberOfChildren;

          if (hasLoadedMoreChildren) {
            var newApertureState = infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(
              this.state,
              this.utils.getScrollTop()
            );
            this.setState(newApertureState);
          }

          var isMissingVisibleRows =
            hasLoadedMoreChildren &&
            !this.hasAllVisibleItems() &&
            !this.state.isInfiniteLoading;

          if (isMissingVisibleRows) {
            this.onInfiniteLoad();
          }
        }
      },
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.utils.subscribeToScrollListener();

          if (!this.hasAllVisibleItems()) {
            this.onInfiniteLoad();
          }

          if (this.props.displayBottomUpwards) {
            var lowestScrollTop = this.getLowestPossibleScrollTop();

            if (
              this.shouldAttachToBottom &&
              this.utils.getScrollTop() < lowestScrollTop
            ) {
              this.utils.setScrollTop(lowestScrollTop);
            }
          }
        }
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.utils.unsubscribeFromScrollListener();
        }
      },
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var displayables;

          if (this.state.numberOfChildren > 1) {
            displayables = this.computedProps.children.slice(
              this.state.displayIndexStart,
              this.state.displayIndexEnd + 1
            );
          } else {
            displayables = this.computedProps.children;
          }

          var infiniteScrollStyles = {};

          if (this.state.isScrolling) {
            infiniteScrollStyles.pointerEvents = 'none';
          }

          var topSpacerHeight = this.state.infiniteComputer.getTopSpacerHeight(
              this.state.displayIndexStart
            ),
            bottomSpacerHeight = this.state.infiniteComputer.getBottomSpacerHeight(
              this.state.displayIndexEnd
            ); // This asymmetry is due to a reluctance to use CSS to control
          // the bottom alignment

          if (this.computedProps.displayBottomUpwards) {
            var heightDifference =
              this.computedProps.containerHeight -
              this.state.infiniteComputer.getTotalScrollableHeight();

            if (heightDifference > 0) {
              topSpacerHeight = heightDifference - this.loadingSpinnerHeight;
            }
          }

          var loadingSpinner =
            this.computedProps.infiniteLoadBeginEdgeOffset === undefined
              ? null
              : /* #__PURE__ */ React.createElement(
                  'div',
                  {
                    ref: function ref(c) {
                      _this2.loadingSpinner = c;
                    }
                  },
                  this.state.isInfiniteLoading
                    ? this.computedProps.loadingSpinnerDelegate
                    : null
                ); // topSpacer and bottomSpacer take up the amount of space that the
          // rendered elements would have taken up otherwise

          return /* #__PURE__ */ React.createElement(
            'div',
            {
              className: this.computedProps.className,
              ref: function ref(c) {
                _this2.scrollable = c;
              },
              style: this.utils.buildScrollableStyle(),
              onScroll: this.utils.nodeScrollListener
            },
            /* #__PURE__ */ React.createElement(
              'div',
              {
                ref: function ref(c) {
                  _this2.smoothScrollingWrapper = c;
                },
                style: infiniteScrollStyles
              },
              /* #__PURE__ */ React.createElement('div', {
                ref: function ref(c) {
                  _this2.topSpacer = c;
                },
                style: infiniteHelpers.buildHeightStyle(topSpacerHeight)
              }),
              this.computedProps.displayBottomUpwards && loadingSpinner,
              displayables,
              !this.computedProps.displayBottomUpwards && loadingSpinner,
              /* #__PURE__ */ React.createElement('div', {
                ref: function ref(c) {
                  _this2.bottomSpacer = c;
                },
                style: infiniteHelpers.buildHeightStyle(bottomSpacerHeight)
              })
            )
          );
        }
      }
    ],
    [
      {
        key: 'containerHeightScaleFactor',
        value: function containerHeightScaleFactor(factor) {
          if (!_isFinite(factor)) {
            throw new Error('The scale factor must be a number.');
          }

          return {
            type: scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,
            amount: factor
          };
        }
      }
    ]
  );

  return Infinite;
})(React.Component);

_defineProperty(Infinite, 'propTypes', {
  children: PropTypes.any,
  handleScroll: PropTypes.func,
  // preloadBatchSize causes updates only to
  // happen each preloadBatchSize pixels of scrolling.
  // Set a larger number to cause fewer updates to the
  // element list.
  preloadBatchSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      type: PropTypes.oneOf(['containerHeightScaleFactor']).isRequired,
      amount: PropTypes.number.isRequired
    })
  ]),
  // preloadAdditionalHeight determines how much of the
  // list above and below the container is preloaded even
  // when it is not currently visible to the user. In the
  // regular scroll implementation, preloadAdditionalHeight
  // is equal to the entire height of the list.
  preloadAdditionalHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      type: PropTypes.oneOf(['containerHeightScaleFactor']).isRequired,
      amount: PropTypes.number.isRequired
    })
  ]),
  // page to screen ratio
  // The provided elementHeight can be either
  //  1. a constant: all elements are the same height
  //  2. an array containing the height of each element
  elementHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  // This is the total height of the visible window. One
  // of
  containerHeight: PropTypes.number,
  useWindowAsScrollContainer: PropTypes.bool,
  displayBottomUpwards: PropTypes.bool.isRequired,
  infiniteLoadBeginEdgeOffset: PropTypes.number,
  onInfiniteLoad: PropTypes.func,
  loadingSpinnerDelegate: PropTypes.node,
  isInfiniteLoading: PropTypes.bool,
  timeScrollStateLastsForAfterUserScrolls: PropTypes.number,
  className: PropTypes.string,
  styles: PropTypes.shape({
    scrollableStyle: PropTypes.object
  }).isRequired
});

_defineProperty(Infinite, 'defaultProps', {
  handleScroll: function handleScroll() {},
  useWindowAsScrollContainer: false,
  onInfiniteLoad: function onInfiniteLoad() {},
  loadingSpinnerDelegate: /* #__PURE__ */ React.createElement('div', null),
  displayBottomUpwards: false,
  isInfiniteLoading: false,
  timeScrollStateLastsForAfterUserScrolls: 150,
  className: '',
  styles: {}
});

module.exports = Infinite;
global.Infinite = Infinite;
