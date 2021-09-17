<template>
  <div>
    <nav-drawer />
    <div class="survey-content">
      <main class="main-content">
        <div class="inner-content">
          <h5 class="text-h5">Danh sách khảo sát</h5>
          <v-divider></v-divider>
          <div class="survey-table-wrapper">
            <v-text-field
              v-model="search"
              class="search-field"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="surveyDataHeaders"
              :items="surveyData"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              :search="search"
              class="survey-table"
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:item.createAt="{ item }">
                <div>{{ parseDay(item.createAt) }}</div>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :total-visible="8"
                :length="pageCount"
              ></v-pagination>
            </div>
          </div>
        </div>
      </main>
      <footer class="footer-content text-center">
        Copyright © 2021 <a href="#">VinaFocus</a>. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script>
import NavDrawer from "../components/NavDrawer.vue";
import { BASE_URL } from "../services/urls";
import request from "../services/requests";
import dayjs from "dayjs";
dayjs().format();
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      surveyData: [],
      surveyDataHeaders: [
        { text: "Ngày", value: "createAt" },
        { text: "Mã cửa hàng", value: "storeId" },
        { text: "Tên cửa hàng", value: "storeInfo.storeName" },
        { text: "Tỉnh", value: "storeInfo.address.city" },
        { text: "Xếp hạng", value: "storeInfo.grade" },
        { text: "Loại hình", value: "storeInfo.type" },
        { text: "", value: "options", sortable: false },
      ],
    };
  },
  components: { NavDrawer },
  computed: {
    isAdmin: function () {
      return this.$store.getters.userData.role === "ADMIN";
    },
  },
  methods: {
    parseDay(date) {
      return dayjs(date).format("DD/MM/YYYY hh:mm A");
    },
    getSurveyData: async function () {
      try {
        const response = await request.get(`${BASE_URL}/survey`);
        this.surveyData = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted: function () {
    this.getSurveyData();
  },
};
</script>

<style></style>
