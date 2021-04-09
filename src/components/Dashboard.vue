<template>
  <div>
    <h1>Pie Chart</h1>
    <bar-graph></bar-graph>
  </div>
</template>

<script>
import BarGraph from "./BarGraph.vue";
export default {
  components: {
    "bar-graph": BarGraph,
  },
};
</script>

<style scoped>
#routes {
  width: 100%;
  max-width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
h1 {
    font-size: 60px;
    background-color: rgb(124, 67, 44);
    color:rgb(224, 218, 209);
    text-align: center;
}
</style>