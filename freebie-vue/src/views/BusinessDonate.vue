<template lang="html">

<div class="container donate-view">
  <div class="row">
    <div class="col-md-6">
      <h1>{{ name }}</h1>
      <h3>{{ contact }}</h3>
      <h4>{{ location }}</h4>
      <h4>Money Received: {{ received }}</h4>
      <h6>Meals Given: {{mealsGiven}}</h6>
    </div>
    <div class="col-md-6">
      <form id="checkout" method="post" action="/checkout">
        <div id="payment-form"></div>
        <h6>Enter your donation amount here!</h6>
        <input
          type="number"
          name="payment"
          v-model="paymentAmount"
          placeholder="Enter payment amount"
          ><br>
          <br>
        <input type="submit" :value="'Pay $'+this.paymentAmount">
      </form>
      <!-- <button class="mt-5" type="button" name="button" @click.prevent>Submit Payment</button> -->
    </div>

  </div>
</div>

</template>

<script>
import axios from 'axios';

export default {

  props: ['id'],
  data () {
    return {
      name: '',
      mealsGiven: '',
      location: '',
      contact: '',
      received: 0,
      paymentAmount: 0
    }
  },
  methods: {
    payCompany() {

    }
  },
  created() {
    if(this.$route.params.id > 0){
      axios.get('http://localhost:3333/company/'+this.$route.params.id).then((data) => {
        const info = data.data.data
        this.mealsGiven = info.mealsGiven
        this.contact = info.email
        this.name = info.username
        this.location = info.location
        this.received = info.received
      })

      axios.get('http://localhost:3333/paypal/ctkn').then((data) => {
        // token from API
        const token = data.data.client_token
        braintree.setup(
        // Replace this with a client token from your server
        token,
        "dropin", {
          container: "payment-form"
        })
      })
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">

.donate-view input {
  background-color: #F3F3F3;
  border: 1px solid black;
  padding: 0.2em 0.5em;
  border-radius: 10px;
}
</style>
