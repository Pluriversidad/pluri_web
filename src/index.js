
import TagCloud from "./vendor/TagCloud.js";
import activateGalleries from "./galleries.js";
// //navigation
const toggleSubMenuDesktop = document.querySelectorAll(
  "#desktop-menu li.menu-item-has-children > a"
);

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

const energySelect = document.getElementById("pl_set_energy_cookie");

const cookieSetters = energySelect.querySelectorAll("li");
const url = pluri.ajax_url;

//Start galleries

activateGalleries();
