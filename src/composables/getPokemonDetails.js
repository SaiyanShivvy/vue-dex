import { toRefs, reactive } from "vue";

export function getPokemonDetails(pokemonUrl) {
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
    moves: [],
    speciesUrl: String
  });
  // Currently everything is get and set here
  // may create additional function to access and assign values
  // TODO: re assess the the structure to work normally after exporting this function
  fetch(pokemonUrl)
    .then(res => res.json())
    .then(data => {
      //Get Abilities
      if (data.abilities.length > 0) {
        for (let i = 0; i < data.abilities.length; i++) {
          if (data.abilities[i].is_hidden) {
            pokeInfo.value.hiddenAbility.push(data.abilities[i].ability.name);
          } else {
            pokeInfo.value.ability.push(data.abilities[i].ability.name);
          }
        }
      }
      //Get Moves
      if (data.moves.length > 0) {
        for (let i = 0; i < data.moves.length; i++) {
          pokeInfo.value.moves.push(data.moves[i].move.name);
        }
      }
      //Get Types
      if (data.types.length > 0) {
        for (let i = 0; i < data.types.length; i++) {
          pokeInfo.value.types.push(data.types[i].type.name);
        }
      }
      //Get Stats and EVs
      if (data.stats.length > 0) {
        for (let i = 0; i < data.stats.length; i++) {
          if (data.stats[i].effort != 0) {
            pokeInfo.value.effortValue = data.stats[i].effort;
            pokeInfo.value.effortStat = data.stats[i].stat.name;
          }
          if (data.stats[i].stat.name == "hp") {
            pokeInfo.value.hp = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "attack") {
            pokeInfo.value.attack = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "defense") {
            pokeInfo.value.defense = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "special-attack") {
            pokeInfo.value.specialAttack = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "special-defense") {
            pokeInfo.value.specialDefense = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "speed") {
            pokeInfo.value.speed = data.stats[i].base_stat;
          }
        }
      }
      // Get Height and weight
      pokeInfo.value.height = data.height;
      pokeInfo.value.weight = data.weight;

      //Get National Dex
      pokeInfo.value.nationalDex = data.id.toFixed();

      //Get Base Exp
      pokeInfo.value.baseExp = data.base_experience;

      //Function calls
      pokeInfo.value.speciesUrl = data.species.url;

      return { ...toRefs(pokeInfo) };
    });
}
