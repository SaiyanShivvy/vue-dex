<template>
  <div class="flex flex-wrap justify-center">
    <div class="w-full justify-center">
      <button class="" @click="getPrevPage">
        Prev Page
      </button>
      <input
        class="border-2 border-gray-300 bg-white h-10 px-4 pr-12 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Enter Pokemon Name"
        v-model="text"
      />
      <button class="" @click="getNextPage">
        Next Page
      </button>
    </div>
    <div
      class="grid grid-rows-1 grid-flow-col"
      v-for="(pokemon, idx) in filteredPokemonList"
      :key="idx"
    >
      <PokemonCard :pokemon="pokemon.name"></PokemonCard>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeUpdate, onMounted } from "vue";
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
      pokemonIDs: [],
      next: null,
      prev: null,
      text: "",
      filteredPokemonList: computed(() => updatePokemonList())
    });

    function updatePokemonList() {
      if (!state.text) {
        return state.pokemonList;
      }
      return state.pokemonList.filter(pokemon =>
        pokemon.name.includes(state.text)
      );
    }

    // fetch(pokeAPIUrl)
    //   .then(res => res.json())
    //   .then(data => {
    //     state.pokemonList = data.results;
    //     state.pokemonIDs = data.results.id;
    //     state.next = data.next;
    //     state.prev = data.prev;
    //   });

    function getNextPage() {
      if (!state.next) {
        console.log(state.next);
      } else console.log(String(state.next));
    }

    function getPrevPage() {
      if (!state.prev) {
        console.log(state.prev);
      } else console.log(String(state.prev));
    }

    function fetchData(url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          state.pokemonList = data.results;
          state.pokemonIDs = data.results.id;
          state.next = String(data.next);
          state.prev = String(data.prev);
        });
    }

    onMounted(() => {
      fetchData(pokeAPIUrl);
    });

    onBeforeUpdate(() => {});

    return { ...toRefs(state), getNextPage, getPrevPage };
  },
  props: {
    pkmName: {
      type: String
    }
  }
};
</script>
