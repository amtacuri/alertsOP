<template id="">
    <div class="fcb-range">
        <div class="fcb-left">
            <span>Result per page</span>
        </div>
        <div class="fcb-right">
            <button v-on:click="cantPage(10)">10</button>
            <button v-on:click="cantPage(25)">25</button>
            <button v-on:click="cantPage(50)">50</button>
        </div>
        <div class="ui segment">
          <div class="ui range" id="range-1"></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'rangePage',
  data() {
    return {
      msg: 'range per page',
    };
  },
  methods: {
    cantPage (r) {
        this.$emit('registros', r)
    }
  }
};


// $(document).ready(function() {

//   $('#range-1').range({
//     min: 0,
//     max: 10,
//     start: 5
//   });


// });

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.fcb-range { display: block; min-height: 70px; border-top: 1px solid #CCC; padding: 10px; }
.fcb-left { float: left; }
.fcb-left span { text-transform: uppercase; font-size: 11px; font-weight: bolder; letter-spacing: 1px; color: #57585A; }
.fcb-right { float: right; text-align: right; }
.fcb-range .fcb-right { width: 60%; display: block; }

</style>
