# 🙏 Naam Jaap - Spiritual Counter Web App

A modern, responsive, offline-first Naam Jaap (chanting counter) web application that stores all data locally in your browser.

## ✨ Features

- **No Login Required**: Start immediately without any signup
- **Offline-First**: Works completely offline, no internet needed
- **Browser Storage**: All data saved securely in your browser's localStorage
- **Personalized Experience**: Set your name and Isht Dev (deity) name
- **Real-time Counter**: Click to increment your Naam Jaap count (1 second cooldown)
- **No Fast Counting**: Prevents rapid clicking to ensure mindful chanting
- **Brahmacharya Challenge**: 10-year progressive challenge tracker with daily check-ins
- **Export/Import**: Backup and restore data across devices
- **Daily & Monthly Stats**: Track your progress over time
- **Challenge System**: Progressive goals from 108 to infinity
- **Sound Feedback**: Optional beep sound on each count
- **Haptic Feedback**: Vibration on mobile devices
- **Dark Mode**: Beautiful dark theme support
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Privacy First**: Your data never leaves your device

## 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Storage**: Browser LocalStorage API
- **Hosting**: Static hosting (Netlify, Vercel, GitHub Pages, or local)

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A code editor for customization
- (Optional) GitHub account for deployment

## 🚀 Quick Start

### Option 1: Open Locally (Simplest)

1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start using immediately!

### Option 2: Local Server (Recommended)

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

## 📱 Usage

### Naam Jaap Counter

1. **First-Time Setup**: Enter your name and Isht Dev name
2. **Start Chanting**: Click the "Naam Jaap" button (manual single taps only)
3. **Track Progress**: View today's and monthly statistics
4. **Export Data**: Backup your data using the Export button
5. **Import Data**: Restore or sync data on another device
6. **Customize**: Toggle sound, enable dark mode, reset counters

**Note**: The app has a 1-second cooldown between counts to prevent fast clicking and encourage mindful chanting.

### 🔥 Brahmacharya Challenge

1. **Access Challenge**: Click on the "Brahmacharya Challenge" card from the main page
2. **Daily Check-in**: Click "Today's Check-in" button before 12:00 AM midnight
3. **Track Progress**: Watch your streak grow and complete progressive goals
4. **Goal System**:
   - **Level 1 (0-100 Days)**: 2, 4, 7, 14, 20, 30, 35, 45, 65, 80, 100 days
   - **Level 2 (100-365 Days)**: 120, 150, 180, 200, 220, 250, 280, 300, 330, 340, 365 days
   - **Level 3+ (1-10 Years)**: 400, 430, 460, 500... up to 3650 days (10 years)
5. **Streak Rules**: Must check-in daily before midnight, missing a day breaks your streak
6. **Export/Import**: Backup your progress regularly

**Important**: Check-in can only be done once per day before midnight. Missing a check-in breaks your streak!

---

## 💾 Data Storage

- ✅ **All data stored in browser localStorage**
- ✅ **No server or database required**
- ✅ **100% offline - no internet needed**
- ✅ **Export/Import for backup and device sync**
- ✅ **Your data never leaves your device**

**Important**: 
- Browser data clearing will delete your data
- Export regularly for backup
- Use Import to sync across devices

---

#### Option A: Drag & Drop

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/log in
3. Drag your project folder to the deploy area
4. Your app is live!

#### Option B: Git Deployment (Recommended)

1. Create a GitHub repository
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

3. In Netlify:
   - Click "New site from Git"
   - Choose GitHub and your repository
   - Build settings: Leave default
   - Click "Deploy site"

4. Your app is live at: `https://naam-jaap-xxxxx.netlify.app`

## 🎨 Customization

### Change Colors

Edit the gradient colors in `index.html`:

