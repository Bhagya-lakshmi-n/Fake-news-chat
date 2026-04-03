const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

// File upload setup
const upload = multer({ dest: "uploads/" });

// 🔍 Fake news detection logic
function checkFakeNews(text) {
    text = text.toLowerCase();

    const fakeWords = [
        "lose 10 kg",
        "miracle cure",
        "100% guaranteed",
        "click here",
        "shocking truth"
    ];

    for (let word of fakeWords) {
        if (text.includes(word)) {
            return "FAKE ❌";
        }
    }

    return "REAL ✅";
}

// API for text
app.post("/check", (req, res) => {
    const { message } = req.body;
    const result = checkFakeNews(message);
    res.json({ result });
});

// API for image
app.post("/upload", upload.single("image"), (req, res) => {
    res.json({ result: "Image received (AI scan coming soon)" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});