<template lang="html">
  <div class="container">
    <div class="container-fluid">
      <input
        type="email"
        placeholder="Enter your email"
        :value="registrationEmail"
        @input="setRegistrationEmail"><br>
      <input
        type="password"
        placeholder="Enter your password"
        autocomplete="off"
        :value="registrationPassword"
        @input="setRegistrationPassword"><br>
      <input
        v-if="this.current_type == 'user'"
          type="text"
          :value="registrationUsername"
          @input="setRegistrationUsername"
          placeholder="Enter your username"><br>
      <input
        v-if="this.current_type == 'Company'"
        type="text"
        :value="registrationUsername"
        @input="setRegistrationUsername"
        placeholder="Enter your company"><br>
      <input
        v-if="this.current_type == 'Company'"
          type="text"
          :value="registrationLocation"
          @input="setRegistrationLocation"
          placeholder="Enter your location"><br>

        <input
          @click="setType"
          type="checkbox"
          name="Company">Company <br>
        <button type="button" name="button" @click.prevent="tryRegister">Register</button>
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
    setRegistrationEmail(e) {
      this.$store.commit('authentication/setRegistrationEmail', e.target.value)
    },
    setRegistrationUsername(e) {
      this.$store.commit('authentication/setRegistrationUsername', e.target.value)
    },
    setRegistrationPassword(e) {
      this.$store.commit('authentication/setRegistrationPassword', e.target.value)
    },
    setRegistrationLocation(e) {
      this.$store.commit('authentication/setRegistrationLocation', e.target.value)
    },
    setRegistrationCompany(e) {
      this.$store.commit('authentication/setRegistrationCompany', e.target.value)
    },
    tryRegister() {
      if(this.current_type == 'user'){
        this.$store.dispatch('authentication/register');
      } else {
        this.$store.dispatch('authentication/registerCompany');
      }
    },
  },
  computed: {
    ...mapState('authentication', [
      'registrationEmail',
      'registrationPassword',
      'registrationUsername',
      'registrationLocation',
      'registrationCompany',

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
