<template>
  <b-container>
    <b-jumbotron header="Accounts" class="py-4">
      <!-- <p>For more information visit website</p> -->
    </b-jumbotron>

    <div class="pb-4">
      <b-table
        id="my-table"
        caption-top
        responsive
        bordered
        hover
        :items="accounts.list"
        :fields="fields"
      >
        <template #table-caption>
          총 {{ accounts.count | COMMA }}개
        </template>
        <template #cell(profile)="data">
          <b-avatar :src="data.profile" />
        </template>
        <template #cell(createdAt)="data">
          {{ data.value | YYYYMMDD }}
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="accounts.count"
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
    accounts: {
      prefetch: false,
      query: require('@/gql/accounts.gql'),
      variables (): any {
        return {
          searchAccountsInput: {
            pagination: {
              page: this.currentPage,
              count: this.perPage
            }
          }
        }
      }
    }
  }
})
export default class Users extends Vue {
  accounts: {
    list: any[],
    count: number
  } = {
    list: [],
    count: 0
  }

  currentPage = 1;
  perPage = 20;

  fields: string[] = ['_id', 'profile', 'username', 'email', 'role', 'provider', 'gender', 'age', 'createdAt']

  changePageAction (page: number) {
    this.currentPage = page
  }
}
</script>
