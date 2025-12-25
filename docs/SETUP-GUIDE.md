# 🚀 Deployment Setup Guide

## Simple deployment guide for Naam Jaap App (Browser Storage)

---

## 📋 Prerequisites

- A code editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript
- (Optional) GitHub account for deployment

---

## Step 1: Local Testing

### 1.1 Open Locally
1. Simply open `index.html` in your web browser
2. Or use a local server (recommended):

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## Step 2: Deploy to Netlify (Optional)

### 2.1 Deploy to Netlify
**Option A: Drag & Drop (Easiest)**
1. Go to https://app.netlify.com
2. Sign up/log in
3. Drag your project folder to the deploy area
4. Your app is live!

**Option B: Git Deployment**
1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - Naam Jaap"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/naam-jaap.git
git push -u origin main
```
2. In Netlify:
   - Click "New site from Git"
   - Choose GitHub and your repository
   - Build settings: Leave default
   - Click "Deploy site"
3. Your app is live at: `https://naam-jaap-xxxxx.netlify.app`

---

## Step 3: Alternative Hosting Options

### GitHub Pages
1. Create a GitHub repository
2. Upload your files
3. Go to Settings → Pages
4. Enable GitHub Pages
5. Your site is live at: `https://username.github.io/repo-name`

### Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. Deploy with default settings
4. Your site is live!

---

## 📱 Using on Mobile

### Android (Chrome)
1. Open the website in Chrome
2. Menu (⋮) → "Add to Home screen"
3. Use it like a native app!

### iOS (Safari)
1. Open the website in Safari
2. Share button → "Add to Home Screen"
3. Use it like a native app!

---

## 💾 How Data is Stored

✅ **All data stored in browser's localStorage**
✅ **No server or database required**
✅ **100% offline functionality**
✅ **Export/Import for backup and sync**

---

## 🐛 Troubleshooting

### Data not saving?
- Make sure you're not in Private/Incognito mode
- Check browser settings allow localStorage
- Try a different browser

### Lost your data?
- Import from your exported backup file
- Regular exports recommended for safety

### Can't import data?
- Make sure you're selecting the correct JSON file
- File should not be corrupted
- Try exporting again and re-importing

---

## ✅ Deployment Checklist

- [ ] Tested locally in browser
- [ ] All features working
- [ ] Export/Import tested
- [ ] Deployed to hosting service (optional)
- [ ] Added to mobile home screen (optional)

---

## 🆘 Need Help?

- Netlify Docs: https://docs.netlify.com
- GitHub Pages Docs: https://pages.github.com
- Vercel Docs: https://vercel.com/docs

---

**Ready to use! Start your spiritual journey!** 🙏
