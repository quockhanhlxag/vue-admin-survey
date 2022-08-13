<template>
  <div>
    <nav-drawer />
    <div class="user-management">
      <main class="main-content">
        <div class="inner-content">
          <h5 class="text-h5">Danh sách thành viên</h5>
          <v-divider></v-divider>
          <div class="">
            <v-dialog v-model="dialogNewUSer" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="btn-add-user"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small class="mr-1">mdi-account-plus</v-icon>
                  Thêm thành viên
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="justify-space-between">
                  <span class="text-h6">Thêm thành viên</span>
                  <v-btn icon @click="dialogNewUSer = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Username*"
                          type="text"
                          required
                          v-model="userName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Email*"
                          type="text"
                          required
                          v-model="email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Password*"
                          type="password"
                          required
                          v-model="password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="['ADMIN', 'QC', 'USER', 'CLIENT']"
                          label="Role*"
                          required
                          v-model="role"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogNewUSer = false"
                  >
                    Hủy
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="createNewUser">
                    Tạo user
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div class="user-table-wrapper table-wrapper">
            <div class=""></div>
            <v-data-table
              :headers="userDataHeaders"
              :items="userData"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              class="store-table"
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:top>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Xóa thành viên</v-card-title>
                    <v-card-text>Bạn có chắc muốn xóa user ?</v-card-text>
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
              <template v-slot:item.email="props">
                <v-edit-dialog
                  :return-value.sync="props.item.email"
                  @save="saveEdit(props.item)"
                >
                  {{ props.item.email }}
                  <v-icon small color="light-blue"> mdi-pencil </v-icon>
                  <template v-slot:input>
                    <v-text-field
                      v-model="props.item.email"
                      :rules="[max25chars]"
                      label="Edit"
                      single-line
                      counter
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>
              <template v-slot:item.role="props">
                <v-edit-dialog
                  :return-value.sync="props.item.role"
                  @save="saveEdit(props.item)"
                  large
                  persistent
                >
                  <v-chip
                    :color="roleColor[props.item.role]"
                    label
                    text-color="white"
                    style="cursor: pointer"
                    >{{ props.item.role }}</v-chip
                  >
                  <template v-slot:input>
                    <v-select
                      :items="['ADMIN', 'QC', 'USER', 'CLIENT']"
                      v-model="props.item.role"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  :disabled="item.email === getUser.email"
                  icon
                  color="red"
                  @click="showDialog(item)"
                >
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
    </div>
  </div>
</template>

<script>
import NavDrawer from "../components/NavDrawer.vue";
import { BASE_URL } from "../config/urls";
import request from "../services/requests";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialogDelete: false,
      dialogNewUSer: false,
      openUserId: "",
      email: "",
      password: "",
      role: "",
      userName: "",
      max25chars: (v) => v.length <= 25 || "Input too long!",
      userData: [],
      roleColor: {
        ADMIN: "deep-orange",
        QC: "green accent-3",
        CLIENT: "orange darken-3",
        USER: "light-blue",
      },
      userDataHeaders: [
        { text: "Email", value: "email" },
        { text: "Username", value: "userName" },
        { text: "Role", value: "role" },
        { text: "", value: "delete" },
      ],
    };
  },
  components: { NavDrawer },
  computed: {
    getUser: function () {
      return this.$store.getters.userData;
    },
  },
  methods: {
    showDialog(item) {
      this.openUserId = item.id;
      this.dialogDelete = true;
    },
    closeDialog() {
      this.dialogDelete = false;
    },
    saveEdit: async function (editedItem) {
      const { token, ...submitEditedData } = editedItem;
      try {
        await request.put(`${BASE_URL}/user/`, submitEditedData);
      } catch (e) {
        console.log(e);
      }
    },
    deleteItem: async function () {
      // const userId = this.openUserId;
      try {
        // await request.delete(`${BASE_URL}/store/${userId}`);
        this.closeDialog();
      } catch (e) {
        console.log(e);
      }
    },
    getUserData: async function () {
      try {
        const response = await request.get(`${BASE_URL}/user`);
        this.userData = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    createNewUser: async function () {
      let userName = this.userName;
      let email = this.email;
      let password = this.password;
      let role = this.role;
      try {
        await request.post(`${BASE_URL}/user`, {
          userName,
          email,
          password,
          role,
        });
        this.dialogNewUSer = false;
        this.getUserData();
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted: function () {
    this.getUserData();
  },
};
</script>

<style></style>
