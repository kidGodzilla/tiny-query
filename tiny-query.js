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

    this.items.forEach(item => {
      item.classList.toggle(classes);
    });

    return this;
  };

  this.show = () => {
    this.items.forEach(item => {
      item.style.display = "";
      item.style.opacity = 1;
    });

    return this;
  };

  this.hide = () => {
    this.items.forEach(item => {
      item.style.display = "none";
    });

    return this;
  };

  this.toggle = () => {
    this.applyAll(item => {
      if (item.style.display == "none") {
        item.style.display = "";
        item.style.opacity = 1;
      } else {
        item.style.display = "none";
      }
    });

    return this;
  };

  this.fadeToggle = () => {
    this.applyAll(item => {
      if (item.style.opacity == 0) {
        item.style.transition = "opacity 400ms";
        item.style.display = "";
        item.style.opacity = 1;
      } else {
        item.style.transition = "opacity 400ms";
        item.style.opacity = 0;
      }
    });

    return this;
  };

  this.fadeIn = () => {
    this.items.forEach(item => {
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
    this.items.forEach(item => {
      item.style.transition = "opacity 400ms";
      item.style.opacity = 0;
    });

    return this;
  };

  this.before = htmlString => {
    this.items.forEach(item => {
      item.insertAdjacentHTML("beforebegin", htmlString);
    });

    return this;
  };

  this.after = htmlString => {
    this.items.forEach(item => {
      item.insertAdjacentHTML("afterend", htmlString);
    });

    return this;
  };

  this.append = el => {
    this.items.forEach(item => {
      item.appendChild(el);
    });

    return this;
  };

  this.prepend = el => {
    this.items.forEach(item => {
      item.insertBefore(el, parent.firstChild);
    });

    return this;
  };

  this.html = string => {
    if (typeof string == "string") {
      this.items.forEach(item => {
        item.innerHTML = string;
      });

      return this;
    }

    return this.items[0].innerHTML;
  };

  this.outerHtml = string => {
    if (typeof string == "string") {
      this.items.forEach(item => {
        item.outerHTML = string;
      });

      return this;
    }

    return this.items[0].outerHTML;
  };

  this.text = string => {
    if (typeof string == "string") {
      this.items.forEach(item => {
        item.textContent = string;
      });

      return this;
    }

    return this.items[0].textContent;
  };

  this.remove = () => {
    this.items.forEach(item => {
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
    if (d.attachEvent ? d.readyState === "complete" : d.readyState !== "loading")
      fn();
    else document.addEventListener("DOMContentLoaded", fn);

    return true;
  };

  /**
   * Terminating methods
   */
  this.attr = (attribute, value) => {
    if (value) {
      this.items.forEach(item => {
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
  
  this.getScript = (script) => {
    return document.body.insertAdjacentHTML('afterend', `<script src="${script}">&lt;/script>`);
  };

  this.getStylesheet = (stylesheet) => {
    document.body.insertAdjacentHTML('afterend', `<link rel="stylesheet" href="${stylesheet}">`);
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
  this.find = selector => {
    let els = [];

    this.applyAll(item => {
      for (var el of item.querySelectorAll(selector)) {
        els.push(el);
      }
    });

    this.items = els;
    return this.return();
  };

  this.param = obj => {
    return Object.keys(obj).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
  };

  this.first = () => {
    this.items = [this.items[0]];
    return this;
  };

  // https://cdnjs.cloudflare.com/ajax/libs/reqwest/2.0.5/reqwest.min.js
  if (window.reqwest) {
    this.ajax = window.reqwest; // Not a typo
  }

  // If we've passed a selector, select it.
  if (typeof s == "string") {
    let arr = document.querySelectorAll(s);
    if (!arr.length && arr.length !== 0) arr = [arr];
    this.items = arr;
  } else if (typeof s == "object") {
    this.items = [s];
  }

  // Todo:
  // closest

  this.return = () => {
    // Prototypical exports
    Object.keys(this).forEach((key) => {
      if (key !== 'items' && key !== 'return')
        this.items['__proto__'][key] = this[key];
    });

    // $.ajax is a special case
    if (window.reqwest) this.items.__proto__.ajax = this.ajax;

    if (s && typeof s === 'string')
      return this.items;
    else
      return this;
  };

  return this.return();
}

// Instantiate TinyQuery as $
const $ = s => {
  return new TinyQuery(s);
};

// Prototypical exports
Object.keys(TinyQuery()).forEach((key) => {
  if (key !== 'items' && key !== 'return')
    $['__proto__'][key] = TinyQuery()[key];
});

// $.ajax is a special case
if (window.reqwest) $.__proto__.ajax = TinyQuery().ajax;
