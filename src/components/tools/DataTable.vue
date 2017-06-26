<template>
  <div>
    <table class="ui sortable celled selectable table">
      <thead>
        <tr v-if="typeof config.title !== 'undefined'">
          <th v-bind:colspan="colspan">
            <div class="fcb_title" v-bind:class="{lheight: config.pagination}">{{ config.title }}</div>
            <div v-if="config.pagination" class="fcb_content_paginator">
              <button class="ui left labeled icon button disabled">
                <i class="left arrow icon"></i>
                Previous
              </button>
              <span> Page  </span>
              <button class="ui right labeled icon button">
                <i class="right arrow icon"></i>
                Next
              </button>
            </div>
          </th>
        </tr>
        <tr>
          <template v-for="field in header">
            <template v-if="!field.hidden">
              <template v-if="field.sortable">
                <th v-on:click="sortBy(field.field)" class="ui sorted descending">
                  {{ field.label }}
                </th>
              </template>
              <template v-else>
                <th>
                  {{ field.label }}
                </th>
              </template>
            </template>
            <template v-else>
              <th style="display: none !important;">
                {{ field.label }}
              </th>
            </template>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr class="tr_loader" v-if="Object.keys(dataTab).length === 0">
          <td v-bind:colspan="colspan">
            <div class="ui segment" style="margin: 20px;">
              <div class="ui active inverted dimmer">
                <div class="ui text loader">Loading</div>
              </div>
            </div>
          </td>
        </tr>

        <tr v-for="row in dataTab" >
          <template v-for="field in header">
            <template v-if="typeof field.hidden === 'undefined'"> <!-- START - Visibles -->
              <template v-if="field.type">
                <template v-if="field.type === 'checkbox'">
                  <td>
                    <div class="ui checkbox">
                      <template v-if="parseInt(row[field.field])">
                        <input type="checkbox" checked name="public" id="" v-on:change="cell($event, '', row, field.field, field.type)"><label></label>
                      </template>
                      <template v-else>
                        <input type="checkbox" name="public" id="" v-on:change="cell($event, '', row, field.field, field.type)"><label></label>
                      </template>
                    </div>
                  </td>
                </template>
              </template>
              <template v-else-if="field.custom">
                <template v-if="(typeof field.custom.iconUrl !== 'undefined') && (field.custom.iconUrl !== '') && (typeof field.custom.obj === 'undefined') && (typeof field.custom.action !== 'undefined') "> <!-- Solo icon -->
                  <td>
                    <template v-if="Array.isArray(field.custom.iconUrl)">
                      <div v-for="icon in field.custom.iconUrl" class="dt_icon">
                        <img v-on:click.prevent="field.custom.action($event, row, icon[1])" v-bind:src="icon[0]" alt="" title="" />
                      </div> &nbsp;&nbsp;
                    </template>
                    <template v-else>
                      <div class="dt_icon"><img v-on:click.prevent="field.custom.action($event, row[field.field], row)" v-bind:src="field.custom.iconUrl" alt="" title="" /></div>
                    </template>
                  </td>
                </template>
                <template v-else-if="(typeof field.custom.obj !== 'undefined') && (field.custom.obj === 'input') && (typeof field.custom.iconUrl === 'undefined')"> <!-- Solo obj editable -->
                  <td class="dt_td">
                    <div class="dt_input"></div><div class="dt_label" v-on:dblclick="cell($event, field.custom, row, field.field, '')" v-on:click="validEntry()">{{ row[field.field] }}</div><div class="dt_icon"></div>
                  </td>
                </template>
                <template v-else-if="(typeof field.custom.obj !== 'undefined') && (field.custom.obj === 'input') && (typeof field.custom.iconUrl !== 'undefined') && (typeof field.custom.action !== 'undefined')"> <!-- Editable & icon -->
                  <td class="dt_td">
                    <div class="dt_input"></div><div class="dt_label" v-on:dblclick="cell($event, field.custom, row, field.field, '')" v-on:click="validEntry()">{{ row[field.field] }}</div><div class="dt_icon"><img v-on:click.prevent="field.custom.action($event, row[field.field], row)" v-bind:src="field.custom.iconUrl" alt="" title="" /></div>
                  </td>
                </template>
                <template v-else-if="(typeof field.custom.obj !== 'undefined') && (field.custom.obj === 'combobox') && (typeof field.custom.iconUrl === 'undefined') && (typeof field.custom.action === 'undefined')"> <!-- Combobox -->
                  <td class="dt_td">
                    <div class="dt_combobox"></div><div class="dt_label" v-on:dblclick="cell($event, field.custom, row, field.field, '')"> {{ (field.custom.label) ? field.custom.label : "Not Set"}}
                    </div>
                  </td>
                </template>
                
              </template>
              <template v-else>
                <td>
                  {{ row[field.field]  }}
                </td>
              </template>
            </template> <!-- END - Visibles -->
            <template v-else> <!-- START - No visibles -->
              <td style="display: none !important;">
                {{ row[field.field]}}
              </td>
            </template> <!-- END - No visibles -->
          </template>
        </tr>
      </tbody>

      <tfoot v-if="config.pagination">
        <tr>
          <th v-bind:colspan="colspan">
            <div class="ui right floated pagination menu">
              <a class="icon item">
                <i class="left chevron icon"></i>
              </a>
              <a class="item">1</a>
              <a class="icon item">
                <i class="right chevron icon"></i>
              </a>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>

    <template v-for="(combobox, $index) in header" v-if="combobox.custom && combobox.custom.obj && (combobox.custom.obj === 'combobox')">
      <div v-bind:id="'content_' + combobox.custom.id" style="display: none;">
        <select v-bind:id="combobox.custom.id" class="ui dropdown">
            <template  v-for="(value, key) in combobox.custom.dataStore">
                <!-- <option v-for="option in combobox.custom.dataStore" v-bind:value="option[0]">{{ option[1] }}</option> -->
                <option v-bind:value="key">{{ value }}</option>
            </template>
        </select>
      </div>
    </template>

  </div>
