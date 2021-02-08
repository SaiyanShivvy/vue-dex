import { ref } from "vue";

export function getPokemonDetails(pokemonUrl) {
  var pokeInfo = ref({
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

  fetch(pokemonUrl)
    .then(res => res.json())
    .then(data => {
      //Reduce typing for .value of ref for each item, maybe be a better way to do this but quick solution for now
      let pD = pokeInfo.value;
      //Get Abilities
      if (data.abilities.length > 0) {
        for (let i = 0; i < data.abilities.length; i++) {
          if (data.abilities[i].is_hidden) {
            pD.hiddenAbility.push(data.abilities[i].ability.name);
          } else {
            pD.ability.push(data.abilities[i].ability.name);
          }
        }
      }
      //Get Moves
      if (data.moves.length > 0) {
        for (let i = 0; i < data.moves.length; i++) {
          pD.moves.push(data.moves[i].move.name);
        }
      }
      //Get Types
      if (data.types.length > 0) {
        for (let i = 0; i < data.types.length; i++) {
          pD.types.push(data.types[i].type.name);
        }
      }
      //Get Stats and EVs
      if (data.stats.length > 0) {
        for (let i = 0; i < data.stats.length; i++) {
          if (data.stats[i].effort != 0) {
            pD.effortValue = data.stats[i].effort;
            pD.effortStat = data.stats[i].stat.name;
          }
          if (data.stats[i].stat.name == "hp") {
            pD.hp = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "attack") {
            pD.attack = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "defense") {
            pD.defense = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "special-attack") {
            pD.specialAttack = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "special-defense") {
            pD.specialDefense = data.stats[i].base_stat;
          } else if (data.stats[i].stat.name == "speed") {
            pD.speed = data.stats[i].base_stat;
          }
        }
      }
      // Get Height and weight
      pD.height = data.height;
      pD.weight = data.weight;

      //Get National Dex
      pD.nationalDex = data.id.toFixed();

      //Get Base Exp
      pD.baseExp = data.base_experience;

      //Function calls
      pD.speciesUrl = data.species.url;
    });
  return pokeInfo.value;
}
