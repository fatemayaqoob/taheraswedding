* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Cairo', sans-serif;
    background: #4f0f1d;
    color: #fff;
    overflow-x: hidden;
    position: relative;
}

.background-glow {
    position: fixed;
    inset: 0;
    background:
        radial-gradient(circle at top, rgba(255, 215, 170, 0.15), transparent 40%),
        radial-gradient(circle at bottom, rgba(184, 139, 59, 0.12), transparent 45%);
    pointer-events: none;
    z-index: 0;
}

.hero {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    position: relative;
}

.curtain {
    position: absolute;
    top: 0;
    width: 180px;
    height: 280px;
    background: linear-gradient(90deg, #5b1020, #7a1730, #5b1020);
    opacity: 0.9;
    z-index: 1;
}

.curtain.left {
    left: 0;
    border-bottom-right-radius: 70px;
}

.curtain.right {
    right: 0;
    border-bottom-left-radius: 70px;
}

.invitation-card {
    width: 100%;
    max-width: 850px;
    background: #f5ebdd;
    color: #4f0f1d;
    border-radius: 26px;
    padding: 50px 30px;
    text-align: center;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.28);
    animation: fadeIn 1.3s ease;
    position: relative;
    z-index: 2;
    border: 2px solid rgba(184, 139, 59, 0.45);
}

.chandelier {
    font-size: 3rem;
    color: #b88b3b;
    margin-bottom: 20px;
    animation: floatGlow 3s ease-in-out infinite;
}

.bismillah {
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: 700;
}

.verse {
    line-height: 2;
    margin-bottom: 30px;
    color: #6d4451;
    font-size: 0.95rem;
}

.invite-text {
    line-height: 2;
    margin-bottom: 30px;
    font-size: 1.05rem;
}

.names {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    flex-wrap: wrap;
}

.names h1 {
    font-size: 3rem;
    color: #6f1028;
    font-weight: 700;
}

.names span {
    font-size: 2rem;
    color: #b88b3b;
}

.ornament {
    width: 180px;
    height: 2px;
    background: #b88b3b;
    margin: 30px auto;
    position: relative;
}

.ornament::before {
    content: "✦";
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    color: #b88b3b;
    background: #f5ebdd;
    padding: 0 10px;
}

.details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.detail-box {
    background: rgba(255, 255, 255, 0.78);
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(184, 139, 59, 0.25);
}

.detail-box h3 {
    color: #6f1028;
    margin-bottom: 10px;
}

.detail-box p {
    color: #4f0f1d;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 35px;
}

.btn {
    border: none;
    cursor: pointer;
    padding: 14px 30px;
    border-radius: 30px;
    background: #6f1028;
    color: white;
    font-size: 1rem;
    font-family: inherit;
    transition: 0.3s ease;
    box-shadow: 0 8px 20px rgba(111, 16, 40, 0.25);
}

.btn:hover {
    transform: translateY(-3px);
    background: #8d1736;
}

.btn.secondary {
    background: #b88b3b;
    color: #fff;
}

.btn.secondary:hover {
    background: #c89a46;
}

.rsvp-section {
    padding: 80px 20px;
    max-width: 720px;
    margin: auto;
    position: relative;
    z-index: 2;
}

.rsvp-section h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
    color: #f5ebdd;
}

#rsvpForm {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: rgba(245, 235, 221, 0.12);
    padding: 25px;
    border-radius: 24px;
    border: 1px solid rgba(184, 139, 59, 0.3);
    backdrop-filter: blur(6px);
}

input,
textarea {
    width: 100%;
    border: none;
    border-radius: 14px;
    padding: 14px;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
}

textarea {
    min-height: 120px;
    resize: vertical;
}

.attendance-options {
    display: flex;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
}

.attendance-options label {
    background: white;
    color: #4f0f1d;
    padding: 12px 18px;
    border-radius: 14px;
    cursor: pointer;
}

.attendance-options input {
    width: auto;
    margin-left: 6px;
}

#message {
    margin-top: 20px;
    text-align: center;
    font-weight: 700;
}

footer {
    text-align: center;
    padding: 30px;
    color: #f1d7c2;
    position: relative;
    z-index: 2;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(25px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes floatGlow {
    0%,
    100% {
        transform: translateY(0);
        text-shadow: 0 0 10px rgba(184, 139, 59, 0.3);
    }

    50% {
        transform: translateY(-8px);
        text-shadow: 0 0 25px rgba(184, 139, 59, 0.75);
    }
}

@media (max-width: 768px) {
    .invitation-card {
        padding: 40px 22px;
    }

    .names h1 {
        font-size: 2.2rem;
    }

    .curtain {
        width: 90px;
        height: 180px;
    }

    .verse {
        font-size: 0.85rem;
    }
}
