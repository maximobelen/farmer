export default class Router {

    constructor(framework) {
        this.framework = framework;
    }

    getCurrentUrl() {
        return this.currentUrl;
    }

    _setCurrentSection(Section) {
        this.currentSection =  Section;
    }

    getCurrentSection() {
        return this.currentSection;
    }

    harvest(id) {
        this.framework._procedeGoOut(this.currentSection);
        
        this.currentSection.afterGoOut.add(function() {
            this.currentSection = this.framework.sections[id].instance;
            this.currentUrl = id;
            window.location.href = this.framework.variableString + id;
            document.body.appendChild(this.currentSection.container);
            this.framework._procedeShowUp(this.currentSection);
        }.bind(this));
    }
}