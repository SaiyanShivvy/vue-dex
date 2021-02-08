<template>
  <div class="home"></div>
  <div class="w-full flex justify-center">
    <input
      class="border-2 border-gray-300 bg-white h-10 px-4 pr-12 rounded-lg text-sm focus:outline-none"
      type="search"
      name="search"
      placeholder="Enter Pokemon Name"
    />
  </div>
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
