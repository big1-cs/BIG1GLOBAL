//#region node_modules/gsap/Observer.js
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}
/*!
* Observer 3.15.0
* https://gsap.com
*
* @license Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var gsap$4;
var _coreInitted$2;
var _win$3;
var _doc$2;
var _docEl$1;
var _body$3;
var _isTouch;
var _pointerType;
var ScrollTrigger$1;
var _root$1;
var _normalizer$1;
var _eventTypes;
var _context$1;
var _getGSAP$3 = function _getGSAP() {
	return gsap$4 || typeof window !== "undefined" && (gsap$4 = window.gsap) && gsap$4.registerPlugin && gsap$4;
};
var _startup$1 = 1;
var _observers = [];
var _scrollers = [];
var _proxies = [];
var _getTime$1 = Date.now;
var _bridge = function _bridge(name, value) {
	return value;
};
var _integrate = function _integrate() {
	var core = ScrollTrigger$1.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
	scrollers.push.apply(scrollers, _scrollers);
	proxies.push.apply(proxies, _proxies);
	_scrollers = scrollers;
	_proxies = proxies;
	_bridge = function _bridge(name, value) {
		return data[name](value);
	};
};
var _getProxyProp = function _getProxyProp(element, property) {
	return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
};
var _isViewport$1 = function _isViewport(el) {
	return !!~_root$1.indexOf(el);
};
var _addListener$1 = function _addListener(element, type, func, passive, capture) {
	return element.addEventListener(type, func, {
		passive: passive !== false,
		capture: !!capture
	});
};
var _removeListener$1 = function _removeListener(element, type, func, capture) {
	return element.removeEventListener(type, func, !!capture);
};
var _scrollLeft = "scrollLeft";
var _scrollTop = "scrollTop";
var _onScroll$1 = function _onScroll() {
	return _normalizer$1 && _normalizer$1.isPressed || _scrollers.cache++;
};
var _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
	var cachingFunc = function cachingFunc(value) {
		if (value || value === 0) {
			_startup$1 && (_win$3.history.scrollRestoration = "manual");
			var isNormalizing = _normalizer$1 && _normalizer$1.isPressed;
			value = cachingFunc.v = Math.round(value) || (_normalizer$1 && _normalizer$1.iOS ? 1 : 0);
			f(value);
			cachingFunc.cacheID = _scrollers.cache;
			isNormalizing && _bridge("ss", value);
		} else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
			cachingFunc.cacheID = _scrollers.cache;
			cachingFunc.v = f();
		}
		return cachingFunc.v + cachingFunc.offset;
	};
	cachingFunc.offset = 0;
	return f && cachingFunc;
};
var _horizontal = {
	s: _scrollLeft,
	p: "left",
	p2: "Left",
	os: "right",
	os2: "Right",
	d: "width",
	d2: "Width",
	a: "x",
	sc: _scrollCacheFunc(function(value) {
		return arguments.length ? _win$3.scrollTo(value, _vertical.sc()) : _win$3.pageXOffset || _doc$2[_scrollLeft] || _docEl$1[_scrollLeft] || _body$3[_scrollLeft] || 0;
	})
};
var _vertical = {
	s: _scrollTop,
	p: "top",
	p2: "Top",
	os: "bottom",
	os2: "Bottom",
	d: "height",
	d2: "Height",
	a: "y",
	op: _horizontal,
	sc: _scrollCacheFunc(function(value) {
		return arguments.length ? _win$3.scrollTo(_horizontal.sc(), value) : _win$3.pageYOffset || _doc$2[_scrollTop] || _docEl$1[_scrollTop] || _body$3[_scrollTop] || 0;
	})
};
var _getTarget = function _getTarget(t, self) {
	return (self && self._ctx && self._ctx.selector || gsap$4.utils.toArray)(t)[0] || (typeof t === "string" && gsap$4.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
};
var _isWithin = function _isWithin(element, list) {
	var i = list.length;
	while (i--) if (list[i] === element || list[i].contains(element)) return true;
	return false;
};
var _getScrollFunc = function _getScrollFunc(element, _ref) {
	var s = _ref.s, sc = _ref.sc;
	_isViewport$1(element) && (element = _doc$2.scrollingElement || _docEl$1);
	var i = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
	!~i && (i = _scrollers.push(element) - 1);
	_scrollers[i + offset] || _addListener$1(element, "scroll", _onScroll$1);
	var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport$1(element) ? sc : _scrollCacheFunc(function(value) {
		return arguments.length ? element[s] = value : element[s];
	})));
	func.target = element;
	prev || (func.smooth = gsap$4.getProperty(element, "scrollBehavior") === "smooth");
	return func;
};
var _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
	var v1 = value, v2 = value, t1 = _getTime$1(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update(value, force) {
		var t = _getTime$1();
		if (force || t - t1 > min) {
			v2 = v1;
			v1 = value;
			t2 = t1;
			t1 = t;
		} else if (useDelta) v1 += value;
		else v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
	};
	return {
		update,
		reset: function reset() {
			v2 = v1 = useDelta ? 0 : v1;
			t2 = t1 = 0;
		},
		getVelocity: function getVelocity(latestValue) {
			var tOld = t2, vOld = v2, t = _getTime$1();
			(latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
			return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
		}
	};
};
var _getEvent = function _getEvent(e, preventDefault) {
	preventDefault && !e._gsapAllow && e.cancelable !== false && e.preventDefault();
	return e.changedTouches ? e.changedTouches[0] : e;
};
var _getAbsoluteMax = function _getAbsoluteMax(a) {
	var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
	return Math.abs(max) >= Math.abs(min) ? max : min;
};
var _setScrollTrigger = function _setScrollTrigger() {
	ScrollTrigger$1 = gsap$4.core.globals().ScrollTrigger;
	ScrollTrigger$1 && ScrollTrigger$1.core && _integrate();
};
var _initCore$1 = function _initCore(core) {
	gsap$4 = core || _getGSAP$3();
	if (!_coreInitted$2 && gsap$4 && typeof document !== "undefined" && document.body) {
		_win$3 = window;
		_doc$2 = document;
		_docEl$1 = _doc$2.documentElement;
		_body$3 = _doc$2.body;
		_root$1 = [
			_win$3,
			_doc$2,
			_docEl$1,
			_body$3
		];
		gsap$4.utils.clamp;
		_context$1 = gsap$4.core.context || function() {};
		_pointerType = "onpointerenter" in _body$3 ? "pointer" : "mouse";
		_isTouch = Observer.isTouch = _win$3.matchMedia && _win$3.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$3 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
		_eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl$1 ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl$1) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
		setTimeout(function() {
			return _startup$1 = 0;
		}, 500);
		_coreInitted$2 = 1;
	}
	ScrollTrigger$1 || _setScrollTrigger();
	return _coreInitted$2;
};
_horizontal.op = _vertical;
_scrollers.cache = 0;
var Observer = /*#__PURE__*/ function() {
	function Observer(vars) {
		this.init(vars);
	}
	var _proto = Observer.prototype;
	_proto.init = function init(vars) {
		_coreInitted$2 || _initCore$1(gsap$4) || console.warn("Please gsap.registerPlugin(Observer)");
		ScrollTrigger$1 || _setScrollTrigger();
		var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
		this.target = target = _getTarget(target) || _docEl$1;
		this.vars = vars;
		ignore && (ignore = gsap$4.utils.toArray(ignore));
		tolerance = tolerance || 1e-9;
		dragMinimum = dragMinimum || 0;
		wheelSpeed = wheelSpeed || 1;
		scrollSpeed = scrollSpeed || 1;
		type = type || "wheel,touch,pointer";
		debounce = debounce !== false;
		lineHeight || (lineHeight = parseFloat(_win$3.getComputedStyle(_body$3).lineHeight) || 22);
		var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport$1(target), ownerDoc = target.ownerDocument || _doc$2, deltaX = [
			0,
			0,
			0
		], deltaY = [
			0,
			0,
			0
		], onClickTime = 0, clickCapture = function clickCapture() {
			return onClickTime = _getTime$1();
		}, _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
			return (self.event = e) && ignore && _isWithin(e.target, ignore) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
		}, onStopFunc = function onStopFunc() {
			self._vx.reset();
			self._vy.reset();
			onStopDelayedCall.pause();
			onStop && onStop(self);
		}, update = function update() {
			var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
			onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
			if (changedX) {
				onRight && self.deltaX > 0 && onRight(self);
				onLeft && self.deltaX < 0 && onLeft(self);
				onChangeX && onChangeX(self);
				onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
				prevDeltaX = self.deltaX;
				deltaX[0] = deltaX[1] = deltaX[2] = 0;
			}
			if (changedY) {
				onDown && self.deltaY > 0 && onDown(self);
				onUp && self.deltaY < 0 && onUp(self);
				onChangeY && onChangeY(self);
				onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
				prevDeltaY = self.deltaY;
				deltaY[0] = deltaY[1] = deltaY[2] = 0;
			}
			if (moved || dragged) {
				onMove && onMove(self);
				if (dragged) {
					onDragStart && dragged === 1 && onDragStart(self);
					onDrag && onDrag(self);
					dragged = 0;
				}
				moved = false;
			}
			locked && !(locked = false) && onLockAxis && onLockAxis(self);
			if (wheeled) {
				onWheel(self);
				wheeled = false;
			}
			id = 0;
		}, onDelta = function onDelta(x, y, index) {
			deltaX[index] += x;
			deltaY[index] += y;
			self._vx.update(x);
			self._vy.update(y);
			debounce ? id || (id = requestAnimationFrame(update)) : update();
		}, onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
			if (lockAxis && !axis) {
				self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
				locked = true;
			}
			if (axis !== "y") {
				deltaX[2] += x;
				self._vx.update(x, true);
			}
			if (axis !== "x") {
				deltaY[2] += y;
				self._vy.update(y, true);
			}
			debounce ? id || (id = requestAnimationFrame(update)) : update();
		}, _onDrag = function _onDrag(e) {
			if (_ignoreCheck(e, 1)) return;
			e = _getEvent(e, preventDefault);
			var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
			self.x = x;
			self.y = y;
			if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
				dragged || (dragged = isDragging ? 2 : 1);
				isDragging || (self.isDragging = true);
				onTouchOrPointerDelta(dx, dy);
			}
		}, _onPress = self.onPress = function(e) {
			if (_ignoreCheck(e, 1) || e && e.button) return;
			self.axis = axis = null;
			onStopDelayedCall.pause();
			self.isPressed = true;
			e = _getEvent(e);
			prevDeltaX = prevDeltaY = 0;
			self.startX = self.x = e.clientX;
			self.startY = self.y = e.clientY;
			self._vx.reset();
			self._vy.reset();
			_addListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
			self.deltaX = self.deltaY = 0;
			onPress && onPress(self);
		}, _onRelease = self.onRelease = function(e) {
			if (_ignoreCheck(e, 1)) return;
			_removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
			var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
			if (!isDragNotClick && isTrackingDrag) {
				self._vx.reset();
				self._vy.reset();
				if (preventDefault && allowClicks) gsap$4.delayedCall(.08, function() {
					if (_getTime$1() - onClickTime > 300 && !e.defaultPrevented) {
						if (e.target.click) e.target.click();
						else if (ownerDoc.createEvent) {
							var syntheticEvent = ownerDoc.createEvent("MouseEvents");
							syntheticEvent.initMouseEvent("click", true, true, _win$3, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
							e.target.dispatchEvent(syntheticEvent);
						}
					}
				});
			}
			self.isDragging = self.isGesturing = self.isPressed = false;
			onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
			dragged && update();
			onDragEnd && wasDragging && onDragEnd(self);
			onRelease && onRelease(self, isDragNotClick);
		}, _onGestureStart = function _onGestureStart(e) {
			return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
		}, _onGestureEnd = function _onGestureEnd() {
			return (self.isGesturing = false) || onGestureEnd(self);
		}, onScroll = function onScroll(e) {
			if (_ignoreCheck(e)) return;
			var x = scrollFuncX(), y = scrollFuncY();
			onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
			scrollX = x;
			scrollY = y;
			onStop && onStopDelayedCall.restart(true);
		}, _onWheel = function _onWheel(e) {
			if (_ignoreCheck(e)) return;
			e = _getEvent(e, preventDefault);
			onWheel && (wheeled = true);
			var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win$3.innerHeight : 1) * wheelSpeed;
			onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
			onStop && !isNormalizer && onStopDelayedCall.restart(true);
		}, _onMove = function _onMove(e) {
			if (_ignoreCheck(e)) return;
			var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
			self.x = x;
			self.y = y;
			moved = true;
			onStop && onStopDelayedCall.restart(true);
			(dx || dy) && onTouchOrPointerDelta(dx, dy);
		}, _onHover = function _onHover(e) {
			self.event = e;
			onHover(self);
		}, _onHoverEnd = function _onHoverEnd(e) {
			self.event = e;
			onHoverEnd(self);
		}, _onClick = function _onClick(e) {
			return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
		};
		onStopDelayedCall = self._dc = gsap$4.delayedCall(onStopDelay || .25, onStopFunc).pause();
		self.deltaX = self.deltaY = 0;
		self._vx = _getVelocityProp(0, 50, true);
		self._vy = _getVelocityProp(0, 50, true);
		self.scrollX = scrollFuncX;
		self.scrollY = scrollFuncY;
		self.isDragging = self.isGesturing = self.isPressed = false;
		_context$1(this);
		self.enable = function(e) {
			if (!self.isEnabled) {
				_addListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
				type.indexOf("scroll") >= 0 && _addListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
				type.indexOf("wheel") >= 0 && _addListener$1(target, "wheel", _onWheel, passive, capture);
				if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
					_addListener$1(target, _eventTypes[0], _onPress, passive, capture);
					_addListener$1(ownerDoc, _eventTypes[2], _onRelease);
					_addListener$1(ownerDoc, _eventTypes[3], _onRelease);
					allowClicks && _addListener$1(target, "click", clickCapture, true, true);
					onClick && _addListener$1(target, "click", _onClick);
					onGestureStart && _addListener$1(ownerDoc, "gesturestart", _onGestureStart);
					onGestureEnd && _addListener$1(ownerDoc, "gestureend", _onGestureEnd);
					onHover && _addListener$1(target, _pointerType + "enter", _onHover);
					onHoverEnd && _addListener$1(target, _pointerType + "leave", _onHoverEnd);
					onMove && _addListener$1(target, _pointerType + "move", _onMove);
				}
				self.isEnabled = true;
				self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
				self._vx.reset();
				self._vy.reset();
				scrollX = scrollFuncX();
				scrollY = scrollFuncY();
				e && e.type && _onPress(e);
				onEnable && onEnable(self);
			}
			return self;
		};
		self.disable = function() {
			if (self.isEnabled) {
				_observers.filter(function(o) {
					return o !== self && _isViewport$1(o.target);
				}).length || _removeListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
				if (self.isPressed) {
					self._vx.reset();
					self._vy.reset();
					_removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
				}
				_removeListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
				_removeListener$1(target, "wheel", _onWheel, capture);
				_removeListener$1(target, _eventTypes[0], _onPress, capture);
				_removeListener$1(ownerDoc, _eventTypes[2], _onRelease);
				_removeListener$1(ownerDoc, _eventTypes[3], _onRelease);
				_removeListener$1(target, "click", clickCapture, true);
				_removeListener$1(target, "click", _onClick);
				_removeListener$1(ownerDoc, "gesturestart", _onGestureStart);
				_removeListener$1(ownerDoc, "gestureend", _onGestureEnd);
				_removeListener$1(target, _pointerType + "enter", _onHover);
				_removeListener$1(target, _pointerType + "leave", _onHoverEnd);
				_removeListener$1(target, _pointerType + "move", _onMove);
				self.isEnabled = self.isPressed = self.isDragging = false;
				onDisable && onDisable(self);
			}
		};
		self.kill = self.revert = function() {
			self.disable();
			var i = _observers.indexOf(self);
			i >= 0 && _observers.splice(i, 1);
			_normalizer$1 === self && (_normalizer$1 = 0);
		};
		_observers.push(self);
		isNormalizer && _isViewport$1(target) && (_normalizer$1 = self);
		self.enable(event);
	};
	_createClass(Observer, [{
		key: "velocityX",
		get: function get() {
			return this._vx.getVelocity();
		}
	}, {
		key: "velocityY",
		get: function get() {
			return this._vy.getVelocity();
		}
	}]);
	return Observer;
}();
Observer.version = "3.15.0";
Observer.create = function(vars) {
	return new Observer(vars);
};
Observer.register = _initCore$1;
Observer.getAll = function() {
	return _observers.slice();
};
Observer.getById = function(id) {
	return _observers.filter(function(o) {
		return o.vars.id === id;
	})[0];
};
_getGSAP$3() && gsap$4.registerPlugin(Observer);
//#endregion
//#region node_modules/gsap/ScrollTrigger.js
/*!
* ScrollTrigger 3.15.0
* https://gsap.com
*
* @license Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var gsap$3;
var _coreInitted$1;
var _win$2;
var _doc$1;
var _docEl;
var _body$2;
var _root;
var _resizeDelay;
var _toArray$3;
var _clamp;
var _time2;
var _syncInterval;
var _refreshing;
var _pointerIsDown;
var _transformProp$1;
var _i;
var _prevWidth;
var _prevHeight;
var _autoRefresh;
var _sort;
var _suppressOverwrites;
var _ignoreResize;
var _normalizer;
var _ignoreMobileResize;
var _baseScreenHeight;
var _baseScreenWidth;
var _fixIOSBug;
var _context;
var _scrollRestoration;
var _div100vh;
var _100vh;
var _isReverted;
var _clampingMax;
var _limitCallbacks;
var _startup = 1;
var _getTime = Date.now;
var _time1 = _getTime();
var _lastScrollTime = 0;
var _enabled = 0;
var _parseClamp = function _parseClamp(value, type, self) {
	var clamp = _isString$1(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
	self["_" + type + "Clamp"] = clamp;
	return clamp ? value.substr(6, value.length - 7) : value;
};
var _keepClamp = function _keepClamp(value, clamp) {
	return clamp && (!_isString$1(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
};
var _rafBugFix = function _rafBugFix() {
	return _enabled && requestAnimationFrame(_rafBugFix);
};
var _pointerDownHandler = function _pointerDownHandler() {
	return _pointerIsDown = 1;
};
var _pointerUpHandler = function _pointerUpHandler() {
	return _pointerIsDown = 0;
};
var _passThrough = function _passThrough(v) {
	return v;
};
var _round$3 = function _round(value) {
	return Math.round(value * 1e5) / 1e5 || 0;
};
var _windowExists$1 = function _windowExists() {
	return typeof window !== "undefined";
};
var _getGSAP$2 = function _getGSAP() {
	return gsap$3 || _windowExists$1() && (gsap$3 = window.gsap) && gsap$3.registerPlugin && gsap$3;
};
var _isViewport = function _isViewport(e) {
	return !!~_root.indexOf(e);
};
var _getViewportDimension = function _getViewportDimension(dimensionProperty) {
	return (dimensionProperty === "Height" ? _100vh : _win$2["inner" + dimensionProperty]) || _docEl["client" + dimensionProperty] || _body$2["client" + dimensionProperty];
};
var _getBoundsFunc = function _getBoundsFunc(element) {
	return _getProxyProp(element, "getBoundingClientRect") || (_isViewport(element) ? function() {
		_winOffsets.width = _win$2.innerWidth;
		_winOffsets.height = _100vh;
		return _winOffsets;
	} : function() {
		return _getBounds(element);
	});
};
var _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
	var d = _ref.d, d2 = _ref.d2, a = _ref.a;
	return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
		return a()[d];
	} : function() {
		return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
	};
};
var _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
	return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
		return _winOffsets;
	};
};
var _maxScroll = function _maxScroll(element, _ref2) {
	var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
	return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? (_docEl[s] || _body$2[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
};
var _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
	for (var i = 0; i < _autoRefresh.length; i += 3) (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
};
var _isString$1 = function _isString(value) {
	return typeof value === "string";
};
var _isFunction = function _isFunction(value) {
	return typeof value === "function";
};
var _isNumber$1 = function _isNumber(value) {
	return typeof value === "number";
};
var _isObject = function _isObject(value) {
	return typeof value === "object";
};
var _endAnimation = function _endAnimation(animation, reversed, pause) {
	return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
};
var _callback = function _callback(self, func, extraParam) {
	if (self.enabled) {
		var result = self._ctx ? self._ctx.add(function() {
			return func(self, extraParam);
		}) : func(self, extraParam);
		result && result.totalTime && (self.callbackAnimation = result);
	}
};
var _abs$1 = Math.abs;
var _left = "left";
var _top = "top";
var _right = "right";
var _bottom = "bottom";
var _width = "width";
var _height = "height";
var _Right = "Right";
var _Left = "Left";
var _Top = "Top";
var _Bottom = "Bottom";
var _padding = "padding";
var _margin = "margin";
var _Width = "Width";
var _Height = "Height";
var _px = "px";
var _getComputedStyle = function _getComputedStyle(element) {
	return _win$2.getComputedStyle(element.nodeType === Node.DOCUMENT_NODE ? element.scrollingElement : element);
};
var _makePositionable = function _makePositionable(element) {
	var position = _getComputedStyle(element).position;
	element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
};
var _setDefaults = function _setDefaults(obj, defaults) {
	for (var p in defaults) p in obj || (obj[p] = defaults[p]);
	return obj;
};
var _getBounds = function _getBounds(element, withoutTransforms) {
	var tween = withoutTransforms && _getComputedStyle(element)[_transformProp$1] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap$3.to(element, {
		x: 0,
		y: 0,
		xPercent: 0,
		yPercent: 0,
		rotation: 0,
		rotationX: 0,
		rotationY: 0,
		scale: 1,
		skewX: 0,
		skewY: 0
	}).progress(1), bounds = element.getBoundingClientRect ? element.getBoundingClientRect() : element.scrollingElement.getBoundingClientRect();
	tween && tween.progress(0).kill();
	return bounds;
};
var _getSize = function _getSize(element, _ref3) {
	var d2 = _ref3.d2;
	return element["offset" + d2] || element["client" + d2] || 0;
};
var _getLabelRatioArray = function _getLabelRatioArray(timeline) {
	var a = [], labels = timeline.labels, duration = timeline.duration(), p;
	for (p in labels) a.push(labels[p] / duration);
	return a;
};
var _getClosestLabel = function _getClosestLabel(animation) {
	return function(value) {
		return gsap$3.utils.snap(_getLabelRatioArray(animation), value);
	};
};
var _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
	var snap = gsap$3.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a, b) {
		return a - b;
	});
	return a ? function(value, direction, threshold) {
		if (threshold === void 0) threshold = .001;
		var i;
		if (!direction) return snap(value);
		if (direction > 0) {
			value -= threshold;
			for (i = 0; i < a.length; i++) if (a[i] >= value) return a[i];
			return a[i - 1];
		} else {
			i = a.length;
			value += threshold;
			while (i--) if (a[i] <= value) return a[i];
		}
		return a[0];
	} : function(value, direction, threshold) {
		if (threshold === void 0) threshold = .001;
		var snapped = snap(value);
		return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
	};
};
var _getLabelAtDirection = function _getLabelAtDirection(timeline) {
	return function(value, st) {
		return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
	};
};
var _multiListener = function _multiListener(func, element, types, callback) {
	return types.split(",").forEach(function(type) {
		return func(element, type, callback);
	});
};
var _addListener = function _addListener(element, type, func, nonPassive, capture) {
	return element.addEventListener(type, func, {
		passive: !nonPassive,
		capture: !!capture
	});
};
var _removeListener = function _removeListener(element, type, func, capture) {
	return element.removeEventListener(type, func, !!capture);
};
var _wheelListener = function _wheelListener(func, el, scrollFunc) {
	scrollFunc = scrollFunc && scrollFunc.wheelHandler;
	if (scrollFunc) {
		func(el, "wheel", scrollFunc);
		func(el, "touchmove", scrollFunc);
	}
};
var _markerDefaults = {
	startColor: "green",
	endColor: "red",
	indent: 0,
	fontSize: "16px",
	fontWeight: "normal"
};
var _defaults = {
	toggleActions: "play",
	anticipatePin: 0
};
var _keywords = {
	top: 0,
	left: 0,
	center: .5,
	bottom: 1,
	right: 1
};
var _offsetToPx = function _offsetToPx(value, size) {
	if (_isString$1(value)) {
		var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
		if (~eqIndex) {
			value.indexOf("%") > eqIndex && (relative *= size / 100);
			value = value.substr(0, eqIndex - 1);
		}
		value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
	}
	return value;
};
var _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
	var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
	var e = _doc$1.createElement("div"), useFixedPosition = _isViewport(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body$2 : container.tagName === "IFRAME" ? container.contentDocument.body : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
	css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
	(isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
	matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
	e._isStart = isStart;
	e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
	e.style.cssText = css;
	e.innerText = name || name === 0 ? type + "-" + name : type;
	parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
	e._offset = e["offset" + direction.op.d2];
	_positionMarker(e, 0, direction, isStart);
	return e;
};
var _positionMarker = function _positionMarker(marker, start, direction, flipped) {
	var vars = { display: "block" }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
	marker._isFlipped = flipped;
	vars[direction.a + "Percent"] = flipped ? -100 : 0;
	vars[direction.a] = flipped ? "1px" : 0;
	vars["border" + side + _Width] = 1;
	vars["border" + oppositeSide + _Width] = 0;
	vars[direction.p] = start + "px";
	gsap$3.set(marker, vars);
};
var _triggers = [];
var _ids = {};
var _rafID;
var _sync = function _sync() {
	return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
};
var _onScroll = function _onScroll() {
	if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body$2.clientWidth) {
		_scrollers.cache++;
		if (_normalizer) _rafID || (_rafID = requestAnimationFrame(_updateAll));
		else _updateAll();
		_lastScrollTime || _dispatch("scrollStart");
		_lastScrollTime = _getTime();
	}
};
var _setBaseDimensions = function _setBaseDimensions() {
	_baseScreenWidth = _win$2.innerWidth;
	_baseScreenHeight = _win$2.innerHeight;
};
var _onResize = function _onResize(force) {
	_scrollers.cache++;
	(force === true || !_refreshing && !_ignoreResize && !_doc$1.fullscreenElement && !_doc$1.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win$2.innerWidth || Math.abs(_win$2.innerHeight - _baseScreenHeight) > _win$2.innerHeight * .25)) && _resizeDelay.restart(true);
};
var _listeners = {};
var _emptyArray = [];
var _softRefresh = function _softRefresh() {
	return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
};
var _dispatch = function _dispatch(type) {
	return _listeners[type] && _listeners[type].map(function(f) {
		return f();
	}) || _emptyArray;
};
var _savedStyles = [];
var _revertRecorded = function _revertRecorded(media) {
	for (var i = 0; i < _savedStyles.length; i += 5) if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
		_savedStyles[i].style.cssText = _savedStyles[i + 1];
		_savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
		_savedStyles[i + 3].uncache = 1;
	}
};
var _recordScrollPositions = function _recordScrollPositions() {
	return _scrollers.forEach(function(obj) {
		return _isFunction(obj) && ++obj.cacheID && (obj.rec = obj());
	});
};
var _revertAll = function _revertAll(kill, media) {
	var trigger;
	for (_i = 0; _i < _triggers.length; _i++) {
		trigger = _triggers[_i];
		if (trigger && (!media || trigger._ctx === media)) {
			if (kill) trigger.kill(1);
			else trigger.revert(true, true);
		}
	}
	_isReverted = true;
	media && _revertRecorded(media);
	media || _dispatch("revert");
};
var _clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
	_scrollers.cache++;
	(force || !_refreshingAll) && _scrollers.forEach(function(obj) {
		return _isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
	});
	_isString$1(scrollRestoration) && (_win$2.history.scrollRestoration = _scrollRestoration = scrollRestoration);
};
var _refreshingAll;
var _refreshID = 0;
var _queueRefreshID;
var _queueRefreshAll = function _queueRefreshAll() {
	if (_queueRefreshID !== _refreshID) {
		var id = _queueRefreshID = _refreshID;
		requestAnimationFrame(function() {
			return id === _refreshID && _refreshAll(true);
		});
	}
};
var _refresh100vh = function _refresh100vh() {
	_body$2.appendChild(_div100vh);
	_100vh = !_normalizer && _div100vh.offsetHeight || _win$2.innerHeight;
	_body$2.removeChild(_div100vh);
};
var _hideAllMarkers = function _hideAllMarkers(hide) {
	return _toArray$3(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
		return el.style.display = hide ? "none" : "block";
	});
};
var _refreshAll = function _refreshAll(force, skipRevert) {
	_docEl = _doc$1.documentElement;
	_body$2 = _doc$1.body;
	_root = [
		_win$2,
		_doc$1,
		_docEl,
		_body$2
	];
	if (_lastScrollTime && !force && !_isReverted) {
		_addListener(ScrollTrigger, "scrollEnd", _softRefresh);
		return;
	}
	_refresh100vh();
	_refreshingAll = ScrollTrigger.isRefreshing = true;
	_isReverted || _recordScrollPositions();
	var refreshInits = _dispatch("refreshInit");
	_sort && ScrollTrigger.sort();
	skipRevert || _revertAll();
	_scrollers.forEach(function(obj) {
		if (_isFunction(obj)) {
			obj.smooth && (obj.target.style.scrollBehavior = "auto");
			obj(0);
		}
	});
	_triggers.slice(0).forEach(function(t) {
		return t.refresh();
	});
	_isReverted = false;
	_triggers.forEach(function(t) {
		if (t._subPinOffset && t.pin) {
			var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
			t.revert(true, 1);
			t.adjustPinSpacing(t.pin[prop] - original);
			t.refresh();
		}
	});
	_clampingMax = 1;
	_hideAllMarkers(true);
	_triggers.forEach(function(t) {
		var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
		(endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
	});
	_hideAllMarkers(false);
	_clampingMax = 0;
	refreshInits.forEach(function(result) {
		return result && result.render && result.render(-1);
	});
	_scrollers.forEach(function(obj) {
		if (_isFunction(obj)) {
			obj.smooth && requestAnimationFrame(function() {
				return obj.target.style.scrollBehavior = "smooth";
			});
			obj.rec && obj(obj.rec);
		}
	});
	_clearScrollMemory(_scrollRestoration, 1);
	_resizeDelay.pause();
	_refreshID++;
	_refreshingAll = 2;
	_updateAll(2);
	_triggers.forEach(function(t) {
		return _isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
	});
	_refreshingAll = ScrollTrigger.isRefreshing = false;
	_dispatch("refresh");
};
var _lastScroll = 0;
var _direction = 1;
var _primary;
var _updateAll = function _updateAll(force) {
	if (force === 2 || !_refreshingAll && !_isReverted) {
		ScrollTrigger.isUpdating = true;
		_primary && _primary.update(0);
		var l = _triggers.length, time = _getTime(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
		_direction = _lastScroll > scroll ? -1 : 1;
		_refreshingAll || (_lastScroll = scroll);
		if (recordVelocity) {
			if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
				_lastScrollTime = 0;
				_dispatch("scrollEnd");
			}
			_time2 = _time1;
			_time1 = time;
		}
		if (_direction < 0) {
			_i = l;
			while (_i-- > 0) _triggers[_i] && _triggers[_i].update(0, recordVelocity);
			_direction = 1;
		} else for (_i = 0; _i < l; _i++) _triggers[_i] && _triggers[_i].update(0, recordVelocity);
		ScrollTrigger.isUpdating = false;
	}
	_rafID = 0;
};
var _propNamesToCopy = [
	_left,
	_top,
	_bottom,
	_right,
	_margin + _Bottom,
	_margin + _Right,
	_margin + _Top,
	_margin + _Left,
	"display",
	"flexShrink",
	"float",
	"zIndex",
	"gridColumnStart",
	"gridColumnEnd",
	"gridRowStart",
	"gridRowEnd",
	"gridArea",
	"justifySelf",
	"alignSelf",
	"placeSelf",
	"order"
];
var _stateProps = _propNamesToCopy.concat([
	_width,
	_height,
	"boxSizing",
	"max" + _Width,
	"max" + _Height,
	"position",
	_margin,
	_padding,
	_padding + _Top,
	_padding + _Right,
	_padding + _Bottom,
	_padding + _Left
]);
var _swapPinOut = function _swapPinOut(pin, spacer, state) {
	_setState(state);
	var cache = pin._gsap;
	if (cache.spacerIsNative) _setState(cache.spacerState);
	else if (pin._gsap.swappedIn) {
		var parent = spacer.parentNode;
		if (parent) {
			parent.insertBefore(pin, spacer);
			parent.removeChild(spacer);
		}
	}
	pin._gsap.swappedIn = false;
};
var _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
	if (!pin._gsap.swappedIn) {
		var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
		while (i--) {
			p = _propNamesToCopy[i];
			spacerStyle[p] = cs[p];
		}
		spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
		cs.display === "inline" && (spacerStyle.display = "inline-block");
		pinStyle[_bottom] = pinStyle[_right] = "auto";
		spacerStyle.flexBasis = cs.flexBasis || "auto";
		spacerStyle.overflow = "visible";
		spacerStyle.boxSizing = "border-box";
		spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
		spacerStyle[_height] = _getSize(pin, _vertical) + _px;
		spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
		_setState(spacerState);
		pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
		pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
		pinStyle[_padding] = cs[_padding];
		if (pin.parentNode !== spacer) {
			pin.parentNode.insertBefore(spacer, pin);
			spacer.appendChild(pin);
		}
		pin._gsap.swappedIn = true;
	}
};
var _capsExp = /([A-Z])/g;
var _setState = function _setState(state) {
	if (state) {
		var style = state.t.style, l = state.length, i = 0, p, value;
		(state.t._gsap || gsap$3.core.getCache(state.t)).uncache = 1;
		for (; i < l; i += 2) {
			value = state[i + 1];
			p = state[i];
			if (value) style[p] = value;
			else if (style[p]) style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
		}
	}
};
var _getState = function _getState(element) {
	var l = _stateProps.length, style = element.style, state = [], i = 0;
	for (; i < l; i++) state.push(_stateProps[i], style[_stateProps[i]]);
	state.t = element;
	return state;
};
var _copyState = function _copyState(state, override, omitOffsets) {
	var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
	for (; i < l; i += 2) {
		p = state[i];
		result.push(p, p in override ? override[p] : state[i + 1]);
	}
	result.t = state.t;
	return result;
};
var _winOffsets = {
	left: 0,
	top: 0
};
var _parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
	_isFunction(value) && (value = value(self));
	if (_isString$1(value) && value.substr(0, 3) === "max") value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
	var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
	containerAnimation && containerAnimation.seek(0);
	isNaN(value) || (value = +value);
	if (!_isNumber$1(value)) {
		_isFunction(trigger) && (trigger = trigger(self));
		var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
		element = _getTarget(trigger, self) || _body$2;
		bounds = _getBounds(element) || {};
		if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
			display = element.style.display;
			element.style.display = "block";
			bounds = _getBounds(element);
			display ? element.style.display = display : element.style.removeProperty("display");
		}
		localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
		globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
		value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
		markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
		scrollerSize -= scrollerSize - globalOffset;
	} else {
		containerAnimation && (value = gsap$3.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
		markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
	}
	if (clampZeroProp) {
		self[clampZeroProp] = value || -.001;
		value < 0 && (value = 0);
	}
	if (marker) {
		var position = value + scrollerSize, isStart = marker._isStart;
		p1 = "scroll" + direction.d2;
		_positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body$2[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);
		if (useFixedPosition) {
			scrollerBounds = _getBounds(markerScroller);
			useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
		}
	}
	if (containerAnimation && element) {
		p1 = _getBounds(element);
		containerAnimation.seek(scrollerMax);
		p2 = _getBounds(element);
		containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
		value = value / containerAnimation._caScrollDist * scrollerMax;
	}
	containerAnimation && containerAnimation.seek(time);
	return containerAnimation ? value : Math.round(value);
};
var _prefixExp = /(webkit|moz|length|cssText|inset)/i;
var _reparent = function _reparent(element, parent, top, left) {
	if (element.parentNode !== parent) {
		var style = element.style, p, cs;
		if (parent === _body$2) {
			element._stOrig = style.cssText;
			cs = _getComputedStyle(element);
			for (p in cs) if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") style[p] = cs[p];
			style.top = top;
			style.left = left;
		} else style.cssText = element._stOrig;
		gsap$3.core.getCache(element).uncache = 1;
		parent.appendChild(element);
	}
};
var _interruptionTracker = function _interruptionTracker(getValueFunc, initialValue, onInterrupt) {
	var last1 = initialValue, last2 = last1;
	return function(value) {
		var current = Math.round(getValueFunc());
		if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
			value = current;
			onInterrupt && onInterrupt();
		}
		last2 = last1;
		last1 = Math.round(value);
		return last1;
	};
};
var _shiftMarker = function _shiftMarker(marker, direction, value) {
	var vars = {};
	vars[direction.p] = "+=" + value;
	gsap$3.set(marker, vars);
};
var _getTweenCreator = function _getTweenCreator(scroller, direction) {
	var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
		var tween = getTween.tween, onComplete = vars.onComplete, modifiers = {};
		initialValue = initialValue || getScroll();
		var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
			tween.kill();
			getTween.tween = 0;
		});
		change2 = change1 && change2 || 0;
		change1 = change1 || scrollTo - initialValue;
		tween && tween.kill();
		vars[prop] = scrollTo;
		vars.inherit = false;
		vars.modifiers = modifiers;
		modifiers[prop] = function() {
			return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
		};
		vars.onUpdate = function() {
			_scrollers.cache++;
			getTween.tween && _updateAll();
		};
		vars.onComplete = function() {
			getTween.tween = 0;
			onComplete && onComplete.call(tween);
		};
		tween = getTween.tween = gsap$3.to(scroller, vars);
		return tween;
	};
	scroller[prop] = getScroll;
	getScroll.wheelHandler = function() {
		return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
	};
	_addListener(scroller, "wheel", getScroll.wheelHandler);
	ScrollTrigger.isTouch && _addListener(scroller, "touchmove", getScroll.wheelHandler);
	return getTween;
};
var ScrollTrigger = /*#__PURE__*/ function() {
	function ScrollTrigger(vars, animation) {
		_coreInitted$1 || ScrollTrigger.register(gsap$3) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
		_context(this);
		this.init(vars, animation);
	}
	var _proto = ScrollTrigger.prototype;
	_proto.init = function init(vars, animation) {
		this.progress = this.start = 0;
		this.vars && this.kill(true, true);
		if (!_enabled) {
			this.update = this.refresh = this.kill = _passThrough;
			return;
		}
		vars = _setDefaults(_isString$1(vars) || _isNumber$1(vars) || vars.nodeType ? { trigger: vars } : vars, _defaults);
		var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win$2), scrollerCache = gsap$3.core.getCache(scroller), isViewport = _isViewport(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [
			vars.onEnter,
			vars.onLeave,
			vars.onEnterBack,
			vars.onLeaveBack
		], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
			return vars.onRefreshInit(self);
		}, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap2, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
		self._startClamp = self._endClamp = false;
		self._dir = direction;
		anticipatePin *= 45;
		self.scroller = scroller;
		self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
		scroll1 = scrollFunc();
		self.vars = vars;
		animation = animation || vars.animation;
		if ("refreshPriority" in vars) {
			_sort = 1;
			vars.refreshPriority === -9999 && (_primary = self);
		}
		scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
			top: _getTweenCreator(scroller, _vertical),
			left: _getTweenCreator(scroller, _horizontal)
		};
		self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
		self.scrubDuration = function(value) {
			scrubSmooth = _isNumber$1(value) && value;
			if (!scrubSmooth) {
				scrubTween && scrubTween.progress(1).kill();
				scrubTween = 0;
			} else scrubTween ? scrubTween.duration(value) : scrubTween = gsap$3.to(animation, {
				ease: "expo",
				totalProgress: "+=0",
				inherit: false,
				duration: scrubSmooth,
				paused: true,
				onComplete: function onComplete() {
					return onScrubComplete && onScrubComplete(self);
				}
			});
		};
		if (animation) {
			animation.vars.lazy = false;
			animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
			self.animation = animation.pause();
			animation.scrollTrigger = self;
			self.scrubDuration(scrub);
			snap1 = 0;
			id || (id = animation.vars.id);
		}
		if (snap) {
			if (!_isObject(snap) || snap.push) snap = { snapTo: snap };
			"scrollBehavior" in _body$2.style && gsap$3.set(isViewport ? [_body$2, _docEl] : scroller, { scrollBehavior: "auto" });
			_scrollers.forEach(function(o) {
				return _isFunction(o) && o.target === (isViewport ? _doc$1.scrollingElement || _docEl : scroller) && (o.smooth = false);
			});
			snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function(value, st) {
				return _snapDirectional(snap.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
			} : gsap$3.utils.snap(snap.snapTo);
			snapDurClamp = snap.duration || {
				min: .1,
				max: 2
			};
			snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
			snapDelayedCall = gsap$3.delayedCall(snap.delay || scrubSmooth / 2 || .1, function() {
				var scroll = scrollFunc(), refreshedRecently = _getTime() - lastRefresh < 500, tween = tweenTo.tween;
				if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
					var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime() - _time2) * 1e3 || 0, change1 = gsap$3.utils.clamp(-progress, 1 - progress, _abs$1(velocity / 2) * velocity / .185), naturalEnd = progress + (snap.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
					endValue = snapFunc(naturalEnd, self);
					_isNumber$1(endValue) || (endValue = naturalEnd);
					endScroll = Math.max(0, Math.round(start + endValue * change));
					if (scroll <= end && scroll >= start && endScroll !== scroll) {
						if (tween && !tween._initted && tween.data <= _abs$1(endScroll - scroll)) return;
						if (snap.inertia === false) change1 = endValue - progress;
						tweenTo(endScroll, {
							duration: snapDurClamp(_abs$1(Math.max(_abs$1(naturalEnd - totalProgress), _abs$1(endValue - totalProgress)) * .185 / velocity / .05 || 0)),
							ease: snap.ease || "power3",
							data: _abs$1(endScroll - scroll),
							onInterrupt: function onInterrupt() {
								return snapDelayedCall.restart(true) && _onInterrupt && _callback(self, _onInterrupt);
							},
							onComplete: function onComplete() {
								self.update();
								lastSnap = scrollFunc();
								if (animation && !isToggle) scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
								snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
								onSnapComplete && onSnapComplete(self);
								_onComplete && _callback(self, _onComplete);
							}
						}, scroll, change1 * change, endScroll - scroll - change1 * change);
						onStart && _callback(self, onStart, tweenTo.tween);
					}
				} else if (self.isActive && lastSnap !== scroll) snapDelayedCall.restart(true);
			}).pause();
		}
		id && (_ids[id] = self);
		trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
		customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
		customRevertReturn && (customRevertReturn = customRevertReturn(self));
		pin = pin === true ? trigger : _getTarget(pin);
		_isString$1(toggleClass) && (toggleClass = {
			targets: trigger,
			className: toggleClass
		});
		if (pin) {
			pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
			self.pin = pin;
			pinCache = gsap$3.core.getCache(pin);
			if (!pinCache.spacer) {
				if (pinSpacer) {
					pinSpacer = _getTarget(pinSpacer);
					pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
					pinCache.spacerIsNative = !!pinSpacer;
					pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
				}
				pinCache.spacer = spacer = pinSpacer || _doc$1.createElement("div");
				spacer.classList.add("pin-spacer");
				id && spacer.classList.add("pin-spacer-" + id);
				pinCache.pinState = pinOriginalState = _getState(pin);
			} else pinOriginalState = pinCache.pinState;
			vars.force3D !== false && gsap$3.set(pin, { force3D: true });
			self.spacer = spacer = pinCache.spacer;
			cs = _getComputedStyle(pin);
			spacingStart = cs[pinSpacing + direction.os2];
			pinGetter = gsap$3.getProperty(pin);
			pinSetter = gsap$3.quickSetter(pin, direction.a, _px);
			_swapPinIn(pin, spacer, cs);
			pinState = _getState(pin);
		}
		if (markers) {
			markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
			markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
			markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
			offset = markerStartTrigger["offset" + direction.op.d2];
			var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
			markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
			markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
			containerAnimation && (caMarkerSetter = gsap$3.quickSetter([markerStart, markerEnd], direction.a, _px));
			if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
				_makePositionable(isViewport ? _body$2 : scroller);
				gsap$3.set([markerStartTrigger, markerEndTrigger], { force3D: true });
				markerStartSetter = gsap$3.quickSetter(markerStartTrigger, direction.a, _px);
				markerEndSetter = gsap$3.quickSetter(markerEndTrigger, direction.a, _px);
			}
		}
		if (containerAnimation) {
			var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
			containerAnimation.eventCallback("onUpdate", function() {
				self.update(0, 0, 1);
				oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
			});
		}
		self.previous = function() {
			return _triggers[_triggers.indexOf(self) - 1];
		};
		self.next = function() {
			return _triggers[_triggers.indexOf(self) + 1];
		};
		self.revert = function(revert, temp) {
			if (!temp) return self.kill(true);
			var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
			if (r !== self.isReverted) {
				if (r) {
					prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
					prevProgress = self.progress;
					prevAnimProgress = animation && animation.progress();
				}
				markerStart && [
					markerStart,
					markerEnd,
					markerStartTrigger,
					markerEndTrigger
				].forEach(function(m) {
					return m.style.display = r ? "none" : "block";
				});
				if (r) {
					_refreshing = self;
					self.update(r);
				}
				if (pin && (!pinReparent || !self.isActive)) {
					if (r) _swapPinOut(pin, spacer, pinOriginalState);
					else _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
				}
				r || self.update(r);
				_refreshing = prevRefreshing;
				self.isReverted = r;
			}
		};
		self.refresh = function(soft, force, position, pinOffset) {
			if ((_refreshing || !self.enabled) && !force) return;
			if (pin && soft && _lastScrollTime) {
				_addListener(ScrollTrigger, "scrollEnd", _softRefresh);
				return;
			}
			!_refreshingAll && onRefreshInit && onRefreshInit(self);
			_refreshing = self;
			if (tweenTo.tween && !position) {
				tweenTo.tween.kill();
				tweenTo.tween = 0;
			}
			scrubTween && scrubTween.pause();
			if (invalidateOnRefresh && animation) {
				animation.revert({ kill: false }).invalidate();
				animation.getChildren ? animation.getChildren(true, true, false).forEach(function(t) {
					return t.vars.immediateRender && t.render(0, true, true);
				}) : animation.vars.immediateRender && animation.render(0, true, true);
			}
			self.isReverted || self.revert(true, true);
			self._subPinOffset = false;
			var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= .01 || !change, offset = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex, cs, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
			if (markers && _isObject(position)) {
				markerStartOffset = gsap$3.getProperty(markerStartTrigger, direction.p);
				markerEndOffset = gsap$3.getProperty(markerEndTrigger, direction.p);
			}
			while (i-- > 0) {
				curTrigger = _triggers[i];
				curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
				curPin = curTrigger.pin;
				if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
					revertedPins || (revertedPins = []);
					revertedPins.unshift(curTrigger);
					curTrigger.revert(true, true);
				}
				if (curTrigger !== _triggers[i]) {
					triggerIndex--;
					i--;
				}
			}
			_isFunction(parsedStart) && (parsedStart = parsedStart(self));
			parsedStart = _parseClamp(parsedStart, "start", self);
			start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -.001 : 0);
			_isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));
			if (_isString$1(parsedEnd) && !parsedEnd.indexOf("+=")) {
				if (~parsedEnd.indexOf(" ")) parsedEnd = (_isString$1(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
				else {
					offset = _offsetToPx(parsedEnd.substr(2), size);
					parsedEnd = _isString$1(parsedStart) ? parsedStart : (containerAnimation ? gsap$3.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset;
					parsedEndTrigger = trigger;
				}
			}
			parsedEnd = _parseClamp(parsedEnd, "end", self);
			end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -.001;
			offset = 0;
			i = triggerIndex;
			while (i--) {
				curTrigger = _triggers[i] || {};
				curPin = curTrigger.pin;
				if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
					cs = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
					if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) offset += cs * (1 - curTrigger.progress);
					curPin === pin && (otherPinOffset += cs);
				}
			}
			start += offset;
			end += offset;
			self._startClamp && (self._startClamp += offset);
			if (self._endClamp && !_refreshingAll) {
				self._endClamp = end || -.001;
				end = Math.min(end, _maxScroll(scroller, direction));
			}
			change = end - start || (start -= .01) && .001;
			if (isFirstRefresh) prevProgress = gsap$3.utils.clamp(0, 1, gsap$3.utils.normalize(start, end, prevScroll));
			self._pinPush = otherPinOffset;
			if (markerStart && offset) {
				cs = {};
				cs[direction.a] = "+=" + offset;
				pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
				gsap$3.set([markerStart, markerEnd], cs);
			}
			if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
				cs = _getComputedStyle(pin);
				isVertical = direction === _vertical;
				scroll = scrollFunc();
				pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
				if (!max && end > 1) {
					forcedOverflow = (isViewport ? _doc$1.scrollingElement || _docEl : scroller).style;
					forcedOverflow = {
						style: forcedOverflow,
						value: forcedOverflow["overflow" + direction.a.toUpperCase()]
					};
					if (isViewport && _getComputedStyle(_body$2)["overflow" + direction.a.toUpperCase()] !== "scroll") forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
				}
				_swapPinIn(pin, spacer, cs);
				pinState = _getState(pin);
				bounds = _getBounds(pin, true);
				oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
				if (pinSpacing) {
					spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
					spacerState.t = spacer;
					i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
					if (i) {
						spacerState.push(direction.d, i + _px);
						spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
					}
					_setState(spacerState);
					if (pinnedContainer) _triggers.forEach(function(t) {
						if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) t._subPinOffset = true;
					});
					useFixedPosition && scrollFunc(prevScroll);
				} else {
					i = _getSize(pin, direction);
					i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
				}
				if (useFixedPosition) {
					override = {
						top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
						left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
						boxSizing: "border-box",
						position: "fixed"
					};
					override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
					override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
					override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
					override[_padding] = cs[_padding];
					override[_padding + _Top] = cs[_padding + _Top];
					override[_padding + _Right] = cs[_padding + _Right];
					override[_padding + _Bottom] = cs[_padding + _Bottom];
					override[_padding + _Left] = cs[_padding + _Left];
					pinActiveState = _copyState(pinOriginalState, override, pinReparent);
					_refreshingAll && scrollFunc(0);
				}
				if (animation) {
					initted = animation._initted;
					_suppressOverwrites(1);
					animation.render(animation.duration(), true, true);
					pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
					pinMoves = Math.abs(change - pinChange) > 1;
					useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
					animation.render(0, true, true);
					initted || animation.invalidate(true);
					animation.parent || animation.totalTime(animation.totalTime());
					_suppressOverwrites(0);
				} else pinChange = change;
				forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
			} else if (trigger && scrollFunc() && !containerAnimation) {
				bounds = trigger.parentNode;
				while (bounds && bounds !== _body$2) {
					if (bounds._pinOffset) {
						start -= bounds._pinOffset;
						end -= bounds._pinOffset;
					}
					bounds = bounds.parentNode;
				}
			}
			revertedPins && revertedPins.forEach(function(t) {
				return t.revert(false, true);
			});
			self.start = start;
			self.end = end;
			scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
			if (!containerAnimation && !_refreshingAll) {
				scroll1 < prevScroll && scrollFunc(prevScroll);
				self.scroll.rec = 0;
			}
			self.revert(false, true);
			lastRefresh = _getTime();
			if (snapDelayedCall) {
				lastSnap = -1;
				snapDelayedCall.restart(true);
			}
			_refreshing = 0;
			animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
			if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
				animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -.001 && !prevProgress ? gsap$3.utils.normalize(start, end, 0) : prevProgress, true);
				self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
			}
			pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
			scrubTween && scrubTween.invalidate();
			if (!isNaN(markerStartOffset)) {
				markerStartOffset -= gsap$3.getProperty(markerStartTrigger, direction.p);
				markerEndOffset -= gsap$3.getProperty(markerEndTrigger, direction.p);
				_shiftMarker(markerStartTrigger, direction, markerStartOffset);
				_shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
				_shiftMarker(markerEndTrigger, direction, markerEndOffset);
				_shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
			}
			isFirstRefresh && !_refreshingAll && self.update();
			if (onRefresh && !_refreshingAll && !executingOnRefresh) {
				executingOnRefresh = true;
				onRefresh(self);
				executingOnRefresh = false;
			}
		};
		self.getVelocity = function() {
			return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1e3 || 0;
		};
		self.endAnimation = function() {
			_endAnimation(self.callbackAnimation);
			if (animation) scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
		};
		self.labelToScroll = function(label) {
			return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
		};
		self.getTrailing = function(name) {
			var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
			return (_isString$1(name) ? a.filter(function(t) {
				return t.vars.preventOverlaps === name;
			}) : a).filter(function(t) {
				return self.direction > 0 ? t.end <= start : t.start >= end;
			});
		};
		self.update = function(reset, recordVelocity, forceFake) {
			if (containerAnimation && !forceFake && !reset) return;
			var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
			if (recordVelocity) {
				scroll2 = scroll1;
				scroll1 = containerAnimation ? scrollFunc() : scroll;
				if (snap) {
					snap2 = snap1;
					snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
				}
			}
			if (anticipatePin && pin && !_refreshing && !_startup && _lastScrollTime) {
				if (!clipped && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) clipped = 1e-4;
				else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) clipped = .9999;
			}
			if (clipped !== prevProgress && self.enabled) {
				isActive = self.isActive = !!clipped && clipped < 1;
				wasActive = !!prevProgress && prevProgress < 1;
				toggled = isActive !== wasActive;
				stateChanged = toggled || !!clipped !== !!prevProgress;
				self.direction = clipped > prevProgress ? 1 : -1;
				self.progress = clipped;
				if (stateChanged && !_refreshing) {
					toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3;
					if (isToggle) {
						action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
						isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
					}
				}
				preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
					return t.endAnimation();
				}));
				if (!isToggle) {
					if (scrubTween && !_refreshing && !_startup) {
						scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
						if (scrubTween.resetTo) scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
						else {
							scrubTween.vars.totalProgress = clipped;
							scrubTween.invalidate().restart();
						}
					} else if (animation) animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
				}
				if (pin) {
					reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
					if (!useFixedPosition) pinSetter(_round$3(pinStart + pinChange * clipped));
					else if (stateChanged) {
						isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
						if (pinReparent) {
							if (!reset && (isActive || isAtMax)) {
								var bounds = _getBounds(pin, true), _offset = scroll - start;
								_reparent(pin, _body$2, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
							} else _reparent(pin, spacer);
						}
						_setState(isActive || isAtMax ? pinActiveState : pinState);
						pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
					}
				}
				snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
				toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray$3(toggleClass.targets).forEach(function(el) {
					return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
				});
				onUpdate && !isToggle && !reset && onUpdate(self);
				if (stateChanged && !_refreshing) {
					if (isToggle) {
						if (isTakingAction) {
							if (action === "complete") animation.pause().totalProgress(1);
							else if (action === "reset") animation.restart(true).pause();
							else if (action === "restart") animation.restart(true);
							else animation[action]();
						}
						onUpdate && onUpdate(self);
					}
					if (toggled || !_limitCallbacks) {
						onToggle && toggled && _callback(self, onToggle);
						callbacks[toggleState] && _callback(self, callbacks[toggleState]);
						once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
						if (!toggled) {
							toggleState = clipped === 1 ? 1 : 3;
							callbacks[toggleState] && _callback(self, callbacks[toggleState]);
						}
					}
					if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber$1(fastScrollEnd) ? fastScrollEnd : 2500)) {
						_endAnimation(self.callbackAnimation);
						scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
					}
				} else if (isToggle && onUpdate && !_refreshing) onUpdate(self);
			}
			if (markerEndSetter) {
				var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
				markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
				markerEndSetter(n);
			}
			caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
		};
		self.enable = function(reset, refresh) {
			if (!self.enabled) {
				self.enabled = true;
				_addListener(scroller, "resize", _onResize);
				isViewport || _addListener(scroller, "scroll", _onScroll);
				onRefreshInit && _addListener(ScrollTrigger, "refreshInit", onRefreshInit);
				if (reset !== false) {
					self.progress = prevProgress = 0;
					scroll1 = scroll2 = lastSnap = scrollFunc();
				}
				refresh !== false && self.refresh();
			}
		};
		self.getTween = function(snap) {
			return snap && tweenTo ? tweenTo.tween : scrubTween;
		};
		self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
			if (containerAnimation) {
				var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
				newStart = st.start + _change * newStart / duration;
				newEnd = st.start + _change * newEnd / duration;
			}
			self.refresh(false, false, {
				start: _keepClamp(newStart, keepClamp && !!self._startClamp),
				end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
			}, pinOffset);
			self.update();
		};
		self.adjustPinSpacing = function(amount) {
			if (spacerState && amount) {
				var i = spacerState.indexOf(direction.d) + 1;
				spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
				spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
				_setState(spacerState);
			}
		};
		self.disable = function(reset, allowAnimation) {
			reset !== false && self.revert(true, true);
			if (self.enabled) {
				self.enabled = self.isActive = false;
				allowAnimation || scrubTween && scrubTween.pause();
				prevScroll = 0;
				pinCache && (pinCache.uncache = 1);
				onRefreshInit && _removeListener(ScrollTrigger, "refreshInit", onRefreshInit);
				if (snapDelayedCall) {
					snapDelayedCall.pause();
					tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
				}
				if (!isViewport) {
					var i = _triggers.length;
					while (i--) if (_triggers[i].scroller === scroller && _triggers[i] !== self) return;
					_removeListener(scroller, "resize", _onResize);
					isViewport || _removeListener(scroller, "scroll", _onScroll);
				}
			}
		};
		self.kill = function(revert, allowAnimation) {
			self.disable(revert, allowAnimation);
			scrubTween && !allowAnimation && scrubTween.kill();
			id && delete _ids[id];
			var i = _triggers.indexOf(self);
			i >= 0 && _triggers.splice(i, 1);
			i === _i && _direction > 0 && _i--;
			i = 0;
			_triggers.forEach(function(t) {
				return t.scroller === self.scroller && (i = 1);
			});
			i || _refreshingAll || (self.scroll.rec = 0);
			if (animation) {
				animation.scrollTrigger = null;
				revert && animation.revert({ kill: false });
				allowAnimation || animation.kill();
			}
			markerStart && [
				markerStart,
				markerEnd,
				markerStartTrigger,
				markerEndTrigger
			].forEach(function(m) {
				return m.parentNode && m.parentNode.removeChild(m);
			});
			_primary === self && (_primary = 0);
			if (pin) {
				pinCache && (pinCache.uncache = 1);
				i = 0;
				_triggers.forEach(function(t) {
					return t.pin === pin && i++;
				});
				i || (pinCache.spacer = 0);
			}
			vars.onKill && vars.onKill(self);
		};
		_triggers.push(self);
		self.enable(false, false);
		customRevertReturn && customRevertReturn(self);
		if (animation && animation.add && !change) {
			var updateFunc = self.update;
			self.update = function() {
				self.update = updateFunc;
				_scrollers.cache++;
				start || end || self.refresh();
			};
			gsap$3.delayedCall(.01, self.update);
			change = .01;
			start = end = 0;
		} else self.refresh();
		pin && _queueRefreshAll();
	};
	ScrollTrigger.register = function register(core) {
		if (!_coreInitted$1) {
			gsap$3 = core || _getGSAP$2();
			_windowExists$1() && window.document && ScrollTrigger.enable();
			_coreInitted$1 = _enabled;
		}
		return _coreInitted$1;
	};
	ScrollTrigger.defaults = function defaults(config) {
		if (config) for (var p in config) _defaults[p] = config[p];
		return _defaults;
	};
	ScrollTrigger.disable = function disable(reset, kill) {
		_enabled = 0;
		_triggers.forEach(function(trigger) {
			return trigger[kill ? "kill" : "disable"](reset);
		});
		_removeListener(_win$2, "wheel", _onScroll);
		_removeListener(_doc$1, "scroll", _onScroll);
		clearInterval(_syncInterval);
		_removeListener(_doc$1, "touchcancel", _passThrough);
		_removeListener(_body$2, "touchstart", _passThrough);
		_multiListener(_removeListener, _doc$1, "pointerdown,touchstart,mousedown", _pointerDownHandler);
		_multiListener(_removeListener, _doc$1, "pointerup,touchend,mouseup", _pointerUpHandler);
		_resizeDelay.kill();
		_iterateAutoRefresh(_removeListener);
		for (var i = 0; i < _scrollers.length; i += 3) {
			_wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);
			_wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
		}
	};
	ScrollTrigger.enable = function enable() {
		_win$2 = window;
		_doc$1 = document;
		_docEl = _doc$1.documentElement;
		_body$2 = _doc$1.body;
		if (gsap$3) {
			_toArray$3 = gsap$3.utils.toArray;
			_clamp = gsap$3.utils.clamp;
			_context = gsap$3.core.context || _passThrough;
			_suppressOverwrites = gsap$3.core.suppressOverwrites || _passThrough;
			_scrollRestoration = _win$2.history.scrollRestoration || "auto";
			_lastScroll = _win$2.pageYOffset || 0;
			gsap$3.core.globals("ScrollTrigger", ScrollTrigger);
			if (_body$2) {
				_enabled = 1;
				_div100vh = document.createElement("div");
				_div100vh.style.height = "100vh";
				_div100vh.style.position = "absolute";
				_refresh100vh();
				_rafBugFix();
				Observer.register(gsap$3);
				ScrollTrigger.isTouch = Observer.isTouch;
				_fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
				_ignoreMobileResize = Observer.isTouch === 1;
				_addListener(_win$2, "wheel", _onScroll);
				_root = [
					_win$2,
					_doc$1,
					_docEl,
					_body$2
				];
				if (gsap$3.matchMedia) {
					ScrollTrigger.matchMedia = function(vars) {
						var mm = gsap$3.matchMedia(), p;
						for (p in vars) mm.add(p, vars[p]);
						return mm;
					};
					gsap$3.addEventListener("matchMediaInit", function() {
						_recordScrollPositions();
						_revertAll();
					});
					gsap$3.addEventListener("matchMediaRevert", function() {
						return _revertRecorded();
					});
					gsap$3.addEventListener("matchMedia", function() {
						_refreshAll(0, 1);
						_dispatch("matchMedia");
					});
					gsap$3.matchMedia().add("(orientation: portrait)", function() {
						_setBaseDimensions();
						return _setBaseDimensions;
					});
				} else console.warn("Requires GSAP 3.11.0 or later");
				_setBaseDimensions();
				_addListener(_doc$1, "scroll", _onScroll);
				var bodyHasStyle = _body$2.hasAttribute("style"), bodyStyle = _body$2.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap$3.core.Animation.prototype, bounds, i;
				AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", { value: function value() {
					return this.time(-.01, true);
				} });
				bodyStyle.borderTopStyle = "solid";
				bounds = _getBounds(_body$2);
				_vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
				_horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
				border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
				if (!bodyHasStyle) {
					_body$2.setAttribute("style", "");
					_body$2.removeAttribute("style");
				}
				_syncInterval = setInterval(_sync, 250);
				gsap$3.delayedCall(.5, function() {
					return _startup = 0;
				});
				_addListener(_doc$1, "touchcancel", _passThrough);
				_addListener(_body$2, "touchstart", _passThrough);
				_multiListener(_addListener, _doc$1, "pointerdown,touchstart,mousedown", _pointerDownHandler);
				_multiListener(_addListener, _doc$1, "pointerup,touchend,mouseup", _pointerUpHandler);
				_transformProp$1 = gsap$3.utils.checkPrefix("transform");
				_stateProps.push(_transformProp$1);
				_coreInitted$1 = _getTime();
				_resizeDelay = gsap$3.delayedCall(.2, _refreshAll).pause();
				_autoRefresh = [
					_doc$1,
					"visibilitychange",
					function() {
						var w = _win$2.innerWidth, h = _win$2.innerHeight;
						if (_doc$1.hidden) {
							_prevWidth = w;
							_prevHeight = h;
						} else if (_prevWidth !== w || _prevHeight !== h) _onResize();
					},
					_doc$1,
					"DOMContentLoaded",
					_refreshAll,
					_win$2,
					"load",
					_refreshAll,
					_win$2,
					"resize",
					_onResize
				];
				_iterateAutoRefresh(_addListener);
				_triggers.forEach(function(trigger) {
					return trigger.enable(0, 1);
				});
				for (i = 0; i < _scrollers.length; i += 3) {
					_wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);
					_wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
				}
			} else if (_doc$1) _doc$1.addEventListener("DOMContentLoaded", function onLoad() {
				ScrollTrigger.enable();
				_doc$1.removeEventListener("DOMContentLoaded", onLoad);
			});
		}
	};
	ScrollTrigger.config = function config(vars) {
		"limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
		var ms = vars.syncInterval;
		ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
		"ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);
		if ("autoRefreshEvents" in vars) {
			_iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none");
			_ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
		}
	};
	ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
		var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport(t);
		if (~i) _scrollers.splice(i, isViewport ? 6 : 2);
		if (vars) isViewport ? _proxies.unshift(_win$2, vars, _body$2, vars, _docEl, vars) : _proxies.unshift(t, vars);
	};
	ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
		_triggers.forEach(function(t) {
			return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
		});
	};
	ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
		var bounds = (_isString$1(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
		return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win$2.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win$2.innerHeight;
	};
	ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
		_isString$1(element) && (element = _getTarget(element));
		var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
		return horizontal ? (bounds.left + offset) / _win$2.innerWidth : (bounds.top + offset) / _win$2.innerHeight;
	};
	ScrollTrigger.killAll = function killAll(allowListeners) {
		_triggers.slice(0).forEach(function(t) {
			return t.vars.id !== "ScrollSmoother" && t.kill();
		});
		if (allowListeners !== true) {
			var listeners = _listeners.killAll || [];
			_listeners = {};
			listeners.forEach(function(f) {
				return f();
			});
		}
	};
	return ScrollTrigger;
}();
ScrollTrigger.version = "3.15.0";
ScrollTrigger.saveStyles = function(targets) {
	return targets ? _toArray$3(targets).forEach(function(target) {
		if (target && target.style) {
			var i = _savedStyles.indexOf(target);
			i >= 0 && _savedStyles.splice(i, 5);
			_savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap$3.core.getCache(target), _context());
		}
	}) : _savedStyles;
};
ScrollTrigger.revert = function(soft, media) {
	return _revertAll(!soft, media);
};
ScrollTrigger.create = function(vars, animation) {
	return new ScrollTrigger(vars, animation);
};
ScrollTrigger.refresh = function(safe) {
	return safe ? _onResize(true) : (_coreInitted$1 || ScrollTrigger.register()) && _refreshAll(true);
};
ScrollTrigger.update = function(force) {
	return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
};
ScrollTrigger.clearScrollMemory = _clearScrollMemory;
ScrollTrigger.maxScroll = function(element, horizontal) {
	return _maxScroll(element, horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getScrollFunc = function(element, horizontal) {
	return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getById = function(id) {
	return _ids[id];
};
ScrollTrigger.getAll = function() {
	return _triggers.filter(function(t) {
		return t.vars.id !== "ScrollSmoother";
	});
};
ScrollTrigger.isScrolling = function() {
	return !!_lastScrollTime;
};
ScrollTrigger.snapDirectional = _snapDirectional;
ScrollTrigger.addEventListener = function(type, callback) {
	var a = _listeners[type] || (_listeners[type] = []);
	~a.indexOf(callback) || a.push(callback);
};
ScrollTrigger.removeEventListener = function(type, callback) {
	var a = _listeners[type], i = a && a.indexOf(callback);
	i >= 0 && a.splice(i, 1);
};
ScrollTrigger.batch = function(targets, vars) {
	var result = [], varsCopy = {}, interval = vars.interval || .016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback(type, callback) {
		var elements = [], triggers = [], delay = gsap$3.delayedCall(interval, function() {
			callback(elements, triggers);
			elements = [];
			triggers = [];
		}).pause();
		return function(self) {
			elements.length || delay.restart(true);
			elements.push(self.trigger);
			triggers.push(self);
			batchMax <= elements.length && delay.progress(1);
		};
	}, p;
	for (p in vars) varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
	if (_isFunction(batchMax)) {
		batchMax = batchMax();
		_addListener(ScrollTrigger, "refresh", function() {
			return batchMax = vars.batchMax();
		});
	}
	_toArray$3(targets).forEach(function(target) {
		var config = {};
		for (p in varsCopy) config[p] = varsCopy[p];
		config.trigger = target;
		result.push(ScrollTrigger.create(config));
	});
	return result;
};
var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
	current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
	return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
};
var _allowNativePanning = function _allowNativePanning(target, direction) {
	if (direction === true) target.style.removeProperty("touch-action");
	else target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
	target === _docEl && _allowNativePanning(_body$2, direction);
};
var _overflow = {
	auto: 1,
	scroll: 1
};
var _nestedScroll = function _nestedScroll(_ref5) {
	var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
	var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || gsap$3.core.getCache(node), time = _getTime(), cs;
	if (!cache._isScrollT || time - cache._isScrollT > 2e3) {
		while (node && node !== _body$2 && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) node = node.parentNode;
		cache._isScroll = node && node !== target && !_isViewport(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
		cache._isScrollT = time;
	}
	if (cache._isScroll || axis === "x") {
		event.stopPropagation();
		event._gsapAllow = true;
	}
};
var _inputObserver = function _inputObserver(target, type, inputs, nested) {
	return Observer.create({
		target,
		capture: true,
		debounce: false,
		lockAxis: true,
		type,
		onWheel: nested = nested && _nestedScroll,
		onPress: nested,
		onDrag: nested,
		onScroll: nested,
		onEnable: function onEnable() {
			return inputs && _addListener(_doc$1, Observer.eventTypes[0], _captureInputs, false, true);
		},
		onDisable: function onDisable() {
			return _removeListener(_doc$1, Observer.eventTypes[0], _captureInputs, true);
		}
	});
};
var _inputExp = /(input|label|select|textarea)/i;
var _inputIsFocused;
var _captureInputs = function _captureInputs(e) {
	var isInput = _inputExp.test(e.target.tagName);
	if (isInput || _inputIsFocused) {
		e._gsapAllow = true;
		_inputIsFocused = isInput;
	}
};
var _getScrollNormalizer = function _getScrollNormalizer(vars) {
	_isObject(vars) || (vars = {});
	vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
	vars.type || (vars.type = "wheel,touch");
	vars.debounce = !!vars.debounce;
	vars.id = vars.id || "normalizer";
	var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl, smoother = gsap$3.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win$2.visualViewport ? _win$2.visualViewport.scale * _win$2.visualViewport.width : _win$2.outerWidth) / _win$2.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction(momentum) ? function() {
		return momentum(self);
	} : function() {
		return momentum || 2.8;
	}, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove() {
		return skipTouchMove = false;
	}, scrollClampX = _passThrough, scrollClampY = _passThrough, updateClamps = function updateClamps() {
		maxY = _maxScroll(target, _vertical);
		scrollClampY = _clamp(_fixIOSBug ? 1 : 0, maxY);
		normalizeScrollX && (scrollClampX = _clamp(0, _maxScroll(target, _horizontal)));
		lastRefreshID = _refreshID;
	}, removeContentOffset = function removeContentOffset() {
		content._gsap.y = _round$3(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
		content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
		scrollFuncY.offset = scrollFuncY.cacheID = 0;
	}, ignoreDrag = function ignoreDrag() {
		if (skipTouchMove) {
			requestAnimationFrame(resumeTouchMove);
			var offset = _round$3(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
			if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
				scrollFuncY.offset = scroll - scrollFuncY.v;
				var y = _round$3((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
				content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
				content._gsap.y = y + "px";
				scrollFuncY.cacheID = _scrollers.cache;
				_updateAll();
			}
			return true;
		}
		scrollFuncY.offset && removeContentOffset();
		skipTouchMove = true;
	}, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize() {
		updateClamps();
		if (tween.isActive() && tween.vars.scrollY > maxY) scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
	};
	content && gsap$3.set(content, { y: "+=0" });
	vars.ignoreCheck = function(e) {
		return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
	};
	vars.onPress = function() {
		skipTouchMove = false;
		var prevScale = scale;
		scale = _round$3((_win$2.visualViewport && _win$2.visualViewport.scale || 1) / initialScale);
		tween.pause();
		prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
		startScrollX = scrollFuncX();
		startScrollY = scrollFuncY();
		updateClamps();
		lastRefreshID = _refreshID;
	};
	vars.onRelease = vars.onGestureStart = function(self, wasDragging) {
		scrollFuncY.offset && removeContentOffset();
		if (!wasDragging) onStopDelayedCall.restart(true);
		else {
			_scrollers.cache++;
			var dur = resolveMomentumDuration(), currentScroll, endScroll;
			if (normalizeScrollX) {
				currentScroll = scrollFuncX();
				endScroll = currentScroll + dur * .05 * -self.velocityX / .227;
				dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
				tween.vars.scrollX = scrollClampX(endScroll);
			}
			currentScroll = scrollFuncY();
			endScroll = currentScroll + dur * .05 * -self.velocityY / .227;
			dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
			tween.vars.scrollY = scrollClampY(endScroll);
			tween.invalidate().duration(dur).play(.01);
			if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) gsap$3.to({}, {
				onUpdate: onResize,
				duration: dur
			});
		}
		onRelease && onRelease(self);
	};
	vars.onWheel = function() {
		tween._ts && tween.pause();
		if (_getTime() - wheelRefresh > 1e3) {
			lastRefreshID = 0;
			wheelRefresh = _getTime();
		}
	};
	vars.onChange = function(self, dx, dy, xArray, yArray) {
		_refreshID !== lastRefreshID && updateClamps();
		dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1]));
		if (dy) {
			scrollFuncY.offset && removeContentOffset();
			var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
			isTouch && y !== yClamped && (startScrollY += yClamped - y);
			scrollFuncY(yClamped);
		}
		(dy || dx) && _updateAll();
	};
	vars.onEnable = function() {
		_allowNativePanning(target, normalizeScrollX ? false : "x");
		ScrollTrigger.addEventListener("refresh", onResize);
		_addListener(_win$2, "resize", onResize);
		if (scrollFuncY.smooth) {
			scrollFuncY.target.style.scrollBehavior = "auto";
			scrollFuncY.smooth = scrollFuncX.smooth = false;
		}
		inputObserver.enable();
	};
	vars.onDisable = function() {
		_allowNativePanning(target, true);
		_removeListener(_win$2, "resize", onResize);
		ScrollTrigger.removeEventListener("refresh", onResize);
		inputObserver.kill();
	};
	vars.lockAxis = vars.lockAxis !== false;
	self = new Observer(vars);
	self.iOS = _fixIOSBug;
	_fixIOSBug && !scrollFuncY() && scrollFuncY(1);
	_fixIOSBug && gsap$3.ticker.add(_passThrough);
	onStopDelayedCall = self._dc;
	tween = gsap$3.to(self, {
		ease: "power4",
		paused: true,
		inherit: false,
		scrollX: normalizeScrollX ? "+=0.1" : "+=0",
		scrollY: "+=0.1",
		modifiers: { scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
			return tween.pause();
		}) },
		onUpdate: _updateAll,
		onComplete: onStopDelayedCall.vars.onComplete
	});
	return self;
};
ScrollTrigger.sort = function(func) {
	if (_isFunction(func)) return _triggers.sort(func);
	var scroll = _win$2.pageYOffset || 0;
	ScrollTrigger.getAll().forEach(function(t) {
		return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win$2.innerHeight;
	});
	return _triggers.sort(func || function(a, b) {
		return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b.vars.containerAnimation ? 1e6 : b._sortY) + (b.vars.refreshPriority || 0) * -1e6);
	});
};
ScrollTrigger.observe = function(vars) {
	return new Observer(vars);
};
ScrollTrigger.normalizeScroll = function(vars) {
	if (typeof vars === "undefined") return _normalizer;
	if (vars === true && _normalizer) return _normalizer.enable();
	if (vars === false) {
		_normalizer && _normalizer.kill();
		_normalizer = vars;
		return;
	}
	var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
	_normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
	_isViewport(normalizer.target) && (_normalizer = normalizer);
	return normalizer;
};
ScrollTrigger.core = {
	_getVelocityProp,
	_inputObserver,
	_scrollers,
	_proxies,
	bridge: {
		ss: function ss() {
			_lastScrollTime || _dispatch("scrollStart");
			_lastScrollTime = _getTime();
		},
		ref: function ref() {
			return _refreshing;
		}
	}
};
_getGSAP$2() && gsap$3.registerPlugin(ScrollTrigger);
//#endregion
//#region node_modules/gsap/DrawSVGPlugin.js
/*!
* DrawSVGPlugin 3.15.0
* https://gsap.com
*
* @license Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var gsap$2;
var _toArray$2;
var _win$1;
var _isEdge;
var _coreInitted;
var _warned;
var _getStyleSaver$2;
var _reverting$1;
var _windowExists = function _windowExists() {
	return typeof window !== "undefined";
};
var _getGSAP$1 = function _getGSAP() {
	return gsap$2 || _windowExists() && (gsap$2 = window.gsap) && gsap$2.registerPlugin && gsap$2;
};
var _numExp$1 = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi;
var _types = {
	rect: ["width", "height"],
	circle: ["r", "r"],
	ellipse: ["rx", "ry"],
	line: ["x2", "y2"]
};
var _round$2 = function _round(value) {
	return Math.round(value * 1e4) / 1e4;
};
var _parseNum = function _parseNum(value) {
	return parseFloat(value) || 0;
};
var _parseSingleVal = function _parseSingleVal(value, length) {
	var num = _parseNum(value);
	return ~value.indexOf("%") ? num / 100 * length : num;
};
var _getAttributeAsNumber = function _getAttributeAsNumber(target, attr) {
	return _parseNum(target.getAttribute(attr));
};
var _sqrt$1 = Math.sqrt;
var _getDistance = function _getDistance(x1, y1, x2, y2, scaleX, scaleY) {
	return _sqrt$1(Math.pow((_parseNum(x2) - _parseNum(x1)) * scaleX, 2) + Math.pow((_parseNum(y2) - _parseNum(y1)) * scaleY, 2));
};
var _warn = function _warn(message) {
	return console.warn(message);
};
var _hasNonScalingStroke = function _hasNonScalingStroke(target) {
	return target.getAttribute("vector-effect") === "non-scaling-stroke";
};
var _bonusValidated = 1;
var _parse = function _parse(value, length, defaultStart) {
	var i = value.indexOf(" "), s, e;
	if (i < 0) {
		s = defaultStart !== void 0 ? defaultStart + "" : value;
		e = value;
	} else {
		s = value.substr(0, i);
		e = value.substr(i + 1);
	}
	s = _parseSingleVal(s, length);
	e = _parseSingleVal(e, length);
	return s > e ? [e, s] : [s, e];
};
var _getLength = function _getLength(target) {
	target = _toArray$2(target)[0];
	if (!target) return 0;
	var type = target.tagName.toLowerCase(), style = target.style, scaleX = 1, scaleY = 1, length, bbox, points, prevPoint, i, rx, ry;
	if (_hasNonScalingStroke(target)) {
		scaleY = target.getScreenCTM();
		scaleX = _sqrt$1(scaleY.a * scaleY.a + scaleY.b * scaleY.b);
		scaleY = _sqrt$1(scaleY.d * scaleY.d + scaleY.c * scaleY.c);
	}
	try {
		bbox = target.getBBox();
	} catch (e) {
		_warn("Some browsers won't measure invisible elements (like display:none or masks inside defs).");
	}
	var _ref = bbox || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	}, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
	if ((!bbox || !width && !height) && _types[type]) {
		width = _getAttributeAsNumber(target, _types[type][0]);
		height = _getAttributeAsNumber(target, _types[type][1]);
		if (type !== "rect" && type !== "line") {
			width *= 2;
			height *= 2;
		}
		if (type === "line") {
			x = _getAttributeAsNumber(target, "x1");
			y = _getAttributeAsNumber(target, "y1");
			width = Math.abs(width - x);
			height = Math.abs(height - y);
		}
	}
	if (type === "path") {
		prevPoint = style.strokeDasharray;
		style.strokeDasharray = "none";
		length = target.getTotalLength() || 0;
		_round$2(scaleX) !== _round$2(scaleY) && !_warned && (_warned = 1) && _warn("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.");
		length *= (scaleX + scaleY) / 2;
		style.strokeDasharray = prevPoint;
	} else if (type === "rect") length = width * 2 * scaleX + height * 2 * scaleY;
	else if (type === "line") length = _getDistance(x, y, x + width, y + height, scaleX, scaleY);
	else if (type === "polyline" || type === "polygon") {
		points = target.getAttribute("points").match(_numExp$1) || [];
		type === "polygon" && points.push(points[0], points[1]);
		length = 0;
		for (i = 2; i < points.length; i += 2) length += _getDistance(points[i - 2], points[i - 1], points[i], points[i + 1], scaleX, scaleY) || 0;
	} else if (type === "circle" || type === "ellipse") {
		rx = width / 2 * scaleX;
		ry = height / 2 * scaleY;
		length = Math.PI * (3 * (rx + ry) - _sqrt$1((3 * rx + ry) * (rx + 3 * ry)));
	}
	return length || 0;
};
var _getPosition = function _getPosition(target, length) {
	target = _toArray$2(target)[0];
	if (!target) return [0, 0];
	length || (length = _getLength(target) + 1);
	var cs = _win$1.getComputedStyle(target), dash = cs.strokeDasharray || "", offset = _parseNum(cs.strokeDashoffset), i = dash.indexOf(",");
	i < 0 && (i = dash.indexOf(" "));
	dash = i < 0 ? length : _parseNum(dash.substr(0, i));
	dash > length && (dash = length);
	return [-offset || 0, dash - offset || 0];
};
var _initCore = function _initCore() {
	if (_windowExists()) {
		_win$1 = window;
		_coreInitted = gsap$2 = _getGSAP$1();
		_toArray$2 = gsap$2.utils.toArray;
		_getStyleSaver$2 = gsap$2.core.getStyleSaver;
		_reverting$1 = gsap$2.core.reverting || function() {};
		_isEdge = ((_win$1.navigator || {}).userAgent || "").indexOf("Edge") !== -1;
	}
};
var DrawSVGPlugin = {
	version: "3.15.0",
	name: "drawSVG",
	register: function register(core) {
		gsap$2 = core;
		_initCore();
	},
	init: function init(target, value, tween, index, targets) {
		if (!target.getBBox) return false;
		_coreInitted || _initCore();
		var length = _getLength(target), start, end, cs;
		this.styles = _getStyleSaver$2 && _getStyleSaver$2(target, "strokeDashoffset,strokeDasharray,strokeMiterlimit");
		this.tween = tween;
		this._style = target.style;
		this._target = target;
		if (value + "" === "true") value = "0 100%";
		else if (!value) value = "0 0";
		else if ((value + "").indexOf(" ") === -1) value = "0 " + value;
		start = _getPosition(target, length);
		end = _parse(value, length, start[0]);
		this._length = _round$2(length);
		this._dash = _round$2(start[1] - start[0]);
		this._offset = _round$2(-start[0]);
		this._dashPT = this.add(this, "_dash", this._dash, _round$2(end[1] - end[0]), 0, 0, 0, 0, 0, 1);
		this._offsetPT = this.add(this, "_offset", this._offset, _round$2(-end[0]), 0, 0, 0, 0, 0, 1);
		if (_isEdge) {
			cs = _win$1.getComputedStyle(target);
			if (cs.strokeLinecap !== cs.strokeLinejoin) {
				end = _parseNum(cs.strokeMiterlimit);
				this.add(target.style, "strokeMiterlimit", end, end + .01);
			}
		}
		this._live = _hasNonScalingStroke(target) || ~(value + "").indexOf("live");
		this._nowrap = ~(value + "").indexOf("nowrap");
		this._props.push("drawSVG");
		return _bonusValidated;
	},
	render: function render(ratio, data) {
		if (data.tween._time || !_reverting$1()) {
			var pt = data._pt, style = data._style, length, lengthRatio, dash, offset;
			if (pt) {
				if (data._live) {
					length = _getLength(data._target);
					if (length !== data._length) {
						lengthRatio = length / data._length;
						data._length = length;
						if (data._offsetPT) {
							data._offsetPT.s *= lengthRatio;
							data._offsetPT.c *= lengthRatio;
						}
						if (data._dashPT) {
							data._dashPT.s *= lengthRatio;
							data._dashPT.c *= lengthRatio;
						} else data._dash *= lengthRatio;
					}
				}
				while (pt) {
					pt.r(ratio, pt.d);
					pt = pt._next;
				}
				dash = data._dash || ratio && ratio !== 1 && 1e-4 || 0;
				length = data._length - dash + .1;
				offset = data._offset;
				dash && offset && dash + Math.abs(offset % data._length) > data._length - .05 && (offset += offset < 0 ? .005 : -.005) && (length += .005);
				style.strokeDashoffset = dash ? offset : offset + .001;
				style.strokeDasharray = length < .1 ? "none" : dash ? dash + "px," + (data._nowrap ? 999999 : length) + "px" : "0px, 999999px";
			}
		} else data.styles.revert();
	},
	getLength: _getLength,
	getPosition: _getPosition
};
_getGSAP$1() && gsap$2.registerPlugin(DrawSVGPlugin);
//#endregion
//#region node_modules/gsap/utils/matrix.js
/*!
* matrix 3.15.0
* https://gsap.com
*
* Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var _doc;
var _win;
var _docElement;
var _body$1;
var _divContainer;
var _svgContainer;
var _identityMatrix;
var _gEl;
var _transformProp = "transform";
var _transformOriginProp = _transformProp + "Origin";
var _hasOffsetBug;
var _setDoc = function _setDoc(element) {
	var doc = element.ownerDocument || element;
	if (!(_transformProp in element.style) && "msTransform" in element.style) {
		_transformProp = "msTransform";
		_transformOriginProp = _transformProp + "Origin";
	}
	while (doc.parentNode && (doc = doc.parentNode));
	_win = window;
	_identityMatrix = new Matrix2D();
	if (doc) {
		_doc = doc;
		_docElement = doc.documentElement;
		_body$1 = doc.body;
		_gEl = _doc.createElementNS("http://www.w3.org/2000/svg", "g");
		_gEl.style.transform = "none";
		var d1 = doc.createElement("div"), d2 = doc.createElement("div"), root = doc && (doc.body || doc.firstElementChild);
		if (root && root.appendChild) {
			root.appendChild(d1);
			d1.appendChild(d2);
			d1.style.position = "static";
			d1.style.transform = "translate3d(0,0,1px)";
			_hasOffsetBug = d2.offsetParent !== d1;
			root.removeChild(d1);
		}
	}
	return doc;
};
var _forceNonZeroScale = function _forceNonZeroScale(e) {
	var a, cache;
	while (e && e !== _body$1) {
		cache = e._gsap;
		cache && cache.uncache && cache.get(e, "x");
		if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
			cache.scaleX = cache.scaleY = 1e-4;
			cache.renderTransform(1, cache);
			a ? a.push(cache) : a = [cache];
		}
		e = e.parentNode;
	}
	return a;
};
var _svgTemps = [];
var _divTemps = [];
var _getDocScrollTop = function _getDocScrollTop() {
	return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body$1.scrollTop || 0;
};
var _getDocScrollLeft = function _getDocScrollLeft() {
	return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body$1.scrollLeft || 0;
};
var _svgOwner = function _svgOwner(element) {
	return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
};
var _isFixed = function _isFixed(element) {
	if (_win.getComputedStyle(element).position === "fixed") return true;
	element = element.parentNode;
	if (element && element.nodeType === 1) return _isFixed(element);
};
var _createSibling = function _createSibling(element, i) {
	if (element.parentNode && (_doc || _setDoc(element))) {
		var svg = _svgOwner(element), ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", type = svg ? i ? "rect" : "g" : "div", x = i !== 2 ? 0 : 100, y = i === 3 ? 100 : 0, css = {
			position: "absolute",
			display: "block",
			pointerEvents: "none",
			margin: "0",
			padding: "0"
		}, e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);
		if (i) {
			if (!svg) {
				if (!_divContainer) {
					_divContainer = _createSibling(element);
					Object.assign(_divContainer.style, css);
				}
				Object.assign(e.style, css, {
					width: "0.1px",
					height: "0.1px",
					top: y + "px",
					left: x + "px"
				});
				_divContainer.appendChild(e);
			} else {
				_svgContainer || (_svgContainer = _createSibling(element));
				e.setAttribute("width", .01);
				e.setAttribute("height", .01);
				e.setAttribute("transform", "translate(" + x + "," + y + ")");
				e.setAttribute("fill", "transparent");
				_svgContainer.appendChild(e);
			}
		}
		return e;
	}
	throw "Need document and parent.";
};
var _consolidate = function _consolidate(m) {
	var c = new Matrix2D(), i = 0;
	for (; i < m.numberOfItems; i++) c.multiply(m.getItem(i).matrix);
	return c;
};
var _getCTM = function _getCTM(svg) {
	var m = svg.getCTM(), transform;
	if (!m) {
		transform = svg.style[_transformProp];
		svg.style[_transformProp] = "none";
		svg.appendChild(_gEl);
		m = _gEl.getCTM();
		svg.removeChild(_gEl);
		transform ? svg.style[_transformProp] = transform : svg.style.removeProperty(_transformProp.replace(/([A-Z])/g, "-$1").toLowerCase());
	}
	return m || _identityMatrix.clone();
};
var _placeSiblings = function _placeSiblings(element, adjustGOffset) {
	var svg = _svgOwner(element), isRootSVG = element === svg, siblings = svg ? _svgTemps : _divTemps, parent = element.parentNode, appendToEl = parent && !svg && parent.shadowRoot && parent.shadowRoot.appendChild ? parent.shadowRoot : parent, container, m, b, x, y, cs;
	if (element === _win) return element;
	siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
	container = svg ? _svgContainer : _divContainer;
	if (svg) {
		if (isRootSVG) {
			b = _getCTM(element);
			x = -b.e / b.a;
			y = -b.f / b.d;
			m = _identityMatrix;
		} else if (element.getBBox) {
			b = element.getBBox();
			m = element.transform ? element.transform.baseVal : {};
			m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix;
			x = m.a * b.x + m.c * b.y;
			y = m.b * b.x + m.d * b.y;
		} else {
			m = new Matrix2D();
			x = y = 0;
		}
		if (adjustGOffset && element.tagName.toLowerCase() === "g") x = y = 0;
		(isRootSVG || !element.getBoundingClientRect().width ? svg : parent).appendChild(container);
		container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
	} else {
		x = y = 0;
		if (_hasOffsetBug) {
			m = element.offsetParent;
			b = element;
			while (b && (b = b.parentNode) && b !== m && b.parentNode) if ((_win.getComputedStyle(b)[_transformProp] + "").length > 4) {
				x = b.offsetLeft;
				y = b.offsetTop;
				b = 0;
			}
		}
		cs = _win.getComputedStyle(element);
		if (cs.position !== "absolute" && cs.position !== "fixed") {
			m = element.offsetParent;
			while (parent && parent !== m) {
				x += parent.scrollLeft || 0;
				y += parent.scrollTop || 0;
				parent = parent.parentNode;
			}
		}
		b = container.style;
		b.top = element.offsetTop - y + "px";
		b.left = element.offsetLeft - x + "px";
		b[_transformProp] = cs[_transformProp];
		b[_transformOriginProp] = cs[_transformOriginProp];
		b.position = cs.position === "fixed" ? "fixed" : "absolute";
		appendToEl.appendChild(container);
	}
	return container;
};
var _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
	m.a = a;
	m.b = b;
	m.c = c;
	m.d = d;
	m.e = e;
	m.f = f;
	return m;
};
var Matrix2D = /*#__PURE__*/ function() {
	function Matrix2D(a, b, c, d, e, f) {
		if (a === void 0) a = 1;
		if (b === void 0) b = 0;
		if (c === void 0) c = 0;
		if (d === void 0) d = 1;
		if (e === void 0) e = 0;
		if (f === void 0) f = 0;
		_setMatrix(this, a, b, c, d, e, f);
	}
	var _proto = Matrix2D.prototype;
	_proto.inverse = function inverse() {
		var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, determinant = a * d - b * c || 1e-10;
		return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
	};
	_proto.multiply = function multiply(matrix) {
		var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, a2 = matrix.a, b2 = matrix.c, c2 = matrix.b, d2 = matrix.d, e2 = matrix.e, f2 = matrix.f;
		return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
	};
	_proto.clone = function clone() {
		return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
	};
	_proto.equals = function equals(matrix) {
		var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
		return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
	};
	_proto.apply = function apply(point, decoratee) {
		if (decoratee === void 0) decoratee = {};
		var x = point.x, y = point.y, a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
		decoratee.x = x * a + y * c + e || 0;
		decoratee.y = x * b + y * d + f || 0;
		return decoratee;
	};
	return Matrix2D;
}();
function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
	if (!element || !element.parentNode || (_doc || _setDoc(element)).documentElement === element) return new Matrix2D();
	var zeroScales = _forceNonZeroScale(element), temps = _svgOwner(element) ? _svgTemps : _divTemps, container = _placeSiblings(element, adjustGOffset), b1 = temps[0].getBoundingClientRect(), b2 = temps[1].getBoundingClientRect(), b3 = temps[2].getBoundingClientRect(), parent = container.parentNode, isFixed = !includeScrollInFixed && _isFixed(element), m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));
	parent.removeChild(container);
	if (zeroScales) {
		b1 = zeroScales.length;
		while (b1--) {
			b2 = zeroScales[b1];
			b2.scaleX = b2.scaleY = 0;
			b2.renderTransform(1, b2);
		}
	}
	return inverse ? m.inverse() : m;
}
//#endregion
//#region node_modules/gsap/Flip.js
/*!
* Flip 3.15.0
* https://gsap.com
*
* @license Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var _id = 1;
var _toArray$1;
var gsap$1;
var _batch;
var _batchAction;
var _body;
var _closestTenth;
var _getStyleSaver$1;
var _forEachBatch = function _forEachBatch(batch, name) {
	return batch.actions.forEach(function(a) {
		return a.vars[name] && a.vars[name](a);
	});
};
var _batchLookup = {};
var _RAD2DEG$1 = 180 / Math.PI;
var _DEG2RAD$2 = Math.PI / 180;
var _emptyObj = {};
var _dashedNameLookup = {};
var _memoizedRemoveProps = {};
var _listToArray = function _listToArray(list) {
	return typeof list === "string" ? list.split(" ").join("").split(",") : list;
};
var _callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt");
var _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight");
var _getEl = function _getEl(target) {
	return _toArray$1(target)[0] || console.warn("Element not found:", target);
};
var _round$1 = function _round(value) {
	return Math.round(value * 1e4) / 1e4 || 0;
};
var _toggleClass = function _toggleClass(targets, className, action) {
	return targets.forEach(function(el) {
		return el.classList[action](className);
	});
};
var _reserved = {
	zIndex: 1,
	kill: 1,
	simple: 1,
	spin: 1,
	clearProps: 1,
	targets: 1,
	toggleClass: 1,
	onComplete: 1,
	onUpdate: 1,
	onInterrupt: 1,
	onStart: 1,
	delay: 1,
	repeat: 1,
	repeatDelay: 1,
	yoyo: 1,
	scale: 1,
	fade: 1,
	absolute: 1,
	props: 1,
	onEnter: 1,
	onLeave: 1,
	custom: 1,
	paused: 1,
	nested: 1,
	prune: 1,
	absoluteOnLeave: 1
};
var _fitReserved = {
	zIndex: 1,
	simple: 1,
	clearProps: 1,
	scale: 1,
	absolute: 1,
	fitChild: 1,
	getVars: 1,
	props: 1
};
var _camelToDashed = function _camelToDashed(p) {
	return p.replace(/([A-Z])/g, "-$1").toLowerCase();
};
var _copy = function _copy(obj, exclude) {
	var result = {}, p;
	for (p in obj) exclude[p] || (result[p] = obj[p]);
	return result;
};
var _memoizedProps = {};
var _memoizeProps = function _memoizeProps(props) {
	var p = _memoizedProps[props] = _listToArray(props);
	_memoizedRemoveProps[props] = p.concat(_removeProps);
	return p;
};
var _getInverseGlobalMatrix = function _getInverseGlobalMatrix(el) {
	var cache = el._gsap || gsap$1.core.getCache(el);
	if (cache.gmCache === gsap$1.ticker.frame) return cache.gMatrix;
	cache.gmCache = gsap$1.ticker.frame;
	return cache.gMatrix = getGlobalMatrix(el, true, false, true);
};
var _getDOMDepth = function _getDOMDepth(el, invert, level) {
	if (level === void 0) level = 0;
	var parent = el.parentNode, inc = 1e3 * Math.pow(10, level) * (invert ? -1 : 1), l = invert ? -inc * 900 : 0;
	while (el) {
		l += inc;
		el = el.previousSibling;
	}
	return parent ? l + _getDOMDepth(parent, invert, level + 1) : l;
};
var _orderByDOMDepth = function _orderByDOMDepth(comps, invert, isElStates) {
	comps.forEach(function(comp) {
		return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
	});
	comps.sort(function(c1, c2) {
		return c1.d - c2.d;
	});
	return comps;
};
var _recordInlineStyles = function _recordInlineStyles(elState, props) {
	var style = elState.element.style, a = elState.css = elState.css || [], i = props.length, p, v;
	while (i--) {
		p = props[i];
		v = style[p] || style.getPropertyValue(p);
		a.push(v ? p : _dashedNameLookup[p] || (_dashedNameLookup[p] = _camelToDashed(p)), v);
	}
	return style;
};
var _applyInlineStyles = function _applyInlineStyles(state) {
	var css = state.css, style = state.element.style, i = 0;
	state.cache.uncache = 1;
	for (; i < css.length; i += 2) css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
	if (!css[css.indexOf("transform") + 1] && style.translate) {
		style.removeProperty("translate");
		style.removeProperty("scale");
		style.removeProperty("rotate");
	}
};
var _setFinalStates = function _setFinalStates(comps, onlyTransforms) {
	comps.forEach(function(c) {
		return c.a.cache.uncache = 1;
	});
	onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
};
var _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(",");
var _makeAbsolute = function _makeAbsolute(elState, fallbackNode, ignoreBatch) {
	var element = elState.element, width = elState.width, height = elState.height, uncache = elState.uncache, getProp = elState.getProp, style = element.style, i = 4, result, displayIsNone, cs;
	typeof fallbackNode !== "object" && (fallbackNode = elState);
	if (_batch && ignoreBatch !== 1) {
		_batch._abs.push({
			t: element,
			b: elState,
			a: elState,
			sd: 0
		});
		_batch._final.push(function() {
			return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
		});
		return element;
	}
	displayIsNone = getProp("display") === "none";
	if (!elState.isVisible || displayIsNone) {
		displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
		elState.matrix = fallbackNode.matrix;
		elState.width = width = elState.width || fallbackNode.width;
		elState.height = height = elState.height || fallbackNode.height;
	}
	_recordInlineStyles(elState, _absoluteProps);
	cs = window.getComputedStyle(element);
	while (i--) style[_absoluteProps[i]] = cs[_absoluteProps[i]];
	style.gridArea = "1 / 1 / 1 / 1";
	style.transition = "none";
	style.position = "absolute";
	style.width = width + "px";
	style.height = height + "px";
	style.top || (style.top = "0px");
	style.left || (style.left = "0px");
	if (uncache) result = new ElementState(element);
	else {
		result = _copy(elState, _emptyObj);
		result.position = "absolute";
		if (elState.simple) {
			var bounds = element.getBoundingClientRect();
			result.matrix = new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop());
		} else result.matrix = getGlobalMatrix(element, false, false, true);
	}
	result = _fit(result, elState, true);
	elState.x = _closestTenth(result.x, .01);
	elState.y = _closestTenth(result.y, .01);
	return element;
};
var _filterComps = function _filterComps(comps, targets) {
	if (targets !== true) {
		targets = _toArray$1(targets);
		comps = comps.filter(function(c) {
			if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) return true;
			else {
				c.t._gsap.renderTransform(1);
				if (c.b.isVisible) {
					c.t.style.width = c.b.width + "px";
					c.t.style.height = c.b.height + "px";
				}
			}
		});
	}
	return comps;
};
var _makeCompsAbsolute = function _makeCompsAbsolute(comps) {
	return _orderByDOMDepth(comps, true).forEach(function(c) {
		return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
	});
};
var _findElStateInState = function _findElStateInState(state, other) {
	return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
};
var _parseElementState = function _parseElementState(elOrNode, props, simple, other) {
	return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
};
var _recordProps = function _recordProps(elState, props) {
	var getProp = gsap$1.getProperty(elState.element, null, "native"), obj = elState.props = {}, i = props.length;
	while (i--) obj[props[i]] = (getProp(props[i]) + "").trim();
	obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
	return elState;
};
var _applyProps = function _applyProps(element, props) {
	var style = element.style || element, p;
	for (p in props) style[p] = props[p];
};
var _getID = function _getID(el) {
	var id = el.getAttribute("data-flip-id");
	id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
	return id;
};
var _elementsFromElementStates = function _elementsFromElementStates(elStates) {
	return elStates.map(function(elState) {
		return elState.element;
	});
};
var _handleCallback = function _handleCallback(callback, elStates, tl) {
	return callback && elStates.length && tl.add(callback(_elementsFromElementStates(elStates), tl, new FlipState(elStates, 0, true)), 0);
};
var _fit = function _fit(fromState, toState, scale, applyProps, fitChild, vars) {
	var element = fromState.element, cache = fromState.cache, parent = fromState.parent, x = fromState.x, y = fromState.y, width = toState.width, height = toState.height, scaleX = toState.scaleX, scaleY = toState.scaleY, rotation = toState.rotation, bounds = toState.bounds, styles = vars && _getStyleSaver$1 && _getStyleSaver$1(element, "transform,width,height"), dimensionState = fromState, _toState$matrix = toState.matrix, e = _toState$matrix.e, f = _toState$matrix.f, deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation, simple = !deep && fromState.simple && toState.simple && !fitChild, skewX, fromPoint, toPoint, getProp, parentMatrix, matrix, bbox;
	if (simple || !parent) {
		scaleX = scaleY = 1;
		rotation = skewX = 0;
	} else {
		parentMatrix = _getInverseGlobalMatrix(parent);
		matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix);
		rotation = _round$1(Math.atan2(matrix.b, matrix.a) * _RAD2DEG$1);
		skewX = _round$1(Math.atan2(matrix.c, matrix.d) * _RAD2DEG$1 + rotation) % 360;
		scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
		scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD$2);
		if (fitChild) {
			fitChild = _toArray$1(fitChild)[0];
			getProp = gsap$1.getProperty(fitChild);
			bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
			dimensionState = {
				scaleX: getProp("scaleX"),
				scaleY: getProp("scaleY"),
				width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
				height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
			};
		}
		cache.rotation = rotation + "deg";
		cache.skewX = skewX + "deg";
	}
	if (scale) {
		scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width;
		scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
		cache.scaleX = scaleX;
		cache.scaleY = scaleY;
	} else {
		width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
		height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
		element.style.width = width + "px";
		element.style.height = height + "px";
	}
	applyProps && _applyProps(element, toState.props);
	if (simple || !parent) {
		x += e - fromState.matrix.e;
		y += f - fromState.matrix.f;
	} else if (deep || parent !== toState.parent) {
		cache.x = x + "px";
		cache.y = y + "px";
		cache.renderTransform(1, cache);
		matrix = getGlobalMatrix(fitChild || element, false, false, true);
		fromPoint = parentMatrix.apply({
			x: matrix.e,
			y: matrix.f
		});
		toPoint = parentMatrix.apply({
			x: e,
			y: f
		});
		x += toPoint.x - fromPoint.x;
		y += toPoint.y - fromPoint.y;
	} else {
		parentMatrix.e = parentMatrix.f = 0;
		toPoint = parentMatrix.apply({
			x: e - fromState.matrix.e,
			y: f - fromState.matrix.f
		});
		x += toPoint.x;
		y += toPoint.y;
	}
	x = _closestTenth(x, .02);
	y = _closestTenth(y, .02);
	if (vars && !(vars instanceof ElementState)) styles && styles.revert();
	else {
		cache.x = x + "px";
		cache.y = y + "px";
		cache.renderTransform(1, cache);
	}
	if (vars) {
		vars.x = x;
		vars.y = y;
		vars.rotation = rotation;
		vars.skewX = skewX;
		if (scale) {
			vars.scaleX = scaleX;
			vars.scaleY = scaleY;
		} else {
			vars.width = width;
			vars.height = height;
		}
	}
	return vars || cache;
};
var _parseState = function _parseState(targetsOrState, vars) {
	return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
};
var _getChangingElState = function _getChangingElState(toState, fromState, id) {
	var to1 = toState.idLookup[id], to2 = toState.alt[id];
	return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
};
var _bodyMetrics = [];
var _bodyProps = "width,height,overflowX,overflowY".split(",");
var _bodyLocked;
var _lockBodyScroll = function _lockBodyScroll(lock) {
	if (lock !== _bodyLocked) {
		var s = _body.style, w = _body.clientWidth === window.outerWidth, h = _body.clientHeight === window.outerHeight, i = 4;
		if (lock && (w || h)) {
			while (i--) _bodyMetrics[i] = s[_bodyProps[i]];
			if (w) {
				s.width = _body.clientWidth + "px";
				s.overflowY = "hidden";
			}
			if (h) {
				s.height = _body.clientHeight + "px";
				s.overflowX = "hidden";
			}
			_bodyLocked = lock;
		} else if (_bodyLocked) {
			while (i--) _bodyMetrics[i] ? s[_bodyProps[i]] = _bodyMetrics[i] : s.removeProperty(_camelToDashed(_bodyProps[i]));
			_bodyLocked = lock;
		}
	}
};
var _revertTempStyles = function _revertTempStyles(temps, stateIndex) {
	for (var i = 0; i < temps.length; i += 3) {
		gsap$1.set(temps[i], { clearProps: true });
		temps[i].setAttribute("style", temps[i + stateIndex]);
		temps[i]._gsap.gmCache = -1;
	}
};
var _fromTo = function _fromTo(fromState, toState, vars, relative) {
	fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
	vars = vars || {};
	var _vars = vars, clearProps = _vars.clearProps, onEnter = _vars.onEnter, onLeave = _vars.onLeave, absolute = _vars.absolute, absoluteOnLeave = _vars.absoluteOnLeave, custom = _vars.custom, delay = _vars.delay, paused = _vars.paused, repeat = _vars.repeat, repeatDelay = _vars.repeatDelay, yoyo = _vars.yoyo, toggleClass = _vars.toggleClass, nested = _vars.nested, _zIndex = _vars.zIndex, scale = _vars.scale, fade = _vars.fade, stagger = _vars.stagger, spin = _vars.spin, prune = _vars.prune, props = ("props" in vars ? vars : fromState).props, tweenVars = _copy(vars, _reserved), animation = gsap$1.timeline({
		delay,
		paused,
		repeat,
		repeatDelay,
		yoyo,
		data: "isFlip"
	}), remainingProps = tweenVars, entering = [], leaving = [], comps = [], swapOutTargets = [], spinNum = spin === true ? 1 : spin || 0, spinFunc = typeof spin === "function" ? spin : function() {
		return spinNum;
	}, interrupted = fromState.interrupted || toState.interrupted, addFunc = animation[relative !== 1 ? "to" : "from"], v, p, endTime, i, el, comp, state, targets, finalStates, fromNode, toNode, run, a, b;
	for (p in toState.idLookup) {
		toNode = !toState.alt[p] ? toState.idLookup[p] : _getChangingElState(toState, fromState, p);
		el = toNode.element;
		fromNode = fromState.idLookup[p];
		fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);
		if (fromNode) {
			comp = {
				t: el,
				b: fromNode,
				a: toNode,
				sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
			};
			comps.push(comp);
			if (comp.sd) {
				if (comp.sd < 0) {
					comp.b = toNode;
					comp.a = fromNode;
				}
				interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
				fade && comps.push(comp.swap = {
					t: fromNode.element,
					b: comp.b,
					a: comp.a,
					sd: -comp.sd,
					swap: comp
				});
			}
			el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
		} else if (toNode.isVisible) {
			comps.push({
				t: el,
				b: _copy(toNode, { isVisible: 1 }),
				a: toNode,
				sd: 0,
				entering: 1
			});
			el._flip = _batch ? _batch.timeline : animation;
		}
	}
	props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function(p) {
		return tweenVars[p] = function(i) {
			return comps[i].a.props[p];
		};
	});
	comps.finalStates = finalStates = [];
	run = function run() {
		_orderByDOMDepth(comps);
		_lockBodyScroll(true);
		var recordedStyles = [];
		for (i = 0; i < comps.length; i++) {
			comp = comps[i];
			a = comp.a;
			b = comp.b;
			if (prune && !a.isDifferent(b) && !comp.entering) comps.splice(i--, 1);
			else {
				el = comp.t;
				if (nested && !(comp.sd < 0) && i) a = comp.a = a.clone({ matrix: getGlobalMatrix(el, false, false, true) });
				if (b.isVisible && a.isVisible) {
					if (comp.sd < 0) {
						nested && _revertTempStyles(recordedStyles, 1);
						state = new ElementState(el, props, fromState.simple);
						_fit(state, a, scale, 0, 0, state);
						state.matrix = getGlobalMatrix(el, false, false, true);
						state.bounds = el.getBoundingClientRect();
						state.css = comp.b.css;
						comp.a = a = state;
						fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
						stagger && swapOutTargets.push(el);
						if (nested) {
							_revertTempStyles(recordedStyles, 2);
							recordedStyles.push(el, el.getAttribute("style"));
						}
					} else if (comp.sd > 0 && fade) el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
					_fit(a, b, scale, props);
					nested && comp.sd < 0 && recordedStyles.push(el.getAttribute("style"));
				} else if (b.isVisible !== a.isVisible) {
					if (!b.isVisible) {
						a.isVisible && entering.push(a);
						comps.splice(i--, 1);
					} else if (!a.isVisible) {
						b.css = a.css;
						leaving.push(b);
						comps.splice(i--, 1);
						absolute && nested && _fit(a, b, scale, props);
					}
				}
				if (!scale) {
					el.style.maxWidth = Math.max(a.width, b.width) + "px";
					el.style.maxHeight = Math.max(a.height, b.height) + "px";
					el.style.minWidth = Math.min(a.width, b.width) + "px";
					el.style.minHeight = Math.min(a.height, b.height) + "px";
				}
				nested && toggleClass && el.classList.add(toggleClass);
			}
			finalStates.push(a);
		}
		var classTargets;
		if (toggleClass) {
			classTargets = finalStates.map(function(s) {
				return s.element;
			});
			nested && classTargets.forEach(function(e) {
				return e.classList.remove(toggleClass);
			});
		}
		_lockBodyScroll(false);
		if (scale) {
			tweenVars.scaleX = function(i) {
				return comps[i].a.scaleX;
			};
			tweenVars.scaleY = function(i) {
				return comps[i].a.scaleY;
			};
		} else {
			tweenVars.width = function(i) {
				return comps[i].a.width + "px";
			};
			tweenVars.height = function(i) {
				return comps[i].a.height + "px";
			};
			tweenVars.autoRound = vars.autoRound || false;
		}
		tweenVars.x = function(i) {
			return comps[i].a.x + "px";
		};
		tweenVars.y = function(i) {
			return comps[i].a.y + "px";
		};
		tweenVars.rotation = function(i) {
			return comps[i].a.rotation + (spin ? spinFunc(i, targets[i], targets) * 360 : 0);
		};
		tweenVars.skewX = function(i) {
			return comps[i].a.skewX;
		};
		targets = comps.map(function(c) {
			return c.t;
		});
		if (_zIndex || _zIndex === 0) {
			tweenVars.modifiers = { zIndex: function zIndex() {
				return _zIndex;
			} };
			tweenVars.zIndex = _zIndex;
			tweenVars.immediateRender = vars.immediateRender !== false;
		}
		fade && (tweenVars.opacity = function(i) {
			return comps[i].sd < 0 ? 0 : comps[i].sd > 0 ? comps[i].a.opacity : "+=0";
		});
		if (swapOutTargets.length) {
			stagger = gsap$1.utils.distribute(stagger);
			var dummyArray = targets.slice(swapOutTargets.length);
			tweenVars.stagger = function(i, el) {
				return stagger(~swapOutTargets.indexOf(el) ? targets.indexOf(comps[i].swap.t) : i, el, dummyArray);
			};
		}
		_callbacks.forEach(function(name) {
			return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
		});
		if (custom && targets.length) {
			remainingProps = _copy(tweenVars, _reserved);
			if ("scale" in custom) {
				custom.scaleX = custom.scaleY = custom.scale;
				delete custom.scale;
			}
			for (p in custom) {
				v = _copy(custom[p], _fitReserved);
				v[p] = tweenVars[p];
				!("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
				v.stagger = tweenVars.stagger;
				addFunc.call(animation, targets, v, 0);
				delete remainingProps[p];
			}
		}
		if (targets.length || leaving.length || entering.length) {
			toggleClass && animation.add(function() {
				return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
			}, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
			targets.length && addFunc.call(animation, targets, remainingProps, 0);
		}
		_handleCallback(onEnter, entering, animation);
		_handleCallback(onLeave, leaving, animation);
		var batchTl = _batch && _batch.timeline;
		if (batchTl) {
			batchTl.add(animation, 0);
			_batch._final.push(function() {
				return _setFinalStates(comps, !clearProps);
			});
		}
		endTime = animation.duration();
		animation.call(function() {
			var forward = animation.time() >= endTime;
			forward && !batchTl && _setFinalStates(comps, !clearProps);
			toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
		});
	};
	absoluteOnLeave && (absolute = comps.filter(function(comp) {
		return !comp.sd && !comp.a.isVisible && comp.b.isVisible;
	}).map(function(comp) {
		return comp.a.element;
	}));
	if (_batch) {
		var _batch$_abs;
		absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));
		_batch._run.push(run);
	} else {
		absolute && _makeCompsAbsolute(_filterComps(comps, absolute));
		run();
	}
	var anim = _batch ? _batch.timeline : animation;
	anim.revert = function() {
		return _killFlip(anim, 1, 1);
	};
	return anim;
};
var _interrupt = function _interrupt(tl) {
	tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
	tl.getChildren(true, false, true).forEach(_interrupt);
};
var _killFlip = function _killFlip(tl, action, force) {
	if (tl && tl.progress() < 1 && (!tl.paused() || force)) {
		if (action) {
			_interrupt(tl);
			action < 2 && tl.progress(1);
			tl.kill();
		}
		return true;
	}
};
var _createLookup = function _createLookup(state) {
	var lookup = state.idLookup = {}, alt = state.alt = {}, elStates = state.elementStates, i = elStates.length, elState;
	while (i--) {
		elState = elStates[i];
		lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
	}
};
var FlipState = /*#__PURE__*/ function() {
	function FlipState(targets, vars, targetsAreElementStates) {
		this.props = vars && vars.props;
		this.simple = !!(vars && vars.simple);
		if (targetsAreElementStates) {
			this.targets = _elementsFromElementStates(targets);
			this.elementStates = targets;
			_createLookup(this);
		} else {
			this.targets = _toArray$1(targets);
			var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
			_batch && !soft && _batch._kill.push(this);
			this.update(soft || !!_batch);
		}
	}
	var _proto = FlipState.prototype;
	_proto.update = function update(soft) {
		var _this = this;
		this.elementStates = this.targets.map(function(el) {
			return new ElementState(el, _this.props, _this.simple);
		});
		_createLookup(this);
		this.interrupt(soft);
		this.recordInlineStyles();
		return this;
	};
	_proto.clear = function clear() {
		this.targets.length = this.elementStates.length = 0;
		_createLookup(this);
		return this;
	};
	_proto.fit = function fit(state, scale, nested) {
		var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true), toElStates = (state || this).idLookup, i = 0, fromNode, toNode;
		for (; i < elStatesInOrder.length; i++) {
			fromNode = elStatesInOrder[i];
			nested && (fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true));
			toNode = toElStates[fromNode.id];
			toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
			fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true);
		}
		return this;
	};
	_proto.getProperty = function getProperty(element, property) {
		var es = this.getElementState(element) || _emptyObj;
		return (property in es ? es : es.props || _emptyObj)[property];
	};
	_proto.add = function add(state) {
		var i = state.targets.length, lookup = this.idLookup, alt = this.alt, index, es, es2;
		while (i--) {
			es = state.elementStates[i];
			es2 = lookup[es.id];
			if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
				index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
				this.targets.splice(index, 1, state.targets[i]);
				this.elementStates.splice(index, 1, es);
			} else {
				this.targets.push(state.targets[i]);
				this.elementStates.push(es);
			}
		}
		state.interrupted && (this.interrupted = true);
		state.simple || (this.simple = false);
		_createLookup(this);
		return this;
	};
	_proto.compare = function compare(state) {
		var l1 = state.idLookup, l2 = this.idLookup, unchanged = [], changed = [], enter = [], leave = [], targets = [], a1 = state.alt, a2 = this.alt, place = function place(s1, s2, el) {
			return (s1.isVisible !== s2.isVisible ? s1.isVisible ? enter : leave : s1.isVisible ? changed : unchanged).push(el) && targets.push(el);
		}, placeIfDoesNotExist = function placeIfDoesNotExist(s1, s2, el) {
			return targets.indexOf(el) < 0 && place(s1, s2, el);
		}, s1, s2, p, el, s1Alt, s2Alt, c1, c2;
		for (p in l1) {
			s1Alt = a1[p];
			s2Alt = a2[p];
			s1 = !s1Alt ? l1[p] : _getChangingElState(state, this, p);
			el = s1.element;
			s2 = l2[p];
			if (s2Alt) {
				c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
				c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1;
				if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
					(c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
					targets.push(c1.element, c2.element);
				} else place(c1, c2, c1.element);
				s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
				placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
				placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
				s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
			} else {
				!s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
				s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
			}
		}
		for (p in l2) if (!l1[p]) {
			leave.push(l2[p].element);
			a2[p] && leave.push(a2[p].element);
		}
		return {
			changed,
			unchanged,
			enter,
			leave
		};
	};
	_proto.recordInlineStyles = function recordInlineStyles() {
		var props = _memoizedRemoveProps[this.props] || _removeProps, i = this.elementStates.length;
		while (i--) _recordInlineStyles(this.elementStates[i], props);
	};
	_proto.interrupt = function interrupt(soft) {
		var _this2 = this;
		var timelines = [];
		this.targets.forEach(function(t) {
			var tl = t._flip, foundInProgress = _killFlip(tl, soft ? 0 : 1);
			soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function() {
				return _this2.updateVisibility();
			});
			foundInProgress && timelines.push(tl);
		});
		!soft && timelines.length && this.updateVisibility();
		this.interrupted || (this.interrupted = !!timelines.length);
	};
	_proto.updateVisibility = function updateVisibility() {
		this.elementStates.forEach(function(es) {
			var b = es.element.getBoundingClientRect();
			es.isVisible = !!(b.width || b.height || b.top || b.left);
			es.uncache = 1;
		});
	};
	_proto.getElementState = function getElementState(element) {
		return this.elementStates[this.targets.indexOf(_getEl(element))];
	};
	_proto.makeAbsolute = function makeAbsolute() {
		return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
	};
	return FlipState;
}();
var ElementState = /*#__PURE__*/ function() {
	function ElementState(element, props, simple) {
		if (element instanceof ElementState) Object.assign(this, element, props || {});
		else {
			this.element = element;
			this.update(props, simple);
		}
	}
	var _proto2 = ElementState.prototype;
	_proto2.isDifferent = function isDifferent(state) {
		var b1 = this.bounds, b2 = state.bounds;
		return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
	};
	_proto2.clone = function clone(overrides) {
		return new ElementState(this, overrides);
	};
	_proto2.update = function update(props, simple) {
		var self = this, element = self.element, getProp = gsap$1.getProperty(element), cache = gsap$1.core.getCache(element), bounds = element.getBoundingClientRect(), bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(), m = simple ? new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop()) : getGlobalMatrix(element, false, false, true);
		cache.uncache = 1;
		self.getProp = getProp;
		self.element = element;
		self.id = _getID(element);
		self.matrix = m;
		self.cache = cache;
		self.bounds = bounds;
		self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
		self.display = getProp("display");
		self.position = getProp("position");
		self.parent = element.parentNode;
		self.x = getProp("x", "px");
		self.y = getProp("y", "px");
		self.scaleX = cache.scaleX;
		self.scaleY = cache.scaleY;
		self.rotation = getProp("rotation");
		self.skewX = getProp("skewX");
		self.opacity = getProp("opacity");
		self.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), .04);
		self.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), .04);
		props && _recordProps(self, _memoizedProps[props] || _memoizeProps(props));
		self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && _getCTM(element).inverse();
		self.simple = simple || _round$1(m.a) === 1 && !_round$1(m.b) && !_round$1(m.c) && _round$1(m.d) === 1;
		self.uncache = 0;
	};
	return ElementState;
}();
var FlipAction = /*#__PURE__*/ function() {
	function FlipAction(vars, batch) {
		this.vars = vars;
		this.batch = batch;
		this.states = [];
		this.timeline = batch.timeline;
	}
	var _proto3 = FlipAction.prototype;
	_proto3.getStateById = function getStateById(id) {
		var i = this.states.length;
		while (i--) if (this.states[i].idLookup[id]) return this.states[i];
	};
	_proto3.kill = function kill() {
		this.batch.remove(this);
	};
	return FlipAction;
}();
var FlipBatch = /*#__PURE__*/ function() {
	function FlipBatch(id) {
		this.id = id;
		this.actions = [];
		this._kill = [];
		this._final = [];
		this._abs = [];
		this._run = [];
		this.data = {};
		this.state = new FlipState();
		this.timeline = gsap$1.timeline();
	}
	var _proto4 = FlipBatch.prototype;
	_proto4.add = function add(config) {
		var result = this.actions.filter(function(action) {
			return action.vars === config;
		});
		if (result.length) return result[0];
		result = new FlipAction(typeof config === "function" ? { animate: config } : config, this);
		this.actions.push(result);
		return result;
	};
	_proto4.remove = function remove(action) {
		var i = this.actions.indexOf(action);
		i >= 0 && this.actions.splice(i, 1);
		return this;
	};
	_proto4.getState = function getState(merge) {
		var _this3 = this;
		var prevBatch = _batch, prevAction = _batchAction;
		_batch = this;
		this.state.clear();
		this._kill.length = 0;
		this.actions.forEach(function(action) {
			if (action.vars.getState) {
				action.states.length = 0;
				_batchAction = action;
				action.state = action.vars.getState(action);
			}
			merge && action.states.forEach(function(s) {
				return _this3.state.add(s);
			});
		});
		_batchAction = prevAction;
		_batch = prevBatch;
		this.killConflicts();
		return this;
	};
	_proto4.animate = function animate() {
		var _this4 = this;
		var prevBatch = _batch, tl = this.timeline, i = this.actions.length, finalStates, endTime;
		_batch = this;
		tl.clear();
		this._abs.length = this._final.length = this._run.length = 0;
		this.actions.forEach(function(a) {
			a.vars.animate && a.vars.animate(a);
			var onEnter = a.vars.onEnter, onLeave = a.vars.onLeave, targets = a.targets, s, result;
			if (targets && targets.length && (onEnter || onLeave)) {
				s = new FlipState();
				a.states.forEach(function(state) {
					return s.add(state);
				});
				result = s.compare(Flip.getState(targets));
				result.enter.length && onEnter && onEnter(result.enter);
				result.leave.length && onLeave && onLeave(result.leave);
			}
		});
		_makeCompsAbsolute(this._abs);
		this._run.forEach(function(f) {
			return f();
		});
		endTime = tl.duration();
		finalStates = this._final.slice(0);
		tl.add(function() {
			if (endTime <= tl.time()) {
				finalStates.forEach(function(f) {
					return f();
				});
				_forEachBatch(_this4, "onComplete");
			}
		});
		_batch = prevBatch;
		while (i--) this.actions[i].vars.once && this.actions[i].kill();
		_forEachBatch(this, "onStart");
		tl.restart();
		return this;
	};
	_proto4.loadState = function loadState(done) {
		done || (done = function done() {
			return 0;
		});
		var queue = [];
		this.actions.forEach(function(c) {
			if (c.vars.loadState) {
				var i, f = function f(targets) {
					targets && (c.targets = targets);
					i = queue.indexOf(f);
					if (~i) {
						queue.splice(i, 1);
						queue.length || done();
					}
				};
				queue.push(f);
				c.vars.loadState(f);
			}
		});
		queue.length || done();
		return this;
	};
	_proto4.setState = function setState() {
		this.actions.forEach(function(c) {
			return c.targets = c.vars.setState && c.vars.setState(c);
		});
		return this;
	};
	_proto4.killConflicts = function killConflicts(soft) {
		this.state.interrupt(soft);
		this._kill.forEach(function(state) {
			return state.interrupt(soft);
		});
		return this;
	};
	_proto4.run = function run(skipGetState, merge) {
		var _this5 = this;
		if (this !== _batch) {
			skipGetState || this.getState(merge);
			this.loadState(function() {
				if (!_this5._killed) {
					_this5.setState();
					_this5.animate();
				}
			});
		}
		return this;
	};
	_proto4.clear = function clear(stateOnly) {
		this.state.clear();
		stateOnly || (this.actions.length = 0);
	};
	_proto4.getStateById = function getStateById(id) {
		var i = this.actions.length, s;
		while (i--) {
			s = this.actions[i].getStateById(id);
			if (s) return s;
		}
		return this.state.idLookup[id] && this.state;
	};
	_proto4.kill = function kill() {
		this._killed = 1;
		this.clear();
		delete _batchLookup[this.id];
	};
	return FlipBatch;
}();
var Flip = /*#__PURE__*/ function() {
	function Flip() {}
	Flip.getState = function getState(targets, vars) {
		var state = _parseState(targets, vars);
		_batchAction && _batchAction.states.push(state);
		vars && vars.batch && Flip.batch(vars.batch).state.add(state);
		return state;
	};
	Flip.from = function from(state, vars) {
		vars = vars || {};
		"clearProps" in vars || (vars.clearProps = true);
		return _fromTo(state, _parseState(vars.targets || state.targets, {
			props: vars.props || state.props,
			simple: vars.simple,
			kill: !!vars.kill
		}), vars, -1);
	};
	Flip.to = function to(state, vars) {
		return _fromTo(state, _parseState(vars.targets || state.targets, {
			props: vars.props || state.props,
			simple: vars.simple,
			kill: !!vars.kill
		}), vars, 1);
	};
	Flip.fromTo = function fromTo(fromState, toState, vars) {
		return _fromTo(fromState, toState, vars);
	};
	Flip.fit = function fit(fromEl, toEl, vars) {
		var v = vars ? _copy(vars, _fitReserved) : {}, _ref = vars || v, absolute = _ref.absolute, scale = _ref.scale, getVars = _ref.getVars, props = _ref.props, runBackwards = _ref.runBackwards, onComplete = _ref.onComplete, simple = _ref.simple, fitChild = vars && vars.fitChild && _getEl(vars.fitChild), before = _parseElementState(toEl, props, simple, fromEl), after = _parseElementState(fromEl, 0, simple, before), inlineProps = props ? _memoizedRemoveProps[props] : _removeProps, ctx = gsap$1.context();
		props && _applyProps(v, before.props);
		_recordInlineStyles(after, inlineProps);
		if (runBackwards) {
			"immediateRender" in v || (v.immediateRender = true);
			v.onComplete = function() {
				_applyInlineStyles(after);
				onComplete && onComplete.apply(this, arguments);
			};
		}
		absolute && _makeAbsolute(after, before);
		v = _fit(after, before, scale || fitChild, !v.duration && props, fitChild, v.duration || getVars ? v : 0);
		typeof vars === "object" && "zIndex" in vars && (v.zIndex = vars.zIndex);
		ctx && !getVars && ctx.add(function() {
			return function() {
				return _applyInlineStyles(after);
			};
		});
		return getVars ? v : v.duration ? gsap$1.to(after.element, v) : null;
	};
	Flip.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
		return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
	};
	Flip.batch = function batch(id) {
		id || (id = "default");
		return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
	};
	Flip.killFlipsOf = function killFlipsOf(targets, complete) {
		(targets instanceof FlipState ? targets.targets : _toArray$1(targets)).forEach(function(t) {
			return t && _killFlip(t._flip, complete !== false ? 1 : 2);
		});
	};
	Flip.isFlipping = function isFlipping(target) {
		var f = Flip.getByTarget(target);
		return !!f && f.isActive();
	};
	Flip.getByTarget = function getByTarget(target) {
		return (_getEl(target) || _emptyObj)._flip;
	};
	Flip.getElementState = function getElementState(target, props) {
		return new ElementState(_getEl(target), props);
	};
	Flip.convertCoordinates = function convertCoordinates(fromElement, toElement, point) {
		var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
		return point ? m.apply(point) : m;
	};
	Flip.register = function register(core) {
		_body = typeof document !== "undefined" && document.body;
		if (_body) {
			gsap$1 = core;
			_setDoc(_body);
			_toArray$1 = gsap$1.utils.toArray;
			_getStyleSaver$1 = gsap$1.core.getStyleSaver;
			var snap = gsap$1.utils.snap(.1);
			_closestTenth = function _closestTenth(value, add) {
				return snap(parseFloat(value) + add);
			};
		}
	};
	return Flip;
}();
Flip.version = "3.15.0";
typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);
//#endregion
//#region node_modules/gsap/utils/paths.js
/*!
* paths 3.15.0
* https://gsap.com
*
* Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi;
var _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi;
var _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi;
var _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i;
var _DEG2RAD$1 = Math.PI / 180;
var _RAD2DEG = 180 / Math.PI;
var _sin = Math.sin;
var _cos = Math.cos;
var _abs = Math.abs;
var _sqrt = Math.sqrt;
var _atan2 = Math.atan2;
var _largeNum = 1e8;
var _isString = function _isString(value) {
	return typeof value === "string";
};
var _isNumber = function _isNumber(value) {
	return typeof value === "number";
};
var _isUndefined = function _isUndefined(value) {
	return typeof value === "undefined";
};
var _temp = {};
var _temp2 = {};
var _roundingNum = 1e5;
var _wrapProgress = function _wrapProgress(progress) {
	return Math.round((progress + _largeNum) % 1 * _roundingNum) / _roundingNum || (progress < 0 ? 0 : 1);
};
var _round = function _round(value) {
	return Math.round(value * _roundingNum) / _roundingNum || 0;
};
var _roundPrecise = function _roundPrecise(value) {
	return Math.round(value * 1e10) / 1e10 || 0;
};
var _segmentIsClosed = function _segmentIsClosed(segment) {
	return segment.closed = Math.abs(segment[0] - segment[segment.length - 2]) < .001 && Math.abs(segment[1] - segment[segment.length - 1]) < .001;
};
var _splitSegment = function _splitSegment(rawPath, segIndex, i, t) {
	var segment = rawPath[segIndex], shift = t === 1 ? 6 : subdivideSegment(segment, i, t);
	if ((shift || !t) && shift + i + 2 < segment.length) {
		rawPath.splice(segIndex, 0, segment.slice(0, i + shift + 2));
		segment.splice(0, i + shift);
		return 1;
	}
};
var _getSampleIndex = function _getSampleIndex(samples, length, progress) {
	var l = samples.length, i = ~~(progress * l);
	if (samples[i] > length) {
		while (--i && samples[i] > length);
		i < 0 && (i = 0);
	} else while (samples[++i] < length && i < l);
	return i < l ? i : l - 1;
};
var _reverseRawPath = function _reverseRawPath(rawPath, skipOuter) {
	var i = rawPath.length;
	skipOuter || rawPath.reverse();
	while (i--) rawPath[i].reversed || reverseSegment(rawPath[i]);
};
var _copyMetaData = function _copyMetaData(source, copy) {
	copy.totalLength = source.totalLength;
	if (source.samples) {
		copy.samples = source.samples.slice(0);
		copy.lookup = source.lookup.slice(0);
		copy.minLength = source.minLength;
		copy.resolution = source.resolution;
	} else if (source.totalPoints) copy.totalPoints = source.totalPoints;
	return copy;
};
var _appendOrMerge = function _appendOrMerge(rawPath, segment) {
	var index = rawPath.length, prevSeg = rawPath[index - 1] || [], l = prevSeg.length;
	if (index && segment[0] === prevSeg[l - 2] && segment[1] === prevSeg[l - 1]) {
		segment = prevSeg.concat(segment.slice(2));
		index--;
	}
	rawPath[index] = segment;
};
function getRawPath(value) {
	value = _isString(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
	var e = value.getAttribute ? value : 0, rawPath;
	if (e && (value = value.getAttribute("d"))) {
		if (!e._gsPath) e._gsPath = {};
		rawPath = e._gsPath[value];
		return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
	}
	return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString(value) ? stringToRawPath(value) : _isNumber(value[0]) ? [value] : value;
}
function copyRawPath(rawPath) {
	var a = [], i = 0;
	for (; i < rawPath.length; i++) a[i] = _copyMetaData(rawPath[i], rawPath[i].slice(0));
	return _copyMetaData(rawPath, a);
}
function reverseSegment(segment) {
	var i = 0, y;
	segment.reverse();
	for (; i < segment.length; i += 2) {
		y = segment[i];
		segment[i] = segment[i + 1];
		segment[i + 1] = y;
	}
	segment.reversed = !segment.reversed;
}
var _createPath = function _createPath(e, ignore) {
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path"), attr = [].slice.call(e.attributes), i = attr.length, name;
	ignore = "," + ignore + ",";
	while (--i > -1) {
		name = attr[i].nodeName.toLowerCase();
		if (ignore.indexOf("," + name + ",") < 0) path.setAttributeNS(null, name, attr[i].nodeValue);
	}
	return path;
};
var _typeAttrs = {
	rect: "rx,ry,x,y,width,height",
	circle: "r,cx,cy",
	ellipse: "rx,ry,cx,cy",
	line: "x1,x2,y1,y2"
};
var _attrToObj = function _attrToObj(e, attrs) {
	var props = attrs ? attrs.split(",") : [], obj = {}, i = props.length;
	while (--i > -1) obj[props[i]] = +e.getAttribute(props[i]) || 0;
	return obj;
};
function convertToPath(element, swap) {
	var type = element.tagName.toLowerCase(), circ = .552284749831, data, x, y, r, ry, path, rcirc, rycirc, points, w, h, x2, x3, x4, x5, x6, y2, y3, y4, y5, y6, attr;
	if (type === "path" || !element.getBBox) return element;
	path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
	attr = _attrToObj(element, _typeAttrs[type]);
	if (type === "rect") {
		r = attr.rx;
		ry = attr.ry || r;
		x = attr.x;
		y = attr.y;
		w = attr.width - r * 2;
		h = attr.height - ry * 2;
		if (r || ry) {
			x2 = x + r * (1 - circ);
			x3 = x + r;
			x4 = x3 + w;
			x5 = x4 + r * circ;
			x6 = x4 + r;
			y2 = y + ry * (1 - circ);
			y3 = y + ry;
			y4 = y3 + h;
			y5 = y4 + ry * circ;
			y6 = y4 + ry;
			data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [
				x6,
				y5,
				x5,
				y6,
				x4,
				y6,
				x4 - (x4 - x3) / 3,
				y6,
				x3 + (x4 - x3) / 3,
				y6,
				x3,
				y6,
				x2,
				y6,
				x,
				y5,
				x,
				y4,
				x,
				y4 - (y4 - y3) / 3,
				x,
				y3 + (y4 - y3) / 3,
				x,
				y3,
				x,
				y2,
				x2,
				y,
				x3,
				y,
				x3 + (x4 - x3) / 3,
				y,
				x4 - (x4 - x3) / 3,
				y,
				x4,
				y,
				x5,
				y,
				x6,
				y2,
				x6,
				y3
			].join(",") + "z";
		} else data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
	} else if (type === "circle" || type === "ellipse") {
		if (type === "circle") {
			r = ry = attr.r;
			rycirc = r * circ;
		} else {
			r = attr.rx;
			ry = attr.ry;
			rycirc = ry * circ;
		}
		x = attr.cx;
		y = attr.cy;
		rcirc = r * circ;
		data = "M" + (x + r) + "," + y + " C" + [
			x + r,
			y + rycirc,
			x + rcirc,
			y + ry,
			x,
			y + ry,
			x - rcirc,
			y + ry,
			x - r,
			y + rycirc,
			x - r,
			y,
			x - r,
			y - rycirc,
			x - rcirc,
			y - ry,
			x,
			y - ry,
			x + rcirc,
			y - ry,
			x + r,
			y - rycirc,
			x + r,
			y
		].join(",") + "z";
	} else if (type === "line") data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2;
	else if (type === "polyline" || type === "polygon") {
		points = (element.getAttribute("points") + "").match(_numbersExp) || [];
		x = points.shift();
		y = points.shift();
		data = "M" + x + "," + y + " L" + points.join(",");
		if (type === "polygon") data += "," + x + "," + y + "z";
	}
	path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));
	if (swap && element.parentNode) {
		element.parentNode.insertBefore(path, element);
		element.parentNode.removeChild(element);
	}
	return path;
}
function getRotationAtBezierT(segment, i, t) {
	var a = segment[i], b = segment[i + 2], c = segment[i + 4], x;
	a += (b - a) * t;
	b += (c - b) * t;
	a += (b - a) * t;
	x = b + (c + (segment[i + 6] - c) * t - b) * t - a;
	a = segment[i + 1];
	b = segment[i + 3];
	c = segment[i + 5];
	a += (b - a) * t;
	b += (c - b) * t;
	a += (b - a) * t;
	return _round(_atan2(b + (c + (segment[i + 7] - c) * t - b) * t - a, x) * _RAD2DEG);
}
function sliceRawPath(rawPath, start, end) {
	end = _isUndefined(end) ? 1 : _roundPrecise(end) || 0;
	start = _roundPrecise(start) || 0;
	var loops = Math.max(0, ~~(_abs(end - start) - 1e-8)), path = copyRawPath(rawPath);
	if (start > end) {
		start = 1 - start;
		end = 1 - end;
		_reverseRawPath(path);
		path.totalLength = 0;
	}
	if (start < 0 || end < 0) {
		var offset = Math.abs(~~Math.min(start, end)) + 1;
		start += offset;
		end += offset;
	}
	path.totalLength || cacheRawPathMeasurements(path);
	var wrap = end > 1, s = getProgressData(path, start, _temp, true), e = getProgressData(path, end, _temp2), eSeg = e.segment, sSeg = s.segment, eSegIndex = e.segIndex, sSegIndex = s.segIndex, ei = e.i, si = s.i, sameSegment = sSegIndex === eSegIndex, sameBezier = ei === si && sameSegment, wrapsBehind, sShift, eShift, i, copy, totalSegments, l, j;
	if (wrap || loops) {
		wrapsBehind = eSegIndex < sSegIndex || sameSegment && ei < si || sameBezier && e.t < s.t;
		if (_splitSegment(path, sSegIndex, si, s.t)) {
			sSegIndex++;
			if (!wrapsBehind) {
				eSegIndex++;
				if (sameBezier) {
					e.t = (e.t - s.t) / (1 - s.t);
					ei = 0;
				} else if (sameSegment) ei -= si;
			}
		}
		if (Math.abs(1 - (end - start)) < 1e-5) eSegIndex = sSegIndex - 1;
		else if (!e.t && eSegIndex) eSegIndex--;
		else if (_splitSegment(path, eSegIndex, ei, e.t) && wrapsBehind) sSegIndex++;
		if (s.t === 1) sSegIndex = (sSegIndex + 1) % path.length;
		copy = [];
		totalSegments = path.length;
		l = 1 + totalSegments * loops;
		j = sSegIndex;
		l += (totalSegments - sSegIndex + eSegIndex) % totalSegments;
		for (i = 0; i < l; i++) _appendOrMerge(copy, path[j++ % totalSegments]);
		path = copy;
	} else {
		eShift = e.t === 1 ? 6 : subdivideSegment(eSeg, ei, e.t);
		if (start !== end) {
			sShift = subdivideSegment(sSeg, si, sameBezier ? s.t / e.t : s.t);
			sameSegment && (eShift += sShift);
			eSeg.splice(ei + eShift + 2);
			(sShift || si) && sSeg.splice(0, si + sShift);
			i = path.length;
			while (i--) (i < sSegIndex || i > eSegIndex) && path.splice(i, 1);
		} else {
			eSeg.angle = getRotationAtBezierT(eSeg, ei + eShift, 0);
			ei += eShift;
			s = eSeg[ei];
			e = eSeg[ei + 1];
			eSeg.length = eSeg.totalLength = 0;
			eSeg.totalPoints = path.totalPoints = 8;
			eSeg.push(s, e, s, e, s, e, s, e);
		}
	}
	path.totalLength = 0;
	return path;
}
function measureSegment(segment, startIndex, bezierQty) {
	startIndex = startIndex || 0;
	if (!segment.samples) {
		segment.samples = [];
		segment.lookup = [];
	}
	var resolution = ~~segment.resolution || 12, inc = 1 / resolution, endIndex = bezierQty ? startIndex + bezierQty * 6 + 1 : segment.length, x1 = segment[startIndex], y1 = segment[startIndex + 1], samplesIndex = startIndex ? startIndex / 6 * resolution : 0, samples = segment.samples, lookup = segment.lookup, min = (startIndex ? segment.minLength : _largeNum) || _largeNum, prevLength = samples[samplesIndex + bezierQty * resolution - 1], length = startIndex ? samples[samplesIndex - 1] : 0, i, j, x4, x3, x2, xd, xd1, y4, y3, y2, yd, yd1, inv, t, lengthIndex, l, segLength;
	samples.length = lookup.length = 0;
	for (j = startIndex + 2; j < endIndex; j += 6) {
		x4 = segment[j + 4] - x1;
		x3 = segment[j + 2] - x1;
		x2 = segment[j] - x1;
		y4 = segment[j + 5] - y1;
		y3 = segment[j + 3] - y1;
		y2 = segment[j + 1] - y1;
		xd = xd1 = yd = yd1 = 0;
		if (_abs(x4) < .01 && _abs(y4) < .01 && _abs(x2) + _abs(y2) < .01) {
			if (segment.length > 8) {
				segment.splice(j, 6);
				j -= 6;
				endIndex -= 6;
			}
		} else for (i = 1; i <= resolution; i++) {
			t = inc * i;
			inv = 1 - t;
			xd = xd1 - (xd1 = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t);
			yd = yd1 - (yd1 = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t);
			l = _sqrt(yd * yd + xd * xd);
			if (l < min) min = l;
			length += l;
			samples[samplesIndex++] = length;
		}
		x1 += x4;
		y1 += y4;
	}
	if (prevLength) {
		prevLength -= length;
		for (; samplesIndex < samples.length; samplesIndex++) samples[samplesIndex] += prevLength;
	}
	if (samples.length && min) {
		segment.totalLength = segLength = samples[samples.length - 1] || 0;
		segment.minLength = min;
		if (segLength / min < 9999) {
			l = lengthIndex = 0;
			for (i = 0; i < segLength; i += min) lookup[l++] = samples[lengthIndex] < i ? ++lengthIndex : lengthIndex;
		}
	} else segment.totalLength = samples[0] = 0;
	return startIndex ? length - samples[startIndex / 2 - 1] : length;
}
function cacheRawPathMeasurements(rawPath, resolution) {
	var pathLength, points, i = pathLength = points = 0;
	for (; i < rawPath.length; i++) {
		rawPath[i].resolution = ~~resolution || 12;
		pathLength += measureSegment(rawPath[i]);
		points += rawPath[i].length;
	}
	rawPath.totalPoints = points;
	rawPath.totalLength = pathLength;
	return rawPath;
}
function subdivideSegment(segment, i, t) {
	if (t <= 0 || t >= 1) return 0;
	var ax = segment[i], ay = segment[i + 1], cp1x = segment[i + 2], cp1y = segment[i + 3], cp2x = segment[i + 4], cp2y = segment[i + 5], bx = segment[i + 6], by = segment[i + 7], x1a = ax + (cp1x - ax) * t, x2 = cp1x + (cp2x - cp1x) * t, y1a = ay + (cp1y - ay) * t, y2 = cp1y + (cp2y - cp1y) * t, x1 = x1a + (x2 - x1a) * t, y1 = y1a + (y2 - y1a) * t, x2a = cp2x + (bx - cp2x) * t, y2a = cp2y + (by - cp2y) * t;
	x2 += (x2a - x2) * t;
	y2 += (y2a - y2) * t;
	segment.splice(i + 2, 4, _round(x1a), _round(y1a), _round(x1), _round(y1), _round(x1 + (x2 - x1) * t), _round(y1 + (y2 - y1) * t), _round(x2), _round(y2), _round(x2a), _round(y2a));
	segment.samples && segment.samples.splice(i / 6 * segment.resolution | 0, 0, 0, 0, 0, 0, 0, 0);
	return 6;
}
function getProgressData(rawPath, progress, decoratee, pushToNextIfAtEnd) {
	decoratee = decoratee || {};
	rawPath.totalLength || cacheRawPathMeasurements(rawPath);
	if (progress < 0 || progress > 1) progress = _wrapProgress(progress);
	var segIndex = 0, segment = rawPath[0], samples, resolution, length, min, max, i, t;
	if (!progress) {
		t = i = segIndex = 0;
		segment = rawPath[0];
	} else if (progress === 1) {
		t = 1;
		segIndex = rawPath.length - 1;
		segment = rawPath[segIndex];
		i = segment.length - 8;
	} else {
		if (rawPath.length > 1) {
			length = rawPath.totalLength * progress;
			max = i = 0;
			while ((max += rawPath[i++].totalLength) < length) segIndex = i;
			segment = rawPath[segIndex];
			min = max - segment.totalLength;
			progress = (length - min) / (max - min) || 0;
		}
		samples = segment.samples;
		resolution = segment.resolution;
		length = segment.totalLength * progress;
		i = segment.lookup.length ? segment.lookup[~~(length / segment.minLength)] || 0 : _getSampleIndex(samples, length, progress);
		min = i ? samples[i - 1] : 0;
		max = samples[i];
		if (max < length) {
			min = max;
			max = samples[++i];
		}
		t = 1 / resolution * ((length - min) / (max - min) + i % resolution);
		i = ~~(i / resolution) * 6;
		if (pushToNextIfAtEnd && t === 1) {
			if (i + 6 < segment.length) {
				i += 6;
				t = 0;
			} else if (segIndex + 1 < rawPath.length) {
				i = t = 0;
				segment = rawPath[++segIndex];
			}
		}
	}
	decoratee.t = t;
	decoratee.i = i;
	decoratee.path = rawPath;
	decoratee.segment = segment;
	decoratee.segIndex = segIndex;
	return decoratee;
}
function getPositionOnPath(rawPath, progress, includeAngle, point) {
	var segment = rawPath[0], result = point || {}, samples, resolution, length, min, max, i, t, a, inv;
	if (progress < 0 || progress > 1) progress = _wrapProgress(progress);
	segment.lookup || cacheRawPathMeasurements(rawPath);
	if (rawPath.length > 1) {
		length = rawPath.totalLength * progress;
		max = i = 0;
		while ((max += rawPath[i++].totalLength) < length) segment = rawPath[i];
		min = max - segment.totalLength;
		progress = (length - min) / (max - min) || 0;
	}
	samples = segment.samples;
	resolution = segment.resolution;
	length = segment.totalLength * progress;
	i = segment.lookup.length ? segment.lookup[progress < 1 ? ~~(length / segment.minLength) : segment.lookup.length - 1] || 0 : _getSampleIndex(samples, length, progress);
	min = i ? samples[i - 1] : 0;
	max = samples[i];
	if (max < length) {
		min = max;
		max = samples[++i];
	}
	t = 1 / resolution * ((length - min) / (max - min) + i % resolution) || 0;
	inv = 1 - t;
	i = ~~(i / resolution) * 6;
	a = segment[i];
	result.x = _round((t * t * (segment[i + 6] - a) + 3 * inv * (t * (segment[i + 4] - a) + inv * (segment[i + 2] - a))) * t + a);
	result.y = _round((t * t * (segment[i + 7] - (a = segment[i + 1])) + 3 * inv * (t * (segment[i + 5] - a) + inv * (segment[i + 3] - a))) * t + a);
	if (includeAngle) result.angle = segment.totalLength ? getRotationAtBezierT(segment, i, t >= 1 ? 1 - 1e-9 : t ? t : 1e-9) : segment.angle || 0;
	return result;
}
function transformRawPath(rawPath, a, b, c, d, tx, ty) {
	var j = rawPath.length, segment, l, i, x, y;
	while (--j > -1) {
		segment = rawPath[j];
		l = segment.length;
		for (i = 0; i < l; i += 2) {
			x = segment[i];
			y = segment[i + 1];
			segment[i] = x * a + y * c + tx;
			segment[i + 1] = x * b + y * d + ty;
		}
	}
	rawPath._dirty = 1;
	return rawPath;
}
function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
	if (lastX === x && lastY === y) return;
	rx = _abs(rx);
	ry = _abs(ry);
	var angleRad = angle % 360 * _DEG2RAD$1, cosAngle = _cos(angleRad), sinAngle = _sin(angleRad), PI = Math.PI, TWOPI = PI * 2, dx2 = (lastX - x) / 2, dy2 = (lastY - y) / 2, x1 = cosAngle * dx2 + sinAngle * dy2, y1 = -sinAngle * dx2 + cosAngle * dy2, x1_sq = x1 * x1, y1_sq = y1 * y1, radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);
	if (radiiCheck > 1) {
		rx = _sqrt(radiiCheck) * rx;
		ry = _sqrt(radiiCheck) * ry;
	}
	var rx_sq = rx * rx, ry_sq = ry * ry, sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);
	if (sq < 0) sq = 0;
	var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt(sq), cx1 = coef * (rx * y1 / ry), cy1 = coef * -(ry * x1 / rx), sx2 = (lastX + x) / 2, sy2 = (lastY + y) / 2, cx = sx2 + (cosAngle * cx1 - sinAngle * cy1), cy = sy2 + (sinAngle * cx1 + cosAngle * cy1), ux = (x1 - cx1) / rx, uy = (y1 - cy1) / ry, vx = (-x1 - cx1) / rx, vy = (-y1 - cy1) / ry, temp = ux * ux + uy * uy, angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt(temp)), angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt(temp * (vx * vx + vy * vy)));
	isNaN(angleExtent) && (angleExtent = PI);
	if (!sweepFlag && angleExtent > 0) angleExtent -= TWOPI;
	else if (sweepFlag && angleExtent < 0) angleExtent += TWOPI;
	angleStart %= TWOPI;
	angleExtent %= TWOPI;
	var segments = Math.ceil(_abs(angleExtent) / (TWOPI / 4)), rawPath = [], angleIncrement = angleExtent / segments, controlLength = 4 / 3 * _sin(angleIncrement / 2) / (1 + _cos(angleIncrement / 2)), ma = cosAngle * rx, mb = sinAngle * rx, mc = sinAngle * -ry, md = cosAngle * ry, i = 0;
	for (; i < segments; i++) {
		angle = angleStart + i * angleIncrement;
		x1 = _cos(angle);
		y1 = _sin(angle);
		ux = _cos(angle += angleIncrement);
		uy = _sin(angle);
		rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
	}
	for (i = 0; i < rawPath.length; i += 2) {
		x1 = rawPath[i];
		y1 = rawPath[i + 1];
		rawPath[i] = x1 * ma + y1 * mc + cx;
		rawPath[i + 1] = x1 * mb + y1 * md + cy;
	}
	rawPath[i - 2] = x;
	rawPath[i - 1] = y;
	return rawPath;
}
function stringToRawPath(d) {
	var a = (d + "").replace(_scientific, function(m) {
		var n = +m;
		return n < 1e-4 && n > -1e-4 ? 0 : n;
	}).match(_svgPathExp) || [], path = [], relativeX = 0, relativeY = 0, twoThirds = 2 / 3, elements = a.length, points = 0, errorMessage = "ERROR: malformed path: " + d, i, j, x, y, command, isRelative, segment, startX, startY, difX, difY, beziers, prevCommand, flag1, flag2, line = function line(sx, sy, ex, ey) {
		difX = (ex - sx) / 3;
		difY = (ey - sy) / 3;
		segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
	};
	if (!d || !isNaN(a[0]) || isNaN(a[1])) {
		console.log(errorMessage);
		return path;
	}
	for (i = 0; i < elements; i++) {
		prevCommand = command;
		if (isNaN(a[i])) {
			command = a[i].toUpperCase();
			isRelative = command !== a[i];
		} else i--;
		x = +a[i + 1];
		y = +a[i + 2];
		if (isRelative) {
			x += relativeX;
			y += relativeY;
		}
		if (!i) {
			startX = x;
			startY = y;
		}
		if (command === "M") {
			if (segment) {
				if (segment.length < 8) path.length -= 1;
				else points += segment.length;
				_segmentIsClosed(segment);
			}
			relativeX = startX = x;
			relativeY = startY = y;
			segment = [x, y];
			path.push(segment);
			i += 2;
			command = "L";
		} else if (command === "C") {
			if (!segment) segment = [0, 0];
			if (!isRelative) relativeX = relativeY = 0;
			segment.push(x, y, relativeX + a[i + 3] * 1, relativeY + a[i + 4] * 1, relativeX += a[i + 5] * 1, relativeY += a[i + 6] * 1);
			i += 6;
		} else if (command === "S") {
			difX = relativeX;
			difY = relativeY;
			if (prevCommand === "C" || prevCommand === "S") {
				difX += relativeX - segment[segment.length - 4];
				difY += relativeY - segment[segment.length - 3];
			}
			if (!isRelative) relativeX = relativeY = 0;
			segment.push(difX, difY, x, y, relativeX += a[i + 3] * 1, relativeY += a[i + 4] * 1);
			i += 4;
		} else if (command === "Q") {
			difX = relativeX + (x - relativeX) * twoThirds;
			difY = relativeY + (y - relativeY) * twoThirds;
			if (!isRelative) relativeX = relativeY = 0;
			relativeX += a[i + 3] * 1;
			relativeY += a[i + 4] * 1;
			segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
			i += 4;
		} else if (command === "T") {
			difX = relativeX - segment[segment.length - 4];
			difY = relativeY - segment[segment.length - 3];
			segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
			i += 2;
		} else if (command === "H") {
			line(relativeX, relativeY, relativeX = x, relativeY);
			i += 1;
		} else if (command === "V") {
			line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
			i += 1;
		} else if (command === "L" || command === "Z") {
			if (command === "Z") {
				x = startX;
				y = startY;
				segment.closed = true;
			}
			if (command === "L" || _abs(relativeX - x) > .5 || _abs(relativeY - y) > .5) {
				line(relativeX, relativeY, x, y);
				if (command === "L") i += 2;
			}
			relativeX = x;
			relativeY = y;
		} else if (command === "A") {
			flag1 = a[i + 4];
			flag2 = a[i + 5];
			difX = a[i + 6];
			difY = a[i + 7];
			j = 7;
			if (flag1.length > 1) {
				if (flag1.length < 3) {
					difY = difX;
					difX = flag2;
					j--;
				} else {
					difY = flag2;
					difX = flag1.substr(2);
					j -= 2;
				}
				flag2 = flag1.charAt(1);
				flag1 = flag1.charAt(0);
			}
			beziers = arcToSegment(relativeX, relativeY, +a[i + 1], +a[i + 2], +a[i + 3], +flag1, +flag2, (isRelative ? relativeX : 0) + difX * 1, (isRelative ? relativeY : 0) + difY * 1);
			i += j;
			if (beziers) for (j = 0; j < beziers.length; j++) segment.push(beziers[j]);
			relativeX = segment[segment.length - 2];
			relativeY = segment[segment.length - 1];
		} else console.log(errorMessage);
	}
	i = segment.length;
	if (i < 6) {
		path.pop();
		i = 0;
	} else _segmentIsClosed(segment);
	path.totalPoints = points + i;
	return path;
}
function flatPointsToSegment(points, curviness) {
	if (curviness === void 0) curviness = 1;
	var x = points[0], y = 0, segment = [x, y], i = 2;
	for (; i < points.length; i += 2) segment.push(x, y, points[i], y = (points[i] - x) * curviness / 2, x = points[i], -y);
	return segment;
}
function pointsToSegment(points, curviness) {
	_abs(points[0] - points[2]) < 1e-4 && _abs(points[1] - points[3]) < 1e-4 && (points = points.slice(2));
	var l = points.length - 2, x = +points[0], y = +points[1], nextX = +points[2], nextY = +points[3], segment = [
		x,
		y,
		x,
		y
	], dx2 = nextX - x, dy2 = nextY - y, nonSmooth = points.nonSmooth || [], closed = Math.abs(points[l] - x) < .001 && Math.abs(points[l + 1] - y) < .001, prevX, prevY, i, dx1, dy1, r1, r2, r3, tl, mx1, mx2, mxm, my1, my2, mym;
	if (!l) return [
		x,
		y,
		x,
		y,
		x,
		y,
		x,
		y
	];
	if (closed) {
		points.push(nextX, nextY);
		nextX = x;
		nextY = y;
		x = points[l - 2];
		y = points[l - 1];
		points.unshift(x, y);
		l += 4;
		nonSmooth = [0, 0].concat(nonSmooth);
	}
	curviness = curviness || curviness === 0 ? +curviness : 1;
	for (i = 2; i < l; i += 2) {
		prevX = x;
		prevY = y;
		x = nextX;
		y = nextY;
		nextX = +points[i + 2];
		nextY = +points[i + 3];
		if (x === nextX && y === nextY) continue;
		dx1 = dx2;
		dy1 = dy2;
		dx2 = nextX - x;
		dy2 = nextY - y;
		if (nonSmooth[i]) {
			segment.push(x - (x - prevX) / 4, y - (y - prevY) / 4, x, y, x + (nextX - x) / 4, y + (nextY - y) / 4);
			continue;
		}
		r1 = _sqrt(dx1 * dx1 + dy1 * dy1);
		r2 = _sqrt(dx2 * dx2 + dy2 * dy2);
		r3 = _sqrt(Math.pow(dx2 / r2 + dx1 / r1, 2) + Math.pow(dy2 / r2 + dy1 / r1, 2));
		tl = (r1 + r2) * curviness * .25 / r3;
		mx1 = x - (x - prevX) * (r1 ? tl / r1 : 0);
		mx2 = x + (nextX - x) * (r2 ? tl / r2 : 0);
		mxm = x - (mx1 + ((mx2 - mx1) * (r1 * 3 / (r1 + r2) + .5) / 4 || 0));
		my1 = y - (y - prevY) * (r1 ? tl / r1 : 0);
		my2 = y + (nextY - y) * (r2 ? tl / r2 : 0);
		mym = y - (my1 + ((my2 - my1) * (r1 * 3 / (r1 + r2) + .5) / 4 || 0));
		segment.push(_round(mx1 + mxm), _round(my1 + mym), _round(x), _round(y), _round(mx2 + mxm), _round(my2 + mym));
	}
	x !== nextX || y !== nextY || segment.length < 4 ? segment.push(_round(nextX), _round(nextY), _round(nextX), _round(nextY)) : segment.length -= 2;
	if (segment.length === 2) segment.push(x, y, x, y, x, y);
	else if (closed) {
		segment.splice(0, 6);
		segment.length -= 6;
	}
	segment.closed = closed;
	return segment;
}
function rawPathToString(rawPath) {
	if (_isNumber(rawPath[0])) rawPath = [rawPath];
	var result = "", l = rawPath.length, sl, s = 0, i, segment;
	for (; s < l; s++) {
		segment = rawPath[s];
		result += "M" + _round(segment[0]) + "," + _round(segment[1]) + " C";
		sl = segment.length;
		for (i = 2; i < sl; i++) result += _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i]) + " ";
		if (segment.closed) result += "z";
	}
	return result;
}
//#endregion
//#region node_modules/gsap/MotionPathPlugin.js
/*!
* MotionPathPlugin 3.15.0
* https://gsap.com
*
* @license Copyright 2008-2026, GreenSock. All rights reserved.
* Subject to the terms at https://gsap.com/standard-license
* @author: Jack Doyle, jack@greensock.com
*/
var _xProps = "x,translateX,left,marginLeft,xPercent".split(",");
var _yProps = "y,translateY,top,marginTop,yPercent".split(",");
var _DEG2RAD = Math.PI / 180;
var gsap;
var PropTween;
var _getUnit;
var _toArray;
var _getStyleSaver;
var _reverting;
var _getGSAP = function _getGSAP() {
	return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
};
var _populateSegmentFromArray = function _populateSegmentFromArray(segment, values, property, mode) {
	var l = values.length, si = mode === 2 ? 0 : mode, i = 0;
	for (; i < l; i++) {
		segment[si] = parseFloat(values[i][property]);
		mode === 2 && (segment[si + 1] = 0);
		si += 2;
	}
	return segment;
};
var _getPropNum = function _getPropNum(target, prop, unit) {
	return parseFloat(target._gsap.get(target, prop, unit || "px")) || 0;
};
var _relativize = function _relativize(segment) {
	var x = segment[0], y = segment[1], i = 2;
	for (; i < segment.length; i += 2) {
		x = segment[i] += x;
		y = segment[i + 1] += y;
	}
};
var _segmentToRawPath = function _segmentToRawPath(plugin, segment, target, x, y, slicer, vars, unitX, unitY) {
	if (vars.type === "cubic") segment = [segment];
	else {
		vars.fromCurrent !== false && segment.unshift(_getPropNum(target, x, unitX), y ? _getPropNum(target, y, unitY) : 0);
		vars.relative && _relativize(segment);
		segment = [(y ? pointsToSegment : flatPointsToSegment)(segment, vars.curviness)];
	}
	segment = slicer(_align(segment, target, vars));
	_addDimensionalPropTween(plugin, target, x, segment, "x", unitX);
	y && _addDimensionalPropTween(plugin, target, y, segment, "y", unitY);
	return cacheRawPathMeasurements(segment, vars.resolution || (vars.curviness === 0 ? 20 : 12));
};
var _emptyFunc = function _emptyFunc(v) {
	return v;
};
var _numExp = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g;
var _originToPoint = function _originToPoint(element, origin, parentMatrix) {
	var m = getGlobalMatrix(element), x = 0, y = 0, svg;
	if ((element.tagName + "").toLowerCase() === "svg") {
		svg = element.viewBox.baseVal;
		svg.width || (svg = {
			width: +element.getAttribute("width"),
			height: +element.getAttribute("height")
		});
	} else svg = origin && element.getBBox && element.getBBox();
	if (origin && origin !== "auto") {
		x = origin.push ? origin[0] * (svg ? svg.width : element.offsetWidth || 0) : origin.x;
		y = origin.push ? origin[1] * (svg ? svg.height : element.offsetHeight || 0) : origin.y;
	}
	return parentMatrix.apply(x || y ? m.apply({
		x,
		y
	}) : {
		x: m.e,
		y: m.f
	});
};
var _getAlignMatrix = function _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin) {
	var parentMatrix = getGlobalMatrix(fromElement.parentNode, true, true), m = parentMatrix.clone().multiply(getGlobalMatrix(toElement)), fromPoint = _originToPoint(fromElement, fromOrigin, parentMatrix), _originToPoint2 = _originToPoint(toElement, toOrigin, parentMatrix), x = _originToPoint2.x, y = _originToPoint2.y, p;
	m.e = m.f = 0;
	if (toOrigin === "auto" && toElement.getTotalLength && toElement.tagName.toLowerCase() === "path") {
		p = toElement.getAttribute("d").match(_numExp) || [];
		p = m.apply({
			x: +p[0],
			y: +p[1]
		});
		x += p.x;
		y += p.y;
	}
	if (p) {
		p = m.apply(toElement.getBBox());
		x -= p.x;
		y -= p.y;
	}
	m.e = x - fromPoint.x;
	m.f = y - fromPoint.y;
	return m;
};
var _align = function _align(rawPath, target, _ref) {
	var align = _ref.align, matrix = _ref.matrix, offsetX = _ref.offsetX, offsetY = _ref.offsetY, alignOrigin = _ref.alignOrigin;
	var x = rawPath[0][0], y = rawPath[0][1], curX = _getPropNum(target, "x"), curY = _getPropNum(target, "y"), alignTarget, m, p;
	if (!rawPath || !rawPath.length) return getRawPath("M0,0L0,0");
	if (align) {
		if (align === "self" || (alignTarget = _toArray(align)[0] || target) === target) transformRawPath(rawPath, 1, 0, 0, 1, curX - x, curY - y);
		else {
			if (alignOrigin && alignOrigin[2] !== false) gsap.set(target, { transformOrigin: alignOrigin[0] * 100 + "% " + alignOrigin[1] * 100 + "%" });
			else alignOrigin = [_getPropNum(target, "xPercent") / -100, _getPropNum(target, "yPercent") / -100];
			m = _getAlignMatrix(target, alignTarget, alignOrigin, "auto");
			p = m.apply({
				x,
				y
			});
			transformRawPath(rawPath, m.a, m.b, m.c, m.d, curX + m.e - (p.x - m.e), curY + m.f - (p.y - m.f));
		}
	}
	if (matrix) transformRawPath(rawPath, matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
	else if (offsetX || offsetY) transformRawPath(rawPath, 1, 0, 0, 1, offsetX || 0, offsetY || 0);
	return rawPath;
};
var _addDimensionalPropTween = function _addDimensionalPropTween(plugin, target, property, rawPath, pathProperty, forceUnit) {
	var cache = target._gsap, harness = cache.harness, alias = harness && harness.aliases && harness.aliases[property], prop = alias && alias.indexOf(",") < 0 ? alias : property, pt = plugin._pt = new PropTween(plugin._pt, target, prop, 0, 0, _emptyFunc, 0, cache.set(target, prop, plugin));
	pt.u = _getUnit(cache.get(target, prop, forceUnit)) || 0;
	pt.path = rawPath;
	pt.pp = pathProperty;
	plugin._props.push(prop);
};
var _sliceModifier = function _sliceModifier(start, end) {
	return function(rawPath) {
		return start || end !== 1 ? sliceRawPath(rawPath, start, end) : rawPath;
	};
};
var MotionPathPlugin = {
	version: "3.15.0",
	name: "motionPath",
	register: function register(core, Plugin, propTween) {
		gsap = core;
		_getUnit = gsap.utils.getUnit;
		_toArray = gsap.utils.toArray;
		_getStyleSaver = gsap.core.getStyleSaver;
		_reverting = gsap.core.reverting || function() {};
		PropTween = propTween;
	},
	init: function init(target, vars, tween) {
		if (!gsap) {
			console.warn("Please gsap.registerPlugin(MotionPathPlugin)");
			return false;
		}
		if (!(typeof vars === "object" && !vars.style) || !vars.path) vars = { path: vars };
		var rawPaths = [], _vars = vars, path = _vars.path, autoRotate = _vars.autoRotate, unitX = _vars.unitX, unitY = _vars.unitY, x = _vars.x, y = _vars.y, firstObj = path[0], slicer = _sliceModifier(vars.start, "end" in vars ? vars.end : 1), rawPath, p;
		this.rawPaths = rawPaths;
		this.target = target;
		this.tween = tween;
		this.styles = _getStyleSaver && _getStyleSaver(target, "transform");
		if (this.rotate = autoRotate || autoRotate === 0) {
			this.rOffset = parseFloat(autoRotate) || 0;
			this.radians = !!vars.useRadians;
			this.rProp = vars.rotation || "rotation";
			this.rSet = target._gsap.set(target, this.rProp, this);
			this.ru = _getUnit(target._gsap.get(target, this.rProp)) || 0;
		}
		if (Array.isArray(path) && !("closed" in path) && typeof firstObj !== "number") {
			for (p in firstObj) if (!x && ~_xProps.indexOf(p)) x = p;
			else if (!y && ~_yProps.indexOf(p)) y = p;
			if (x && y) rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray(_populateSegmentFromArray([], path, x, 0), path, y, 1), target, x, y, slicer, vars, unitX || _getUnit(path[0][x]), unitY || _getUnit(path[0][y])));
			else x = y = 0;
			for (p in firstObj) p !== x && p !== y && rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray([], path, p, 2), target, p, 0, slicer, vars, _getUnit(path[0][p])));
		} else {
			rawPath = slicer(_align(getRawPath(vars.path), target, vars));
			cacheRawPathMeasurements(rawPath, vars.resolution);
			rawPaths.push(rawPath);
			_addDimensionalPropTween(this, target, vars.x || "x", rawPath, "x", vars.unitX || "px");
			_addDimensionalPropTween(this, target, vars.y || "y", rawPath, "y", vars.unitY || "px");
		}
		tween.vars.immediateRender && this.render(tween.progress(), this);
	},
	render: function render(ratio, data) {
		var rawPaths = data.rawPaths, i = rawPaths.length, pt = data._pt;
		if (data.tween._time || !_reverting()) {
			if (ratio > 1) ratio = 1;
			else if (ratio < 0) ratio = 0;
			while (i--) getPositionOnPath(rawPaths[i], ratio, !i && data.rotate, rawPaths[i]);
			while (pt) {
				pt.set(pt.t, pt.p, pt.path[pt.pp] + pt.u, pt.d, ratio);
				pt = pt._next;
			}
			data.rotate && data.rSet(data.target, data.rProp, rawPaths[0].angle * (data.radians ? _DEG2RAD : 1) + data.rOffset + data.ru, data, ratio);
		} else data.styles.revert();
	},
	getLength: function getLength(path) {
		return cacheRawPathMeasurements(getRawPath(path)).totalLength;
	},
	sliceRawPath,
	getRawPath,
	pointsToSegment,
	stringToRawPath,
	rawPathToString,
	transformRawPath,
	getGlobalMatrix,
	getPositionOnPath,
	cacheRawPathMeasurements,
	convertToPath: function convertToPath$1(targets, swap) {
		return _toArray(targets).map(function(target) {
			return convertToPath(target, swap !== false);
		});
	},
	convertCoordinates: function convertCoordinates(fromElement, toElement, point) {
		var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
		return point ? m.apply(point) : m;
	},
	getAlignMatrix: _getAlignMatrix,
	getRelativePosition: function getRelativePosition(fromElement, toElement, fromOrigin, toOrigin) {
		var m = _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin);
		return {
			x: m.e,
			y: m.f
		};
	},
	arrayToRawPath: function arrayToRawPath(value, vars) {
		vars = vars || {};
		var segment = _populateSegmentFromArray(_populateSegmentFromArray([], value, vars.x || "x", 0), value, vars.y || "y", 1);
		vars.relative && _relativize(segment);
		return [vars.type === "cubic" ? segment : pointsToSegment(segment, vars.curviness)];
	}
};
_getGSAP() && gsap.registerPlugin(MotionPathPlugin);
//#endregion
export { ScrollTrigger as i, Flip as n, DrawSVGPlugin as r, MotionPathPlugin as t };
