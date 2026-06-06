const LOCATION_URL =
    "https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";

const locationBtn =
    document.getElementById("locationBtn");

const musicBtn =
    document.getElementById("musicBtn");

const bgMusic =
    document.getElementById("bgMusic");

let isPlaying = false;

locationBtn.addEventListener("click", () => {
    window.open(LOCATION_URL, "_blank");
});

musicBtn.addEventListener("click", async () => {
    try {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = "تشغيل الموسيقى";
            isPlaying = false;
        } else {
            await bgMusic.play();
            musicBtn.textContent = "إيقاف الموسيقى";
            isPlaying = true;
        }
    } catch (error) {
        console.error(error);
        musicBtn.textContent = "اضغطي مرة أخرى";
    }
});

window.addEventListener("load", async () => {
    bgMusic.volume = 0.55;

    try {
        await bgMusic.play();

        isPlaying = true;
        musicBtn.textContent = "إيقاف الموسيقى";
    } catch {
        const startMusic = async () => {
            try {
                await bgMusic.play();

                isPlaying = true;
                musicBtn.textContent = "إيقاف الموسيقى";

                document.removeEventListener("touchstart", startMusic);
                document.removeEventListener("click", startMusic);
            } catch {}
        };

        document.addEventListener("touchstart", startMusic);
        document.addEventListener("click", startMusic);
    }
});
