<template id="">
    <div class="fcb-grid">
        <table class="ui compact celled definition table">
            <thead class="full-width">
                <tr>
                    <th>

                    </th>
                    <th>
                        <div><a href=""><span>Count Down Clock</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Order date</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Estimated delivery</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Order NO.</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Sku NO. / Prod. name</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Image</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Multi Coo</span></a></div>
                    </th>
                    <th>
                        <div><a href=""><span>Merchant Entry</span></a></div>
                    </th>

                </tr>
            </thead>
            <tbody class="">
                <tr v-for="row in dataGrid">
                    <td class="collapsing">
                        <div class="ui fitted slider checkbox">
                            <input type="checkbox"> <label></label>
                        </div>
                    </td>
                    <td>
                        <div>{{row.co_expired}}</div>
                    </td>
                    <td>
                        <div>{{row.order_date}}</div>
                    </td>
                    <td>
                        <div>{{row.estimated_delivery}}</div>
                    </td>
                    <td>
                        <div>{{row.order_number}}</div>
                    </td>
                    <td>
                        <div>{{row.product_id}}</div>
                    </td>
                    <td>
                        <div>
                            {{row.co_image}}
                        </div>
                    </td>
                    <td>
                        <div>
                            <select>
                                <option value="">YES</option>
                                <option value="">NO</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div>
                            <select>
                                <option value="unknow">Unknow</option>
                            </select>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'grid',
  data() {
    return {
      msg: 'Grid',
      dataGrid: [],
      countries: [],
      favorites: [],
      all: [],
      totFields: ""
    };
  },
  mounted() {
    axios.get("/static/assistance-marking-not-identified.json")
    .then((x) => {
      this.dataGrid = x.data.items;
      console.log(x.data.items);
    //   this.countries = x.data.countries.favorites;
    //   this.all = x.data.countries.all;
    //   this.totFields = x.data.totals
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.fcb-grid {}
.fcb-grid table { width: 100%; }
.fcb-grid table thead tr th a span { text-transform: uppercase; font-size: 12px; color: #57585A; }
.fcb-head-grid { display: block; clear: both; }
.fcb-head-grid div { float: left; margin-right: 10px; }
.fcb-head-grid div a { display: block; }
.fcb-body-grid { display: block; clear: both; }
.fcb-body-grid div { float: left; margin-right: 10px;  }
</style>
