function getPokemonData() {
      // Currently everything is acccessed and assigned here
      // may create additional function to access and assign seperate values
      // TODO: re assess the the structure to work normally after exporting this function
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
export default getPokemonData