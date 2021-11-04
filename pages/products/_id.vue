<template>
  <b-container>
    <b-card no-body :header="productName">
      <b-list-group flush>
        <b-list-group-item v-for="item in product" :key="item.key">
          <b-row>
            <b-col cols="2">
              {{ item.key }}
            </b-col>
            <b-col>
              <template v-if="item.key == 'priceInfos'">
                <b-list-group>
                  <b-list-group-item v-for="(row, idx) in item.value" :key="idx">
                    provider: {{ row.provider }}<br>
                    price: {{ row.price }}<br>
                    month: {{ row.month }}<br>
                    link: <a :href="row.link" target="_blank" rel="noopener noreferrer">사이트바로가기</a>
                  </b-list-group-item>
                </b-list-group>
              </template>
              <template v-else-if="item.key == 'imageUrl'">
                {{ item.value }}
                <b-img v-bind="{ blank: false, blankColor: '#777', width: 200, class: 'd-block' }" rounded :src="item.value" />
              </template>
              <template v-else-if="item.key == 'nutrients'">
                <b-table :items="item.value" :fields="fields" />
              </template>
              <template v-else-if="item.key == 'additional'">
                <b-list-group>
                  <b-list-group-item v-for="(row, idx) in Object.keys(item.value).filter(k => k != '__typename')" :key="idx">
                    <b-row>
                      <b-col cols="4">
                        {{ row }}
                      </b-col>
                      <b-col>{{ item.value[row] || '값없음' }}</b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card no-body :header="'댓글리스트 총' + comments.count + '건'" class="mt-4">
      <b-list-group flush>
        <b-list-group-item v-for="comment in comments.list" :key="comment._id" class="d-flex align-items-center">
          <b-avatar class="mr-3" :src="comment.account.profile" />
          <span class="mr-auto">
            {{ comment.account.username }}
            <div v-html="nl2br(comment.content)" />
          </span>
          <div class="align-self-end text-right">
            <b-badge>
              Like {{ comment.likeCount }}
            </b-badge>
            <time class="d-block mt-1">
              {{ comment.createdAt | YYYYMMDD('YYYY.MM.DD HH:mm') }}
            </time>
          </div>
        <!-- <div>{{ comment }}</div> -->
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import 'vue-apollo'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'main',
  apollo: {
    product: {
      prefetch: false,
      query: require('@/gql/product.gql'),
      variables (): any {
        return {
          idInput: this.$route.params.id
        }
      },
      update ({ product }) {
        console.log(product.name, product)

        product.name_en = product.name.en
        product.name_ko = product.name.ko
        // delete product.name
        const keys = Object.keys(product)
        keys.sort((a, b) => {
          if (a === 'name_en' || a === 'name_ko') {
            if (b === '_id') {
              return 1
            }
            return -1
          }
          return 0
        })
        return keys.map((k) => {
          return {
            key: k,
            value: product[k]
          }
        }).filter(k => k.key !== '__typename' && k.key !== 'name')
      }
    },
    comments: {
      prefetch: false,
      query: require('@/gql/comments.gql'),
      variables (): any {
        return {
          searchCommentsInput: {
            productId: this.$route.params.id
          }
        }
      }
    }
  }
})
export default class ProductDetail extends Vue {
  product =[]
  fields = [{
    key: 'key',
    label: 'Key'
  }, {
    key: 'name_en',
    label: 'En'
  }, {
    key: 'name_ko',
    label: 'Ko'
  }, {
    key: 'value',
    label: '값(mg)'
  }]

  comments: {
    list: any[];
    count: number;
  } = {
    list: [],
    count: 0
  }

  nl2br (text: string) {
    return (text + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + '<br />' + '$2'
    )
  }

  get productName () {
    if (this.product.length < 1) {
      return ''
    }
    let name: any = this.product.find((p: any) => p.key === 'name_ko')
    if (!name || !name.value) {
      name = this.product.find((p: any) => p.key === 'name_en')
    }
    return name.value
  }
}
</script>

<style scoped>
time {
  font-size: 11px;
}
</style>
