![TinyQuery](https://kidgodzilla.github.io/tiny-query/tiny-query.png)

## Most of the syntactic sugar of jQuery. **2kb compressed.**

[![npm version](https://badge.fury.io/js/tiny-query.svg)](https://www.npmjs.com/package/tiny-query)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](https://opensource.org/licenses/MIT)
![Contains](https://img.shields.io/badge/contains-badges-orange.svg)

### Installation via NPM

```
npm install tiny-query
```

### Usage via CDN

Include one of the following scripts in your project:

```
https://unpkg.com/tiny-query@latest/tiny-query.min.js
```

or alternatively:

```
https://cdn.jsdelivr.net/npm/tiny-query@latest/tiny-query.min.js
```

### What it does

You can use it as a jQuery replacement, particularly if you only need to target modern browsers.

TinyQuery includes most of the useful parts of jQuery, including:

- Sizzle replacement (selector engine)
- Element utilities
- Effects
- Events

### Why

jQuery is great. It makes the DOM easy to manipulate, despite an unforgiving native API.

But, you ever wonder what it would look like if you started over, and just used modern Javascript?

Well, it's something like 400 lines of code. And you're looking at it.

### Examples

```
$('body').hide()
```

```
$('body').find('p').addClass('foo');
```

```
$('p').eq(4).fadeOut();
```

```
$('#form').on('submit', (e) => {
  e.preventDefault();
  console.log('Submitted!');
});
```


### What's missing

By default, `$.ajax` is not supported. However, if you first include the `reqwest` library, it will be included as `$.ajax`.

```
https://cdnjs.cloudflare.com/ajax/libs/reqwest/2.0.5/reqwest.min.js
```

-----

Also, jQuery tends to alias a ton of things for convenience. I'm open to it (via Pull Request), I just haven't implemented a lot of that. ($(s).on('click') vs. $(s).click(), etc.)

-----

https://docs.google.com/document/d/1LPaPA30bLUB_publLIMF0RlhdnPx_ePXm7oW02iiT6o/edit is a good write-up of browser-specific workarounds you get for free when using jQuery.

-----

Also, some more complex behavior may be missing, even when a method is partially supported.

This is a WIP. Feel free to open issues (or Pull Requests!) if you find anything that annoys you.

-----

## Thanks!
