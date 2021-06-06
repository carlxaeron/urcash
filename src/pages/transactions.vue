<template>
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container>
 <q-page>
      <div class = "col-lg-12 col-md-12 col-sm-12 q-mt-md flex flex-center">
           <span class = "text-h4 text-bold q-my-md">Transaction History</span>
           </div>
     <div class="q-pa-md flex flex-center">
    <div class="q-gutter-y-md" style="max-width: 400px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="product" label="Products" />
          <q-tab name="voucher" label="Vouchers" />
          <q-tab name="payments" label="Payments" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="product">
             <q-table
      title="Product Checkout Transaction"
      :data="purchaseTransaction"
      :columns="purchase_columns"
      row-key="cutomer_num"
      binary-state-sort
      flat
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="cutomer_num" :props="props">
               {{ props.row.customer_mobile_number }}
          </q-td>
           <q-td key="amount" :props="props">
            <div class="text-pre-wrap">₱ {{ formatPrice(props.row.subtotal) }}</div>
          </q-td>
           <q-td key="date" :props="props">
            {{ props.row.created_at }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
          </q-tab-panel>

          <q-tab-panel name="voucher">
              <q-table
      title="Voucher Account Transactions"
      :data="voucherTransaction"
      :columns="voucher_columns"
      row-key="reference"
      binary-state-sort
      flat
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="reference" :props="props">
               {{ props.row.ref_number }}
          </q-td>
           <q-td key="tranType" :props="props">
               {{ props.row.transaction_type }}
          </q-td>
           <q-td key="amount" :props="props">
            {{ props.row.amount }}
          </q-td>
           <q-td key="date" :props="props">
            {{ props.row.created_at }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
          </q-tab-panel>

          <q-tab-panel name="payments">
           <q-table
      title="Pay Transactions"
      :data="payTransaction"
      :columns="pay_columns"
      row-key="reference"
      binary-state-sort
      flat
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="reference" :props="props">
               {{ props.row.ref_number }}
          </q-td>
           <q-td key="tranType" :props="props">
               {{ props.row.transaction_type }}
          </q-td>
           <q-td key="amount" :props="props">
            {{ props.row.amount }}
          </q-td>
           <q-td key="date" :props="props">
            {{ props.row.created_at }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</q-page>
  </q-page-container>
</q-layout>
</template>
<script>
export default {
  name: 'transactionPage',
  data () {
    return {
      tab: 'product',
      shop_id: null,
      purchase_columns: [
        { name: 'cutomer_num', align: 'left', label: 'Customer #', field: 'customer_mobile_number', sortable: true },
        { name: 'amount', label: 'Amount', align: 'left', field: 'subtotal', sortable: true },
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: 'created_at',
          sortable: true
        }
      ],
      voucher_columns: [
        { name: 'reference', align: 'left', label: 'Reference #', field: 'ref_number', sortable: true },
        { name: 'tranType', label: 'Transaction Type', align: 'left', field: 'transaction_type', sortable: true },
        { name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true },
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: 'created_at',
          sortable: true
        }

      ],
      pay_columns: [
        { name: 'reference', align: 'left', label: 'Reference #', field: 'ref_number', sortable: true },
        { name: 'tranType', label: 'Transaction Type', align: 'left', field: 'transaction_type', sortable: true },
        { name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true },
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: 'created_at',
          sortable: true
        }

      ],
      voucherTransaction: [],
      purchaseTransaction: [],
      payTransaction: []
    }
  },
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getPurchase (id) {
      this.$axios.get('transactions/shop/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data.results)
        this.purchaseTransaction = response.data.results
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    getVoucher (id) {
      this.$axios.get('voucher/account/' + id + '/transaction',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.voucherTransaction = response.data.results
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    getpay (id) {
      this.$axios.get('pay/transaction/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.payTransaction = response.data.results
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    getUser () {
      this.$axios.post('user', {
        mobile_number: this.$q.localStorage.getItem('mobile').toString()
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        console.log(response.data.results)
        this.getPurchase(response.data.results.shop.id)
        this.getVoucher(response.data.results.voucher_account.id)
        this.getpay(response.data.results.voucher_account.id)
      }
      ).catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.getUser()
  }

}
</script>