</template>

<script>
/* eslint-disable */

/*
if(value.hasOwnProperty('label')){
  console.log(value)
  return false
}
*/

import _ from 'lodash'

export default {
  name: 'data-table',
  props: {
    config: {
      type: Object,
      required: true,
      default: function () {
        return { message: 'Config required' }
      }
    },
    header: {
      type: Array,
      required: true,
      default: function () {
        return { message: 'Headers required' }
      }
    },
    data: {
      type: Array,
      required: true,
      default: function () {
        return { message: 'Data required' }
      }
    },
    changes: {
      type: Function
    }
  },
  data () {
    return {
      colspan: this.getColSpan(),
      reverse: false,
      sortKey: '',
      dataTab: [],
      table: {
        id: this.config.id,
        data: []
      }
    }
  },
  mounted () {
  },
  methods: {
    sortBy(sortKey) {
      if (this.sortKey === '') {
        this.dataTab = _.sortBy(this.dataTab, [sortKey])
      } else if (this.sortKey === sortKey) {
        this.dataTab = _.sortBy(this.dataTab, [sortKey]).reverse()
        this.sortKey = false
        return
      } else {
        this.dataTab = this.data
        this.sortKey = ''
        return
      }
    },

    getColSpan () {
      var x = 0
      for (var key in this.header)
      {
        if (!this.header[key].hidden) x++
      }
      return x
    },

    updateRow (newRow) {
      var identifier = newRow[this.config.indentifier]
      var upd = false
      var i = 0
      for (i; i < (this.table.data.length); i++) {
        if (identifier == this.table.data[i][this.config.indentifier]) {
          this.table.data.splice(i, 1, newRow)
          upd = true
          break
        }
      }
      if (!upd) {
        this.table.data.push(newRow)
      }
      // this.$store.commit('SET_DATA_SAVE', this.table)
      // this.$store.commit('RESET_NOTIFIER', this.table.data.length)
      this.$emit('changes', this.table)
      return upd
    },

    validEntry () {
      var valid = true
      if (document.getElementById('dt_edit')) {
        document.getElementById('dt_edit').focus()
        valid = false
      }
      return valid
    },

    cell (e, custom, row, field, type) {
      if (!this.validEntry()) return false

      let newRow  = row

      if (type === 'checkbox') {
        newRow[field] = e.target.checked
        this.updateRow(newRow)
        return false
      }

      var elem = e.target
      let preText = elem.innerText
      let labelWidth = elem.offsetWidth
      let self = this

      switch (custom.obj) {
        case 'input':
          let input = '<input type="text" value="'+preText+'" id="dt_edit" style="outline: none !important; width: 100%; border-style: dashed; border-width: thin; border-color: #800080; height: 26px; padding: 4px;">'

          elem.style.display = 'none'
          elem.previousSibling.innerHTML = input
          elem.previousSibling.style.display = 'inline-flex'
          elem.previousSibling.style.width = (labelWidth + 10) + 'px'
          let dt_edit = document.getElementById('dt_edit')
          dt_edit.focus()

          elem.nextSibling.style.display = 'none'

          dt_edit.addEventListener('keydown', function (ev) {
            var key = ev.which || ev.charCode || ev.keyCode
            if (key === 13 || key === 9) {
              if (preText !== ev.target.value && ev.target.value !== '') {
                newRow[field] = this.value
                self.updateRow(newRow)
              }
              elem.previousSibling.innerHTML = ''
              elem.style.display = 'inline-flex'
              elem.previousSibling.style.display = 'none'
              elem.nextSibling.style.display = '-webkit-inline-box'
              dt_edit.removeEventListener('keydown', ev.target)
            }
          })
          break
        case 'combobox':
          elem.previousSibling.style.display = 'inline-flex'
          elem.previousSibling.style.width = (labelWidth + 20) + 'px'
          elem.previousSibling.innerHTML = document.getElementById('content_' + custom.id).innerHTML
          elem.style.display = 'none'

          var combo = document.getElementById(custom.id)
          custom.dataStore.forEach(function(element, index, array) {
            if (preText === combo.options[index].value) {
              combo.selectedIndex = index
            }
          })

          document.getElementById(custom.id).addEventListener('change', function (ev) {
            if (preText !== ev.target.value && ev.target.value !== '') {
              newRow[field] = ev.target.value
              self.updateRow(newRow)
            }
            elem.style.display = 'inline-flex'
            elem.previousSibling.innerHTML = ''
            elem.previousSibling.style.display = 'none'
            document.getElementById(custom.id).removeEventListener('change', ev.target)
          })
          break
        default:
          console.log('other case')
      }
    }
  },
  watch: {
    data(n, o) {
      this.dataTab = n
    }
  },
  filter: {
    upperC: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ui.segment{
  box-shadow: none;
  border: none;
}
.ui.selectable.table tbody tr.tr_loader:hover, .ui.table tbody tr.tr_loader td.selectable:hover{
  background: none !important;
}
th.fcb_title{
  color: rgb(112, 48, 160) !important;
}

.ui.table thead th {
    padding: .9em .7em;
}

.dt_td:hover .dt_label {
  display: inline-flex;
}

.dt_td:hover .dt_label {
  border-color: #800080;
  background: #FFF;
}

.dt_label {
  padding: 4px 5px;
  display: -webkit-inline-box;
  border-style: dotted;
  border-width: thin;
  border-color: silver;
  vertical-align: middle;
  height: 30px;
}

.dt_input {
  padding: 0px 5px;
  border: none;
  vertical-align: middle;
  display: none;
}

.dt_input input[type=text]:active
{
  border: 1px solid red !important;
}

.dt_combobox {
  padding: 0px 5px;
  border: none;
  vertical-align: middle;
  display: none;
}

.dt_combobox select:focus{

}

.dt_icon {
  display: -webkit-inline-box;
}
.dt_icon img {
  vertical-align: middle;
  cursor: pointer;
  width: 27px !important;
  margin-left: 3px;
}

/** color checkbox ui **/
.ui.toggle.checkbox input:checked~.box:before, .ui.toggle.checkbox input:checked~label:before{
  background-color: #7030A0 !important;
}

/** Header Table **/
.fcb_title {
  float: left;
}

.lheight {
  line-height: 34px;
}

.fcb_content_paginator {
  float: right;
}

</style>
