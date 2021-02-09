<template>
  <div class="flex flex-wrap justify-center">
    <div class="w-full">
      <input
        class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Enter Pokemon Name"
        v-model="text"
      />
    </div>
    <div
      class="grid grid-rows-1 grid-flow-col scrolling-component"
      ref="scrollComponent"
      v-for="(pokemon, idx) in pokemonList"
      :key="idx"
    >
      <PokemonCard :pokemon="pokemon.name"></PokemonCard>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeUpdate, onMounted } from "vue";
import PokemonCard from "./PokemonCard.vue";

export default {
  name: "Pokemon List",
  components: {
    PokemonCard
  },
  setup() {
    const pokeAPIUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    const state = reactive({
      pokemonList: [],
      next: null,
      prev: null
    });

    async function fetchData(url) {
      await fetch(url)
        .then(res => res.json())
        .then(data => {
          if (url != pokeAPIUrl) {
            for (let i = 0; i < data.results.length; i++) {
              state.pokemonList.push(data.results[i]);
            }
          } else {
            state.pokemonList = data.results;
          }
          state.next = String(data.next);
          state.prev = String(data.prev);
        });
    }

    const loadMorePokemon = url => {
      let newPokemon = fetchData(url);
      console.log(newPokemon);
    };

    onMounted(() => {
      fetchData(pokeAPIUrl);
    });

    onBeforeUpdate(() => {});

    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        loadMorePokemon(state.next);
      }
    };

    return { ...toRefs(state) };
  },
  props: {
    pkmName: {
      type: String
    }
  }
};
</script>
