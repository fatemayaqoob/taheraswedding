const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = "CHANGE_ME";
app.use(express.json());
app.use(express.static(__dirname));
const db = new sqlite3.Database("wedding.db");
// ==========================
// DATABASE INIT
// ==========================
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS rsvp (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            attendance TEXT NOT NULL,
            guests INTEGER DEFAULT 1,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});
// ==========================
// POST RSVP
// ==========================
app.post("/api/rsvp", (req, res) => {
    const {
        name,
        phone,
        attendance,
        guests,
        notes
    } = req.body;
    if (!name || !attendance) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    db.run(
        `
        INSERT INTO rsvp
        (
            name,
            phone,
            attendance,
            guests,
            notes
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            name,
            phone || "",
            attendance,
            guests || 1,
            notes || ""
        ],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Database error"
                });
            }
            res.json({
                success: true,
                id: this.lastID
            });
        }
    );
});
// ==========================
// GET RSVP
// ==========================
app.get("/api/rsvp", (req, res) => {
    db.all(
        `
        SELECT *
        FROM rsvp
        ORDER BY created_at DESC
        `,
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }
            res.json(rows);
        }
    );
});
// ==========================
// GET STATS
// ==========================
app.get("/api/stats", (req, res) => {
    db.all(
        `
        SELECT attendance,
        COUNT(*) as total
        FROM rsvp
        GROUP BY attendance
        `,
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }
            let yes = 0;
            let no = 0;
            rows.forEach(row => {
                if (row.attendance === "yes") {
                    yes = row.total;
                }
                if (row.attendance === "no") {
                    no = row.total;
                }
            });
            res.json({
                total: yes + no,
                yes,
                no
            });
        }
    );
});
// ==========================
// ADMIN PAGE
// ==========================
app.get("/admin", (req, res) => {
    const password = req.query.password;
    if (password !== ADMIN_PASSWORD) {
        return res.send(`
            <html>
            <head>
                <title>Admin Login</title>
            </head>
            <body style="
                font-family:Arial;
                padding:50px;
                text-align:center;
            ">
                <h2>Admin Login</h2>
                <form>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                    >
                    <button>
                        Login
                    </button>
                </form>
            </body>
            </html>
        `);
    }
    db.all(
        `
        SELECT *
        FROM rsvp
        ORDER BY created_at DESC
        `,
        [],
        (err, rows) => {
            if (err) {
                return res.send("Database error");
            }
            let yesCount = 0;
            let noCount = 0;
            rows.forEach(row => {
                if (row.attendance === "yes") {
                    yesCount++;
                } else {
                    noCount++;
                }
            });
            const tableRows = rows.map(row => {
                const color =
                    row.attendance === "yes"
                    ? "#d4edda"
                    : "#f8d7da";
                const text =
                    row.attendance === "yes"
                    ? "سأحضر"
                    : "لن أحضر";
                return `
                    <tr
                        style="
                            background:${color};
                        "
                    >
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.phone}</td>
                        <td>${row.guests}</td>
                        <td>${text}</td>
                        <td>${row.notes}</td>
                        <td>${row.created_at}</td>
                    </tr>
                `;
            }).join("");
            res.send(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>
                        Wedding Admin
                    </title>
                    <style>
                        body{
                            font-family:Cairo,sans-serif;
                            padding:30px;
                            background:#fafafa;
                        }
                        .stats{
                            display:flex;
                            gap:20px;
                            margin-bottom:25px;
                        }
                        .card{
                            padding:20px;
                            background:white;
                            border-radius:12px;
                            box-shadow:
                            0 4px 10px rgba(
                                0,0,0,.08
                            );
                        }
                        table{
                            width:100%;
                            border-collapse:collapse;
                            background:white;
                        }
                        th,td{
                            border:1px solid #ddd;
                            padding:10px;
                            text-align:center;
                        }
                        th{
                            background:#6f1028;
                            color:white;
                        }
                    </style>
                </head>
                <body>
                    <h1>
                        لوحة إدارة الدعوة
                    </h1>
                    <div class="stats">
                        <div class="card">
                            الإجمالي:
                            ${rows.length}
                        </div>
                        <div class="card">
                            الحضور:
                            ${yesCount}
                        </div>
                        <div class="card">
                            الاعتذارات:
                            ${noCount}
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>الاسم</th>
                                <th>الهاتف</th>
                                <th>عدد الحضور</th>
                                <th>الحالة</th>
                                <th>ملاحظات</th>
                                <th>التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </body>
                </html>
            `);
        }
    );
});
// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
    console.log(`
    Wedding App Running:
    http://localhost:${PORT}
    `);
});
