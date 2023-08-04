document.addEventListener("DOMContentLoaded", function () {
  const pokemonList = document.getElementById("pokemonList");
  const randomPokemonBtn = document.getElementById("randomPokemonBtn");

  randomPokemonBtn.addEventListener("click", async function () {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    const randomPokemonData = await fetchPokemonData(randomPokemonId);
    const randomPokemonCard = createPokemonCard(randomPokemonData);
    randomPokemonCard.classList.add("animate__animated", "animate__fadeInUp");
    pokemonList.innerHTML = ""; // Clear existing cards
    pokemonList.appendChild(randomPokemonCard);
    // Remove the animation class after the animation ends
    randomPokemonCard.addEventListener("animationend", function () {
      randomPokemonCard.classList.remove(
        "animate__animated",
        "animate__fadeInUp"
      );
    });
  });
});

async function fetchPokemonData(pokemonId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const data = await response.json();
  return data;
}

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;
  image.alt = pokemon.name;
  card.appendChild(image);

  const name = document.createElement("p");
  name.textContent = pokemon.name;
  name.classList.add("pokemon-name");
  card.appendChild(name);

  const types = document.createElement("p");
  types.textContent = `Type: ${pokemon.types
    .map((type) => type.type.name)
    .join(", ")}`;
  types.classList.add("pokemon-type");
  card.appendChild(types);

  return card;
}
