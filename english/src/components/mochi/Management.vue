<template>
  <ThemeSwitcher />
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script>
import { ProductService } from '@/service/ProductService'

export default {
  name: 'ManagermentBoard',
  data() {
    return {
      products: null
    }
  },
  mounted() {
    ProductService.getProductsMini().then((data) => (this.products = data))
  }
}
</script>
