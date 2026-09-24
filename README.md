# Scarlet's Magic Phone

A simple, child-friendly pretend phone that can be hosted for free with **GitHub Pages**.

## Features

- Phone-style full-screen interface
- Character/avatar contact buttons
- Princess, Unicorn, Mermaid, Fairy, Superhero and Santa contacts
- Tap a contact → animated call screen → your prerecorded audio plays
- No server, database, login, API, analytics, or third-party JavaScript
- Works as a static GitHub Pages site
- Audio files stay in your repository

## Add your recordings

Put your MP3 files in the `audio` folder using these names:

- `princess.mp3`
- `unicorn.mp3`
- `mermaid.mp3`
- `fairy.mp3`
- `superhero.mp3`
- `santa.mp3`

You can use fewer characters if you want. To remove a contact, delete its entry from `app.js`.

### Important

The browser will not allow the app to magically record or upload audio. You supply the recordings yourself, and the app simply plays them locally from the repository.

## Put it on GitHub Pages

1. Create a new GitHub repository, for example `scarlet-magic-phone`.
2. Upload `index.html`, `styles.css`, `app.js`, and the `audio` folder.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save.
7. GitHub will give you the Pages URL.

## Changing characters

Open `app.js` and edit the `contacts` array. Each contact looks like:

```js
{
  name: "Princess",
  subtitle: "Royal Friend",
  avatar: "👸",
  bg: "#c95d9b",
  audio: "audio/princess.mp3"
}
```

You can change the name, emoji, background color, and audio filename.

## Security / privacy

This is intentionally a static, self-contained app:

- No external libraries
- No external scripts
- No API calls
- No account information
- No microphone access
- No camera access
- No tracking

Anyone who can access the GitHub Pages URL can access the audio files because GitHub Pages is public. Do not put anything private or sensitive in the repository.
