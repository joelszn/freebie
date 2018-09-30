<template lang="html">
<div class="leaderboard mt-5">
  <Block v-model="companies" v-for="c in companies" :id="c.id" :name="c.username" :mealsGiven="c.mealsGiven" mode="company"/>
</div>
</template>

<script>
import axios from 'axios';
import Block from '../components/LeaderboardBlock.vue';

let arr = []

axios.get('http://localhost:3333/company').then((data) => {
  console.log(data)
  let info = data["data"]
  console.log(info)
  for(let x in info.data) {
    console.log(info.data[x])
    arr.push(info.data[x])
  }
})

arr = arr.sort((a,b) => a.mealsGiven - b.mealsGiven)

export default {
  data() {
    return {
      companies: arr
    }
  },
  components: {
    Block
  },
  created() {
    console.log(arr)
  }
}
</script>

<style lang="css">

</style>
