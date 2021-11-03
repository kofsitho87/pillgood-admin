<template>
  <b-container>
		<form @submit.prevent="loginAction">
			<p class="h4 text-center mb-4">Sign in</p>
			<label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
			<b-input type="email" />
			<br/>
			<label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
			<input type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
			<div class="text-center mt-4">
				<button class="btn btn-indigo" type="submit">Login</button>
			</div>
		</form>
	</b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
})
export default class Login extends Vue {
	async loginAction(){
		const { data: { login } } = await this.$apollo.mutate({
			mutation: require('@/gql/login.gql'),
			variables: {
				input: {
					email: "s1@s.com",
					password: "123456"
				}
			}
		})
		this.$router.push("/products")
	}
}
</script>
