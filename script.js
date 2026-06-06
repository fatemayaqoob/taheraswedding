const LOCATION_URL = "https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";

const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {
    window.open(LOCATION_URL, "_blank");
});
