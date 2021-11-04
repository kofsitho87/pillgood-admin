import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async login (payload) {
    this.$auth.reset({ resetInterceptor: false })
    const client = this.$auth.ctx.app.apolloProvider.clients.defaultClient
    const { data: { login } } = await client.mutate({
      mutation: require('@/gql/login.gql'),
      variables: payload.data
    })
    this.$auth.setUserToken(login.token, login.token)
    this.fetchUser()
  }

  async fetchUser () {
    if (!this.check().valid) {
      return Promise.resolve()
    }

    const client = this.$auth.ctx.app.apolloProvider.clients.defaultClient
    return await client.query({
      fetchPolicy: 'no-cache',
      query: require('@/gql/me.gql')
    }).then((response) => {
      this.$auth.setUser(response.data.me)
      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }

  logout () {
    // const client = this.$auth.ctx.app.apolloProvider.clients.defaultClient
    // await client.mutate({
    //   mutation: require('@/gql/auth/mutation/signOut.gql')
    // }).catch(() => {
    //   //
    // })
    return this.$auth.reset()
  }
}
