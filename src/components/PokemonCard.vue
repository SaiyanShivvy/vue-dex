<template>
  <div class="container mx-4 my-4 flex">
    <div class="w-48 border">
      <!-- Spires from PokemonDB-->
      <img
        :src="
          'https://img.pokemondb.net/sprites/home/normal/' +
            pokeInfo.pokeData.name +
            '.png'
        "
        alt="pokeInfo.pokeData.name"
        class="w-full"
      />
    </div>
    <div class="p-4">
      <h5
        class="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase"
      >
        ID: {{ pokeInfo.pokeData.id }}
      </h5>
      <h5
        class="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase"
      >
        {{ pokeInfo.pokeData.name }}
      </h5>
      <button @click="toggleModal">Details</button>
      <PokemonDetail
        v-if="modalOpen"
        @close="modalOpen = false"
        :pokemon="pokeInfo.pokeData.id"
      ></PokemonDetail>
    </div>
  </div>
</template>

<script>
import PokemonDetail from "./PokemonDetail.vue";
import { reactive, ref } from "vue";

export default {
  name: "Pokemon Card",
  components: {
    PokemonDetail
  },
  props: {
    pokemon: String
  },
  setup(props) {
    const pokeInfo = reactive({
      pokeData: []
    });
    let modalOpen = ref(false);
    const toggleModal = () => {
      modalOpen.value = !modalOpen.value;
    };
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.pokemon)
      .then(async res => res.json())
      .then(data => {
        pokeInfo.pokeData = data;
      });

    return { pokeInfo, modalOpen, toggleModal };
  }
};
</script>
