# New Tab (Glassmorphic AI Search & Custom New Tab Extension)

A modern, high-performance, glassmorphic Chromium browser extension (for Microsoft Edge, Google Chrome, Brave, Arc, etc.) featuring customizable AI search, ultra-fast local favicon caching, and responsive frosted acrylic aesthetics.

---

## ✨ Features

- **💎 Acrylic Glassmorphism**:
  - Custom wallpaper support with realtime blur and brightness adjustment.
  - Hardware-accelerated ackdrop-filter acrylic glass styling.
  - **Customizable Glass Darkness Slider (0% ~ 100%)**: Smoothly adjust frosted glass from crystal luminance to deep Windows 11 Mica / Obsidian dark mode with zero performance impact.
- **🔍 Copilot / Gemini AI Search Experience**:
  - Integrated search box with multiple search engines: **Google**, **ChatGPT**, **AI Mode**, **Bing**, and **Bilibili**.
  - **Fast Engine Switch**: Press Tab in the search box to open/cycle through engines, and press Space or Enter to confirm.
  - Visual image recognition search shortcut powered by Google Lens.
  - Seamless downward search history and live suggestions dropdown.
- **⚡ Instant Autofocus (Ctrl+T)**:
  - Smart bypass technique guaranteeing immediate input autofocus on new tab opening without needing manual mouse clicks.
- **🚀 Ultra-Fast Shortcut Dock & Management**:
  - Reorder shortcuts (Move Up / Move Down) directly in the settings panel.
  - Automatic HD favicon fetching and local Base64 zero-latency persistent caching.
  - Add, edit, reorder, and remove shortcuts seamlessly.
- **⚙️ Full Customization Panel**:
  - Customizable search placeholder (e.g. Message Gemini...).
  - Local wallpaper upload with IndexedDB storage (supporting large image files without quota limitations).
  - Configurable dark overlay, background blur, and frosted glass darkness.

---

## 💡 Quick Tips & Shortcuts

- **⚙️ Open Settings Panel**:
  - **Mouse**: Click the **⚙️ Floating Settings Icon** in the **top-right corner** of the page.
  - **Keyboard Shortcut**: Press **Alt + S** or **F2** anywhere on the page to instantly open the settings modal.
- **🔍 Switch Search Engine**:
  - Press **Tab** or **↓ / ↑** arrow keys in the search input to open and cycle through available search engines.
  - Press **Space** or **Enter** to confirm your selection!

---

## 🛠️ Installation

1. Clone or download this repository to your local machine:
   `ash
   git clone https://github.com/hsll233/custom-newtab-extension.git
   `
2. Open your Chromium-based browser (Microsoft Edge / Google Chrome / Brave):
   - **Edge**: Navigate to edge://extensions/
   - **Chrome**: Navigate to chrome://extensions/
3. Enable **Developer mode** in the sidebar or top-right toggle.
4. Click **Load unpacked** and select this project folder (custom-newtab-extension).
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
