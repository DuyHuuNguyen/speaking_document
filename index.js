function toggleLoop(audioId, button) {
    const audio = document.getElementById(audioId);

    audio.loop = !audio.loop;

    button.textContent = audio.loop
        ? "🔁 Repeat: ON"
        : "🔁 Repeat: OFF";
}


// ===== Phát tất cả audio ngẫu nhiên =====
let playAllActive = false;
let playQueue = [];
let currentAudio = null;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function stopPlayAll() {
    playAllActive = false;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.onended = null;
        currentAudio = null;
    }
    const btn = document.getElementById('play-all-btn');
    btn.textContent = '▶ Phát tất cả';
}

function playNext() {
    if (!playAllActive) return;

    if (playQueue.length === 0) {
        stopPlayAll(); // phát hết rồi
        return;
    }

    currentAudio = playQueue.shift();
    currentAudio.loop = false;      // tắt repeat để audio có thể kết thúc
    currentAudio.currentTime = 0;
    currentAudio.onended = playNext;
    currentAudio.play().catch(err => {
        console.error('Không phát được audio:', err);
        playNext(); // lỗi thì bỏ qua, phát cái kế tiếp
    });
}

function playAllRandom() {
    const btn = document.getElementById('play-all-btn');

    // Bấm lần nữa khi đang phát => dừng
    if (playAllActive) {
        stopPlayAll();
        return;
    }

    const audios = document.querySelectorAll('audio');
    if (audios.length === 0) return;

    // Dừng mọi audio đang phát và reset nút Repeat
    audios.forEach(a => {
        a.pause();
        a.loop = false;
    });
    document.querySelectorAll('.center-audio-and-auto-repeat button')
        .forEach(b => (b.textContent = '🔁 Repeat: OFF'));

    playQueue = shuffle(audios);
    playAllActive = true;
    btn.textContent = '⏹ Dừng';
    playNext();
}

document.getElementById('play-all-btn').addEventListener('click', playAllRandom);
