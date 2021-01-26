<!-- 
    Parent Component 

This sends data to the card component then to detail component

    List -> Card
        Card -> Detail 

    Trying to reduce fetches 

 -->

<template>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div
      class="ml-4 text-2x text-blue-600"
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

// Unable to use refs here, as it doesn't count as a function
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

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        state.pokemonList = data.results;
        state.pokemonIDs = data.results.reduce(
          (acc, cur, idx) => (acc = { ...acc, [cur.name]: idx + 1 }),
          {}
        );
        console.log(state.pokemonIDs);
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
