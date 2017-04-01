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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Section = function () {
	function Section(model, template) {
		_classCallCheck(this, Section);

		this.container = (0, _domify2.default)(_handlebars2.default.compile(template)(model));
	}

	_createClass(Section, [{
		key: 'showUp',
		value: function showUp() {
			_gsap2.default.fromTo(this.container, 0.4, { autoAlpha: 0 }, { delay: 0.4, autoAlpha: 1, ease: Power2.easeOut,
				onComplete: function () {
					for (var i = 0; i < this.components.length; i++) {
						this.components[i].showUp();
					}
				}.bind(this)
			});
		}
	}, {
		key: 'instanceComponents',
		value: function instanceComponents() {}
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
			_gsap2.default.fromTo(this.container, 0.4, { autoAlpha: 1 }, { delay: 0.8, autoAlpha: 0, ease: Power2.easeOut,
				onComplete: function () {
					for (var i = 0; i < this.components.length; i++) {
						this.components[i].goOut();
					}
					this._remove();
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