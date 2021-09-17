<template>
  <div>
    <nav-drawer />
    <div class="dashboard-content">
      <main class="main-content">
        <div class="inner-content">
          <h5 class="text-h5">Thống kê khảo sát</h5>
          <v-divider></v-divider>
          <v-skeleton-loader class="mx-auto" type="list-item">
            <v-container fluid class="mb-10">
              <v-row>
                <v-col class="col-12 col-md-4">
                  <v-card class="card-body d-flex align-items-center">
                    <v-card-text class="text">
                      <div class="label">Tổng ASO</div>
                      <div class="text-h5 text--primary">
                        {{ statisticsData.total }}
                      </div>
                    </v-card-text>
                    <v-list-item-icon class="icon-wrapper ml-0">
                      <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-list-item-icon>
                  </v-card>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <v-card class="card-body d-flex align-items-center">
                    <v-card-text class="text">
                      <div class="label">Đã khảo sát</div>
                      <div class="text-h5 text--primary">
                        {{ statisticsData.audited }}
                      </div>
                    </v-card-text>
                    <v-list-item-icon class="icon-wrapper ml-0">
                      <v-icon>mdi-check</v-icon>
                    </v-list-item-icon>
                  </v-card>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <v-card class="card-body d-flex align-items-center">
                    <v-card-text class="text">
                      <div class="label">Chưa khảo sát</div>
                      <div class="text-h5 text--primary">
                        {{ statisticsData.total - statisticsData.audited }}
                      </div>
                    </v-card-text>
                    <v-list-item-icon class="icon-wrapper ml-0">
                      <v-icon>mdi-alert-circle-check-outline</v-icon>
                    </v-list-item-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-container fluid class="pie-chart-area">
              <pie-chart
                :series="[
                  statisticsData.audited,
                  statisticsData.total - statisticsData.audited,
                ]"
              />
            </v-container>
            <v-divider></v-divider>
            <v-container class="col-chart-area" fluid>
              <v-row>
                <v-col>
                  <h6 class="text-h6">Số lượng sample có báo cáo</h6>
                  <audit-col-chart />
                </v-col>
                <v-col>
                  <h6 class="text-h6">
                    Lý do CH sample không audit thành công
                  </h6>
                  <reject-col-chart />
                </v-col>
              </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-container class="radialbar-chart-area" fluid>
              <v-row>
                <v-col>
                  <h6 class="text-h6">Tổng điểm Red</h6>
                  <radial-bar-chart
                    :series="[35]"
                    :color="'rgb(255, 99, 132)'"
                  />
                </v-col>
                <v-col>
                  <h6 class="text-h6">Tổng điểm hiện diện sản phẩm</h6>
                  <radial-bar-chart
                    :series="[17]"
                    :color="'rgb(255, 99, 13)'"
                  />
                </v-col>
                <v-col>
                  <h6 class="text-h6">Tổng điểm POSM</h6>
                  <radial-bar-chart :series="[3]" :color="'rgb(255, 9, 132)'" />
                </v-col>
                <v-col>
                  <h6 class="text-h6">Tổng điểm Tủ lạnh</h6>
                  <radial-bar-chart
                    :series="[16]"
                    :color="'rgb(25, 99, 132)'"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-skeleton-loader>
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
import PieChart from "../components/PieChart.vue";
import AuditColChart from "../components/AuditColChart.vue";
import RejectColChart from "../components/RejectColChart.vue";
import RadialBarChart from "../components/RadialBarChart.vue";

export default {
  data() {
    return {
      statisticsData: {},
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  components: {
    NavDrawer,
    PieChart,
    AuditColChart,
    RejectColChart,
    RadialBarChart,
  },
  methods: {
    handleRedirect() {
      if (this.isLoggedIn == false) {
        return this.$router.push({ path: "/login" });
      }
    },
    getStatisticData: async function () {
      try {
        const response = await request.get(`${BASE_URL}/store/statistic`);
        this.statisticsData = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted: function () {
    this.handleRedirect();
    this.getStatisticData();
  },
};
</script>

<style lang="scss">
.dashboard-content {
  .radialbar-chart-area {
    h6 {
      min-height: 48px;
      line-height: 1.2;
    }
  }
}
</style>
