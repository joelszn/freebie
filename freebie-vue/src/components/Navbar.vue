<template lang="html">
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
        <a v-if="!this.auth" class="nav-item nav-link" href="/login">Login</a>
        <a v-if="!this.auth" class="nav-item nav-link" href="/register">Register</a>
        <a v-if="this.auth" href="/businesses" class="nav-item nav-link">Businesses</a>
        <a v-if="this.auth" href="/leaderboard" class="nav-item nav-link">Leaderboard</a>
        <a v-if="this.userType == 'company'" href="/companyprofile" class="nav-item nav-link">Profile</a>
        <a v-if="this.auth" class="nav-item nav-link" @click.prevent="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    logout() {
      console.log("Called")
      this.$store.dispatch('authentication/logout');
    },
  },
  computed: {
    ...mapGetters('authentication', [
      'auth',
      'userType',
    ]),
  }
}
</script>

<style lang="css">
</style>
