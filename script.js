// ==========================
// LOCATION
// ==========================
const LOCATION_URL =
"https://maps.app.goo.gl/WxQ7GfCKb5vkETHJ6?g_st=ic";
// ==========================
// LOCATION BUTTON
// ==========================
const locationBtn =
document.getElementById("locationBtn");
if (locationBtn) {
    locationBtn.addEventListener("click", () => {
        window.open(
            LOCATION_URL,
            "_blank"
        );
    });
}
// ==========================
// SCROLL TO RSVP
// ==========================
const scrollBtn =
document.getElementById("scrollToRSVP");
if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        document
            .getElementById("rsvp")
            .scrollIntoView({
                behavior: "smooth"
            });
    });
}
// ==========================
// RSVP FORM
// ==========================
const form =
document.getElementById("rsvpForm");
const message =
document.getElementById("message");
if (form) {
    form.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            const name =
                document
                .getElementById("name")
                .value
                .trim();
            const phone =
                document
                .getElementById("phone")
                .value
                .trim();
            const guests =
                parseInt(
                    document
                    .getElementById("guests")
                    .value
                ) || 1;
            const notes =
                document
                .getElementById("notes")
                .value
                .trim();
            const attendance =
                document.querySelector(
                    'input[name="attendance"]:checked'
                ).value;
            if (!name) {
                message.innerHTML =
                    "يرجى إدخال الاسم";
                message.style.color =
                    "#ff8f8f";
                return;
            }
            try {
                const response =
                    await fetch(
                        "/api/rsvp",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                "application/json"
                            },
                            body:
                            JSON.stringify({
                                name,
                                phone,
                                guests,
                                notes,
                                attendance
                            })
                        }
                    );
                const result =
                    await response.json();
                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "حدث خطأ"
                    );
                }
                message.innerHTML =
                    attendance === "yes"
                    ? "شكراً لتأكيد حضوركم ♥"
                    : "شكراً لإشعارنا بعدم التمكن من الحضور";
                message.style.color =
                    "#8cffb0";
                form.reset();
                document
                .querySelector(
                    'input[value="yes"]'
                )
                .checked = true;
            }
            catch (error) {
                console.error(error);
                message.innerHTML =
                    "تعذر إرسال البيانات";
                message.style.color =
                    "#ff8f8f";
            }
        }
    );
}
// ==========================
// SIMPLE FADE-IN
// ==========================
const observer =
new IntersectionObserver(
(entries) => {
    entries.forEach(
        (entry) => {
            if (
                entry.isIntersecting
            ) {
                entry.target.classList.add(
                    "show"
                );
            }
        }
    );
},
{
    threshold: 0.1
}
);
document
.querySelectorAll(
    ".detail-box, .rsvp-section"
)
.forEach(
    (el) => observer.observe(el)
);
