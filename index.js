const open_hamburger = document.getElementById("menu-open");

// reveal hamburger icon on page load
document.body.clientWidth <= 470 ? open_hamburger.classList.add("active") : open_hamburger.classList.remove("active");

// reveal hamburger icon actively on body resize 
let widthMatch = window.matchMedia("(max-width: 470px)")
widthMatch.addEventListener("change", () => {
    if(document.body.clientWidth <= 470) open_hamburger.classList.add("active");
    else open_hamburger.classList.remove("active");
})

open_hamburger.addEventListener("click", e => {
    document.getElementById("menu-mobile").classList.add("active");
    
    // show close hamburger icon
    document.getElementById("menu-close").classList.add("active");

    // hide the icon clicked
    e.target.classList.remove("active");
});

document.getElementById("menu-close").addEventListener("click", e => {
    document.getElementById("menu-mobile").classList.remove("active");

    // show open hamburger icon
    open_hamburger.classList.add("active");

    // hide the icon clicked
    e.target.classList.remove("active");
});
