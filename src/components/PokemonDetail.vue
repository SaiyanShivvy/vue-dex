<template>
  <transition name="fade">
    <div
      class="flex items-center justify-center fixed left-0 bottom-0 w-full
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
            <!-- Update any array expression to loop through the array and they display the data -->
            <p>Types: {{ pokeInfo.types }} </p> 
            <p>
              Weight: {{ pokeInfo.weight }}
              Height: {{ pokeInfo.height }}
            </p>
            <p>
              Stats:
              HP: {{ pokeInfo.hp }}
              Attack: {{ pokeInfo.attack }}
              Defense: {{ pokeInfo.defense }}
              Special Attack: {{ pokeInfo.specialAttack }}
              Special Defense: {{ pokeInfo.specialDefense }}
              Speed: {{ pokeInfo.speed }}
            </p>
            <p>
              Effort Value: {{ pokeInfo.effortValue }} {{ pokeInfo.effortStat }}
            </p>
            <p> Base Exp.  {{ pokeInfo.baseExp }}</p>
            <p> Moves List: {{ pokeInfo.moves }} </p>
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
import { onMounted, reactive } from "vue";

export default {
  name: "Pokemon Card",
  props: {
    pokemon: {
      // type: [Object, Array],
      // deafult: () => []
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

    //const encounterLocationsUrl =
      "https://pokeapi.co/api/v2/pokemon/" + props.pokemon + "/encounters";

    var speciesUrl = null;
    var evolutionChainUrl = null;

    // Main Details
    var pokeInfo = reactive({
      nationalDex: Number,
      ability: [],
      hiddenAbility: [],
      types: [],
      height: Number,
      weight: Number,
      hp: Number,
      attack: Number,
      defense: Number,
      specialAttack: Number,
      specialDefense: Number,
      speed: Number,
      effortValue: Number,
      effortStat: String,
      baseExp: Number,
      moves: []
    });

    //Species, Flavor Text and Evolution Details

    var pokeSpecies = reactive({
      baseHappiness: Number,
      captureRate: Number,
      eggGroups: [],
      flavorText: [], //Unsure if I use 1 or all of the enteries
      growthRate: String,
      hatchCounter: Number,
      isBaby: Boolean,
      isLegendary: Boolean,
      isMythical: Boolean
    });

    var pokeEvolution = reactive({
      evolutionNames: [],
      evolutionLevels: [],
      evolutionDetails: String,
      evolutionTrigger: String,
      evolutionItem: String,
      evolutionTrade: Boolean
    });

    //Encounter Locations? Unsure if this is needed

    //Check Mount
    onMounted(() => {
      getPokemonData();
    });

    function getPokemonData() {
      // Currently everything is acccessed and assigned here
      // may create additional function to access and assign seperate values
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(data => {
          //Get Abilities
          if (data.abilities.length > 0) {
            for (let i = 0; i < data.abilities.length; i++) {
              if (data.abilities[i].is_hidden) {
                pokeInfo.hiddenAbility.push(data.abilities[i].ability.name);
              } else {
                pokeInfo.ability.push(data.abilities[i].ability.name);
              }
            }
          }
          //Get Moves
          if (data.moves.length > 0) {
            for (let i = 0; i < data.moves.length; i++) {
              pokeInfo.moves.push(data.moves[i].move.name);
            }
          }
          //Get Types
          if (data.types.length > 0) {
            for (let i = 0; i < data.types.length; i++) {
              pokeInfo.types.push(data.types[i].type.name);
            }
          }
          //Get Stats and EVs
          if (data.stats.length > 0) {
            for (let i = 0; i < data.stats.length; i++) {
              if (data.stats[i].effort != 0) {
                pokeInfo.effortValue = data.stats[i].effort;
                pokeInfo.effortStat = data.stats[i].stat.name;
              }
              if (data.stats[i].stat.name == "hp") {
                pokeInfo.hp = data.stats[i].base_stat;
              } else if (data.stats[i].stat.name == "attack") {
                pokeInfo.attack = data.stats[i].base_stat;
              } else if (data.stats[i].stat.name == "defense") {
                pokeInfo.defense = data.stats[i].base_stat;
              } else if (data.stats[i].stat.name == "special-attack") {
                pokeInfo.specialAttack = data.stats[i].base_stat;
              } else if (data.stats[i].stat.name == "special-defense") {
                pokeInfo.specialDefense = data.stats[i].base_stat;
              } else if (data.stats[i].stat.name == "speed") {
                pokeInfo.speed = data.stats[i].base_stat;
              }
            }
          }
          // Get Height and weight
          pokeInfo.height = data.height;
          pokeInfo.weight = data.weight;

          //Get Natinoal Dex
          pokeInfo.nationalDex = data.id.toFixed();

          //Get Base Exp
          pokeInfo.baseExp = data.base_experience;

          //Function calls
          speciesUrl = data.species.url;
          getPokemonSpecies(speciesUrl);
        });
    }

    function getPokemonSpecies(url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          evolutionChainUrl = data.evolution_chain.url;
          getEvolutionChain(evolutionChainUrl);
        });
    }

    function getEvolutionChain(url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          traverseNestedObject(data);
          console.log('-------------------');
        });
    }

    function traverseNestedObject(obj) {
      var testData = [];
      for (const [key, value] of Object.entries(obj)) {
        console.log(key);
        if (typeof obj[key] == Object) {
          traverseNestedObject(obj[key]);
        } else {
          testData.push(`${key}: ${value}`);
        }
        console.log(testData);
      }
    }

    return { pokeInfo, pokeSpecies, pokeEvolution };
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
