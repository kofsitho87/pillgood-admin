<template>
  <b-container>
    <b-jumbotron header="Products" class="py-4">
      <p>상품 열을 클릭하면 상세페이지로 들어갈 수 있습니다.</p>
    </b-jumbotron>

    <div class="pb-4">
      <b-form @submit.prevent="searchProductsAction">
        <b-form-input
          v-model="keywordText"
          type="search"
          placeholder="검색어를 입력해주세요.(상품명 검색가능)"
        />
      </b-form>
      <b-table
        id="my-table"
        caption-top
        responsive
        bordered
        hover
        :items="products.list"
        :fields="fields"
        :busy="$apollo.queries.products.loading"
        @row-clicked="goDetail"
      >
        <template #table-caption>
          총 {{ products.count | COMMA }}개
        </template>
        <template #cell(imageUrl)="data">
          <b-img v-bind="{ blank: false, blankColor: '#777', width: 100, class: 'd-block' }" rounded :src="data.value" />
        </template>
        <template #cell(priceInfos)="data">
          {{ data.value[0].provider }}<br>
          {{ data.value[0].price | COMMA }}원<br>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="products.count"
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
  apollo: {
    products: {
      prefetch: false,
      query: require('@/gql/products.gql'),
      variables (): any {
        return {
          searchProductsInput: {
            keyword: this.keyword,
            pagination: {
              page: this.currentPage,
              count: 50
            }
          }
        }
      }
    }
  }
})

export default class Products extends Vue {
  $apollo: any
  products: {
    list: any[],
    count: number
  } = {
    list: [],
    count: 0
  }

  keywordText = '';
  keyword: string|null = null;
  currentPage = 1;
  perPage = 50;

  fields: string[] = ['imageUrl', 'name.en', 'name.ko', 'category', 'sub_category', 'product_code', 'upc_code', 'priceInfos']

  changePageAction (page: number) {
    this.currentPage = page
  }

  searchProductsAction () {
    this.currentPage = 1
    this.keyword = this.keywordText

    // this.$apollo.queries.products.refetch({
    //   searchProductsInput: {
    //     keyword: this.keyword,
    //     pagination: {
    //       page: this.currentPage,
    //       count: this.perPage
    //     }
    //   }
    // })
  }

  goDetail (product: any) {
    console.log(product)
    this.$router.push({
      name: 'products-id',
      params: {
        id: product._id
      }
    })
  }
}
</script>
