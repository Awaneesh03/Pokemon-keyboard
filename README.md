<div align="center">

# ⚡ Pokémon Keyboard

**Turn your keyboard into a Pokédex: every key plays a real Pokémon cry with an elemental animation.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![PokeAPI](https://img.shields.io/badge/PokeAPI-EF5350?style=flat-square)

</div>

---

## ✨ Features

- 🎹 **26 Pokémon, 26 keys** — every letter from `A` to `Z` is mapped to a Pokémon
- 🔊 **Real cries** fetched from [PokeAPI](https://pokeapi.co), played with the Web Audio API
- 🔥 **Type-based animations** — fire, water, grass, electric, ice, psychic, dragon, fighting and normal each have their own effect
- ⚡ **Special Pikachu effect** — a full lightning strike on `Q`
- 🖱️ **Keyboard or click** — press a key or tap the on-screen keyboard

## ⌨️ Key Map (sample)

| Key | Pokémon | Type |
|:---:|---|---|
| `Q` | Pikachu | ⚡ Electric |
| `W` | Charizard | 🔥 Fire |
| `E` | Blastoise | 💧 Water |
| `R` | Venusaur | 🌿 Grass |
| `Y` | Dragonite | 🐉 Dragon |
| `U` | Articuno | ❄️ Ice |
| `P` | Mewtwo | 🔮 Psychic |
| `M` | Snorlax | ⭐ Normal |

…and 18 more — see [`index.js`](index.js) for the full list.

## 🚀 Run Locally

```bash
git clone https://github.com/Awaneesh03/Pokemon-keyboard.git
cd Pokemon-keyboard
npm start            # runs: python3 -m http.server 8000
# → open http://localhost:8000
```

Click **Enable Audio** once (browsers require a user gesture before playing sound), then start pressing keys.

> Opening `index.html` directly via `file://` may block audio in some browsers — use a local server.

## 📁 Project Structure

```text
Pokemon-keyboard/
├── index.html   # On-screen keyboard
├── style.css    # Layout, type colours and animations
└── index.js     # Key → Pokémon mapping, audio loading, effects
```

## 🧠 What I Learned

- Fetching assets from a public REST API (PokeAPI)
- The Web Audio API and browser autoplay rules
- Building reusable, data-driven animations in CSS + JavaScript

---

## License

Released under the [MIT License](LICENSE).

## 👤 Author

**Awaneesh Gupta** — B.Tech CSE (AI) @ Vedam School of Technology

[![GitHub](https://img.shields.io/badge/GitHub-Awaneesh03-181717?style=flat-square&logo=github)](https://github.com/Awaneesh03)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-awaneesh--gupta-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/awaneesh-gupta)

<p align="center"><sub>If you found this project useful, consider giving it a ⭐</sub></p>

---

<sub>Pokémon and Pokémon character names are trademarks of Nintendo / The Pokémon Company. This is a non-commercial fan project for learning.</sub>
