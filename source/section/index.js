import hbs from 'handlebars';
import domify from 'domify';
import gsap from 'gsap';

export default class Section {
	constructor(model, template){
	    this.container = domify(hbs.compile(template)(model));
	    this.components = [];
	}
	
	showUp() {
	    TweenMax.fromTo(this.container, 0.4, {autoAlpha: 0}, {delay: 0.4, autoAlpha: 1, ease: Power2.easeOut, 
		    onComplete: function() {
		    	for (var i = 0; i < this.components.length; i++) {
		    		this.components[i].showUp();
		    	}
		    }.bind(this)
	    });
  	}

	instanceComponents() {

	}

	appendComponents() {

	}

	addListeners() {

	}

	resize(w, h) {

	}

	goOut() {
		TweenMax.fromTo(this.container, 0.4, {autoAlpha: 1}, {delay: 0.8, autoAlpha: 0, ease: Power2.easeOut, 
			onComplete: function() {
				for (var i = 0; i < this.components.length; i++) {
		    		this.components[i].goOut();
		    	}
		    	this._remove();
			}.bind(this)
		});
	}

	_remove() {
		this.container.parentNode.removeChild(this.container);
	}
}