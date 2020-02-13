let navbar;

window.addEventListener("load", function() {
    navbar = this.document.getElementById("navbar");

    document.querySelector("#expand-collapse").onclick = function() {
        
        if (navbar.classList.contains("navbar--collapsed")) {
            navbar.classList.replace("navbar--collapsed", "navbar--expanded")
        } else {
            navbar.classList.replace("navbar--expanded", "navbar--collapsed")
        }
        
        event.stopPropagation();
    }

    document.body.onclick = function() {
        if (navbar.classList.contains("navbar--expanded")) { 
            navbar.classList.replace("navbar--expanded", "navbar--collapsed");
        }
    }
    document.body.touchstart = function() {
        if (navbar.classList.contains("navbar--expanded")) { 
            navbar.classList.replace("navbar--expanded", "navbar--collapsed");
        }
    }
    document.body.onscroll = function() {
        if (navbar.classList.contains("navbar--expanded")) { 
            navbar.classList.replace("navbar--expanded", "navbar--collapsed");
        }
    }
})