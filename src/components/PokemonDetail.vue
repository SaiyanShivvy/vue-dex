<template>
  <transition name="fade">
    <div
      class="overflow-y-auto overscroll-auto flex items-center justify-center fixed left-0 bottom-0 w-full
      h-full bg-gray-800"
    >
      <div class="bg-white rounded-lg w-1/2">
        <div class="flex flex-col items-start p-4">
          <div class="flex items-center w-full">
            <div class="text-gray-900 font-medium text-lg">Pokemon Details</div>
          </div>
          <hr />
          <div class="">
            <p>National Dex: {{ pokeInfo.nationalDex }}</p>
            <p>
              Abiilities:
              {{ pokeInfo.ability[0] }}
              Hidden: {{ pokeInfo.hiddenAbility[0] }}
            </p>

            <p>Types: {{ pokeInfo.types }}</p>
            <p>Weight: {{ pokeInfo.weight }} Height: {{ pokeInfo.height }}</p>
            <p>
              Stats: HP: {{ pokeInfo.hp }} Attack:
              {{ pokeInfo.attack }}
              Defense: {{ pokeInfo.defense }} Special Attack:
              {{ pokeInfo.specialAttack }}
              Special Defense: {{ pokeInfo.specialDefense }} Speed:
              {{ pokeInfo.speed }}
            </p>
            <p>
              Effort Value: {{ pokeInfo.effortValue }} {{ pokeInfo.effortStat }}
            </p>
            <p>Base Exp. {{ pokeInfo.baseExp }}</p>
            <ul class="overflow-auto-y">
              <!-- <li v-for="(move, idx) in pokeInfo.moves" :key="idx">
                {{ idx }} - {{ move }}
              </li> -->
              <span> {{ pokeInfo.moves }}</span>
            </ul>
          </div>
          <div v-if="speciesInfo != null">
            <p>{{ speciesInfo.eggGroups }}</p>
          </div>
          <div v-if="evolutionInfo != null">
            <p>{{ evolutionInfo.value.evolutionNames }}</p>
          </div>
          <hr />
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
  </transition>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { getPokemonDetails } from "@/functions/getPokemonDetails";
import { getPokemonSpeciesDetails } from "@/functions/getPokemonSpecies";
import { getPokemonEvolutionChain } from "@/functions/getPokemonEvolutionChain";

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
    let pokeInfo = ref();
    let speciesInfo = ref();
    let evolutionInfo = ref();
    pokeInfo.value = getPokemonDetails(pokemonUrl);

    onBeforeMount(() => {
      speciesInfo.value = computed(() =>
        getPokemonSpeciesDetails(pokeInfo.value.speciesUrl)
      );
      evolutionInfo.value = computed(() =>
        getPokemonEvolutionChain(speciesInfo.value.value.evoChainUrl)
      );
    });
    onMounted(() => {});

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
