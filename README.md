# Scarlet's iPhone-Style Magic Phone

A kid-friendly pretend iPhone contact app for GitHub Pages.

## Princess outgoing call

Tap Princess in Contacts. The app shows an iPhone-style calling screen and plays:

`audio/princess.mp3`

## Princess incoming call

Tap the blue phone button in the Contacts header.

A realistic incoming-call screen appears:

- INCOMING CALL
- Princess avatar
- Decline button
- Answer button

Tap **Answer** and the Princess recording plays.

## Add the recording

Create an `audio` folder in the repository and upload:

`princess.mp3`

## GitHub Pages

Upload `index.html`, `styles.css`, `app.js`, and the `audio` folder to the same `main` branch.

Then:

Repository → Settings → Pages → Deploy from a branch → main → / (root)

## Security / privacy

This app is intentionally static:

- No external libraries
- No server
- No database
- No login
- No API calls
- No microphone
- No camera
- No tracking

GitHub Pages is public, so audio files in the repository are public to anyone who can access the site.
