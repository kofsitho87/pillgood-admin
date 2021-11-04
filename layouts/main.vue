<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">
          Home
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <nuxt-link to="/products" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
              Products
            </nuxt-link>
            <nuxt-link to="/users" class="nav-link link-dark">
              Users
            </nuxt-link>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ user.username }}</em>
              </template>
              <b-dropdown-item @click="logoutAction">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main class="py-2">
      <Nuxt />
    </main>
    <!-- <div class="d-flex main-row">
      <div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 280px;">
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
              Home
            </nuxt-link>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2" /></svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#table" /></svg>
              Orders
            </a>
          </li>
          <li>
            <nuxt-link to="/products" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
              Products
            </nuxt-link>
          </li>
          <li>
            <a href="#" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle" /></svg>
              Customers
            </a>
          </li>
        </ul>
      </div>

      <main class="">
        <Nuxt />
      </main>
    </div> -->
  </div>
</template>

<script lang="ts">
import 'vue-apollo'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class LayoutMain extends Vue {
  get user (): any {
    return this.$auth.user
  }

  async logoutAction () {
    await this.$auth.logout()
    this.$router.push({ name: 'auth-login' })
  }
}
</script>

<style scoped>
.main-row {
  height: calc(100vh - 56px);
}
main {
  flex: 1;
}
</style>
