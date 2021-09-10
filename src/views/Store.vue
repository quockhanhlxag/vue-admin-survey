<template>
  <div>
    <nav-drawer />
    <h5 class="text-h5">Danh sách cửa hàng</h5>
  </div>
</template>

<script>
import NavDrawer from "../components/NavDrawer";
import { BASE_URL } from "../urls/config";
import request from "../services/requests";
export default {
  components: {
    NavDrawer,
  },
  methods: {
    getStoreData: async function () {
      try {
        const response = await request.get(`${BASE_URL}/store/all`);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted: function () {
    this.getStoreData();
  },
};
</script>

<style></style>
