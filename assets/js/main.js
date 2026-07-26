(function () {
  "use strict";

  const DATA_URL = "data/videos.json";
  const VIDEO_DIR = "videos/";
  const THUMB_DIR = "thumbs/";

  const grid = document.getElementById("video-grid");
  const featuredGrid = document.getElementById("featured-grid");
  const modal = document.getElementById("modal");
  const modalVideo = document.getElementById("modal-video");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");

  // Fill in the current year
  document.getElementById("year").textContent = new Date().getFullYear();

  fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Could not load videos.json (HTTP " + res.status + ")");
      return res.json();
    })
    .then(render)
    .catch((err) => {
      grid.innerHTML =
        '<p style="color:var(--text-dim)">Failed to load: ' +
        err.message +
        ". Please open this page through a local server (see README).</p>";
    });

  function render(data) {
    const p = data.project || {};
    setText("hero-team", p.team);
    setText("hero-title", p.title);
    setText("hero-subtitle", p.subtitle);
    setText("hero-desc", p.description);
    setText("hero-course", p.course);
    setText("hero-members", (p.members || []).join(" · "));
    if (p.title) document.title = p.title + " · Project Showcase";

    const tagsEl = document.getElementById("hero-tags");
    (p.tags || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      tagsEl.appendChild(li);
    });

    const videos = data.videos || [];
    document.getElementById("gallery-count").textContent =
      videos.length + (videos.length === 1 ? " work" : " works");

    // Entries flagged as featured go into their own centred two-up row
    const featured = videos.filter((v) => v.featured);
    const rest = videos.filter((v) => !v.featured);

    featured.forEach((v) => featuredGrid.appendChild(buildCard(v)));
    rest.forEach((v) => grid.appendChild(buildCard(v)));

    if (!featured.length) featuredGrid.hidden = true;
  }

  function buildCard(v) {
    const src = VIDEO_DIR + v.file;
    const thumbSrc = THUMB_DIR + v.file.replace(/\.[^.]+$/, ".jpg");

    const card = document.createElement("article");
    card.className = "card";

    // Thumbnail: JPG frame pre-generated with ffmpeg (loads faster on mobile)
    const thumb = document.createElement("div");
    thumb.className = "card__thumb";

    const img = document.createElement("img");
    img.src = thumbSrc;
    img.alt = v.title || v.file;
    img.loading = "lazy";
    thumb.appendChild(img);

    const play = document.createElement("div");
    play.className = "card__play";
    play.appendChild(document.createElement("span"));
    thumb.appendChild(play);

    const body = document.createElement("div");
    body.className = "card__body";
    const h3 = document.createElement("h3");
    h3.className = "card__title";
    h3.textContent = v.title || v.file;
    const desc = document.createElement("p");
    desc.className = "card__desc";
    desc.textContent = v.description || "";
    body.appendChild(h3);
    body.appendChild(desc);

    card.appendChild(thumb);
    card.appendChild(body);

    card.addEventListener("click", () => openModal(v, src));
    return card;
  }

  function openModal(v, src) {
    modalVideo.src = src;
    modalTitle.textContent = v.title || v.file;
    modalDesc.textContent = v.description || "";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalVideo.play().catch(() => {});
  }

  function closeModal() {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  function setText(id, text) {
    if (text) document.getElementById(id).textContent = text;
  }
})();
