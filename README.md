# Easy Save - Chrome Extension

A powerful Chrome extension that helps you save and organize text snippets, links, and code blocks efficiently.



## Features

- Save texts selected from webpage, emails, websites, etc
- Organise the clips, reoarder using darg n drop functionality
- Edit or delete the Clip
- Easily navigate through links, email

## How It Works

1. Add the text/clip in the extension
2. Give the title, content and save the Clip.
3. The selected text will be saved and organized in the extension
4. Access your saved items by clicking the extension icon
5. Edit, reorder, delete the clip as needed

## Installation & Local Setup

1. Clone the repository:
```bash
git clone https://github.com/mohsinkhann12/easy-paste
cd easy-paste
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

## Or Use latest Release
1. Download [Easy-Paste-V1](https://github.com/mohsinkhann12/easy-paste/releases/download/easy-paste-v1/easy-paste.zip)

2. Unzip the file

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

## Technologies Used

### Core Libraries

- **React** - UI library for building the interface
- **React Beautiful DnD** - Drag and drop functionality for reordering items
- **Tailwind CSS** - Utility-first CSS framework for styling

### Developer Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefix addition

## Why These Technologies?

- **React**: Provides a component-based architecture and efficient DOM updates
- **React Beautiful DnD**: Offers a polished drag-and-drop experience
- **Tailwind CSS**: Enables rapid UI development with utility classes
- **Vite**: Offers fast development and optimized production builds

## Project Structure

```
Directory structure:
└── mohsinkhann12-easy-paste/
    ├── README.md
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    │   ├── background.js
    │   └── manifest.json
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── regex.txt
        ├── components/
        │   ├── AddClipForm.jsx
        │   ├── Clip.jsx
        │   └── Header.jsx
        ├── pages/
        │   ├── ManagePage.jsx
        │   └── Popup.jsx
        └── utils/
            └── storage.js
           # Built extension files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Feel free to contribute..


## License

MIT License - feel free to use and modify as needed.
