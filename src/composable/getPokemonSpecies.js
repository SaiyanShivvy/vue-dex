import { ref } from "vue";

export function getPokemonSpeciesDetails(url) {
  var speciesInfo = ref({
    baseHappiness: Number,
    captureRate: Number,
    eggGroups: [],
    flavorText: [],
    growthRate: String,
    hatchCounter: Number,
    isBaby: Boolean,
    isLegendary: Boolean,
    isMythical: Boolean,
    evoChainUrl: String
  });

  fetch(url)
    .then(res => res.json())
    .then(data => {
      //Quickly .value for the ref
      let sD = speciesInfo.value;
      //GET/SET DATA
      //Non-Array's first
      sD.baseHappiness = data.base_happiness;
      sD.captureRate = data.capture_rate;
      sD.hatchCounter = data.hatch_counter;
      sD.isBaby = data.is_baby;
      sD.isLegendary = data.is_legendary;
      sD.isMythical = data.is_mythical;
      sD.growthRate = data.growth_rate.name;
      sD.evoChainUrl = data.evolution_chain.url;
      //Arrays
      if (data.egg_groups.length > 0) {
        for (let i = 0; i < data.egg_groups.length; i++) {
          sD.eggGroups.push(data.egg_groups[i].name);
        }
      }
      if (data.flavor_text_entries.length > 0) {
        for (let i = 0; i < data.flavor_text_entries.length; i++) {
          if (data.flavor_text_entries[i].language.name == "en") {
            sD.flavorText.push(data.flavor_text_entries[i].flavor_text);
          }
        }
      }
    });
  return speciesInfo;
}
