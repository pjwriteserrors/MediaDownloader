document.addEventListener("DOMContentLoaded", () => {
    const formatToggle = document.getElementById("formatToggle");
    const audioFormats = document.getElementById("audioFormats");
    const videoFormats = document.getElementById("videoFormats");
    const downloadBtn = document.getElementById("downloadBtn");
    const videoPreview = document.getElementById("videoPreview");
    const input = document.getElementById("urlInput");
    const desc = document.getElementById("description");
    const toggleDescBtn = document.getElementById("toggleDescription");

    formatToggle.addEventListener("change", () => {
        const videoMode = formatToggle.checked;
        audioFormats.classList.toggle("hidden", videoMode);
        videoFormats.classList.toggle("hidden", !videoMode);
    });

    downloadBtn.addEventListener("click", e => {
        const circle = document.createElement("span");
        circle.classList.add("ripple");
        const rect = downloadBtn.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        downloadBtn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });

    downloadBtn.addEventListener("click", () => {
        if (input.value.trim() === "") {
            input.classList.add("shake");
            setTimeout(() => input.classList.remove("shake"), 400);
            return;
        }

        videoPreview.classList.remove("hidden");

        // Simulated data
        document.getElementById("thumbnail").src = "https://placehold.co/480x270/00c6ff/ffffff?text=Preview";
        document.getElementById("title").textContent = "Sample Video Title";
        desc.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim, neque in tincidunt vulputate, lorem libero vehicula justo, sed faucibus velit velit nec turpis. Curabitur non felis erat. Donec fermentum augue nec eros suscipit, ut commodo nunc aliquam. Proin ac metus ut sem laoreet varius. Donec in purus ac erat bibendum bibendum. Integer eget metus nec nulla convallis lacinia. Curabitur aliquam suscipit diam, vitae tempor lorem sagittis eget.";
        document.getElementById("duration").textContent = "3:42";
        document.getElementById("viewsCount").textContent = "1.2 M Views";

        setTimeout(() => handleDescriptionOverflow(), 100);

        // subtle pulse when preview loads
        videoPreview.animate([
            { transform: "scale(0.95)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 }
        ], { duration: 400, easing: "ease-out" });
    });

    toggleDescBtn.addEventListener("click", () => {
        desc.classList.toggle("collapsed");
        toggleDescBtn.textContent = desc.classList.contains("collapsed") ? "Show more" : "Show less";
        if (desc.classList.contains("collapsed")) {
            desc.scrollTop = 0;
        }
    });


    function handleDescriptionOverflow() {
        const needsCollapse = desc.scrollHeight > 80;
        toggleDescBtn.classList.toggle("hidden", !needsCollapse);
        if (needsCollapse) desc.classList.add("collapsed");
    }
});
