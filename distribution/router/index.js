"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router(framework) {
        _classCallCheck(this, Router);

        this.framework = framework;
    }

    _createClass(Router, [{
        key: "getCurrentUrl",
        value: function getCurrentUrl() {
            return this.currentUrl;
        }
    }, {
        key: "_setCurrentSection",
        value: function _setCurrentSection(Section) {
            this.currentSection = Section;
        }
    }, {
        key: "getCurrentSection",
        value: function getCurrentSection() {
            return this.currentSection;
        }
    }, {
        key: "harvest",
        value: function harvest(id) {
            this.framework._procedeGoOut(this.currentSection);

            this.currentSection.afterGoOut.add(function () {
                this.currentSection = this.framework.sections[id].instance;
                this.currentUrl = id;
                window.location.href = this.framework.variableString + id;
                document.body.appendChild(this.currentSection.container);
                this.framework._procedeShowUp(this.currentSection);
            }.bind(this));
        }
    }]);

    return Router;
}();

exports.default = Router;