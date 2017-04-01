var Signal = require('signals');

const Farmer = {
    
    seed(model) {
        this.model = model;
        this.routes = this.model.routes;
        this.defaultSection = this.model.default;
        this.sections = {};
        this.currentSection;
        this.variableString = '/#';
        this.currentUrl = '/';
        this._instancePreloader();
        this._instanceSections();
        this._addGlobalListeners();
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
        this.currentSection  = this.sections[this.defaultSection].instance;
        window.location.href =  this.variableString + this.defaultSection;

        this._procedeShowUp(this.currentSection);
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

    getCurrentUrl() {
        return currentUrl;
    },

    harvest(id) {
        this.procedeGoOut(this.currentSection);
        this.currentSection  = this.sections[id].instance;
        currentUrl = id;
        window.location.href =  this.variableString + id;
        document.body.appendChild(this.currentSection.container);
        this._procedeShowUp(this.currentSection);
    },

    feed(framework) {
        for (var key in this.routes) {
            this.sections[key].instance.framework = framework;
            this.sections[key].instance.instanceComponents();
            this.sections[key].instance.appendComponents();
            this.sections[key].instance.addListeners();
        }
    }
}

Farmer.Section = require('./section');
module.exports = Farmer;