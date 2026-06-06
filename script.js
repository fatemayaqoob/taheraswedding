const LOCATION_URL =
    "https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";
const locationBtn =
    document.getElementById("locationBtn");
const musicBtn =
    document.getElementById("musicBtn");
const bgMusic =
    document.getElementById("bgMusic");
let isPlaying = false;
// ======================
// Location Button
// ======================
locationBtn.addEventListener(
    "click",
    () => {
        window.open(
            LOCATION_URL,
            "_blank"
        );
    }
);
// ======================
// Music Button
// ======================
musicBtn.addEventListener(
    "click",
    async () => {
        try {
            if (!isPlaying) {
                await bgMusic.play();
                musicBtn.textContent =
                    "إيقاف الموسيقى";
                isPlaying = true;
            } else {
                bgMusic.pause();
                musicBtn.textContent =
                    "تشغيل الموسيقى";
                isPlaying = false;
            }
        }
        catch (error) {
            console.error(error);
            musicBtn.textContent =
                "اضغطي مرة أخرى";
        }
    }
);
// ======================
// Auto Play Attempt
// ======================
window.addEventListener(
    "load",
    async () => {
        try {
            await bgMusic.play();
            isPlaying = true;
            musicBtn.textContent =
                "إيقاف الموسيقى";
        }
        catch {
            // Safari / iPhone غالباً يمنع التشغيل التلقائي
            // أول ضغطة من المستخدم على زر الموسيقى ستشغلها
        }
    }
);