```css
.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Font

Replace the Google Font import in `index.html`:

```html
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
```

### Modify Sound

Edit the `playBeep()` function in `app.js` to change frequency and duration.

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



## 🌟 Future Enhancements

- [ ] Weekly statistics
- [ ] Set daily goals
- [ ] Achievement badges
- [ ] Export data as PDF/CSV
- [x] Brahmacharya challenge tracker
- [ ] Reminder notifications
- [ ] Community features (leaderboard)
- [ ] Multiple Isht Dev support
- [ ] Custom themes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💖 Support

If you find this helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

## 📞 Contact

For issues or questions, please open an issue on GitHub.

---

**Jai Shri Ram! Har Har Mahadev! Radhe Radhe!** 🙏

# 🙏 नाम जाप काउंटर - Naam Jaap Counter

एक सरल और आधुनिक नाम जाप वेबसाइट जो पूरी तरह से आपके ब्राउज़र में काम करती है।

## ✨ विशेषताएं (Features)

- ✅ **पूरी तरह ऑफलाइन** - कोई इंटरनेट की जरूरत नहीं
- ✅ **ब्राउज़र में डेटा** - सारा डेटा आपके ब्राउज़र में सुरक्षित
- ✅ **Export/Import** - डेटा Export करके दूसरे डिवाइस में Import करें
- ✅ **आज और महीने का काउंट** - दैनिक और मासिक प्रगति देखें
- ✅ **ब्रह्मचर्य चैलेंज** - 10 साल का पवित्रता चैलेंज ट्रैकर
- ✅ **साउंड और वाइब्रेशन** - हर क्लिक पर फीडबैक
- ✅ **मोबाइल फ्रेंडली** - सभी डिवाइस पर काम करता है
- ✅ **कोई सर्वर नहीं** - आपका डेटा केवल आपके पास

## 🚀 कैसे इस्तेमाल करें

### 1. शुरुआत (नाम जाप काउंटर)
1. `index.html` फाइल को ब्राउज़र में खोलें
2. अपना नाम दर्ज करें
3. इष्ट देव का नाम दर्ज करें (जैसे: राधे कृष्णा, ॐ नमः शिवाय, हरे राम)
4. "शुरू करें" बटन दबाएं

### 2. नाम जाप करना
- **"नाम जाप" बटन** पर क्लिक करें या **Space/Enter** दबाएं
- हर क्लिक पर काउंट बढ़ेगा
- डेटा ऑटोमेटिक सेव होता रहेगा

### 3. 🔥 ब्रह्मचर्य चैलेंज
1. मुख्य पेज से "ब्रह्मचर्य चैलेंज" कार्ड पर क्लिक करें
2. **दैनिक चेक-इन**: हर दिन रात 12 बजे से पहले "टुडेज चेक-इन" बटन दबाएं
3. **स्ट्रीक ट्रैकिंग**: अपना स्ट्रीक बढ़ता देखें और लक्ष्य पूरे करें
4. **लक्ष्य प्रणाली**:
   - **लेवल 1 (0-100 दिन)**: 2, 4, 7, 14, 20, 30, 35, 45, 65, 80, 100 दिन
   - **लेवल 2 (100-365 दिन)**: 120, 150, 180, 200, 220, 250, 280, 300, 330, 340, 365 दिन
   - **लेवल 3+ (1-10 साल)**: 400, 430, 460, 500... 3650 दिन तक (10 साल)
5. **स्ट्रीक नियम**: हर दिन मिडनाइट से पहले चेक-इन करना जरूरी है, एक दिन मिस हुआ तो स्ट्रीक टूट जाएगी
6. **Export/Import**: अपनी प्रगति नियमित रूप से बैकअप करें

**महत्वपूर्ण**: एक दिन में सिर्फ एक बार मिडनाइट से पहले चेक-इन हो सकता है। चेक-इन मिस हुआ तो स्ट्रीक टूट जाएगी!

### 4. डेटा Export करना
1. **"📤 Export"** बटन पर क्लिक करें
2. JSON फाइल डाउनलोड हो जाएगी
3. इस फाइल को सुरक्षित रखें

### 4. दूसरे डिवाइस में Import करना
1. दूसरे डिवाइस पर वेबसाइट खोलें
2. **"📥 Import"** बटन पर क्लिक करें
3. Export की गई JSON फाइल चुनें
4. "Import करें" बटन दबाएं
5. आपका डेटा वहां लोड हो जाएगा

## ⚙️ सेटिंग्स

### साउंड चालू/बंद
- हर क्लिक पर बीप साउंड
- सेटिंग्स में टॉगल करें

### वाइब्रेशन चालू/बंद
- मोबाइल पर वाइब्रेशन फीडबैक
- सेटिंग्स में टॉगल करें

### काउंट रीसेट
- काउंट को 0 से शुरू करने के लिए
- कंफर्मेशन के साथ

### यूज़र बदलना
- नया यूज़र शुरू करने के लिए
- पुराना डेटा डिलीट हो जाएगा

## 📊 काउंटर सिस्टम

- **कुल काउंट**: शुरू से अब तक का टोटल
- **आज का काउंट**: आज किए गए जाप (मिडनाइट पर रीसेट)
- **महीने का काउंट**: इस महीने के जाप (महीने की 1 तारीख को रीसेट)

## 💾 डेटा सुरक्षा

- सारा डेटा आपके **ब्राउज़र की localStorage** में सेव होता है
- **कोई सर्वर नहीं** - डेटा कहीं अपलोड नहीं होता
- **पूरी तरह प्राइवेट** - केवल आप ही देख सकते हैं
- **Export** करके बैकअप बनाएं

⚠️ **महत्वपूर्ण**: 
- ब्राउज़र डेटा क्लियर करने से आपका डेटा डिलीट हो जाएगा
- नियमित रूप से Export करके बैकअप रखें
- दूसरे डिवाइस में भी बैकअप रखें

## 🔧 तकनीकी जानकारी

- **HTML5** - संरचना
- **Tailwind CSS** - डिजाइन (CDN से)
- **Vanilla JavaScript** - फंक्शनलिटी
- **LocalStorage API** - डेटा स्टोरेज
- **Web Audio API** - साउंड
- **Vibration API** - वाइब्रेशन

## 🌐 ऑनलाइन होस्ट करना (Optional)

अगर आप इसे ऑनलाइन होस्ट करना चाहते हैं:

### Netlify (Free)
1. [netlify.com](https://netlify.com) पर जाएं
2. फोल्डर को ड्रैग एंड ड्रॉप करें
3. तुरंत लाइव हो जाएगी

### GitHub Pages (Free)
1. GitHub पर repository बनाएं
2. Files अपलोड करें
3. Settings → Pages → Enable करें

## 📱 मोबाइल में इस्तेमाल

### Android
1. Chrome में वेबसाइट खोलें
2. Menu (⋮) → "Add to Home screen"
3. App की तरह इस्तेमाल करें

### iOS
1. Safari में वेबसाइट खोलें
2. Share बटन → "Add to Home Screen"
3. App की तरह इस्तेमाल करें

## ⌨️ Keyboard Shortcuts

- **Space** या **Enter** - नाम जाप बढ़ाएं

## 🐛 समस्या समाधान

### डेटा सेव नहीं हो रहा?
- ब्राउज़र में cookies/storage enabled है या नहीं चेक करें
- Private/Incognito mode में localStorage काम नहीं करता

### Import काम नहीं कर रहा?
- सही JSON फाइल चुनें (Export से मिली फाइल)
- फाइल corrupt नहीं होनी चाहिए

### काउंट गायब हो गया?
- ब्राउज़र डेटा क्लियर किया होगा
- Export की गई बैकअप फाइल से Import करें

## 📞 सहायता

किसी भी समस्या के लिए:
1. Browser Console देखें (F12)
2. Error message पढ़ें
3. Settings चेक करें

## 🙏 आध्यात्मिक संदेश

> "ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।  
> सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत॥"

**जय श्री राम! हर हर महादेव! राधे राधे!** 🙏

---

Made with ❤️ for spiritual seekers
