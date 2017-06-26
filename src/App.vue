<template>
  <div id="app">
    <div class="fcb-sidebar">

        <!-- <h2 class="fcb-sidebar-title">Country of Origin (COO)</h2> -->
        <ul>
            <li>
                <div class="fcb-tree">
                    <router-link class="item active" to="country-of-origin">Country of Origin (COO)</router-link>
                </div>
            </li>
            <li>
                <div class="fcb-tree">
                    <router-link class="item" to="/">Sku in transit</router-link>
                </div>
            </li>
            <li>

                <div class="fcb-more fcb-tree" v-on:click="treeShow = !treeShow">Assistance Program <span>{{ total }}</span></div>
                <ul v-show="treeShow">
                    <li>
                        <div class="fcb-tree fcb-identified">
                            <router-link class="sub-item" to="marking-identified">Marking identified</router-link>
                            <span class="fcb-count">{{totals.marking_identified}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="fcb-tree fcb-not-identified">
                            <router-link class="sub-item" to="marking-not-identified">Marking not identified</router-link>
                            <span class="fcb-count">{{totals.marking_not_identified}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="fcb-tree fcb-history">
                            <router-link class="sub-item" to="history">History</router-link>
                            <span class="fcb-count">400</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>

    </div>

    <router-view></router-view>

  </div>
</template>

<script type="text/javascript">
import axios from 'axios';
export default {
  name: 'app',
  data() {
      return {
          treeShow: false,
          totals: [],
          totSum: 0

      }
  },
  computed: {
      total: function(){
          return parseInt(this.totals.marking_identified)  + parseInt(this.totals.marking_not_identified)
      }
  },
  mounted() {
    // console.log('print gettotals');
    axios.get("/static/assistance-gettotals.json")
    .then((x) => {
      this.totals = x.data;
    //   console.log(x.data);
    });
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },

  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}

.fcb-sidebar { width: 180px; float: left; text-align:left; }
.fcb-sidebar-title { font-size: 14px; }
.fcb-sidebar ul { list-style: none; margin: 0; padding: 0; text-align: left;}
.fcb-tree { border-bottom: 1px solid #CCC; padding: 5px 0px 5px 10px; }
.fcb-sidebar ul li { text-align: left; font-size: 14px; color: #57585A; }
.fcb-sidebar ul li a.active { color: #4d148c; }
.fcb-sidebar ul li a { color: #57585A;  text-decoration: none; }
/*.fcb-sidebar li ul li { padding-left: 0; }*/
.sub-item { font-size: 11px; }
</style>
