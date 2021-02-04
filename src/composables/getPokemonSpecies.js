import { get } from "core-js/fn/dict";
import { ref } from "vue";

var pokeSpecies = ref({
  baseHappiness: Number,
  captureRate: Number,
  eggGroups: [],
  flavorText: [], //Unsure if I use 1 or all of the entries
  growthRate: String,
  hatchCounter: Number,
  isBaby: Boolean,
  isLegendary: Boolean,
  isMythical: Boolean
});

function getPokemonSpeciesDetails(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      //do something
      console.log(pokeSpecies, data);
    });
}

export default getPokemonSpeciesDetails;
