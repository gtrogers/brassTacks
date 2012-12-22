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
            _T_.show(10).as({value:2,image:"#"}).in(containerId);
            expect(container.childNodes.length).toBe(5);
        });

        it("should create list elements for case with remainder: 17/5 = 3.4", function() {
            var container = document.getElementById(containerId);
            _T_.show(17).as({value:5,image:"#"}).in(containerId);
            expect(container.childNodes.length).toBe(4);
        });
        
        it("should add _bt_ul class to the containing ul", function () {
            var container = document.getElementById(containerId);
            _T_.show(2).as({value:1,image:"#"}).in(containerId);
            expect(document.getElementsByClassName("_bt-ul")[0]).toBe(container);
        });
        
        it("should add _bt_item class to the generated li tags", function () {
            var container = document.getElementById(containerId);
            _T_.show(2).as({value:1,image:"#"}).in(containerId);
            for(var i=0;i<container.childNodes.length;i++) {
                expect(container.childNodes[i].getAttribute("class")).toContain("_bt-item");
            }
        });
        
        it("should add the _bt-small class to the containing ul when there are more than 20 things in the list", function () {
            var container = document.getElementById(containerId);
            _T_.show(20).as({value:1,image:"#"}).in(containerId);
            expect(container.getAttribute("class")).toContain("_bt-small");
        });
        
        it("should add the _bt-medium class to the containing ul when there are more than 10 things in the list", function () {
            var container = document.getElementById(containerId);
            _T_.show(10).as({value:1,image:"#"}).in(containerId);
            expect(container.getAttribute("class")).toContain("_bt-medium");
        });

        it("should add the _bt-medium class to the containing ul when there are 5 or less things in the list", function () {
            var container = document.getElementById(containerId);
            _T_.show(5).as({value:1,image:"#"}).in(containerId);
            expect(container.getAttribute("class")).toContain("_bt-large");
        });
        
        it("should represent remainder as narrower list element: 10/5 = 3.4", function() {
            // for now set widths explicitly - think of a nicer way later
            var container = document.getElementById(containerId),
                width = 150;
            _T_.show(17).as({value:5,image:"#"}).in(containerId);
            expect(parseFloat(container.childNodes[3].style["width"])).toBeCloseTo(width*0.4);
        });
        
        it("should set alt text and title attributes if item has a name", function() {
            var container = document.getElementById(containerId),
                itemName = "an item";
            _T_.show(15).as({name:itemName, value:5, image:"foo.gif"}).in(containerId);
            for (var i=0;i<container.childNodes.length;i++) {
                expect(container.childNodes[i].getAttribute("alt")).toBe(itemName);
                expect(container.childNodes[i].getAttribute("title")).toBe(itemName);
            }
        });
        
        it("should set background-image to the items image", function() {
            var container = document.getElementById(containerId),
                itemImage = "foo.gif";
            _T_.show(15).as({name:"something", value:5, image:itemImage}).in(containerId);
            for (var i=0;i<container.childNodes.length;i++) {
                // to do - better matcher?
                expect(container.childNodes[i].style["background-image"]).toContain(itemImage);
            }
        });
        
    });
});
