<template>
  <div class="home"></div>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <PokemonList></PokemonList>
  </div>
</template>

<script>
// @ is an alias to /src
import PokemonList from "../components/PokemonList.vue";

export default {
  name: "Home",
  components: {
    PokemonList
  }
};
</script>
