# 📁 Project Structure

## Overview

This project is organized with a clean folder structure for easy maintenance and scalability.

```
f:\Namejap html\
│
├── index.html                 # Main home page (entry point)
├── package.json              # Project configuration
├── netlify.toml              # Netlify deployment config
│
├── tools/                    # All spiritual tools
│   ├── counter/              # Naam Jaap Counter tool
│   │   ├── counter.html      # Counter page
│   │   └── app.js           # Counter logic
│   │
│   └── brahmacharya/        # Brahmacharya Challenge tool
│       ├── brahmacharya.html # Challenge page
│       └── brahmacharya.js   # Challenge logic
│
├── assets/                   # Static assets (for future use)
│   ├── css/                 # Custom CSS files
│   └── js/                  # Shared JavaScript files
│
├── docs/                     # Documentation files
│   ├── README.md            # Main documentation
│   ├── QUICKSTART.md        # Quick start guide
│   ├── SETUP-GUIDE.md       # Setup instructions
│   ├── BRAHMACHARYA-GUIDE.md # Brahmacharya guide
│   ├── EMOTIONAL-JOURNEY.md  # Emotional journey details
│   ├── IMPLEMENTATION-SUMMARY.md # Implementation details
│   └── COMPLETE-FEATURE-SUMMARY.md # Feature summary
│
└── netlify/                  # Netlify deployment files
```

---

## 🏠 Home Page (index.html)

**Location**: `f:\Namejap html\index.html`

The main landing page that showcases all available spiritual tools:
- Beautiful hero section with gradient background
- Tool cards with descriptions
- Features section
- Dark mode support
- Responsive design

### Features:
- ✨ Clean, modern design
- 🌓 Dark mode toggle
- 📱 Fully responsive
- 🎨 Gradient animations
- 🔗 Links to all tools

---

## 🛠️ Tools Directory

### 1. Naam Jaap Counter (`tools/counter/`)

**Files**:
- `counter.html` - Main counter interface
- `app.js` - Counter logic and functionality

**Features**:
- Digital mala (108 beads)
- Daily/Monthly statistics
- Export/Import data
- Sound & vibration feedback
- Offline functionality
- Challenge system
- Dark mode

**Access**: `http://localhost:8000/tools/counter/counter.html`

---

### 2. Brahmacharya Challenge (`tools/brahmacharya/`)

**Files**:
- `brahmacharya.html` - Challenge interface
- `brahmacharya.js` - Challenge logic

**Features**:
- 10-year progressive challenge
- 46 emotional milestones
- Daily check-in system
- Streak tracking
- Test mode for development
- Goal visualization
- Export/Import progress
- Dark mode

**Access**: `http://localhost:8000/tools/brahmacharya/brahmacharya.html`

---

## 📚 Documentation (`docs/`)

All documentation files are organized in the `docs/` folder:

1. **README.md** - Main project documentation
2. **QUICKSTART.md** - Quick start guide
3. **SETUP-GUIDE.md** - Setup instructions
4. **BRAHMACHARYA-GUIDE.md** - Complete Brahmacharya guide (317 lines)
5. **EMOTIONAL-JOURNEY.md** - All 46 emotional milestones
6. **IMPLEMENTATION-SUMMARY.md** - Technical implementation details
7. **COMPLETE-FEATURE-SUMMARY.md** - Complete feature overview

---

## 🎨 Assets (`assets/`)

### CSS (`assets/css/`)
- Reserved for shared CSS files
- Currently using Tailwind CDN

### JavaScript (`assets/js/`)
- Reserved for shared JavaScript utilities
- Tool-specific JS is kept with each tool

---

## 🚀 Running the Project

### Local Development

1. **Using Python**:
   ```bash
   cd "f:\Namejap html"
   python -m http.server 8000
   ```

2. **Using Node.js**:
   ```bash
   cd "f:\Namejap html"
   npx http-server
   ```

3. **Using VS Code Live Server**:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

### Access Points:
- **Home**: `http://localhost:8000/index.html`
- **Counter**: `http://localhost:8000/tools/counter/counter.html`
- **Brahmacharya**: `http://localhost:8000/tools/brahmacharya/brahmacharya.html`

---

## 📦 Deployment

### Netlify Deployment

The project is configured for Netlify deployment:

**File**: `netlify.toml`

```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps**:
1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy automatically

---

## 🔄 Navigation Flow

```
index.html (Home)
    │
    ├──→ tools/counter/counter.html (Naam Jaap Counter)
    │        │
    │        └──→ tools/brahmacharya/brahmacharya.html (from counter)
    │
    └──→ tools/brahmacharya/brahmacharya.html (Brahmacharya Challenge)
             │
             └──→ Back to index.html (Home button)
```

All tools have a home button (🏠) in the top-left corner to return to the main page.

---

## 🎯 Adding New Tools

To add a new tool:

1. **Create tool folder**:
   ```bash
   mkdir tools/newtool
   ```

2. **Create tool files**:
   - `tools/newtool/newtool.html`
   - `tools/newtool/newtool.js`

3. **Add to home page** (`index.html`):
   ```html
   <a href="tools/newtool/newtool.html" class="tool-card ...">
       <div class="text-6xl mb-4 text-center">🎯</div>
       <h3>New Tool</h3>
       <p>Description...</p>
   </a>
   ```

4. **Add navigation**:
   - Add home button in tool page
   - Update cross-links if needed

---

## 💾 Data Storage

All tools use `localStorage` for data persistence:

- **Counter**: `naamJaapData`
- **Brahmacharya**: `brahmacharyaChallenge`
- **Dark Mode**: `darkMode`

Data is stored locally in the browser and never sent to any server.

---

## 🎨 Design System

### Colors:
- **Primary**: Purple gradient (`#667eea` to `#764ba2`)
- **Secondary**: Pink/Orange for specific tools
- **Dark Mode**: Slate grays with purple accents

### Typography:
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components:
- Glass-effect cards
- Enhanced shadows
- Smooth transitions
- Hover animations
- Responsive grid layouts

---

## 🔐 Privacy & Security

- ✅ No external API calls
- ✅ No tracking or analytics
- ✅ No user accounts
- ✅ 100% client-side
- ✅ Data stored locally
- ✅ Export/Import for backup

---

## 📱 Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ⚠️ Requires localStorage support

---

## 🛠️ Technology Stack

- **HTML5** - Structure
- **Tailwind CSS** (CDN) - Styling
- **Vanilla JavaScript** - Functionality
- **LocalStorage API** - Data persistence
- **Web Audio API** - Sound effects
- **Vibration API** - Haptic feedback

---

## 📞 Support & Contribution

For issues, suggestions, or contributions:
1. Check documentation in `docs/` folder
2. Review existing issues
3. Create new issue with details

---

## 🙏 Credits

Made with ❤️ in India by [Rajdeep Pandit](https://www.linkedin.com/in/rajdeep-pandit-22b543282/)

**Jai Shri Ram | Har Har Mahadev | Radhe Radhe** 🙏

---

## 📝 Version History

### v2.0.0 - Project Restructuring
- ✅ Created organized folder structure
- ✅ Added home page
- ✅ Moved tools to `tools/` directory
- ✅ Organized documentation in `docs/`
- ✅ Added navigation between pages

### v1.0.0 - Initial Release
- ✅ Naam Jaap Counter
- ✅ Brahmacharya Challenge
- ✅ Emotional journey system
- ✅ Test mode for development
