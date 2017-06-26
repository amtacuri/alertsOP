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

            <ul class="fcb-paginator">
                <li><div>PAGE:</div></li><li v-for="page in dataPaginator.pagesPaginator">
                    <a v-if="page.activo == false" href="" v-on:click="loadPage(page.pag)">{{page.pag}}</a>
                    <span v-else="page.activo">{{page.pag}}</span>
                </li>
            </ul>
            <div class="ui fcb-wrap-buttons contButton">
                <button class="ui basic purple button">Reset</button>
                <button class="ui purple button" v-on:click="certifyModal">Certify</button>
            </div>
            <div class="ui dimmer modals page" v-bind:class="{ 'active': agreeCertifyModal.show, 'visible': agreeCertifyModal.show, 'transition': agreeCertifyModal.show }">
                <div class="ui small test modal transition visible active" style="margin-top: -198px; display: block !important;">
                    <div class="ui segment ui center aligned segment ">
                        <div class="header fcb_title ui header">
                            <h4> Please certify checked rows before moving on </h4>
                        </div>
                        <div class="ui hidden divider"></div>
                        <div >
                            <p>
                                I certify that the Country of Origin I have entered for the
                                Products(s) selected are true and accurate.     
                                I acknowledge that by selecting “Could not find”,
                                I am canceling that Product from the selected order.
                            </p>
                        </div>
                        <div class="ui hidden divider"></div>
                        <div class="actions ">
                            <div class="ui basic purple button" @click="close()">Stay on page</div>
                            <div class="ui purple button" @click="certifyRows()">Certify</div>
                        </div>
                    </div>
                </div>
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
            agreeCertifyModal: {
                show: false
            },
            imageRowModal: {
                show: false
            },
            dataPaginator: {
                totalRows: 100,
                cantRowsPage: 10,
                labelPage: 0,
                pagesPaginator: [
                {
                    pag: 1,
                    activo: true
                },
                {
                    pag: 2,
                    activo: false
                },
                {
                    pag: 3,
                    activo: false
                },
                {
                    pag: 4,
                    activo: false
                },{
                    pag: 5,
                    activo: false
                },
                {
                    pag: 6,
                    activo: false
                },
                {
                    pag: 7,
                    activo: false
                },
                {
                    pag: 8,
                    activo: false
                },
                {
                    pag: 9,
                    activo: false
                },
                {
                    pag: 10,
                    activo: false
                }
                ]
            }, // paginador
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
            const params = {
                'page': 1,
                'cant_items': 10
            }
            axios.get("/static/sku-in-transit.json")
            .then((x) => {
                this.table_fees.dataStore = x.data.items
                //   console.log(x.data.countries.all)
                this.table_fees.fields[6].custom.dataStore = x.data.countries.all
                this.dataPaginator.totalRows = x.data.total_row;
                this.renderPaginator()
            })
        },
        processChanges (table) {
            if (table.id === 'table_fees')
                this.affected_tables.table_fees = table.data
        },
        certifyModal (){
            this.agreeCertifyModal.show = true
        },
        certifyRows () {
            console.log('Certify Coo')
            console.log(this.affected_tables.table_fees)
            // axios.get("http://customertools.bongous.dev/alerts_functions.php?oper=certified")
            const params = {
                'user_id': '',
                'type': '',
                'items': self.affected_tables.table_fees
            }

            axios.post(self.apiUrl + 'http://customertools.bongous.dev/alerts_functions.php?oper=certified', params)

            // Params: user - id del Usuario logueado
            // type - (MI = Marking Identified, MN = Marking Not Identified)
            // items - Array de items
            //   country     - string
            //   id_details  - int
            //   sku         - string
            //   multi_coo   - Boolean
        },
        close () {
            this.agreeCertifyModal.show = false
            this.imageRowModal.show = false
        },
        renderPaginator () {
            console.log("rendePaginator()")
            this.dataPaginator.labelPage = Math.ceil(this.dataPaginator.totalRows / this.dataPaginator.cantRowsPage)
            console.log('labelPage:', this.dataPaginator.labelPage)
            console.log(parseInt(this.dataPaginator.labelPage))
            for ( var i = 1; i <= parseInt(this.dataPaginator.labelPage); i++ ) {
                console.log('i =', i)
                this.dataPaginator.pagesPaginator.pag(i)
            }
            console.log("paginas:", this.dataPaginator.pagesPaginator)
            // this.dataPaginator.pagesPaginator: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        },
        loadPage () {

        }
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

.fcb-sku-in-transit { border-left: 1px solid black; float: right; width: 795px; }
.fcb-wrap-body { display: block; padding-left: 20px; }

.contButton{
    display: block;
    width: 100%;
    text-align: center;
}
.ui.purple.button{
    background: #4d148c;
    padding: 11px 100px;
}
.ui.basic.purple.button, .ui.basic.purple.buttons .button{
    box-shadow: 0 0 0 1px #4d148c inset!important;
    color: #4d148c !important;
    padding: 10px 100px;
}
.fcb-paginator {
    display: block;
    text-align: center;
    list-style: none;
    clear: both;
    margin: 20px auto;
    width: auto;
    min-height: 40px;
}
.fcb-paginator li {
    display: inline-block;
    margin: 0 5px;
}
.fcb-paginator li a {
    float: left;
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    background: #f1f1f1;
    border-radius: 10px;
    color: #999;
    line-height: 20px;
    font-weight: normal;
}
.fcb-paginator li a:hover {
    background: purple;
    color: white;
    font-weight: normal;
}
.fcb-paginator li span {
    float: left;
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    background: purple;
    border-radius: 10px;
    color: white;
    font-weight: normal;
}
.fcb-paginator li div {
    float: left;
    display: block;
    margin-top: -10px;
    font-weight: normal;
}
.fcb-wrap-buttons {
    display: block;
    clear: both;
}
    
</style>
