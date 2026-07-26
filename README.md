# Heartbeat MV · Project Showcase

A fully static showcase page for music videos generated from songs fused with real
heartbeat audio.

Built for **SWS3027-02 — Introduction to Speech and Music Processing**
Team: Ao Ziyan · Zhang Lanyue · Yang Jiale · Xu Minghe

Live site: https://heartbeat-mv-showcase.vercel.app/

## Directory layout

```
heartbeat-mv-showcase/
├── index.html            # Page structure
├── assets/
│   ├── css/style.css     # Styling (dark theme + heartbeat pulse animation)
│   └── js/main.js        # Card rendering / modal playback
├── data/videos.json      # Project copy + video list (edit copy here only)
├── videos/               # Video files (.mp4)
├── thumbs/               # Poster frames (.jpg), one per video
└── README.md
```

## Local preview

The page loads `data/videos.json` via `fetch`, so **opening index.html by
double-clicking it will fail** because of the browser's `file://` restrictions.
Serve it over HTTP instead.

Pick either one, from the project root:

```powershell
# Python (recommended, usually preinstalled on Windows)
python -m http.server 8000

# Or Node
npx serve .
```

Then open http://localhost:8000

## Editing content

- **Title / intro / tags** — edit the `project` section of `data/videos.json`
- **Course and team members** — edit `project.course` and the `project.members` array
- **Per-video title / description** — edit the `videos` array in `data/videos.json`

### Adding a new video

1. Drop the `.mp4` into `videos/`.
2. Generate its poster frame into `thumbs/` using the same basename:
   ```bash
   ffmpeg -i videos/<name>.mp4 -vframes 1 -vf "scale=640:-1" thumbs/<name>.jpg
   ```
   Put `-ss <seconds>` before `-i` if the first frame is a black fade-in.
3. Append an entry to the `videos` array:
   ```json
   { "file": "<name>.mp4", "title": "...", "description": "..." }
   ```

Add `"featured": true` to an entry to place it in the centred two-up row above the
main grid instead of in the standard grid.

## Notes on media files

- Both Vercel and GitHub reject any single file larger than **100 MB**. Keep every
  `.mp4` comfortably below that.
- Uncompressed sources matching `videos/*_raw.mp4` are excluded from git and from
  deployment. To publish one, re-encode it first:
  ```bash
  ffmpeg -i input_raw.mp4 -c:v libx264 -crf 23 -preset medium \
         -c:a aac -b:a 128k -movflags +faststart output.mp4
  ```
- Every track is encoded as H.264 / AAC in MP4, which plays in every current
  browser. Avoid HEVC/H.265: Safari handles it, but Chrome needs hardware decoding
  and older Firefox cannot play it at all.

## Deployment

Fully static, no build step required.

- **Vercel** (current): `vercel deploy --prod`, or connect the repository
- **GitHub Pages**: push, then Settings → Pages → select the branch root
