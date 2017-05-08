import hbs from 'handlebars';
import domify from 'domify';
import gsap from 'gsap';
import Signal from 'signals';

export default class Section {
	constructor(model, template) {
	    this.container = domify(hbs.compile(template)(model));
	    this.components = {};
	    this.router = {};
	    this.afterGoOut = new Signal();
	    this.afterShowUp = new Signal();
	}
	
	showUp() {
	    TweenMax.fromTo(this.container, 0.4, {autoAlpha: 0}, {delay: 0.4, autoAlpha: 1, ease: Power2.easeOut, 
		    onComplete: function() {
		    	for (var i = 0; i < this.components.length; i++) {
		    		this.components[i].showUp();
		    	}
		    	this.afterShowUp.dispatch();
		    }.bind(this)
	    });
  	}

	instanceComponents() {

	}

	addComponent(key, addToDom, Component) {
		this.components[key] = Component;
		if (addToDom) {
			this.components[key].section = this;
			this.container.appendChild(this.components[key].container);
		}
	}

	addListeners() {

	}

	resize(w, h) {
		this.container.style.width = w;
		this.container.style.height = h;
	}

	goOut() {
		for (var i = 0; i < this.components.length; i++) {
    		this.components[i].goOut();
    	}

		TweenMax.fromTo(this.container, 0.4, {autoAlpha: 1}, {delay: 0.8, autoAlpha: 0, ease: Power2.easeOut, 
			onComplete: function() {
		    	this._remove();
		    	this.afterGoOut.dispatch();
			}.bind(this)
		});
	}

	_remove() {
		this.container.parentNode.removeChild(this.container);
	}
}