# Heartbeat MV · 项目展板

将心跳音频融入歌曲、生成音乐 MV 的作品展示网页（纯静态）。

## 目录结构

```
heartbeat-mv-showcase/
├── index.html            # 页面结构
├── assets/
│   ├── css/style.css     # 样式（深色 + 心跳脉冲动画）
│   └── js/main.js        # 渲染卡片 / 弹窗播放
├── data/videos.json      # 项目文案 + 视频列表（改文案只动这里）
├── videos/               # 视频文件（.mp4）
└── README.md
```

## 本地预览

页面通过 `fetch` 读取 `data/videos.json`，**直接双击 index.html 会因浏览器 file:// 限制而加载失败**，需用本地服务器打开：

任选一种（在项目根目录执行）：

```powershell
# Python（推荐，Windows 一般自带）
python -m http.server 8000

# 或 Node
npx serve .
```

然后浏览器打开 http://localhost:8000

## 修改内容

- **改标题 / 简介 / 标签**：编辑 `data/videos.json` 的 `project` 部分
- **改每个视频的标题 / 描述**：编辑 `data/videos.json` 的 `videos` 数组
- **加新视频**：把 mp4 放进 `videos/`，在 `videos.json` 的 `videos` 里加一项 `{ "file": "...", "title": "...", "description": "..." }`

## 部署

纯静态，把整个文件夹上传即可：
- **GitHub Pages**：推到仓库，Settings → Pages 选分支根目录
- **Vercel / Netlify**：拖拽文件夹或连接仓库，无需构建配置
