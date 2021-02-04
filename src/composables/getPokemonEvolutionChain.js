import { ref } from "vue";

var pokeEvolution = ref({
  evolutionNames: [],
  evolutionLevels: [],
  evolutionDetails: String,
  evolutionTrigger: String,
  evolutionItem: String,
  evolutionTrade: Boolean
});

export function getPokemonEvolutionChain(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      //quick hand
      let pE = pokeEvolution.value;
      console.log(pE, data);
      if (data.chain.evolves_to.length >= 0) {
        for (let i = 0; i < data.chain.evolves_to.length; i++) {
          if (data.chain.evolves_to[i].evolves_to != null) {
            pE.evolutionNames.push(data.chain.evolves_to[i].species.name);
          }
        }
      }
    });
  return pokeEvolution.value;
}
