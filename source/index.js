import Signal from 'signals';
import Router from './router';

const Farmer = {
    
    seed(model) {
        this.model = model;
        this.routes = this.model.routes;
        this.defaultSection = this.model.default;
        this.sections = {};
        this.variableString = '/#';
        this.currentUrl = '/';
        this._instancePreloader();
        this._instanceSections();
        this._addGlobalListeners();

        this.router = new Router(this);
    },

    _addGlobalListeners() {
        window.onresize = function() {
            this._handleResize();
        }.bind(this);

        window.onload = function() {
            this._handlePreloader();
        }.bind(this);

        window.onhashchange = function(e) {
            this.onRouteChanged.dispatch();
        }.bind(this);

        this.onRouteChanged = new Signal();
    },

    _instancePreloader() {
        this.preloader =  new this.model.preloader.seed.Preloader;
        document.body.appendChild(this.preloader.container);
        this.preloader.instanceComponents();
        this.preloader.appendComponents();
        this.preloader.addListeners();
    },

    _instanceSections() {
        for (var key in this.routes) {
            this.sections[key] = {};
            this.sections[key].instance =  new this.routes[key].seed[this.routes[key].name];
        }
    },

    _handlePreloader() {
        document.body.appendChild(this.sections[this.defaultSection].instance.container);
        this.preloader.goOut();
        this.router._setCurrentSection(this.sections[this.defaultSection].instance);
        window.location.href =  this.variableString + this.defaultSection;
        this._procedeShowUp(this.router.getCurrentSection());
    },

    _procedeShowUp(section) {
        section.showUp();
    },

    _procedeGoOut(section) {
        section.goOut();
    },

    _handleResize() {
        for (var key in this.sections) {
            this.sections[key].instance.resize(window.innerWidth, window.innerHeight);
        }
    },

    feed(framework) {
        for (var key in this.routes) {
            this.sections[key].instance.router = this.router;
            this.sections[key].instance.instanceComponents();
            this.sections[key].instance.appendComponents();
            this.sections[key].instance.addListeners();
        }
    }
}
Farmer.Section = require('./section').default;
Farmer.Component = require('./component').default;
module.exports = Farmer;