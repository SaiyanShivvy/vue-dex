<template>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div
      class="grid grid-rows-1 grid-flow-col"
      v-for="(pokemon, idx) in pokemonList"
      :key="idx"
    >
      <PokemonCard :pokemon="pokemon.name"></PokemonCard>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import PokemonCard from "./PokemonCard.vue";

//TODO: Implement a Search function that overrides the fetch url by using a base url + input to fetch that url

export default {
  name: "Pokemon List",
  components: {
    PokemonCard
  },
  setup() {
    const state = reactive({
      pokemonList: [],
      pokemonIDs: []
    });

    //fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
      .then(async res => res.json())
      .then(data => {
        state.pokemonList = data.results;
        state.pokemonIDs = data.results.id;
      });

    return { ...toRefs(state) };
  },
  props: {
    pkmName: {
      type: String
    }
  }
};
</script>
