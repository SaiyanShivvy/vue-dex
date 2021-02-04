import { ref } from "vue";

var pokeEvolution = ref({
  evolutionNames: [],
  evolutionLevels: [],
  evolutionDetails: String,
  evolutionTrigger: String,
  evolutionItem: String,
  evolutionTrade: Boolean
});

function getPokemonEvolutionChain(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      //do something
      console.log(data, pokeEvolution);
    });
}

export default getPokemonEvolutionChain;
