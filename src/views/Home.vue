<template>
  <div class="home container">
    <h2 class="mt-5">HTML Calendar Create Tool</h2>
    <div class="d-flex justify-content-center">
      <div class="usu">
        <p class="text-left mt-3">Check Date</p>
        <div class="d-flex justify-content-center group">
          <div id="input-calendar">
            <table id="main-table">
              <thead>
                <tr>
                  <th id="prev" @click="prevMonth">&laquo;</th>
                  <th id="title" colspan="5">
                    {{ this.$store.getters.year }}/{{
                      this.$store.getters.month + 1
                    }}
                  </th>
                  <th id="next" @click="nextMonth">&raquo;</th>
                </tr>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody id="display-calendar">
                <MyCalendar
                  v-for="(week, index) in this.$store.getters.weeks"
                  :key="index"
                  :index="index"
                  :week="week"
                  :styles="styles"
                />
              </tbody>
            </table>
          </div>
        </div>
        <p class="text-left mt-3">Option</p>
        <div class="boxContainer group d-flex justify-content-around">
          <div id="detail" class="box">
            <table id="coloring">
              <tr>
                <th colspan="2">Color</th>
              </tr>
              <tr>
                <th>
                  <div class="pointer" @click="changePallet1">Color1</div>
                  <MyModal @close="changePallet1" v-show="showPallet1">
                    <chrome-picker
                      :value="this.$store.getters.detailedSettings.color1"
                      class="modal-window"
                      @input="updateValue"
                    ></chrome-picker>
                  </MyModal>
                </th>
                <th
                  class="pallet1 pointer"
                  :style="styles"
                  @click="changePallet1"
                ></th>
              </tr>
              <tr>
                <th>
                  <div class="pointer" @click="changePallet2">Color2</div>
                  <MyModal @close="changePallet2" v-show="showPallet2">
                    <chrome-picker
                      :value="this.$store.getters.detailedSettings.color2"
                      class="modal-window"
                      @input="updateValue2"
                    ></chrome-picker>
                  </MyModal>
                </th>
                <th
                  class="pallet2 pointer"
                  :style="styles2"
                  @click="changePallet2"
                ></th>
              </tr>
              <tr>
                <th>
                  <div class="pointer" @click="changePallet3">Background</div>
                  <MyModal @close="changePallet3" v-show="showPallet3">
                    <chrome-picker
                      :value="this.$store.getters.detailedSettings.color3"
                      class="modal-window"
                      @input="updateValue3"
                    ></chrome-picker>
                  </MyModal>
                </th>
                <th
                  class="pallet3 pointer"
                  :style="styles3"
                  @click="changePallet3"
                ></th>
              </tr>
              <tr>
                <th>
                  <div class="pointer" @click="changePallet4">Frame Border</div>
                  <MyModal @close="changePallet4" v-show="showPallet4">
                    <chrome-picker
                      :value="this.$store.getters.detailedSettings.color4"
                      class="modal-window"
                      @input="updateValue4"
                    ></chrome-picker>
                  </MyModal>
                </th>
                <th
                  class="pallet4 pointer"
                  :style="styles4"
                  @click="changePallet4"
                ></th>
              </tr>
            </table>
          </div>
          <div class="box">
            <table id="cell-size">
              <tr>
                <th colspan="2">Size/Square</th>
              </tr>
              <tr>
                <th class="fixed-width">width</th>
                <th>
                  <input type="number" id="input-width" v-model="width" />px
                </th>
              </tr>
              <tr>
                <th>height</th>
                <th>
                  <input type="number" id="input-height" v-model="height" />px
                </th>
              </tr>
            </table>
          </div>
          <div class="box">
            <table id="border-size">
              <tr>
                <th colspan="2">Frame border</th>
              </tr>
              <tr>
                <th class="fixed-width"></th>
                <th>
                  <input type="number" id="input-border" v-model="border" />px
                </th>
              </tr>
            </table>
          </div>
        </div>
        <div
          id="output-button"
          @click="outputDate"
          class="btn btn-outline-dark mt-5"
        >
          <ChevronRight />Convert
        </div>
      </div>
      <div class="usu">
        <p class="text-left slide-right mt-3">Output</p>
        <div class="boxContainer">
          <div class="box">
            <div id="output">
              <ChevronRight @click="outputDate" class="side-space pointer" />
              <textarea cols="50" rows="10" v-model="output"></textarea>
            </div>
            <button
              id="clip-board"
              class="btn btn-outline-dark slide-right"
              v-clipboard:copy="output"
              v-clipboard:error="onError"
            >
              <ContentCopy />Copy
            </button>
          </div>
        </div>
        <div
          id="preview"
          class="d-flex justify-content-around slide-right collapse"
          v-html="this.$store.getters.outputDates"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ContentCopy from "vue-material-design-icons/ContentCopy.vue";
