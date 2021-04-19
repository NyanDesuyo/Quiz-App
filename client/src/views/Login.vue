<template>
  <b-container fluid="md" class="py-5 text-center">
    <h1>Login</h1>
    <b-container class="text-left">
      <b-form @submit="onLogin" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Username: " label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            required
          />
        </b-form-group>

        <b-form-group id="input-group-2" label="Password: " label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
          />
        </b-form-group>
        <b-button type="submnit" variant="primary">Login</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    onLogin(event) {
      event.preventDefault();
      //const result = await axios.get(``)
      const _username = this.form.username;
      const _password = this.form.password;

      axios
        .get(
          `http://localhost:3000/user/login?username=${_username}&password=${_password}`,
        )
        .then((response) => {
          if (response.data.result.length !== 0) {
            window.alert(JSON.stringify(this.form));
            this.$router.push("/question");
          } else {
            window.alert(JSON.stringify(this.form));
          }
        });
    },
    onReset(event) {
      event.preventDefault();
      this.form.username = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
