<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel
      v-for="(group, index) in data.questionnaire.groups"
      :key="index"
      class="mb-4"
    >
      <v-expansion-panel-header class="subheader questions">
        {{ group.text }}
        <template v-slot:actions>
          <v-icon color="white"> $expand </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="(question, index) in group.questions" :key="index">
          <v-container v-if="question.text !== null" class="question-list py-5">
            <v-row>
              <v-col cols="4">
                <div class="qa-questions">
                  <v-icon small color="primary">
                    mdi-help-circle-outline
                  </v-icon>
                  {{ question.text }}
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  v-if="
                    question.type === 'SELECT' || question.type === 'TEXTAREA'
                  "
                >
                  <div v-for="(answer, index) in question.answers" :key="index">
                    <div class="qa-answers">
                      <v-icon small color="primary">
                        mdi-clipboard-list-outline
                      </v-icon>
                      {{ answer }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    question.answers === null || question.answers.length === 0
                  "
                  class="qa-answers"
                >
                  Không có câu trả lời
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  v-if="
                    data.storeInfo.status === 'PENDING' ||
                    data.storeInfo.status === 'REJECTED'
                  "
                >
                  <div v-if="question.type === 'SELECT'">
                    <div class="qa-selections">
                      <v-select
                        dense
                        :items="getSelectItems(question.items)"
                        label=""
                      ></v-select>
                    </div>
                  </div>
                  <div
                    v-if="
                      question.type === 'INPUT' || question.type === 'TEXTAREA'
                    "
                  >
                    <v-text-field
                      v-model="question.qcAnswer"
                      label=""
                      outlined
                      dense
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </div>
                <div v-if="data.storeInfo.status === 'APPROVED'">
                  <div
                    v-if="
                      question.type === 'SELECT' || question.type === 'TEXTAREA'
                    "
                  >
                    <div
                      v-for="(answer, index) in question.qcAnswer"
                      :key="index"
                    >
                      <div class="qa-qcAnswers">
                        <v-icon small color="primary">
                          mdi-clipboard-list-outline
                        </v-icon>
                        {{ answer }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      question.qcAnswer === null ||
                      question.qcAnswer.length === 0
                    "
                    class="qa-qcAnswer"
                  >
                    Không có câu trả lời
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {
      panel: [0, 1, 2, 3, 4, 5, 6],
    };
  },
  methods: {
    getSelectItems(items) {
      return items.map((item) => {
        return item.text;
      });
    },
  },
  props: {
    data: {
      type: null,
    },
  },
};
</script>

<style></style>
