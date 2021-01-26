<template>
  <div class="home"></div>
  <div class="w-full flex justify-center">
    <input type="text" placeholder="Enter Pokemon Name/ID" class="mt-10 p-2" />
  </div>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div
      class="ml-4 text-2x text-blue-600"
      v-for="(pokemon, idx) in pokemonList"
      :key="idx"
    >
      {{ pokemon.name }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "vue";

export default {
  name: "Home",
  setup() {
    const state = reactive({
      pokemonList: [],
      urlIDLookup: []
    });

    function fetchPokemonData(pokemon) {
      let url = pokemon.url;
      fetch(url)
        .then(response => response.json())
        .then(function(pokeData) {
          console.log(pokeData);
        });
    }

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => response.json())
      .then(function(allPokemon) {
        allPokemon.results.forEach(function(pokemon) {
          fetchPokemonData(pokemon);
        });
      });

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        state.pokemonList = data.results;
        state.urlIDLookup = data.results.reduce(
          (acc, cur, idx) => (acc = { ...acc, [cur.name]: idx + 1 }),
          {}
        );
        console.log(state.urlIDLookup);
      });

    return { ...toRefs(state) };
  }
};
</script>
