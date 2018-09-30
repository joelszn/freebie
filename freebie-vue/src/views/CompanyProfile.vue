<template lang="html">
<div class="container">
  <input v-model="mealsGiven" type="number" name="" placeholder="Enter amount of meals here.">
  <input type="text" v-model="location" name="" placeholder="Enter location here">
  <button type="button" name="button" @click.prevent="updateCompany">Submit Update</button>
</div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';


export default {
  data() {
    return {
      mealsGiven: '',
      location: '',
    }
  },
  methods: {
    updateCompany() {
      if(this.mealsGiven != '' && this.location != ''){
        axios.post("http://localhost:3333/company/update", {
          email: this.getEmail,
          mealsGiven: this.mealsGiven,
          location: this.location
        })
      }
      this.mealsGiven = ''
      this.location = ''
    }
  },
  computed: {
    ...mapGetters('authentication', [
      'getEmail',
    ]),
  }
}
</script>

<style lang="css">
</style>