import MyModal from "../components/MyModal.vue";
import MyCalendar from "../components/MyCalendar.vue";
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

export default {
  components: {
    "chrome-picker": Chrome,
    ChevronRight,
    ContentCopy,
    MyModal,
    MyCalendar,
  },
  created() {
    this.$store.dispatch("fetchCalendar");
  },
  methods: {
    prevMonth() {
      this.$store.dispatch("prevMonth");
    },
    nextMonth() {
      this.$store.dispatch("nextMonth");
    },
    changePallet1() {
      this.showPallet1 = !this.showPallet1;
    },
    changePallet2() {
      this.showPallet2 = !this.showPallet2;
    },
    changePallet3() {
      this.showPallet3 = !this.showPallet3;
    },
    changePallet4() {
      this.showPallet4 = !this.showPallet4;
    },
    updateValue(eventData) {
      this.$store.commit("updateColor1", eventData);
    },
    updateValue2(eventData) {
      this.$store.commit("updateColor2", eventData);
    },
    updateValue3(eventData) {
      this.$store.commit("updateColor3", eventData);
    },
    updateValue4(eventData) {
      this.$store.commit("updateColor4", eventData);
    },
    outputDate() {
      this.$store.dispatch("outputDate");
    },
    onError: function() {
      alert("Failed to copy texts");
    },
  },
  computed: {
    styles() {
      return {
        "--color": this.$store.getters.detailedSettings.color1,
        "--color2": this.$store.getters.detailedSettings.color2,
      };
    },
    styles2() {
      return {
        "--color2": this.$store.getters.detailedSettings.color2,
      };
    },
    styles3() {
      return {
        "--color3": this.$store.getters.detailedSettings.color3,
      };
    },
    styles4() {
      return {
        "--color4": this.$store.getters.detailedSettings.color4,
      };
    },
    width: {
      get() {
        return this.$store.getters.detailedSettings.width;
      },
      set(value) {
        this.$store.commit("setWidth", value);
      },
    },
    height: {
      get() {
        return this.$store.getters.detailedSettings.height;
      },
      set(value) {
        this.$store.commit("setHeight", value);
      },
    },
    border: {
      get() {
        return this.$store.getters.detailedSettings.border;
      },
      set(value) {
        this.$store.commit("setBorder", value);
      },
    },
    output: {
      get() {
        return this.$store.getters.outputDates;
      },
    },
  },
  data() {
    return {
      showPallet1: false,
      showPallet2: false,
      showPallet3: false,
      showPallet4: false,
    };
  },
};
</script>

<style>
#prev,
#next {
  cursor: pointer;
  user-select: none;
}

.pallet1 {
  --color: #1ae578;
  background-color: var(--color);
  width: 26px;
}
.pallet2 {
  --color2: #ff0000;
  background-color: var(--color2);
}
.pallet3 {
  --color3: #ffffff;
  background-color: var(--color3);
}
.pallet4 {
  --color4: #cccccc;
  background-color: var(--color4);
}

button {
  margin: 20px;
}

.group {
  border: 1px solid #333;
  border-radius: 5px;
  padding: 30px;
  position: relative;
}

.group::before {
  background-color: #fff;
  color: #333;
  /* content: "設定"; */
  font-weight: bold;
  left: 30px;
  padding: 3px 10px;
  position: absolute;
  top: -15px;
}

input {
  width: 50px;
}

.text-left {
  text-align: left;
  margin-bottom: 0;
  font-weight: bold;
}

#output {
  display: flex;
  justify-content: center;
  align-items: center;
}
.side-space {
  margin: 0 10px;
}

.slide-right {
  margin-left: 44px;
}

.collapse {
  border-collapse: separate;
}

table {
  margin: 1px;
}

.modal-window {
  cursor: pointer;
  user-select: none;
}

.pointer {
  cursor: pointer;
  user-select: none;
}
</style>
