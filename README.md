# Pokémon Keyboard — Interactive

This project is an interactive Pokémon keyboard that plays real Pokémon cries and shows cool elemental animations for each key press.

Quick start

1. Open a terminal in the project folder (`Assets_DrumKit`).

2. Run a simple dev server (choose one):

```bash
# Python 3 (recommended, built-in)
python3 -m http.server 8000

# OR with Node if you prefer
npx http-server -p 8000
```

3. Open http://localhost:8000 in your browser.

4. Click the "Enable Audio" button once (required by some browsers to unlock audio), then press keys or click the on-screen keys.

Notes

- If you open `index.html` directly with `file://`, audio may be blocked in some browsers. Use a local server when possible.
- If you still hear the old music, hard-refresh the page (Cmd+Shift+R) or open in Incognito.
- Features real Pokémon cries from PokeAPI and enhanced animations, especially a spectacular lightning effect for Pikachu!
