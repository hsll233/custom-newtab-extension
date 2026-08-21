# New Tab (Glassmorphism AI Search & Custom New Tab Extension)

A modern, high-performance, glassmorphic Chromium browser extension (for Microsoft Edge, Google Chrome, Brave, etc.) featuring customizable AI search, ultra-fast local favicon caching, and responsive frosted acrylic aesthetics.

---

## ✨ Features

- **💎 Acrylic Glassmorphism (毛玻璃质感)**:
  - Custom wallpaper support with realtime blur and brightness adjustment.
  - Hardware-accelerated ackdrop-filter acrylic glass styling.
- **🔍 Copilot / Gemini AI Search Experience**:
  - Integrated search box with multiple search engines: **Google**, **ChatGPT**, **AI Mode**, **Bing**, and **Bilibili**.
  - Visual image recognition search shortcut powered by Google Lens.
  - Seamless downward search history and live suggestions dropdown.
  - Support for @ search engine shortcuts.
- **⚡ Instant Autofocus (Ctrl+T)**:
  - Smart bypass technique guaranteeing immediate input autofocus on new tab opening without needing manual mouse clicks.
- **🚀 Ultra-Fast Shortcut Dock & Management**:
  - Drag/order shortcuts (上移 / 下移) directly in the settings panel.
  - Automatic HD favicon fetching and local Base64 zero-latency persistent caching.
  - Add, edit, reorder, and remove shortcuts seamlessly.
- **⚙️ Full Customization Panel**:
  - Customizable search placeholder (e.g. Message Gemini...).
  - Local wallpaper upload with IndexedDB storage (supporting large image files).
  - Configurable dark overlay and background blur.

---

## 🛠️ Installation

1. Clone or download this repository to your computer:
   `ash
   git clone <your-repository-url>
   `
2. Open your Chromium browser (Microsoft Edge / Google Chrome):
   - **Edge**: Go to edge://extensions/
   - **Chrome**: Go to chrome://extensions/
3. Enable **Developer mode (开发者模式)** in the left sidebar or top right toggle.
4. Click **Load unpacked (加载解压缩的扩展)** and select this project folder (custom-newtab-extension).
5. Open a new tab (Ctrl + T) and enjoy your new modern tab!

---

## 📂 Project Structure

`
custom-newtab-extension/
├── assets/
│   └── icons/
│       ├── favicon.svg
│       └── favicon.png
├── css/
│   └── style.css
├── js/
│   ├── focus-helper.js
│   └── newtab.js
├── manifest.json
├── newtab.html
└── README.md
`

---

## 📄 License

MIT License.
