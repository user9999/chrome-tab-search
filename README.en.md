Chrome Tab Search Extension
https://img.shields.io/badge/Chrome-109%252B-brightgreen
https://img.shields.io/badge/License-MIT-blue

A Chrome extension for quick search and switching between open tabs. Allows searching by URL, title, and domain, including Cyrillic domains.

✨ Features
🔍 Quick search across all open tabs

🌐 Cyrillic support - works with Russian domains and text

🏷️ Search by URL, title, and domain

⚡ Instant switching between tabs

🎯 User-friendly interface with favicons and URL preview

🔒 Security - no user data collection

📦 Installation from Source Code
Method 1: Install Unpacked Extension
Download the source code

bash
git clone https://github.com/your-username/tab-search-extension.git
Or download ZIP archive and extract it

Open Chrome extensions page

Type in address bar: chrome://extensions/

Or go through menu: ⋮ → More tools → Extensions

Enable Developer mode

Toggle "Developer mode" in the top right corner

Load the extension

Click "Load unpacked" button

Select the folder with extension files

Click "Select Folder"

Done!

The extension will appear in the list and be accessible via the extensions toolbar

Method 2: Drag and Drop
Extract the extension archive to a convenient folder

Open chrome://extensions/

Enable "Developer mode"

Drag and drop the extension folder onto the extensions page

🚀 Usage
Open the extension

Click on the extension icon in the top right corner of Chrome

Enter search query

Start typing in the search field

Search works across:

Tab titles

URL addresses

Website domains

Switch to tab

Click on the desired result in the list

The extension will automatically switch to the selected tab

🛠️ Project Structure
text
tab-search-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.js              # Search and display logic
├── background.js         # Background service
├── icon.png              # Extension icon
└── README.md             # Documentation
📋 Requirements
Google Chrome 109 or higher

Manifest V3 compatibility

🔧 Development
Building for Publication
Ensure all files are in the same folder

Create ZIP archive with folder contents

Upload to Chrome Web Store Developer Dashboard

Local Development
Make changes to files

On chrome://extensions/ page, click refresh button 🔄 on extension card

🐛 Troubleshooting
Extension won't load:

Ensure all files are present in the folder

Check that manifest.json is properly formatted

Enable "Developer mode"

Search not working:

Check that you have open tabs

Ensure tabs are not protected (chrome://)

Icon not displaying:

Refresh the extension on chrome://extensions page

Reload the browser

📄 License
MIT License - see LICENSE file for details.

📞 Support

Create issue in repository

Email: your-email@example.com

🔗 Links

https://wwwtools.ru

https://def-expert.ru



📝 Changelog
v1.0.0
Initial release

Basic tab search functionality

Cyrillic domain support

Quick tab switching
