<template>
  <div>main</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  auth: true,
  middleware: ['auth'],
  layout: 'main'
})
export default class Index extends Vue {

}
</script>
