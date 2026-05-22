/* ========================= */
/* MENU MOBILE */
/* ========================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");

mobileMenuButton.addEventListener("click", () => {

    const navigationMainMenu = document.getElementById("navigationMainMenu");

    if(navigationMainMenu.style.display === "block"){

        navigationMainMenu.style.display = "none";

    }else{

        navigationMainMenu.style.display = "block";

    }

});