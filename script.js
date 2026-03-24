async function getDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const imageUrl = data.message;
    const outputDiv = document.getElementById("dog-output");
    outputDiv.innerHTML = `<img src="${imageUrl}" alt="Dog Image">`;
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

async function getCatImage() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    const imageUrl = data[0].url;
    const outputDiv = document.getElementById("cat-output");
    outputDiv.innerHTML = `<img src="${imageUrl}" alt="Cat Image">`;
  } catch (error) {
    console.error("Error fetching cat image:", error);
  }
}

async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=26.14&longitude=-80.21&current_weather=true",
    );
    const data = await response.json();

    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;

    document.getElementById("weather-output").innerHTML =
      `🌡️ Temp: ${temp}°C <br> 💨 Wind: ${wind} km/h`;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

async function getExchangeRates() {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );
    const data = await response.json();

    const eur = data.rates.EUR;
    const gbp = data.rates.GBP;

    document.getElementById("currency-api").innerHTML =
      `💶 EUR: ${eur} <br> 💷 GBP: ${gbp}`;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}

async function getMovies() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json",
    );

    const movies = await response.json();

    const outputDiv = document.getElementById("movies-output");

    outputDiv.innerHTML = movies
      .slice(0, 3)
      .map(
        (movie) => `
        <div>
          <h3>${movie.title} (${movie.year})</h3>
          <p>Director: ${movie.director}</p>
        </div>
      `,
      )
      .join("");
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

async function getGitHubUser() {
  try {
    const username = prompt("Enter GitHub username:");
    if (!username) return;

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (data.message === "Not Found") {
      document.getElementById("github-output").innerHTML = "User not found 😢";
      return;
    }

    const outputDiv = document.getElementById("github-output");
    outputDiv.innerHTML = `
      <div class="github-card">
        <img src="${data.avatar_url}" alt="${data.login}" />
        <h3>${data.login}</h3>
        <p>Public Repos: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <a href="${data.html_url}" target="_blank">View Profile</a>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
  }
}

async function getJoke() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke",
    );
    const data = await response.json();

    const outputDiv = document.getElementById("joke-output");
    outputDiv.innerHTML = `
      <p>😂 ${data.setup}</p>
      <p>🤣 ${data.punchline}</p>
    `;
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

async function getPokemons() {
  try {
    const outputDiv = document.getElementById("publicapi-output");

    const pokemons = [];

    for (let i = 0; i < 3; i++) {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`,
      );
      const data = await response.json();

      const types = data.types.map((t) => t.type.name).join(", ");

      pokemons.push({
        name: data.name,
        image: data.sprites.front_default,
        types,
        hp: data.stats[0].base_stat,
      });
    }

    outputDiv.innerHTML = pokemons
      .map(
        (pokemon) => `
        <div class="api-card pokemon-card">
          <h3>${pokemon.name.toUpperCase()}</h3>
          <img src="${pokemon.image}" alt="${pokemon.name}" />
          <p>Type: ${pokemon.types}</p>
          <p>HP: ${pokemon.hp}</p>
        </div>
      `,
      )
      .join("");
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    document.getElementById("publicapi-output").innerHTML =
      "Failed to load Pokémon 😢";
  }
}
