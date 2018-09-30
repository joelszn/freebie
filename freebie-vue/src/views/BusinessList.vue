<template lang="html">
<div class="container" id="business-list">
  <div v-for="(b, k) in businesses" :key="k" class="business">
    <h1 class="name">{{ b.Username }}</h1>
    <h2 class="contact">{{ b.Email }}</h2>
    <h3 class="location">{{ b.Location }}</h3>
  </div>
</div>
</template>

<script>
import HTTP from '../http';
import { mapGetters } from 'vuex';
import axios from 'axios';


export default {
  data() {
    return {
    }
  },
  created() {
    console.log("oof")
    if(!this.auth){
      this.$router.push('/')
      return
    }

    axios.get("http://localhost:3333/company").then((data) => {
      let info = data["data"]
      let bl = document.getElementById("business-list")
      console.log(info)
      for(let x in info.data) {
        console.log(info.data[x])
        let main = document.createElement('div')
        let lw = document.createElement('a')
        let name = document.createElement("h1")
        let contact = document.createElement("h2")
        let loc = document.createElement("h3")
        let mg = document.createElement("h5")

        mg.innerHTML = "Meals Given: " + info.data[x].mealsGiven

        main.classList = "business"

        lw.href = "/checkout/" + info.data[x].id

        name.innerHTML = info.data[x].username
        contact.innerHTML = info.data[x].email
        loc.innerHTML = info.data[x].location

        main.appendChild(lw)
        lw.appendChild(name)
        lw.appendChild(contact)
        lw.appendChild(loc)
        bl.appendChild(main)
        lw.appendChild(mg)
      }
    })
  },
  computed: {
    businesses() {
      axios.get("http://localhost:3333/company").then((data) => {
        // console.log(data.data)
        return data.data
      })
    },
    ...mapGetters('authentication', [
      'auth',
    ]),
  }
}
</script>

<style lang="css">

.business:hover {
  cursor: pointer;
}

.business {
  margin: 30px 0;
  border: 5px solid black;
}

.business a {
  color: inherit;
}

.business a:hover {
  text-decoration: none;
}
</style>
