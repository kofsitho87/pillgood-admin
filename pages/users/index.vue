<template>
  <b-container>
    <b-jumbotron header="Users" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit website</p>
    </b-jumbotron>

    <div class="pb-4">
      <b-table
        id="my-table"
        caption-top
        responsive
        bordered
        hover
        :items="users.list"
        :fields="fields"
      >
        <template #table-caption>
          총 {{ users.count | comma }}개
        </template>
        <!-- <template #cell(priceInfos)="data">
          {{ data.value[0].provider }}<br>
          {{ data.value[0].price | comma }}원<br>
        </template> -->
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="users.count"
        :per-page="perPage"
        aria-controls="my-table"
        @change="changePageAction"
      />
    </div>
  </b-container>
</template>

<script lang="ts">
import 'vue-apollo'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  auth: true,
  middleware: ['auth'],
  layout: 'main',
  // apollo: {
  //   products: {
  //     prefetch: false,
  //     query: require('@/gql/users.gql'),
  //     variables (): any {
  //       return {
  //         searchProductsInput: {
  //           pagination: {
  //             page: this.currentPage,
  //             count: this.perPage
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  filters: {
    comma (val: string) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
})
export default class Users extends Vue {
  users: {
    list: any[],
    count: number
  } = {
    list: [],
    count: 0
  }

  currentPage = 1;
  perPage = 50;

  fields: string[] = ['name.en', 'name.ko', 'category', 'sub_category', 'product_code', 'upc_code', 'priceInfos']

  changePageAction (page: number) {
    this.currentPage = page
  }
}
</script>
