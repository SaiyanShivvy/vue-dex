<template>
  <div class="container mx-4 my-4 flex">
    <div class="w-48 border">
      <img src="https://via.placeholder.com/150" class="w-full" alt="..." />
    </div>
    <div class="p-4">
      <h5
        class="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase"
      >
        {{ pokemon }}
      </h5>
      <a
        href="#"
        class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 inline-block mt-4 rounded"
      >
        More Details
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pokemon Card",
  props: {
    pokemon: String
  },
  setup(props) {
    //TODO: Seperate Data by Pokemon Info
    fetch("https://pokeapi.co/api/v2/pokemon/" + props.pokemon)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    return {};
  }
};
</script>
