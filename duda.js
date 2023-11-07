function loadCss(css) {
  console.log(css);

  try {
    const head = document.getElementsByTagName("head")[0];
    function cssAttribute(css) {
      const link = document.createElement("link");
      link.setAttribute("id", createGuid());
      if (css.rel) link.setAttribute("rel", css.rel);
      if (css.href) link.setAttribute("href", css.href);
      if (css.integrity) link.setAttribute("integrity", css.integrity);
      if (css.crossorigin) link.setAttribute("crossorigin", css.crossorigin);
      if (css.referrerpolicy)
        link.setAttribute("referrerpolicy", css.referrerpolicy);

      head.insertAdjacentElement("beforeend", link);
      console.log(`CSS has been added, link id: ${link.id}`);
    }

    if (typeof css === "object") {
      const arrCss = Array.isArray(css);
      if (arrCss) {
        css.forEach((css) => {
          cssAttribute(css);
        });
      } else {
        cssAttribute(css);
      }
    } else if (typeof css === "string") {
      const temDiv = document.createElement("div");
      createHTML(temDiv, css);
      const newCssLink = temDiv.querySelector("link");
      if (newCssLink) {
        newCssLink.id = createGuid();
        head.insertAdjacentElement("beforeend", newCssLink);
        console.log(`CSS has been added, link id: ${newCssLink.id}`);
      }
    } else {
      console.warn(`Invalid css argument!`);
    }
  } catch (error) {
    console.error("Invalid argument", error);
  }
}

function createElement(parentElement, tagElement) {
  const newEl = document.createElement(tagElement);
  parentElement.insertAdjacentElement("beforeend", newEl);
  return newEl;
}

function appendElement(parentElement, element) {
  parentElement.insertAdjacentElement("beforeend", element);
}

function createHTML(parentElement, html) {
  parentElement.insertAdjacentHTML("beforeend", html);
}

function insertText(parentElement, text) {
  parentElement.insertAdjacentText("beforeend", text);
}

function addHandler(element, event, callback) {
  element.addEventListener(event, callback);
}

function removeHandler(element, event, callback) {
  element.removeEventListener(event, callback);
}

function toggleClass(element, className) {
  element.classList.toggle(className);
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function addCssStyle(element, style) {
  for (const property in style) {
    element.style[property] = style[property];
  }
}

function dudaButtonWithLink(text, className, link) {
  const btnElement = dudaButton(text, className);

  if (link) {
    const linkElement = dudaLink(link);

    linkElement.insertAdjacentElement("beforeend", btnElement);

    function setActive(href) {
      const url = window.location.href;
      if (url.includes(href)) {
        addClass(linkElement, "active");
        addClass(btnElement, "active");
      }
    }
    setActive(linkElement.href);
    return linkElement;
  }
  return btnElement;
}

function dudaButton(text, className) {
  const divEl = document.createElement("div");
  divEl.classList.add("dmWidget", className);
  addCssStyle(divEl, {
    display: "inline-flex",
    "justify-content": "center",
    "align-items": "center",
  });

  const spanEl = document.createElement("span");
  spanEl.classList.add("text");
  spanEl.textContent = text;
  divEl.insertAdjacentElement("beforeend", spanEl);
  return divEl;
}

function dudaLink(link, text, className) {
  const anchorEl = document.createElement("a");
  addCssStyle(anchorEl, {
    "text-decoration": "none",
  });
  let href = "/";
  if (typeof link === "object") {
    href =
      !!window.location.href && window.location.href.includes(data.siteId)
        ? `/site/${data.siteId}${link.href}?preview=true&insitepreview=true&dm_device=${data.device}`
        : link.href;
  } else {
    href = link.href;
    anchorEl.target = "_blank";
  }
  anchorEl.href = href;
  if (text) {
    insertText(anchorEl, text);
  }

  if (className) {
    addClass(anchorEl, className);
  }
  return anchorEl;
}

function dudaIcon(svg, className) {
  const icon = document.createElement("div");
  if (svg) {
    icon.insertAdjacentHTML("beforeend", svg);
  }

  addCssStyle(icon, {
    width: "24px",
    height: "24px",
  });

  const svgEl = icon.querySelector("svg");
  if (svgEl !== null) {
    svgEl.removeAttribute("fill");
    svgEl.removeAttribute("width");
    svgEl.removeAttribute("height");
    svgEl.removeAttribute("xmlns");
    const pathEls = svgEl.querySelectorAll("path");
    if (pathEls !== null) {
      pathEls.forEach((path) => {
        path.setAttribute("fill", "#1F212A");
        addClass(path, className);
      });
    }
  }
  return icon;
}

function createGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function test() {
  console.log("Test Successfully!");
}
