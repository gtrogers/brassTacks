describe("BrassTacks.js", function() {
    describe("list builder", function() {
        var containerId = "container";

        beforeEach(function() {
            var container = document.createElement("ul");
            container.setAttribute("id", containerId);
            document.getElementsByTagName("body")[0].appendChild(container);
        });

        afterEach(function() {
            document.getElementsByTagName("body")[0].removeChild(document.getElementById(containerId));
        })

        it("should create list elements for simple case: 10/5 = 2", function() {
            var container = document.getElementById(containerId);
            _T_(containerId).show(10).as().value(2).go();
            expect(container.childNodes.length).toBe(5);
        });

        it("should create list elements for case with remainder: 17/5 = 3.4", function() {
            var container = document.getElementById(containerId);
            _T_(containerId).show(17).as().value(5).go();
            expect(container.childNodes.length).toBe(4);
        });
        
        it("should add _bt_ul class to the containing ul", function () {
            var container = document.getElementById(containerId);
            _T_(containerId).show(2).as().value(1).go();
            expect(document.getElementsByClassName("_bt-ul")[0]).toBe(container);
        });
        
        it("should add _bt_item class to the generated li tags", function () {
            var container = document.getElementById(containerId);
            _T_(containerId).show(2).as().value(1).go();
            for(var i=0;i<container.childNodes.length;i++) {
                expect(container.childNodes[i].getAttribute("class")).toContain("_bt-item");
            }
        });
        
        it("should add the _bt-small class to the containing ul when there are more than 20 things in the list", function () {
            var container = document.getElementById(containerId);
            _T_(containerId).show(20).as(1).value(1).go();
            expect(container.getAttribute("class")).toContain("_bt-small");
        });
        
        it("should add the _bt-medium class to the containing ul when there are more than 10 things in the list", function () {
            var container = document.getElementById(containerId);
            _T_(containerId).show(10).as(1).value(1).go();
            expect(container.getAttribute("class")).toContain("_bt-medium");
        });

        it("should add the _bt-medium class to the containing ul when there are 5 or less things in the list", function () {
            var container = document.getElementById(containerId);
            _T_(containerId).show(5).as(1).value(1).go();
            expect(container.getAttribute("class")).toContain("_bt-large");
        });
        
        it("should represent remainder as narrower list element: 10/5 = 3.4", function() {
            // for now set widths explicitly - think of a nicer way later
            var container = document.getElementById(containerId),
                width = 150;
            _T_(containerId).show(17).as().value(5).image("#").go();
            expect(parseFloat(container.childNodes[3].style["width"])).toBeCloseTo(width*0.4);
        });
    });
});
