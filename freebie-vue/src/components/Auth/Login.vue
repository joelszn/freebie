<template lang="html">
<div class="container">
  <div class="container-fluid">
    <input
      type="email"
      placeholder="Enter your email"
      :value="loginEmail"
      @input="setLoginEmail"><br>
    <input
      type="password"
      placeholder="Enter your password"
      autocomplete="off"
      :value="loginPassword"
      @input="setLoginPassword"><br>
      <input
        @click="setType"
        type="checkbox"
        name="Company">Company <br>
    <button type="button" name="button" @click.prevent="login">Login</button>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      current_type: 'user'
    };
  },
  methods: {
    setType(e) {
      console.log(e.currentTarget.checked)
      this.current_type = e.currentTarget.checked ? 'Company' : 'user'
      console.log(this.current_type)
    },
    setLoginEmail(e) {
      console.log('Called')
      this.$store.commit('authentication/setLoginEmail', e.target.value);
    },
    setLoginPassword(e) {
      this.$store.commit('authentication/setLoginPassword', e.target.value);
    },
    login() {
      if(this.current_type == 'user') {
        this.$store.dispatch('authentication/login');
      } else {
        this.$store.dispatch('authentication/loginCompany')
      }
    },
  },
  computed: {
      ...mapState('authentication', [
        'loginEmail',
        'loginPassword',
      ]),
      ...mapGetters('authentication', [
        'auth',
      ]),
    },
  created() {
      if(this.auth) {
        this.$router.push('/');
      }
    }
}
</script>

<style lang="css">
</style>
