<template>
  <div class="q-pa-md">
    <q-table
      title="Ambot"
      :data="products"
      :columns="columns"
      row-key="product"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
            <q-popup-edit v-model="props.row.quantity" title="Update quantity" buttons>
               <q-input v-model="props.row.quantity" dense autofocus type="number" @change="detect(props.row)"/>
            </q-popup-edit>
          </q-td>
          <q-td key="product" :props="props">
           <span class = "text-info text-bold"> {{ props.row.product }} </span><br/>
           <span class = ""> {{ props.row.variant }} </span>

          </q-td>
          <q-td key="price" :props="props">
            <div class="text-pre-wrap">{{ props.row.price }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      min: 1,
      columns: [
        {
          name: 'quantity',
          required: true,
          label: 'QTY',
          align: 'left',
          field: row => row.quantity,
          format: val => `${val}`,
          sortable: true,
          style: 'width: 10px'
        },
        { name: 'product', align: 'left', label: 'Product', field: 'product', sortable: true },
        { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: true, style: 'width: 10px' }
      ],
      products: [
        {
          id: 1,
          quantity: 100,
          product: 'Devtools extension',
          variant: 'dsds',
          price: 6.0
        },
        {
          id: 2,
          quantity: 100,
          product: 'Devtools extension',
          variant: 'dsds',
          price: 9.0
        },
        {
          id: 3,
          quantity: 100,
          product: 'Devtools extension',
          variant: 'dsds',
          price: 16.0
        },
        {
          id: 4,
          quantity: 100,
          product: 'Devtools extension',
          variant: 'dsds',
          price: 3.7
        },
        {
          id: 5,
          quantity: 100,
          product: 'Devtools extension',
          variant: 'dsds',
          price: 16.0
        }
      ]
    }
  },
  methods: {
    detect (item) {
      const index = this.data.indexOf(item)
      console.log(item.quantity)
      if (item.quantity < 1) {
        this.data.splice(index, 1)
      }
    }
  },
  created () {
    this.products.push({
      id: 6,
      quantity: 100,
      product: 'Alvin',
      variant: 'Banggo',
      price: 16.0
    })
  }
}
</script>
