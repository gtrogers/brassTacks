brassTacks
==========

brassTacks.js is a javascript micro-library for quickly creating infographics

Usage
=====

This is the tack function (it sort of looks like a pin if you squint hard enough) 

```javascript
_T_
```

To create an infographic select a UL element and provide some information:

```javascript
_T_.show(aValue).as({value: valuePerItem, name: "name of item", image: "image.url"}).in("ul-id");
```

That's it for now. Enjoy.