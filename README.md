# tiny-query

## TinyQuery is a modern selector library that doesn't do much.

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

You can use it as a jQuery replacement, particularly if you do not need to target anything older than IE10, and are fine with losing compatability with older versions of Android.

TinyQuery includes most of the useful parts of jQuery, including:

- Sizzle replacement (selector engine)
- Element utilities
- Effects
- Events

By default, `$.ajax` is not supported. However, if you first include the `reqwest` library, it will be included as `$.ajax`.

```
https://cdnjs.cloudflare.com/ajax/libs/reqwest/2.0.5/reqwest.min.js
```

