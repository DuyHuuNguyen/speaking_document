function toggleLoop(audioId, button) {
    const audio = document.getElementById(audioId);

    audio.loop = !audio.loop;

    button.textContent = audio.loop
        ? "🔁 Repeat: ON"
        : "🔁 Repeat: OFF";
}