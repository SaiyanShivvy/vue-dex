<template>
  <div class="container mx-4 my-4 flex">
    <div class="w-48 border">
      <img
        v-bind:src="pokeInfo.pokeData.sprites.front_default"
        class="w-full"
        alt="..."
      />
    </div>
    <div class="p-4">
      <h5
        class="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase"
      >
        {{ pokeInfo.pokeData.name }}
      </h5>
      <a
        href="#"
        class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 inline-block mt-4 rounded"
      >
        More Details
      </a>
    </div>
  </div>
</template>

<script>
//import PokemonDetail from ".\PokemonDetail.vue";
import { reactive } from "vue";

export default {
  name: "Pokemon Card",
  props: {
    pokemon: String
  },
  setup(props) {
    const pokeInfo = reactive({
      pokeData: []
    });
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.pokemon)
      .then(res => res.json())
      .then(data => {
        pokeInfo.pokeData = data;
        //console.log(pokeInfo.pokeData.sprites.front_default);
      });

    return { pokeInfo };
  }
};
</script>
