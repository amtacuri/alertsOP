<template>
  <div class="fcb-sku-in-transit">
      <div class="fcb-wrap-body">
          <h2>SKUs ordered without Country of Origin (COO)</h2>
          <p>
              Below are the products in transit to FedEx Cross Border pending Country of Origin review.
              Please certify the Country of Origin for these products. If it is not provided here, these products will be routed
              through the <a href="">Country of Origin (CoO) Assistance Program</a>.
          </p>
          <range-page></range-page>
          <grid></grid>
      </div>
    </div>
</template>

<script>
import RangePage from '@/components/tools/RangePage';
import Grid from '@/components/tools/Grid';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    //   skusData: [],
    //   countries: [],
    };
  },
  components: {
    RangePage,
    Grid
  },
  mounted() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, p { font-size: 12px; font-family: Arial; }
h1, h2 {   font-weight: normal; }
h2 { color: #4d148c; font-size: 16px; font-weight: bold; }
p, a { color: #57585A; }
a { text-decoration: underline; font-weight: bolder; }

.fcb-sku-in-transit { border-left: 1px solid black; float: right; width: 805px; }
.fcb-wrap-body { display: block; padding-left: 20px; }
</style>
