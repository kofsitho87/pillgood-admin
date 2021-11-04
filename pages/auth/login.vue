<template>
  <b-container>
    <b-form @submit.prevent="loginAction">
      <p class="h4 text-center mb-4">
        Sign in
      </p>
      <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
      <b-input v-model="form.email" placeholder="email" type="email" />
      <br>
      <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
      <b-input v-model="form.password" type="password" placeholder="password" />
      <div class="text-center mt-4">
        <button class="btn btn-indigo" type="submit">
          Login
        </button>
      </div>
    </b-form>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  auth: false
})
export default class Login extends Vue {
  $apollo: any;
  form: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  }

  isLoading = false

  async loginAction (): Promise<void> {
    if (!this.form.email || !this.form.password) {
      alert('이메일과 비밀번호를 입력해세요!')
      return
    }
    this.isLoading = true
    this.$auth.reset()

    try {
      await this.$auth.loginWith('apollo', {
        data: {
          input: this.form
        }
      })
      location.href = '/'
      // console.log('#')
      // this.$router.push('/')
    } catch (e: any) {
      alert(e.message)
    }
  }
}
</script>
