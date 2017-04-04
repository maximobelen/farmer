'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _domify = require('domify');

var _domify2 = _interopRequireDefault(_domify);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _signals = require('signals');

var _signals2 = _interopRequireDefault(_signals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Section = function () {
	function Section(model, template) {
		_classCallCheck(this, Section);

		this.container = (0, _domify2.default)(_handlebars2.default.compile(template)(model));
		this.components = {};
		this.router = {};
		this.afterGoOut = new _signals2.default();
		this.afterShowUp = new _signals2.default();
	}

	_createClass(Section, [{
		key: 'showUp',
		value: function showUp() {
			TweenMax.fromTo(this.container, 0.4, { autoAlpha: 0 }, { delay: 0.4, autoAlpha: 1, ease: Power2.easeOut,
				onComplete: function () {
					for (var i = 0; i < this.components.length; i++) {
						this.components[i].showUp();
					}
					this.afterShowUp.dispatch();
				}.bind(this)
			});
		}
	}, {
		key: 'instanceComponents',
		value: function instanceComponents() {}
	}, {
		key: 'addComponent',
		value: function addComponent(key, addToDom, Component) {
			this.components[key] = new Component();
			if (addToDom) {
				this.components[key].section = this;
				this.container.appendChild(this.components[key].container);
			}
		}
	}, {
		key: 'appendComponents',
		value: function appendComponents() {}
	}, {
		key: 'addListeners',
		value: function addListeners() {}
	}, {
		key: 'resize',
		value: function resize(w, h) {}
	}, {
		key: 'goOut',
		value: function goOut() {
			for (var i = 0; i < this.components.length; i++) {
				this.components[i].goOut();
			}

			TweenMax.fromTo(this.container, 0.4, { autoAlpha: 1 }, { delay: 0.8, autoAlpha: 0, ease: Power2.easeOut,
				onComplete: function () {
					this._remove();
					this.afterGoOut.dispatch();
				}.bind(this)
			});
		}
	}, {
		key: '_remove',
		value: function _remove() {
			this.container.parentNode.removeChild(this.container);
		}
	}]);

	return Section;
}();

exports.default = Section;