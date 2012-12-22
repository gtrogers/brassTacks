var _T_ = function () {
    var scoped = {};
    
    division = function (valueToVis, valueOfItem) {
        var nearestInt = parseInt(valueToVis / valueOfItem);
        return {
            nearestInt: nearestInt,
            remainder: (valueToVis / valueOfItem) - nearestInt
        };
    }
    
    var build = function (infographic) {
        var visData = division(infographic.value, infographic.item.value),
            size = (visData.nearestInt > 5) ? (visData.nearestInt >= 20) ? "small" : "medium" : "large";
            infographic.container.setAttribute("class","_bt-ul" + " _bt-" + size);
            for (var i=0; i<visData.nearestInt; i++) {
                infographic.container.appendChild(infographic.element());
            }
            
            if (visData.remainder > 0) {
                var lastElement = infographic.element();
                infographic.container.appendChild(lastElement);
                lastElement.style.width = (lastElement.offsetWidth * visData.remainder) + "px"
            }
    };
    
    var Infographic = function(valueToVis) {
        this.value = valueToVis;
        this.item = undefined;
        this.container = undefined;
    };

    Infographic.prototype.as = function(item) {
        this.item = item
        return this;
    };
    
    Infographic.prototype.in = function(id) {
        this.container = document.getElementById(id);
        build(this);
    };
    
    Infographic.prototype.element = function() {
        var element = document.createElement("li");
        element.setAttribute("class", "_bt-item");
        if (this.item.name) {
            element.setAttribute("alt", this.item.name);
            element.setAttribute("title", this.item.name);
        }
        element.setAttribute("style", "background-image:url(" + this.item.image + ")");
        return element;
    }
    
    scoped.makeInfographic = function (valueToVis) {
        return new Infographic(valueToVis);
    };
    
    return{ 
        show: function (value) { return scoped.makeInfographic(value); }
    };
}();
