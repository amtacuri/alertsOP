<template>
    <div class="fcb-marking-assistance">
        <div class="fcb-wrap-body">
            <h2>Marking not Identified</h2>
            <p>
                FedEx Cross Border has received your products and uploaded any images of the markings found. Please review
                the images below and certify the Country of Origin for those products. If products are not certified within 2
                business days, they will be canceled from the associated order.
            </p>
            <range-page></range-page>
            <grid-assistance></grid-assistance>
        </div>
    </div>
</template>

<script>
import RangePage from '@/components/tools/RangePage';
import GridAssistance from '@/components/tools/GridAssistance';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    RangePage,
    GridAssistance
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, p { font-size: 12px; font-family: Arial; }
h1, h2 {   font-weight: normal; }
h2 { color: #4d148c; font-size: 16px; font-weight: bold; }
p { color: #57585A; }

.fcb-marking-assistance { border-left: 1px solid black; float: right; width: 805px; }
.fcb-wrap-body { display: block; padding-left: 20px; }
</style>
