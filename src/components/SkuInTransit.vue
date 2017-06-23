<template>
  <div class="fcb-sku-in-transit">
      <div class="fcb-wrap-body">
          <h2>SKUs ordered without Country of Origin (COO)</h2>
          <p>
              Below are the products in transit to FedEx Cross Border pending Country of Origin review.
              Please certify the Country of Origin for these products. If it is not provided here, these products will be routed
              through the <a href="">Country of Origin (CoO) Assistance Program</a>.
          </p>
          <range-page v-on:registros="loadDataTable"></range-page>
          <div class="">
              <data-table
                :config="table_fees.config"
                :header="table_fees.fields"
                :data="table_fees.dataStore"
                v-on:changes="processChanges">
              </data-table>
          </div>
          <paginator></paginator>
          <div>
              <button>Reset</button>
              <button v-on:click="modalCertify">Certify</button>
          </div>
      </div>
    </div>
</template>

<script>
import RangePage from '@/components/tools/RangePage';
import axios from 'axios';
import DataTable from '@/components/tools/DataTable'
import Paginator from '@/components/tools/Paginator'

export default {
    name: 'skuInTransit',
    data() {
        return {
            affected_tables: {
                table_fees: []
            },
            renderPaginator: [], // paginador
            table_fees: {
                config: {
                    id: 'table_fees',
                    pagination: false,
                    indentifier: 'id_details' // campo de la tabla
                  },
                fields: [
                {
                    label: '.',
                    field: 'code',
                    type: 'checkbox'
                },
                {
                    label: 'Order date',
                    field: 'order_date',
                    sortable: true
                },
                {
                    label: 'Estimated delivery',
                    field: 'estimated_delivery',
                    sortable: true
                },
                {
                    label: 'Order NO.',
                    field: 'order_number',
                    sortable: true
                },
                {
                    label: 'Sku NO. / Prod. name',
                    field: 'product_id',
                    sortable: true
                },
                {
                    label: 'Multi CoO',
                    field: '',
                    sortable: true,
                    custom: {
                        id: "cb_multicoo",
                        obj: "combobox",
                        label: "NO",
                        dataStore: {'0': 'NO','1': 'YES'}
                    }
                },
                {
                    label: 'Merchant Entry',
                    field: '',
                    sortable: true,
                    custom: {
                        id: 'cb_countries',
                        obj: 'combobox',
                        dataStore: []
                    }
                }
          ],
          dataStore: []
        }
    };
  },
  components: {
    RangePage,
    DataTable,
    Paginator
  },
  mounted() {
    this.getData()
    // const self = this
  },
  methods: {
    loadDataTable (val) {
console.log(val)
        this.getData()

    },
    getData (reg) {
        // if ( typeOf reg == "undefined") reg = 10
        axios.get("/static/sku-in-transit.json")
        .then((x) => {
          this.table_fees.dataStore = x.data.items
        //   console.log(x.data.countries.all)
          this.table_fees.fields[6].custom.dataStore = x.data.countries.all
        })
    },
    processChanges (table) {
      if (table.id === 'table_fees')
        this.affected_tables.table_fees = table.data

    },
    xuxa (evt, field, row) {
      alert(row)
    },
    modalCertify (){}
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
