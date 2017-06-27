<template>
    <div class="fcb-marking-assistance">
        <div class="fcb-wrap-body">
            <h2>Marking not Identified</h2>
            <p>
                ___ has received your products and uploaded any images of the markings found. Please review
                the images below and certify the Country of Origin for those products. If products are not certified within 2
                business days, they will be canceled from the associated order.
            </p>
            <div class="">
                <data-table :config="table_marking_identified.config" :header="table_marking_identified.fields" :data="table_marking_identified.dataStore" v-on:changes="processChanges">
                </data-table>
            </div>
        </div>
    </div>
</template>
<script>
// import vueSlider from 'vue-slider-component'
import axios from 'axios';
import DataTable from '@/components/tools/DataTable'
// import Paginator from '@/components/tools/Paginator'

export default {
    name: 'hello',
    data() {
        return {
            table_marking_identified: {
                config: {
                    id: 'table_marking_identified',
                    pagination: false,
                    indentifier: 'id_details' // campo de la tabla
                },
                fields: [{
                    label: '',
                    field: 'id_details',
                    type: 'checkbox'
                }, {
                    label: 'hours',
                    field: 'co_expired',
                    sortable: true
                }, {
                    label: 'Order date',
                    field: 'order_date',
                    sortable: true
                }, {
                    label: 'Estimated delivery',
                    field: 'estimated_delivery',
                    sortable: true
                }, {
                    label: 'Order NO.',
                    field: 'order_number',
                    sortable: true
                }, {
                    label: 'Sku NO. / Prod. name',
                    field: 'product_id',
                    sortable: true
                }, {
                    label: 'Image',
                    field: 'co_image',
                    sortable: false,
                    custom: {
                        id: 'img_co',
                        obj: "icon",
                        iconUrl: 'co_image'
                    }
                }, {
                    label: 'Multi CoO',
                    field: '',
                    sortable: true,
                    custom: {
                        id: "cb_multicoo",
                        obj: "combobox",
                        label: "NO",
                        dataStore: {
                            '0': 'NO',
                            '1': 'YES'
                        }
                    }
                }, {
                    label: 'Merchant Entry',
                    field: '',
                    sortable: true,
                    custom: {
                        id: 'cb_countries',
                        obj: 'combobox',
                        dataStore: []
                    }
                }],
                dataStore: []
            }
        };
    },
    components: {
        // vueSlider,
        DataTable,
        // Paginator
    },
    mounted() {
        this.getData()
        // const self = this
    },
    methods: {
        loadDataTable (val) {
            // console.log(val)
            this.getData()
        },
        getData (reg) {
            // if ( typeOf reg == "undefined") reg = 10
            const params = {
                'page': 1,
                'cant_items': 10
            }
            axios.get("/static/assistance-marking-identified.json")
            .then((x) => {
                this.table_marking_identified.dataStore = x.data.items
                //   console.log(x.data.countries.all)
                this.table_marking_identified.fields[8].custom.dataStore = x.data.countries.all
                this.dataPaginator.totalRows = x.data.total_row;
                this.renderPaginator()
            })
        },
        processChanges() {}
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
p {
    font-size: 12px;
    font-family: Arial;
}

h1,
h2 {
    font-weight: normal;
}

h2 {
    color: #4d148c;
    font-size: 16px;
    font-weight: bold;
}

p {
    color: #57585A;
}

.fcb-marking-assistance {
    border-left: 1px solid black;
    float: right;
    width: 805px;
}

.fcb-wrap-body {
    display: block;
    padding-left: 20px;
}
</style>
