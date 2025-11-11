const audioGroup = document.getElementById("audioFormats");
const videoGroup = document.getElementById("videoFormats");
const toggle = document.getElementById("formatToggle");

document.getElementById("downloadBtn").addEventListener("click", async () => {
    const selectedFormat = document.querySelector("input[name='format']:checked");
    const url = document.getElementById("urlInput").value;

    const res = await fetch("/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            urlData: url,
            format: selectedFormat.value
        })
    });


    const preview = document.getElementById("videoPreview");
    const titleEl = document.getElementById("title");
    const img = document.getElementById("thumbnail");
    const desc = document.getElementById("description");
    const dur = document.getElementById("duration");
    const views = document.getElementById("viewsCount");

    const infoRes = await fetch("./static/info.json", { cache: "no-store" });
    const data = await infoRes.json();

    titleEl.textContent = data.title;
    img.src = data.thumbnail;
    desc.textContent = data.description;

    const totalSeconds = data.duration;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    dur.textContent = formatted;

    views.textContent = data.view_count;
});

toggle.addEventListener("change", () => {
    const showAudio = toggle.checked;
    audioGroup.classList.toggle("hidden", showAudio);
    videoGroup.classList.toggle("hidden", !showAudio);

    document.querySelectorAll('input[name="format"]').forEach(r => r.checked = false);
});