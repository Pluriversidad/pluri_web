import assetData from "../data/compilation-stats.json";
import { co2 } from "@tgwf/co2";
import round from "./round.js";
import TagCloud from "./vendor/TagCloud.js";

const swd = new co2();
console.log(assetData.assets);

let pageSize = 0;
const assetWeight = assetData.assets.map((asset) => {
  pageSize += asset.size;
});
pageSize += document.getElementsByTagName("html")[0].outerHTML.length;

//count images
pageSize += document.getElementsByTagName("figure").length * 140000;
//count thumbnails
pageSize += document.querySelectorAll(".size-thumbnail").length * 10000;

let pageCarbon = round(swd.perByte(pageSize), 4);
const carbonContainer = document.getElementById("carbon");
carbonContainer.innerHTML = `${pageCarbon} gr. de co2`;

//navigation
const nav = document.querySelector("#main-navigation");
const toggleMenu = document.querySelector("#toggle-menu");
const toggleSubMenuDesktop = document.querySelectorAll(
  "#desktop-menu li.menu-item-has-children > a"
);

let isMobile = false;
if (screen.width <= 768) {
  isMobile = true;
}

nav.classList.add("collapsed");

toggleMenu.addEventListener("click", function (e) {
  e.preventDefault();
  if (nav.classList.contains("collapsed")) {
    nav.classList.remove("collapsed");
    toggleMenu.classList.add("active");
  } else {
    nav.classList.add("collapsed");
    toggleMenu.classList.remove("active");
  }
});

toggleSubMenuDesktop.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    let parentLi = el.parentElement;
    let others = document.querySelectorAll("li.active");

    

    if (parentLi.classList.contains("active")) {
      parentLi.classList.remove("active");
    } else {
      parentLi.classList.add("active");
      
      for (let i = 0; i < others.length; i++) {
        others[i].classList.remove("active");
      }
      
    }
  });
});

//console.log(nav);

//tag cloud
const cloudContainer = ".pluri-tag-cloud";
const tags = pluri.tags.map((tag) => {
  return tag.name;
});
const findTag = (tagName) => {
  return pluri.tags.find((tag) => {
    if (tag.name === tagName) {
      return tag.slug;
    }
  });
};

if (document.querySelector(cloudContainer)) {
  TagCloud(cloudContainer, tags, { radius: isMobile ? 320 : 300 });

  let tagItems = document.querySelectorAll("span.tag-cloud--item");
  let rootEl = document.querySelector(".pluri-tag-cloud");

  rootEl.addEventListener("click", function clickEventHadler(e) {
    if (e.target.tagName === "SPAN") {
      let tagSlug = findTag(e.target.innerHTML).slug;
      window.location.href = `/tag/${tagSlug}`;
    }
  });

  console.log(tags);
}
