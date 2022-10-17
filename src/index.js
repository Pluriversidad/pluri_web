import assetData from "../data/compilation-stats.json";
import { co2 } from "@tgwf/co2";
import round from "./round.js";

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

nav.classList.add("hidden");

toggleMenu.addEventListener("click", function (e) {
	e.preventDefault();
	if (nav.classList.contains("hidden")) {
		nav.classList.remove("hidden");
		toggleMenu.innerText = "CERRAR";
	} else {
		nav.classList.add("hidden");
		toggleMenu.innerText = "MENU";
	}
});

console.log(nav);
