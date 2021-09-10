<template>
  <div class="login-page">
    <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
      <div class="login-form-header text-center"><b>COKE</b> - SMOLLAN</div>
      <div class="login-form-body">
        <p class="text-center">Đăng nhập vào Coke Audit</p>
        <v-text-field
          v-model="userName"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          required
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Log in
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { BASE_URL } from "../urls/config";
import request from "../services/requests";
export default {
  data: () => ({
    valid: true,
    userName: "",
    usernameRules: [(v) => !!v || "Vui lòng nhập tên đăng nhập"],
    password: "",
    show1: false,
    passwordRules: [(v) => !!v || "Vui lòng nhập mật khẩu"],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    login: async function () {
      this.validate();
      let userName = this.userName;
      let password = this.password;
      try {
        const response = await request.post(`${BASE_URL}/user/login`, {
          userName,
          password,
        });
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        this.$router.push("/admin/dashboard");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
