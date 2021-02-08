import { ref } from "vue";

export function getPokemonEvolutionChain(url) {
  var evolutionInfo = ref({
    evolutionNames: [],
    evolutionLevels: [],
    evolutionTrigger: String,
    evolutionItem: String,
    evolutionTrade: Boolean
  });

  fetch(url)
    .then(res => res.json())
    .then(data => {
      //quick hand
      let eI = evolutionInfo.value;
      let evoData = data.chain;
      //get next evolutions
      do {
        var evoDetails = evoData["evolution_details"][0];
        eI.evolutionNames.push(evoData.species.name);
        eI.evolutionLevels.push(!evoDetails ? 1 : evoDetails.min_level);
        eI.evolutionTrigger = !evoDetails ? null : evoDetails.trigger.name;
        eI.evolutionItem = !evoDetails ? null : evoDetails.item;
        eI.evolutionTrade = !evoDetails ? null : evoDetails.trade_species;
      } while (!!evoData && evoData.hasOwnProperty.call("evolves_to"));
    });
  return evolutionInfo.value;
}
