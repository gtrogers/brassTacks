var _T_ = function () {
    var scoped = {};
    
    scoped.division = function (valueToVis, valueOfItem) {
        var nearestInt = parseInt(valueToVis / valueOfItem);
        return {
            nearestInt: nearestInt,
            remainder: (valueToVis / valueOfItem) - nearestInt
        };
    }
    
    scoped.makeContainer = function (id) {
        function Container(id) {
            this.valueToVis = undefined;
            this.valueOfItem = undefined;
            this.optionalName = " ";
            this.imageUrl = undefined;
            this.element = function () { return document.getElementById(id); }();
        };
        
        Container.prototype.show = function (valueToVis) {
            this.valueToVis = valueToVis;
            return this;
        };
        
        Container.prototype.as = function (name) {
            if (name) this.optionalName = name;
            return this;
        };
        
        Container.prototype.value = function (valueOfItem) {
            this.valueOfItem = valueOfItem;
            return this;
        };
        
        Container.prototype.image = function (imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        };
        
        Container.prototype.buildElement = function () {
            var newElement = document.createElement("li");
            newElement.setAttribute("class", "_bt-item");
            newElement.setAttribute("alt", this.optionalName);
            newElement.setAttribute("title", this.optionalName);
            newElement.setAttribute("style", "background-image:url(" + this.imageUrl + ")");
            return newElement;
        };
        
        Container.prototype.go = function () {
            var visData = scoped.division(this.valueToVis, this.valueOfItem),
                size = (visData.nearestInt > 5) ? (visData.nearestInt > 20) ? "small" : "medium" : "large";
            
                this.element.setAttribute("class","_bt-ul" + " _bt-" + size);
            
            for (var i=0; i<visData.nearestInt; i++) {
                this.element.appendChild(this.buildElement());
            }
            
            if (visData.remainder > 0) {
                var lastElement = this.buildElement(), sizeFactor = Math.pow(visData.remainder,0.5);
                this.element.appendChild(lastElement);
                lastElement.style.width = (lastElement.offsetWidth * sizeFactor) + "px"
                lastElement.style.height = (lastElement.offsetHeight * sizeFactor) + "px";
            }
        };
        
        return new Container(id);
    };
    
    return function (id) {
        return scoped.makeContainer(id);
    };
}();