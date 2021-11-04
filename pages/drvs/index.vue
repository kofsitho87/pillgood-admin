<template>
  <b-container>
    <b-jumbotron header="Drvs" class="py-4">
      <p>작업중...</p>
    </b-jumbotron>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  auth: true,
  middleware: ['auth'],
  layout: 'main'
})
export default class Drvs extends Vue {

}
</script>
