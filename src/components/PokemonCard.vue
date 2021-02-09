<template>
  <div
    class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10 px-2"
  >
    <div class="px-4">
      <h1
        class="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase"
      >
        {{ pokeInfo.pokeData.name }}
      </h1>
    </div>
    <img
      class="h-56 w-full object-cover mt-2"
      :src="
        'https://pokeres.bastionbot.org/images/pokemon/' +
          pokeInfo.pokeData.id +
          '.png'
      "
      alt=""
    />
    <div class="flex items-center justify-between px-4 py-2">
      <h1
        class="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase"
      >
        ID: {{ pokeInfo.pokeData.id }}
      </h1>
      <button
        class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
        @click="toggleModal"
      >
        Details
      </button>
    </div>
    <PokemonDetail
      v-if="modalOpen"
      @close="modalOpen = false"
      :pokemon="pokeInfo.pokeData.id"
    ></PokemonDetail>
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
      .then(res => res.json())
      .then(data => {
        pokeInfo.pokeData = data;
      });

    return { pokeInfo, modalOpen, toggleModal };
  }
};
</script>
