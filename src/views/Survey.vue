<template>
  <div>
    <nav-drawer />
    <div class="survey-content">
      <main class="main-content">
        <div class="inner-content">
          <h5 class="text-h5">Danh sách khảo sát</h5>
          <v-divider></v-divider>
          <div class="survey-table-wrapper table-wrapper">
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
              <template v-slot:top>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Xóa khảo sát</v-card-title>
                    <v-card-text>Bạn có chắc muốn xóa khảo sát ?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDialog"
                        >Hủy</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="deleteItem"
                        >Xóa</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.createAt="{ item }">
                <div>{{ parseDay(item.createAt) }}</div>
              </template>
              <template v-slot:item.options="{ item }" v-if="isAdmin">
                <router-link :to="'/admin/audit/' + item.id">
                  <v-btn icon color="blue">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </router-link>
                <v-btn icon color="red" @click="showDialog(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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
import { BASE_URL } from "../config/urls";
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
      dialogDelete: false,
      openStoreId: "",
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
    showDialog(item) {
      this.openStoreId = item.storeId;
      this.dialogDelete = true;
    },
    closeDialog() {
      this.dialogDelete = false;
    },
    deleteItem: async function () {
      // const storeId = this.openStoreId;
      try {
        // await request.delete(`${BASE_URL}/store/${storeId}`);
        this.closeDialog();
      } catch (e) {
        console.log(e);
      }
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
