<template>
  <div>
    <pop-up-add-new-record
      v-if="visiblePopUpAddNewRecord"
      :visiblePopUpAddNewRecord="visiblePopUpAddNewRecord"
      :closePopupCB="() => (visiblePopUpAddNewRecord = false)"
      @event-add-record="handleAddNewRecord"
    ></pop-up-add-new-record>
    <DataTable
      :value="products"
      :pt="{
        table: { style: 'min-width: 80rem' }
      }"
      v-model:expandedRows="expandedRows"
      dataKey="id"
    >
      <template #header>
        <div class="flex flex-wrap justify-between gap-2">
          <div class="flex flex-wrap">
            <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />

            <div class="flex items-center gap-2">
              <label for="toggleModeLearning">Learning mode</label>
              <InputSwitch
                inputId="toggleModeLearning"
                v-model="toggleModeLearning"
                @change="toggleModeLearning"
              />
            </div>
          </div>

          <Button icon="pi pi-plus" rounded outlined @click="handOpenPop" />
        </div>
      </template>
      <Column expander style="width: 5rem" />

      <Column header="Image" #body="slotProps">
        <img :src="slotProps.data.image" :alt="slotProps.data.name" class="shadow-lg" width="64" />
      </Column>

      <Column field="word" header="Word" #body="slotProps" sortable>
        <hidden-template
          @event-update-show="changeDataHiddenTemplate(slotProps)"
          :data="slotProps.data.word"
          :show="!toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]"
        />
      </Column>

      <Column field="type" header="Type" #body="slotProps">
        <hidden-template
          @event-update-show="changeDataHiddenTemplate(slotProps)"
          :data="slotProps.data.type"
          :show="!toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]"
        >
          <Tag
            :value="slotProps.data.type.toLowerCase()"
            :severity="getOrderSeverity(slotProps.data.type.toLowerCase())"
          />
        </hidden-template>
      </Column>

      <Column field="meaningVN" header="Meaning" #body="slotProps" sortable>
        <hidden-template
          @event-update-show="changeDataHiddenTemplate(slotProps)"
          :data="slotProps.data.meaningVN"
          :show="!toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]"
        />
      </Column>

      <Column field="example" header="Example" #body="slotProps">
        <hidden-template
          @event-update-show="changeDataHiddenTemplate(slotProps)"
          :data="slotProps.data.example"
          :show="!toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]"
        />
      </Column>

      <Column field="frequency" header="Frequency"> </Column>

      <Column header="Remove">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            @click="confirm1(slotProps)"
          />
        </template>
      </Column>

      <template #expansion="slotProps">
        {{ console.log('slotProps expansion', slotProps) }}
        <div class="ml-10 p-3">
          <DataTable :value="slotProps.data.otherForms">
            <Column field="type" header="Type" sortable #body="slotProps">
              <Tag
                :value="slotProps.data.type.toLowerCase()"
                :severity="getOrderSeverity(slotProps.data.type.toLowerCase())"
              />
            </Column>
            <Column field="word" header="Word" sortable #body="slotProps">
              <hidden-template
                @event-update-show="changeDataHiddenTemplate(slotProps)"
                :data="slotProps.data.word"
                :show="
                  !toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]
                "
              />
            </Column>
            <Column field="meaningVN" header="Meaning" sortable #body="slotProps">
              <hidden-template
                @event-update-show="changeDataHiddenTemplate(slotProps)"
                :data="slotProps.data.meaningVN"
                :show="
                  !toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]
                "
              />
            </Column>
            <Column field="example" header="Example" sortable #body="slotProps">
              <hidden-template
                @event-update-show="changeDataHiddenTemplate(slotProps)"
                :data="slotProps.data.example"
                :show="
                  !toggleModeLearning || slotProps.data[`${slotProps.index} - ${slotProps.field}`]
                "
              />
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { getVocabolaryByAccount } from '@/service/ProductService'
import HiddenTemplate from '@/components/mochi/HiddenTemplate.vue'
import PopUpAddNewRecord from '@/components/mochi/PopUpAddNewRecord.vue'

export default {
  data() {
    return {
      products: null,
      toggleModeLearning: true,
      visiblePopUpAddNewRecord: false,
      expandedRows: {}
    }
  },
  async mounted() {
    this.products = getVocabolaryByAccount
  },
  methods: {
    handOpenPop() {
      this.visiblePopUpAddNewRecord = true
    },
    onRowEditSave(event) {
      let { newData, index } = event

      this.products[index] = newData
    },
    changeDataHiddenTemplate(slotProps) {
      slotProps.data[`${slotProps.index} - ${slotProps.field}`] =
        !slotProps.data[`${slotProps.index} - ${slotProps.field}`]
    },
    onRowExpand(event) {
      this.$toast.add({
        severity: 'info',
        summary: 'Product Expanded',
        detail: event.data.name,
        life: 3000
      })
    },
    onRowCollapse(event) {
      this.$toast.add({
        severity: 'success',
        summary: 'Product Collapsed',
        detail: event.data.name,
        life: 3000
      })
    },
    expandAll() {
      this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {})
    },
    collapseAll() {
      this.expandedRows = {}
    },
    formatCurrency(value) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    getSeverity(product) {
      switch (product.inventoryStatus) {
        case 'INSTOCK':
          return 'success'

        case 'LOWSTOCK':
          return 'warning'

        case 'OUTOFSTOCK':
          return 'danger'

        default:
          return null
      }
    },
    getOrderSeverity(status) {
      switch (status) {
        case 'noun':
          return 'primary'

        case 'verb':
          return 'warning'

        case 'adjective':
          return 'constract'

        case 'adverb':
          return 'info'

        default:
          return null
      }
    },
    hanleClickOnEachRow(agr) {
      console.log(agr)
      const { id } = agr.data || {}
      const isRowExpand = Object.hasOwn(this.expandedRows, `${id}`)
      if (isRowExpand) {
        // delete this.expandedRows[`${id}`] doesn't work
        const { [id]: idAlias, ...rest } = this.expandedRows
        this.expandedRows = {
          ...rest
        }
      } else {
        // this.expandedRows[`${id}`] = true doesn't work
        this.expandedRows = {
          ...this.expandedRows,
          [id]: true
        }
      }
      // this.expandedRows = {
      //   1000: true
      // }
      console.log(this.expandedRows)
    },
    handleCellClick(event, data) {
      console.log('Row clicked:', event)
      console.log('Row clicked data:', data)
    },
    removeRecordByIndex(index) {
      this.products.splice(index, 1)
    },
    handleAddNewRecord(data) {
      console.log('handleAddNewRecord', data)
      // const obj = JSON.parse(data)
      this.products.unshift(data)
    },
    confirm1(slotProps) {
      this.$confirm.require({
        message: `Are you sure you want to remove word "${slotProps.data.word.toUpperCase()}" ?`,
        header: 'Confirmation',
        accept: () => {
          console.log(slotProps)
          const { index } = slotProps || {}
          this.removeRecordByIndex(index)
          this.$toast.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'You have removed successful',
            life: 3000
          })
        },
        reject: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Rejected',
            detail: 'NoThing Change You have rejected remove',
            life: 3000
          })
        }
      })
    }
  },
  computed: {},
  components: {
    HiddenTemplate,
    PopUpAddNewRecord
  }
}
</script>
