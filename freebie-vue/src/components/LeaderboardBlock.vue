<template lang="html">
<div class="container lb-block mt-3">
  <a :href="'/checkout/'+this.id">
    <h1>{{this.name}}</h1>
    <h6>Meals Given: {{this.mealsGiven}}</h6>
  </a>
</div>
</template>

<script>
export default {
  props: ['id', 'name', 'mealsGiven', 'donated', 'mode'],
  created() {
    console.log(this.name)
  }
}
</script>

<style lang="css">

.lb-block {
  border: 0 solid hsla(0,0%,100%,.25);
  border-radius: 2px;;
  transition: opacity .2s ease-in-out;
  box-shadow: 0 1px 5px #dcdcdc;
  padding: 0.5em;
}

.lb-block a {
  color: black !important;
  text-decoration: none;
}
</style>
