<template>
  <b-container>
    <b-jumbotron header="Products" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit website</p>
    </b-jumbotron>

    <!-- <b-table striped hover :items="products" /> -->
    {{ products }}
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  layout: "main",
  apollo: {
    products: {
      prefetch: false,
      query: require('@/gql/products.gql'),
      variables (): any {
        return {
          "searchProductsInput": {
            "pagination": {
              "page": 1,
              "count": 10
            }
          }
        }
      }
    }
  }
})
export default class Products extends Vue {
  products: any[] = []
}
</script>
