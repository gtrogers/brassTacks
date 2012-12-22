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

        it("should represent remainder as narrower list element: 10/5 = 3.4", function() {
            // for now set widths explicitly - think of a nicer way later
            var container = document.getElementById(containerId),
                width = 150;
            _T_(containerId).show(17).as().value(5).image("#").go();
            expect(parseFloat(container.childNodes[3].style["width"])).toBeCloseTo(width*0.4);
        });
    });
});
