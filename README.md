[![LOGO](https://github.com/maximobelen/assets/raw/master/images/farmer/farmer.png)](https://github.com/maximobelen/assets/raw/master/images/farmer/farmer.png)

and the very beginnings of the [ logo ](https://github.com/maximobelen/assets/blob/master/images/farmer/logo-draw.png)

# Farmer
Farmer is lightweight library to create a single-page web app. Farmer is a MC and only manage the views and the controllers and also the navigation between views with a simple router.


### Just give the seed to the farmer, and the farmer will harvest for you!

## Installation 

[![NPM](https://nodei.co/npm/farmer-js.png)](https://www.npmjs.com/package/farmer-js)

## Set the config to farmer

### farmer-config.js
```js
module.exports = {
	'routes':{
		'/': {name:'Landing', path: './sections/Landing/', seed: require('./sections/Landing/landing.js') },
		'/contact': {name:'Contact', path: './sections/Contact/', seed: require('./sections/Contact/contact.js') }
	},
	'default': '/',
	'preloader': {
		name:'preloader', 
		path: './sections/Preloader/', 
		seed: require('./sections/Preloader/preloader.js')
	}
};
```
### index.js
```js
var farmer = require('farmer-js');
var config = require('./farmer-config.js');
// Seed the farmer with your config file
farmer.seed(config);
// feed the farmer whenever you want to make the lib start
farmer.feed();
```
## Farmer elements

### Section
#### Introduction
For farmer a section represent the view element, and should be defined inside the farmer-config.js.

A section automatically execute the methods in this order:

##### On Farmer feed
-  constructor(): this function create the section and is only executed when you feed the farmer.
-  instanceComponents():  this function is executed after the constructor and should be used to init all the components that belong to this section that were added by the use of the function addComponent of the section (lets talk later about this).
-  addListeners(): this function is executed after instanceComponents and should be used to add all the listeners to the current section.

##### On Farmer Router navigate
-  showUp(): this function is executed when you navigate to a section and perform the animate in of the section and all the components that belong to the section.
-  goOut(): this function is executed when you navigate to another section and perform the animate out of the current section and all the components that belong to the section.

#### Creating a section
```js
// Modules
import fs from 'fs';
import { Section } from 'farmer-js';

//Components
import Navbar from '../../components/Navbar/navbar.js';

//Model
import model from './landing-model.js';

class Landing extends Section {

    constructor() {
        var template = fs.readFileSync(__dirname + '/landing.hbs', 'utf8');
        super(model, template);
    }

	instanceComponents() {
		// This is the way to append components to the 
   		this.addComponent('navbar', true, Navbar);
	}

	addListeners() {

	}
};

export { Landing }

```
#### Section tips
If you add a component to your section using the this.addComponent method then by this.components.componentName you can access to your child components.
And only this components added in this way are the one that are going to be animated in or animated out with the section when it correspond.

### Component
#### Introduction
For farmer a component is a view element that go inside a section.
A component can have inner components.

```js
// Modules
import fs from 'fs';
import { Component } from 'farmer-js';
import select from 'dom-select';

//Model
import model from './navbar-model.js';

class Navbar extends Component {

    constructor (framework) {
        var template = fs.readFileSync(__dirname + '/navbar.hbs', 'utf8');
        super(model, template);
    }

    goHome() {
        this.navigate('/');
    }
    
    navigate(route) {
        this.section.router.harvest(route);
    }

    instanceComponents() {
        this.logoContainer = select('.logo-container', this.container);
    }

    addListeners() {
        this.components.logoContainer.addEventListener('mousedown', function() {
            if (this.section.router.getCurrentUrl() !== '/') {
                this.goHome();
            }
        }.bind(this));
    }
};

module.exports = Navbar;
```
#### addComponent (name, addToDom, Component);

```js
//The first param is the one that is used as component name, and is the one which you can find the component inside the this.components list
//The secont param indicate if this component should be append it to the parent container or not (section, or parent component).
//The third param is the final component class, without initizalization, it will be initialized by the library.

//View ui Component
this.addComponent('navbar', true, Navbar);

//Handler Component
this.addComponent('scroller', false, ScrollManager);

```
### Router
#### Introduction
For farmer the router is in charge to navigate from one view to the other.
Farmer router only have two publics methods.
-  harvest(x): this function is executed to navigate to the section x that you send it by param. This section should be defined in the farmer-config.js that you give it as an entry to the library.
-  getCurrentSection():  this function return the current section that is rendered right now.

```js
// A section knows the router, so inside a section you can run 
this.router.harvest('/');
// But also a component know to which section it belongs... so inside a component this is valid to
this.section.router.harvest('/');

```
