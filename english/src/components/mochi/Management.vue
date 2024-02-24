<template>
  <div>
    <DataTable
      :value="products"
      editMode="row"
      @row-edit-save="onCellEditComplete"
      :pt="{
        table: { style: 'min-width: 50rem' }
      }"
      v-model:expandedRows="expandedRows"
      dataKey="id"
    >
      <template #header>
        <div class="flex flex-wrap justify-content-end gap-2">
          <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
          <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
        </div>
      </template>
      <Column expander style="width: 5rem" #rowtogglericon="{ ...rest }" />
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
      <template #expansion="slotProps">
        {{ console.log('slotProps expansion', slotProps) }}
        <div class="ml-10">
          <DataTable :value="slotProps.data.orders">
            <Column field="status" header="Status" sortable>
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.status.toLowerCase()"
                  :severity="getOrderSeverity(slotProps.data)"
                />
              </template>
            </Column>
            <Column field="customer" header="Customer" sortable></Column>
            <Column field="date" header="Date" sortable></Column>
            <Column field="amount" header="Amount" sortable>
              <template #body="slotProps">
                {{ console.log('slotProps Column', slotProps) }}
                {{ formatCurrency(slotProps.data.amount) }}
              </template>
            </Column>
            <Column headerStyle="width:4rem">
              <template #body>
                <Button icon="pi pi-search" />
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { ProductService } from '@/service/ProductService'

export default {
  data() {
    return {
      products: null,
      expandedRows: {},
      columns: [
        { field: 'name', header: 'Name' },
        { field: 'type', header: 'Type' },
        { field: 'meaningVN', header: 'Meaning' },
        { field: 'frequency', header: 'Frequency' },
        { field: 'example', header: 'Example' }
      ]
    }
  },
  async mounted() {
    const data = await ProductService.getProductsWithOrdersSmall()
    this.products = data
    console.log(data)
  },
  methods: {
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
    getOrderSeverity(order) {
      switch (order.status) {
        case 'DELIVERED':
          return 'success'

        case 'CANCELLED':
          return 'danger'

        case 'PENDING':
          return 'warning'

        case 'RETURNED':
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
    }
  },
  computed: {},
  watch: {
    expandedRows(olds, news) {
      console.log('watch')
      console.log(olds)
      console.log(news)
    }
  }
}
</script>
