<template>
    <div class="fcb-marking-not-assistance">
        <div class="fcb-wrap-body">
            <h2>Marking not Identified</h2>
            <p>Country of Origin (CoO) marking/labeling could not be located in a physical inspection of this item.</p>
            <p>Please contact supplier/manufacturer for CoO information.</p>
            <p>We will be unable to export this item until CoO information is provided. </p>
            <range-page></range-page>
            <grid-not-assistance></grid-not-assistance>
        </div>
    </div>
</template>

<script>
import RangePage from '@/components/tools/RangePage';
import GridNotAssistance from '@/components/tools/GridNotAssistance';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    RangePage,
    GridNotAssistance
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, p { font-size: 12px; font-family: Arial; }
h1, h2 {   font-weight: normal; }
h2 { color: #4d148c; font-size: 16px; font-weight: bold; }
p { color: #57585A; }

.fcb-marking-not-assistance {  border-left: 1px solid black; float: right; width: 825px; }
.fcb-wrap-body { display: block; padding-left: 20px; }
</style>
