// COOKIES
var cookieName = "acceptscookies",
  accepts = undefined,
  analytics = function() {
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtag/js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "UA-27223594-4");
  };

document.cookie.split(";").forEach(function(item) {
  var parts = item.trim().split("=");
  if (cookieName == parts[0]) {
    accepts = parts[1];
  }
});

if (!accepts) {
  document.querySelector(".cookie-container").classList.remove("hidden");
  document.querySelector(".cookie-btn").addEventListener("click", function() {
    document.cookie = cookieName + "=accepted;max-age=3153600000";
    document.querySelector(".cookie-container").remove();
    accepts = true;
    analytics();
  });
} else {
  analytics();
}

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {
      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {
        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-27223594-4");

window.onload = function() {
  // theme animations
  setTimeout(function() {
    var list = document.querySelectorAll(".bg-circle");
    Array.prototype.forEach.call(list, function(item) {
      item.className = item.className + " animated";
    });
  }, 500);
};

// scroll background with page
// blatantly copied form https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
let last_known_scroll_position = 0;
let ticking = false;
const bg = document.querySelector('.bg-theme');

function doSomething(scroll_pos) {
  // Do something with the scroll position
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      bg.style.transform = `translateY(${Math.floor(last_known_scroll_position / 1.5)}px)`; 
      ticking = false;
    });

    ticking = true;
  }
}, { passive: true });
