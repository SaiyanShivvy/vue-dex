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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <hr />
          <div class="ml-auto">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agree
            </button>
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
  //stats
  //types
  //weight
  //height
  //Species
  //catch rate
  //egg groups, hatch rate
  // ev yeild
  //national dex number
  //evolution data
  //flavor text
  setup(props) {
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + props.pokemon;
    var pkm = reactive({
      pokeData: []
    });
    //Check Mount
    onMounted(() => {
      getPokemonData();
      console.log(props.pokemon);
    });

    function getPokemonData() {
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(data => {
          pkm.pokeData = data;
          console.log(pkm);
        });
    }

    return { getPokemonData };
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
