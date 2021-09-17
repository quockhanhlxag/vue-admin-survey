<template>
  <div>
    <nav-drawer />
    <div class="store-content">
      <main class="main-content">
        <div class="inner-content">
          <h5 class="text-h5">Danh sách cửa hàng</h5>
          <v-divider></v-divider>
          <div class="store-table-wrapper">
            <v-text-field
              v-model="search"
              class="search-field"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="storeDataHeaders"
              :items="storeData"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              :search="search"
              class="store-table"
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:top>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Xóa cửa hàng</v-card-title>
                    <v-card-text>Bạn có chắc muốn xóa cửa hàng</v-card-text>
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
              <template v-slot:header.status v-if="isAdmin">
                Trạng thái
              </template>
              <template v-slot:item.status="{ item }" v-if="isAdmin">
                <v-chip :color="statusColor[item.status]" outlined label>{{
                  getStatusName(item.status)
                }}</v-chip>
              </template>
              <template v-slot:item.delete="{ item }" v-if="isAdmin">
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
import NavDrawer from "../components/NavDrawer";
import { BASE_URL } from "../services/urls";
import request from "../services/requests";
import { STORE_STATUS } from "../config/constant";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      dialogDelete: false,
      openStoreId: "",
      statusColor: {
        NOT_AUDIT: "orange lighten-2",
        PENDING: "yellow darken-1",
        APPROVED: "green lighten-1",
        REJECTED: "red",
      },
      storeData: [],
      storeDataHeaders: [
        { text: "Mã cửa hàng", value: "id" },
        { text: "Tên cửa hàng", value: "storeName" },
        { text: "Tỉnh", value: "address.city" },
        { text: "Địa chỉ", value: "fullAddress" },
        { text: "Xếp hạng", value: "grade" },
        { text: "Loại hình", value: "type" },
        { text: "", value: "status" },
        { text: "", value: "delete", sortable: false },
      ],
    };
  },
  components: {
    NavDrawer,
  },
  computed: {
    isAdmin: function () {
      return this.$store.getters.userData.role === "ADMIN";
    },
  },
  methods: {
    showDialog(item) {
      this.openStoreId = item.id;
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
    getStatusName(status) {
      return STORE_STATUS[status];
    },
    getStoreData: async function () {
      try {
        const response = await request.get(`${BASE_URL}/store/all`);
        this.storeData = response.data.data;
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
