import { ref } from "vue";

export function getPokemonEvolutionChain(url) {
  var evolutionInfo = ref({
    evolutionNames: [],
    evolutionLevels: [],
    evolutionTrigger: [],
    evolutionItem: [],
    evolutionTrade: []
  });

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let eI = evolutionInfo.value;
      let evoData = data.chain;
      do {
        //let numberOfEvolutions = evoData.evolves_to.length;
        let evoDetails = evoData["evolution_details"][0];
        eI.evolutionNames.push(evoData.species.name);
        eI.evolutionLevels.push(!evoDetails ? 1 : evoDetails.min_level);
        eI.evolutionTrigger.push(!evoDetails ? null : evoDetails.trigger.name);
        eI.evolutionItem.push(!evoDetails ? null : evoDetails.item);
        eI.evolutionTrade.push(!evoDetails ? null : evoDetails.trade_species);
        evoData = evoData.evolves_to[0];
        console.log(evolutionInfo);
      } while (evoData != undefined && evoData.evolves_to != null);
    });
  return evolutionInfo.value;
}
