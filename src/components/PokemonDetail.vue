<template>
  <transition name="fade">
    <div
      class="overflow-y-auto overscroll-auto flex items-center justify-center fixed left-0 bottom-0 w-full
      h-full bg-gray-800"
    >
      <div class="bg-white rounded-lg w-1/2">
        <div class="flex flex-col items-start p-4">
          <div>
            <img
              :src="
                'https://pokeres.bastionbot.org/images/pokemon/' +
                  pokeInfo.nationalDex +
                  '.png'
              "
              class=""
            />
            <p>National Dex: {{ pokeInfo.nationalDex }}</p>

            <div class="ml-auto">
              <button
                class="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                @click.prevent="close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, reactive } from "vue";
import { getPokemonDetails } from "@/composable/getPokemonDetails";
import { getPokemonSpeciesDetails } from "@/composable/getPokemonSpecies";
import { getPokemonEvolutionChain } from "@/composable/getPokemonEvolutionChain";

export default {
  name: "Pokemon Card",
  props: {
    pokemon: {
      type: Number
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  setup(props) {
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + props.pokemon;
    let pokeInfo = reactive(getPokemonDetails(pokemonUrl));
    let speciesInfo = reactive(
      computed(() => getPokemonSpeciesDetails(pokeInfo.value.speciesUrl))
    );
    let evolutionInfo = reactive(
      computed(() => getPokemonEvolutionChain(speciesInfo.value.evoChainUrl))
    );
    return { pokeInfo, speciesInfo, evolutionInfo };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
