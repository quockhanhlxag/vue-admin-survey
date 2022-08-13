<template>
  <div>
    <nav-drawer />
    <div v-if="surveyDetails" class="survey-details">
      <main class="main-content">
        <div class="inner-content">
          <h5 class="text-h5">Chi tiết khảo sát</h5>
          <v-divider></v-divider>
          <v-card class="mx-auto my-12 rounded-lg">
            <v-list subheader class="pb-0">
              <v-subheader class="subheader audit-details"
                >Thông tin điểm bán hàng</v-subheader
              >
              <v-list-item
                class="list-item"
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    ><b>{{ item.text }}: </b>
                    <span v-if="item.keyData === 'status'">
                      <v-chip
                        :color="statusColor[surveyDetails.storeInfo.status]"
                        outlined
                        label
                        small
                        >{{
                          getStatusName(surveyDetails.storeInfo.status)
                        }}</v-chip
                      >
                    </span>
                    <span v-else>
                      {{ surveyDetails.storeInfo[item.keyData] }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-snackbar
                v-model="updateSuccess"
                top
                color="success"
                :timeout="2000"
              >
                Cập nhật trạng thái thành công
              </v-snackbar>
              <div v-if="surveyDetails.storeInfo.status">
                <div
                  class="d-flex justify-end px-4 py-3"
                  v-if="surveyDetails.storeInfo.status === 'PENDING'"
                >
                  <v-btn
                    @click="openConfirmStatus('APPROVED')"
                    class="survey-action mr-2"
                    color="primary"
                    dark
                  >
                    Duyệt
                  </v-btn>
                  <v-btn
                    @click="openConfirmStatus('REJECTED')"
                    class="survey-action"
                    color="warning"
                    dark
                  >
                    Từ chối
                  </v-btn>
                </div>
                <div
                  class="d-flex justify-end px-4 py-3"
                  v-if="
                    surveyDetails.storeInfo.status === 'APPROVED' ||
                    surveyDetails.storeInfo.status === 'REJECTED'
                  "
                >
                  <v-btn
                    @click="openConfirmStatus('PENDING')"
                    class="survey-action"
                    color="success"
                  >
                    Duyệt lại
                  </v-btn>
                </div>
                <v-dialog v-model="dialogConfirm" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Duyệt khảo sát</v-card-title>
                    <v-card-text>Bạn có chắc muốn duyệt khảo sát ?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogConfirm = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="updateDetailsStatus"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-list>
          </v-card>
          <v-container class="pa-0" fluid>
            <v-row>
              <v-col cols="12" md="8">
                <questions-panel :data="surveyDetails" />
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="mx-auto rounded-lg">
                  <v-list subheader class="pb-0">
                    <v-subheader class="subheader gallery-pictures"
                      >Hình ảnh</v-subheader
                    >
                    <v-container>
                      <v-row dense>
                        <v-col
                          v-for="(image, index) in getAuditImages(
                            surveyDetails
                          )"
                          :key="index"
                          cols="12"
                          md="4"
                        >
                          <div class="images" v-viewer>
                            <img
                              style="width: 100%"
                              src="https://source.unsplash.com/random"
                              alt="Placeholder"
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
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
import QuestionsPanel from "../components/QuestionsPanel.vue";
import { BASE_URL } from "../config/urls";
import { STORE_STATUS } from "../config/constant";
import request from "../services/requests";
export default {
  data() {
    return {
      items: [
        { text: "Mã cửa hàng", icon: "#", keyData: "id" },
        {
          text: "Tên của hàng",
          icon: "mdi-home-outline",
          keyData: "storeName",
        },
        {
          text: "Địa chỉ",
          icon: "mdi-compass-outline",
          keyData: "fullAddress",
        },
        {
          text: "Auditor",
          icon: "mdi-clipboard-list-outline",
          keyData: "userName",
        },
        { text: "Loại hình", icon: "mdi-apps", keyData: "type" },
        {
          text: "Xếp hạng",
          icon: "mdi-format-list-numbered",
          keyData: "grade",
        },
        {
          text: "Trạng thái",
          icon: "mdi-clipboard-check-outline",
          keyData: "status",
        },
      ],
      statusColor: {
        NOT_AUDIT: "orange lighten-2",
        PENDING: "yellow darken-1",
        APPROVED: "green lighten-1",
        REJECTED: "red",
      },
      surveyDetails: null,
      dialogConfirm: false,
      updateSuccess: false,
      statusToUpdate: "",
    };
  },
  components: { NavDrawer, QuestionsPanel },
  methods: {
    getAuditImages(surveyDetails) {
      return surveyDetails.questionnaire.groups
        .map((item) => {
          return item.questions.map((item) => {
            if (item.type === "IMAGE") {
              return item.answers;
            }
          });
        })
        .flat(Infinity)
        .filter(Boolean);
    },
    getStatusName(status) {
      return STORE_STATUS[status];
    },
    openConfirmStatus(status) {
      this.dialogConfirm = true;
      this.statusToUpdate = status;
    },
    updateDetailsStatus: async function () {
      const editedData = this.surveyDetails;
      const storeId = this.surveyDetails.storeId;
      try {
        await request.put(
          `${BASE_URL}/survey/` + this.$route.params.audit_id,
          editedData
        );
        await request.put(
          `${BASE_URL}/store/status?storeId=${storeId}&newStatus=${this.statusToUpdate}`,
          {
            dummy: "",
          }
        );
        this.dialogConfirm = false;
        this.updateSuccess = true;
        this.getSurveyDetails();
      } catch (e) {
        console.log(e);
      }
    },
    getSurveyDetails: async function () {
      try {
        const response = await request.get(
          `${BASE_URL}/survey/` + this.$route.params.audit_id
        );
        this.surveyDetails = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted: function () {
    this.getSurveyDetails();
  },
};
</script>

<style></style>
