async function sendMessage() {
    const message = document.getElementById("message").value;

    addMessage("You: " + message);

    const res = await fetch("/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await res.json();

    addMessage("Bot: " + data.result);
}

// Add message to chat
function addMessage(msg) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<p>${msg}</p>`;
}

// 🎤 Voice input
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        document.getElementById("message").value = text;
    };

    recognition.start();
}

// 🖼️ Upload image
async function uploadImage() {
    const fileInput = document.getElementById("image");

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    const res = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    addMessage("Bot: " + data.result);
}