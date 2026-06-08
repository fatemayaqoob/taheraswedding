const LOCATION_URL =
    "https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";

const RSVP_URL = "PUT_GOOGLE_APPS_SCRIPT_URL_HERE";

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

const rsvpPhone =
    document.getElementById("rsvpPhone");

const rsvpGuests =
    document.getElementById("rsvpGuests");

const rsvpNotes =
    document.getElementById("rsvpNotes");

const rsvpSubmit =
    document.getElementById("rsvpSubmit");

const rsvpMessage =
    document.getElementById("rsvpMessage");

let isPlaying = false;

locationBtn.addEventListener("click", () => {
    window.open(LOCATION_URL, "_blank");
});

rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = rsvpName.value.trim();
    const phone = rsvpPhone.value.trim();
    const guests = rsvpGuests.value.trim();
    const notes = rsvpNotes.value.trim();
    const attendance =
        rsvpForm.elements.attendance.value;

    rsvpMessage.classList.remove("error");
    rsvpMessage.textContent = "";

    if (!name) {
        rsvpMessage.classList.add("error");
        rsvpMessage.textContent = "يرجى إدخال الاسم";
        rsvpName.focus();
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
                phone,
                guests,
                attendance,
                notes
            })
        });

        rsvpMessage.textContent =
            attendance === "يشرفنا حضوركم"
                ? "شكراً لتأكيد حضوركم"
                : "شكراً لإشعارنا بعدم التمكن من الحضور";

        rsvpForm.reset();
    } catch (error) {
        console.error(error);
        rsvpMessage.classList.add("error");
        rsvpMessage.textContent = "تعذر إرسال التأكيد، يرجى المحاولة مرة أخرى";
    } finally {
        rsvpSubmit.disabled = false;
        rsvpSubmit.textContent = "إرسال التأكيد";
    }
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
