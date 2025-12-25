# 🙏 Spiritual Tools Collection

A beautiful collection of spiritual practice tools built with modern web technologies. All tools work completely offline and respect your privacy.

## 🏠 Live Demo

Open `index.html` in your browser to access the home page.

## ✨ Available Tools

### 1. 🙏 Naam Jaap Counter
**Location**: `tools/counter/`

A digital mala counter for tracking your naam jaap (chanting) practice.

**Features**:
- Digital 108-bead mala visualization
- Daily and monthly statistics
- Sound and vibration feedback
- Export/Import data for backup
- Dark mode support
- Challenge system with progressive goals
- Works completely offline

**Access**: Open `tools/counter/counter.html`

---

### 2. 🔥 Brahmacharya Challenge
**Location**: `tools/brahmacharya/`

A 10-year progressive challenge tracker for building discipline and purity.

**Features**:
- Daily check-in system (before midnight)
- 46 emotional milestone messages across 10 years
- Progressive goal system (Level 1, 2, 3+)
- Streak tracking with best record
- Test mode for development
- Visual goal indicators
- Export/Import progress
- Dark mode support

**Access**: Open `tools/brahmacharya/brahmacharya.html`

---

## 📁 Project Structure

```
f:\Namejap html\
│
├── index.html              # Main home page (entry point)
├── README.md              # This file
├── package.json           # Project configuration
├── netlify.toml           # Deployment configuration
│
├── tools/                 # All spiritual tools
│   ├── counter/           # Naam Jaap Counter
│   │   ├── counter.html
│   │   └── app.js
│   └── brahmacharya/      # Brahmacharya Challenge
│       ├── brahmacharya.html
│       └── brahmacharya.js
│
├── assets/                # Static assets
│   ├── css/              # Future CSS files
│   └── js/               # Future shared JS
│
└── docs/                  # Documentation
    ├── PROJECT-STRUCTURE.md
    ├── BRAHMACHARYA-GUIDE.md
    ├── EMOTIONAL-JOURNEY.md
    └── ... (more docs)
```

## 🚀 Getting Started

### Quick Start

1. **Download/Clone** this repository
2. **Open** `index.html` in your browser
3. **Choose** a tool from the home page
4. **Start** your spiritual practice!

### Local Server (Recommended)

For best experience, run a local server:

**Using Python**:
```bash
cd "f:\Namejap html"
python -m http.server 8000
```

**Using Node.js**:
```bash
npx http-server
```

**Using VS Code**:
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then visit: `http://localhost:8000/`

---

## 🎯 Features

### 🔒 Privacy First
- No login required
- No servers or databases
- All data stored locally in your browser
- No tracking or analytics
- Your data never leaves your device

### 📴 Offline-First
- Works completely offline
- No internet connection needed
- Perfect for daily practice anywhere

### 💾 Data Management
- Export your data anytime (JSON format)
- Import on any device to sync progress
- Manual backup and restore
- Complete data portability

### 🌓 Dark Mode
- Beautiful dark theme
- Reduces eye strain
- Synced across all tools
- Smooth transitions

### 📱 Responsive Design
- Works on mobile, tablet, and desktop
- Touch-optimized interfaces
- Adaptive layouts
- Native app-like experience

---

## 🛠️ Technology Stack

- **HTML5** - Modern semantic markup
- **Tailwind CSS** - Utility-first styling (CDN)
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Client-side data persistence
- **Web Audio API** - Sound feedback
- **Vibration API** - Haptic feedback

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- [`PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) - Complete project structure
- [`BRAHMACHARYA-GUIDE.md`](docs/BRAHMACHARYA-GUIDE.md) - Brahmacharya Challenge guide
- [`EMOTIONAL-JOURNEY.md`](docs/EMOTIONAL-JOURNEY.md) - All 46 emotional milestones
- [`REORGANIZATION-COMPLETE.md`](docs/REORGANIZATION-COMPLETE.md) - Reorganization summary

---

## 🎨 Adding New Tools

The project structure makes it easy to add new tools:

1. **Create folder** in `tools/`:
   ```bash
   mkdir tools/newtool
   ```

2. **Add files**:
   - `tools/newtool/newtool.html`
   - `tools/newtool/newtool.js`

3. **Update home page** (`index.html`):
   - Add new tool card with link
   - Include description and tags

4. **Add navigation**:
   - Include home button (🏠) in tool page
   - Link back to `../../index.html`

---

## 🌐 Deployment

### Netlify (Recommended)

The project is pre-configured for Netlify deployment:

1. Push to GitHub
2. Connect repository to Netlify
3. Deploy automatically

Configuration is in `netlify.toml`

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Save and deploy

### Other Platforms

Works on any static hosting:
- Vercel
- Cloudflare Pages
- Firebase Hosting
- Any web server

---

## 💡 Key Principles

### Spiritual Focus
- Tools designed for daily practice
- Mindful counting with cooldowns
- Motivational messages
- Progress tracking

### User Experience
- Beautiful, modern design
- Smooth animations
- Intuitive navigation
- No distractions

### Privacy & Control
- You own your data
- No external dependencies
- Full export/import capability
- No cloud storage required

---

## 🐛 Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ⚠️ Requires localStorage support
- ⚠️ Best on modern browsers

---

## 📞 Support & Contribution

### Issues
- Check documentation first
- Verify browser compatibility
- Test with localStorage enabled

### Contributing
- Follow existing code style
- Test thoroughly before submitting
- Update documentation as needed

---

## 📝 License

This project is open source and available for personal use.

---

## 🙏 Credits

**Made with ❤️ in India by [Rajdeep Pandit](https://www.linkedin.com/in/rajdeep-pandit-22b543282/)**

### Spiritual Inspiration
This project is dedicated to all spiritual seekers on their journey toward self-realization.

**जय श्री राम | हर हर महादेव | राधे राधे** 🙏

---

## 📊 Version History

### v2.0.0 - Project Restructure (Current)
- ✅ Created organized folder structure
- ✅ Added beautiful home page
- ✅ Moved tools to `tools/` directory
- ✅ Organized docs in `docs/` folder
- ✅ Added proper navigation
- ✅ Cleaned up root directory

### v1.0.0 - Initial Release
- ✅ Naam Jaap Counter tool
- ✅ Brahmacharya Challenge tool
- ✅ 46 emotional journey milestones
- ✅ Test mode for development
- ✅ Export/Import functionality

---

## 🎯 Roadmap

Future tools planned:
- ⏱️ Meditation timer
- 📿 Multiple mala counters
- 📅 Spiritual calendar
- 📖 Daily affirmations
- 🎵 Mantra player
- 📊 Advanced analytics

---

## ⚡ Quick Links

- **Home Page**: `index.html`
- **Naam Jaap Counter**: `tools/counter/counter.html`
- **Brahmacharya Challenge**: `tools/brahmacharya/brahmacharya.html`
- **Documentation**: `docs/` folder

---

**Start your spiritual journey today!** 🚀

Open `index.html` and choose your practice. 🙏
