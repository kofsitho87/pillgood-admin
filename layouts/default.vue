<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
          NavBar
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
              Link
            </b-nav-item>
            <b-nav-item href="#" disabled>
              Disabled
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">
                Profile
              </b-dropdown-item>
              <b-dropdown-item href="#">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <b-row class="d-flex main-row">
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
    </b-row>
  </div>
</template>

<style scoped>
.main-row {
  height: calc(100vh - 56px);
}
main {
  flex: 1;
}
</style>
