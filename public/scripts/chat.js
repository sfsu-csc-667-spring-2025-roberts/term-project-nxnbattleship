// --- SOCKET.IO CHAT FUNCTIONALITY ---
const socket = io();

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-message");
const sendButton = document.getElementById("send-btn");

sendButton?.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    socket.emit("chat message", message);
    chatInput.value = "";
  }
});

chatInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

socket.on("chat message", (msg) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// --- CREATE GAME MODAL FUNCTIONALITY ---

document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("open-create-modal");
  const modal = document.getElementById("create-modal");
  const closeModalBtn = document.getElementById("close-create-modal");

  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
