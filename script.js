const LOCATION_URL =
    "https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";

const RSVP_URL = "https://script.google.com/macros/s/AKfycbznjuUY1vD3sjoEtKPH1WbwbZILUgk_Pqy4kZhg-9K2a-I-RMFAOrxXovTpFZEORacb/exec";

const locationBtn =
    document.getElementById("locationBtn");

const musicBtn =
    document.getElementById("musicBtn");

const bgMusic =
    document.getElementById("bgMusic");

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpName =
    document.getElementById("rsvpName");

const rsvpSubmit =
    document.getElementById("rsvpSubmit");

const rsvpMessage =
    document.getElementById("rsvpMessage");

const ATTENDING_VALUE = "يشرفنا حضوركم";
const NOT_ATTENDING_VALUE = "نعتذر عن عدم التمكن من الحضور";

let isPlaying = false;
let firstInteractionBound = false;

const setMusicButton = () => {
    musicBtn.textContent = isPlaying
        ? "إيقاف الموسيقى"
        : "تشغيل الموسيقى";
};

const playMusic = async () => {
    try {
        await bgMusic.play();
        isPlaying = true;
        setMusicButton();
        return true;
    } catch (error) {
        isPlaying = false;
        setMusicButton();
        return false;
    }
};

const pauseMusic = () => {
    bgMusic.pause();
    isPlaying = false;
    setMusicButton();
};

const removeFirstInteractionListeners = () => {
    document.removeEventListener("click", startMusicOnFirstInteraction);
    document.removeEventListener("touchstart", startMusicOnFirstInteraction);
    firstInteractionBound = false;
};

const startMusicOnFirstInteraction = async () => {
    const started = await playMusic();

    if (started) {
        removeFirstInteractionListeners();
    }
};

const bindFirstInteraction = () => {
    if (firstInteractionBound) {
        return;
    }

    document.addEventListener("click", startMusicOnFirstInteraction);
    document.addEventListener("touchstart", startMusicOnFirstInteraction);
    firstInteractionBound = true;
};

locationBtn.addEventListener("click", () => {
    window.open(LOCATION_URL, "_blank");
});

rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = rsvpName.value.trim();
    const attendance =
        rsvpForm.elements.attendance.value;

    rsvpMessage.classList.remove("error", "success");
    rsvpMessage.textContent = "";

    if (!name) {
        rsvpMessage.classList.add("error");
        rsvpMessage.textContent = "يرجى إدخال الاسم";
        rsvpName.focus();
        return;
    }

    if (!attendance) {
        rsvpMessage.classList.add("error");
        rsvpMessage.textContent = "يرجى اختيار حالة الحضور";
        return;
    }

    rsvpSubmit.disabled = true;
    rsvpSubmit.textContent = "جاري الإرسال...";

    try {
        await fetch(RSVP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                name,
                attendance
            })
        });

        rsvpMessage.classList.add("success");

        if (attendance === ATTENDING_VALUE) {
            rsvpMessage.textContent = "شكراً لتأكيد حضوركم";
        }

        if (attendance === NOT_ATTENDING_VALUE) {
            rsvpMessage.textContent = "شكراً لإشعارنا بعدم التمكن من الحضور";
        }

        rsvpForm.reset();
    } catch (error) {
        rsvpMessage.classList.add("error");
        rsvpMessage.textContent = "تعذر إرسال التأكيد، يرجى المحاولة مرة أخرى";
    } finally {
        rsvpSubmit.disabled = false;
        rsvpSubmit.textContent = "إرسال التأكيد";
    }
});

musicBtn.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (isPlaying) {
        pauseMusic();
        return;
    }

    await playMusic();
});

window.addEventListener("load", async () => {
    bgMusic.volume = 0.55;
    setMusicButton();

    const started = await playMusic();

    if (!started) {
        bindFirstInteraction();
    }
});
