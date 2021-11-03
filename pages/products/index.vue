<template>
  <b-container>
    <b-jumbotron header="Products" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit website</p>
    </b-jumbotron>

    <div class="pb-4">
      <b-table @row-clicked="goDetail" id="my-table" caption-top responsive bordered hover :items="products.list" :fields="fields" :busy="$apollo.queries.products.loading">
        <template #table-caption>총 {{ products.count | comma }}개</template>
        <template #cell(priceInfos)="data">
          {{ data.value[0].provider }}<br>
          {{ data.value[0].price | comma }}원<br>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="products.count"
        :per-page="perPage"
        aria-controls="my-table"
        @change="changePageAction"
      ></b-pagination>
    </div>
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
              "page": this.currentPage,
              "count": 50
            }
          }
        }
      }
    }
  },
  filters:{
    comma(val){
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
})
export default class Products extends Vue {
  products: {
    list: any[],
    count: number
  } = {
    list: [],
    count: 0
  }

  currentPage = 1;
  perPage = 50;

  fields: string[] = ['name.en', 'name.ko', 'category', 'sub_category', 'product_code', 'upc_code', 'priceInfos']

  changePageAction(page: number){
    console.log(page);
    this.currentPage = page;
  }

  goDetail(product: any){
    console.log(product);
    this.$router.push({
      name: `products-id`,
      params: {
        id: product._id
      }
    })
  }
}
</script>
