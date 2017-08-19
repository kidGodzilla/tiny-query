// TinyQuery is a selector library that doesn't do much.
function TinyQuery(s) {
  this.items = [];

  this.applyAll = fn => {
    this.items.forEach(function(item) {
      fn(item);
    });
  };

  this.addClass = classList => {
    let classes = classList.trim().split(" ");

    this.applyAll(item => {
      item.classList.add(classes);
    });

    return this;
  };

  this.removeClass = classList => {
    let classes = classList.trim().split(" ");

    this.applyAll(item => {
      item.classList.remove(classes);
    });

    return this;
  };

  this.toggleClass = classList => {
    let classes = classList.trim().split(" ");

    this.items.forEach(function(item) {
      item.classList.toggle(classes);
    });

    return this;
  };

  this.show = () => {
    this.items.forEach(function(item) {
      item.style.display = "";
      item.style.opacity = 1;
    });

    return this;
  };

  this.hide = () => {
    this.items.forEach(function(item) {
      item.style.display = "none";
    });

    return this;
  };

  this.fadeIn = () => {
    this.items.forEach(function(item) {
      item.style.transition = "opacity 400ms";

      if (item.style.display == "none") {
        item.style.opacity = 0;
        item.style.display = "";
      }

      item.style.opacity = 1;
    });

    return this;
  };

  this.fadeOut = () => {
    this.items.forEach(function(item) {
      item.style.transition = "opacity 400ms";
      item.style.opacity = 0;
    });

    return this;
  };

  this.before = htmlString => {
    this.items.forEach(function(item) {
      item.insertAdjacentHTML("beforebegin", htmlString);
    });

    return this;
  };

  this.after = htmlString => {
    this.items.forEach(function(item) {
      item.insertAdjacentHTML("afterend", htmlString);
    });

    return this;
  };

  this.append = el => {
    this.items.forEach(function(item) {
      item.appendChild(el);
    });

    return this;
  };

  this.prepend = el => {
    this.items.forEach(function(item) {
      item.insertBefore(el, parent.firstChild);
    });

    return this;
  };

  this.html = string => {
    if (typeof string == "string") {
      this.items.forEach(function(item) {
        item.innerHTML = string;
      });

      return this;
    }

    return this.items[0].innerHTML;
  };

  this.outerHtml = string => {
    if (typeof string == "string") {
      this.items.forEach(function(item) {
        item.outerHTML = string;
      });

      return this;
    }

    return this.items[0].outerHTML;
  };

  this.text = string => {
    if (typeof string == "string") {
      this.items.forEach(function(item) {
        item.textContent = string;
      });

      return this;
    }

    return this.items[0].textContent;
  };

  this.remove = () => {
    this.items.forEach(function(item) {
      item.parentNode.removeChild(item);
    });

    return this;
  };

  this.hasClass = className => {
    return this.items[0].classList.contains(className);
  };

  this.is = otherEl => {
    return this.items[0] === otherEl;
  };

  // Todo: This cannot be chained :(
  this.next = () => {
    return this.items[0].nextElementSibling;
  };

  // Todo: This cannot be chained :(
  this.prev = () => {
    return this.items[0].previousElementSibling;
  };

  /**
   * Event binding
   */
  this.on = (eventName, eventHandler) => {
    this.applyAll(item => {
      item.addEventListener(eventName, eventHandler);
    });

    return this;
  };

  this.off = (eventName, eventHandler) => {
    this.applyAll(item => {
      item.removeEventListener(eventName, eventHandler);
    });

    return this;
  };

  // Allows $(document).ready(fn) or $D().ready(fn)
  this.ready = fn => {
    let d = document;
    if (
      d.attachEvent ? d.readyState === "complete" : d.readyState !== "loading"
    )
      fn();
    else document.addEventListener("DOMContentLoaded", fn);

    return true;
  };

  /**
   * Terminating methods
   */
  this.attr = (attribute, value) => {
    if (value) {
      this.items.forEach(function(item) {
        item.setAttribute(attribute, value);
      });

      return this;
    }

    return this.items[0].getAttribute(attribute);
  };

  this.parent = () => {
    return this.items[0].parentNode;
  };

  this.children = () => {
    let els = [];
    
    this.applyAll(item => {
      for (var el of item.children) {
        els.push(el);
      }
    });

    this.items = els;
    return this.return();
  };

  this.clone = () => {
    return this.items[0].cloneNode(true);
  };

  this.contains = (el, child) => {
    return el !== child && el.contains(child);
  };

  this.css = ruleName => {
    if (ruleName) return getComputedStyle(this.items[0])[ruleName];

    return getComputedStyle(this.items[0]);
  };

  // Return a list of classes, as a string, like $(s).attr('css')
  this.classes = () => {
    return this.items[0].classList.toString();
  };

  // Selects a single node from a set, by index
  this.eq = index => {
    this.items = [this.items[index]];

    return this;
  };

  this.each = (arr, fn) => {
    return arr.forEach(fn);
  };

  this.extend = out => {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) continue;

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
      }
    }

    return out;
  };

  this.siblings = () => {
    return Array.prototype.filter.call(
      this.items[0].parentNode.children,
      function(child) {
        return child !== this.items[0];
      }
    );
  };
  
  
  this.getScript = function(script) {
    return document.body.insertAdjacentHTML("afterend", '<script src="' + script + "&lt;/script>");
  };

  this.getStylesheet = function(stylesheet) {
    document.body.insertAdjacentHTML(
      "afterend",
      '<link rel="stylesheet" href="' + stylesheet + '">'
    );
  };

  this.position = () => {
    return { left: this.items[0].offsetLeft, top: this.items[0].offsetTop }
  };

  this.offset = () => {
    var rect = this.items[0].getBoundingClientRect();
    return { top: rect.top + document.body.scrollTop, left: rect.left + document.body.scrollLeft }
  };

  this.width = () => {
    return this.items[0].offsetWidth;
  };

  this.height = () => {
    return this.items[0].offsetHeight;
  };

  // Find (can only take a selector)
  this.find = (selector) => {
    let els = [];

    this.applyAll(item => {
      for (var el of item.querySelectorAll(selector)) {
        els.push(el);
      }
    });

    this.items = els;
    return this.return();
  };

  // https://cdnjs.cloudflare.com/ajax/libs/reqwest/2.0.5/reqwest.min.js
  if (window.reqwest) {
    this.ajax = window.reqwest;
  }


  // If we've passed a selector, select it.
  if (typeof s == "string") {
    let arr = document.querySelectorAll(s);
    if (!arr.length && arr.length !== 0) arr = [arr];
    this.items = arr;
  } else if (typeof s == "object") {
    this.items = [s];
  }

  this.return = () => {
    // Prototypical exports
    this.items.__proto__.addClass = this.addClass;
    this.items.__proto__.removeClass = this.removeClass;
    this.items.__proto__.toggleClass = this.toggleClass;
    this.items.__proto__.hasClass = this.hasClass;
    this.items.__proto__.show = this.show;
    this.items.__proto__.hide = this.hide;
    this.items.__proto__.fadeIn = this.fadeIn;
    this.items.__proto__.fadeOut = this.fadeOut;
    this.items.__proto__.before = this.before;
    this.items.__proto__.after = this.after;
    this.items.__proto__.append = this.append;
    this.items.__proto__.prepend = this.prepend;
    this.items.__proto__.html = this.html;
    this.items.__proto__.text = this.text;
    this.items.__proto__.outerHtml = this.outerHtml;
    this.items.__proto__.remove = this.remove;

    this.items.__proto__.is = this.is;
    this.items.__proto__.next = this.next;
    this.items.__proto__.prev = this.prev;
    this.items.__proto__.on = this.on;
    this.items.__proto__.off = this.off;

    this.items.__proto__.ready = this.ready;
    this.items.__proto__.attr = this.attr;
    this.items.__proto__.parent = this.parent;
    this.items.__proto__.children = this.children;

    this.items.__proto__.clone = this.clone;
    this.items.__proto__.contains = this.contains;
    this.items.__proto__.css = this.css;
    this.items.__proto__.classes = this.classes;

    this.items.__proto__.eq = this.eq;
    this.items.__proto__.each = this.each;
    this.items.__proto__.extend = this.extend;

    this.items.__proto__.siblings = this.siblings;
    this.items.__proto__.getScript = this.getScript;
    this.items.__proto__.getStylesheet = this.getStylesheet;

    this.items.__proto__.position = this.position;
    this.items.__proto__.offset = this.offset;
    this.items.__proto__.width = this.width;
    this.items.__proto__.height = this.height;

    this.items.__proto__.find = this.find;

    if (window.reqwest) this.items.__proto__.ajax = this.ajax;

    return this.items;
  }

  return this.return();
}

// Instantiate TinyQuery as $
const $ = s => {
  return new TinyQuery(s);
};
