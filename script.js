const LOCATION_URL =
    "https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";

const RSVP_URL =
    "PUT_GOOGLE_APPS_SCRIPT_URL_HERE";

const locationBtn = document.getElementById("locationBtn");

if (locationBtn) {
    locationBtn.addEventListener("click", () => {
        window.open(LOCATION_URL, "_blank");
    });
}

const scrollBtn = document.getElementById("scrollToRSVP");

if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        document.getElementById("rsvp").scrollIntoView({
            behavior: "smooth"
        });
    });
}

const form = document.getElementById("rsvpForm");
const message = document.getElementById("message");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const guests =
            parseInt(document.getElementById("guests").value, 10) || 1;
        const notes = document.getElementById("notes").value.trim();

        const attendance = document.querySelector(
            'input[name="attendance"]:checked'
        ).value;

        if (!name) {
            message.textContent = "يرجى إدخال الاسم";
            message.style.color = "#ffb3b3";
            return;
        }

        if (RSVP_URL === "PUT_GOOGLE_APPS_SCRIPT_URL_HERE") {
            message.textContent =
                "ضعي رابط Google Apps Script أولاً داخل ملف script.js";
            message.style.color = "#ffb3b3";
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.textContent = "جاري الإرسال...";

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

            message.textContent =
                attendance === "yes"
                    ? "شكراً لتأكيد حضوركم ♥"
                    : "شكراً لإشعارنا بعدم التمكن من الحضور";

            message.style.color = "#8cffb0";

            form.reset();

            document.querySelector('input[value="yes"]').checked = true;
        } catch (error) {
            message.textContent =
                "تعذر إرسال البيانات، يرجى المحاولة مرة أخرى";
            message.style.color = "#ffb3b3";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "إرسال";
        }
    });
}
