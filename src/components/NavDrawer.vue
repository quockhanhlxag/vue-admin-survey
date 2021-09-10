<template>
  <v-card class="mx-auto">
    <v-navigation-drawer class="nav-drawer" v-model="drawer" permanent app dark>
      <div class="navigation-content">
        <div class="logo-container text-center">
          <img src="../assets/coke_logo.png" alt="" />
          <span class="text-h6"> COKE - SMOLLAN </span>
        </div>
        <v-divider></v-divider>
        <v-list dense nav>
          <div v-for="item in items" :key="item.title">
            <router-link class="nav-links" :to="item.path">
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon small>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </div>
          <v-list-item @click="logout" link>
            <v-list-item-icon>
              <v-icon small>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          path: "/admin/dashboard",
        },
        { title: "Danh sách cửa hàng", icon: "mdi-home", path: "/admin/store" },
      ],
      right: null,
      drawer: false,
    };
  },
  methods: {
    logout: function () {
      this.$store.commit("logOut");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-drawer {
  border-radius: 0 !important;
}
.nav-links {
  text-decoration: none;
}
.v-list-item {
  &__icon {
    margin-right: 10px !important;
  }
}
.navigation-content {
  color: white;
  background: #001529;
  height: 100%;
  border-radius: 0;

  .logo-container {
    display: block;
    line-height: 1.5;
    padding: 0.8125rem 0.5rem;
    transition: width 0.3s ease-in-out 0s;
    white-space: nowrap;
    border-bottom: 1px solid rgb(0, 64, 121);

    img {
      max-width: 32px;
      float: left;
      height: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.8rem;
      margin-right: 0.5rem;
      box-shadow: rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px;
      border-radius: 50%;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
    }
  }
}
</style>
