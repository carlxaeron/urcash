<template>
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container>
 <q-page>
       <div class = "row flex flex-center">
           <div class = "col-lg-12 col-md-12 col-sm-12 flex flex-center">
           <span class = "text-h4 text-bold q-my-md">SCAN QR</span>
           </div>
           <div class = "col-lg-12 col-md-12 col-sm-12 flex flex-center" v-if="camera=== true">
     <StreamBarcodeReader style = "max-width:300px;"
    @decode="onDecode"
    @loaded="onLoaded"
></StreamBarcodeReader>
           </div>
           <div class = "col-lg-12 col-md-12 col-sm-12 flex flex-center" v-if="scanned === true">
            <span class = "text-h6 q-my-md text-bold" >Product Code: {{ result }}</span>
           </div>
            <q-separator  v-if="scanned === true"/>
              <div class = "q-my-md col-lg-12 col-md-12 col-sm-12 flex flex-center" v-if ="addDetail === true">
               <q-btn size="20px" color="primary" @click="add_details = true">
                   <i class = "fa fa-plus q-mr-md"></i>
                  <div> Add Details</div>
            </q-btn>

           </div>
               <div class = "col-lg-12 col-md-12 col-sm-12 flex flex-center"  v-if ="addPurchase === true">
        <q-item class = "justify-left" >
         <q-item-section>
          <q-item-label>
             <span class = "text-h4 text-bold text-info col-lg-12 col-md-12" > {{ product_name }}</span>
          </q-item-label>
          <q-item-label >
           <span class = "q-py-none  text-h5 text-bold" > {{ company_name }}</span>
          </q-item-label>
           <q-item-label >
         <span class = "text-h7 " > {{ variant }}</span>
          </q-item-label>
          <q-item-label >
         <span class = "text-h6 text-info text-bold" >Your Price: {{ price }} Php</span>
          </q-item-label>
        </q-item-section>
      </q-item>
               <q-btn size="20px" color="info" @click="add_to_list()">
                   <i class = "fa fa-cart-plus q-mr-md"></i>
                  <div> Add to Purchase</div>
            </q-btn>

           </div>
       </div>
    <q-dialog v-model="add_details" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section align="center">
          <div class="text-h6 text-bold">ADD PRODUCT</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <span class = "text-h6 text-bold">Product Code : {{ result }}</span>

            <q-separator inset />
        </q-card-section>

        <q-card-section class="q-pt-none">
        <p class = "text-bold">Product Name</p>
        <q-input  ref="product_name"  :rules="[val => !!val || 'Required']" v-model="product_name" outlined  bg-color="white">
           <template v-slot:prepend>
        </template>
        </q-input>
        </q-card-section>

          <q-card-section class="q-pt-none">
        <p class = "text-bold">Company Name</p>
        <q-input  ref="company_name"  :rules="[val => !!val || 'Required']" outlined  v-model="company_name"  bg-color="white">
           <template v-slot:prepend>
        </template>
        </q-input>
        </q-card-section>

         <q-card-section class="q-pt-none">
        <p class = "text-bold">Variant (Size, Color, Etc.)</p>
        <q-input  ref="variant"  :rules="[val => !!val || 'Required']" outlined  v-model="variant"  bg-color="white">
           <template v-slot:prepend>
        </template>
        </q-input>
        </q-card-section>
           <q-card-section class="q-pt-none">
        <p class = "text-bold">Your Price</p>
        <q-input  ref="price"  :rules="[val => !!val || 'Required']" outlined  v-model="price"  bg-color="white">
           <template v-slot:prepend>
        </template>
        </q-input>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn size="20px" label="ADD PRODUCT" @click="add_to_store()" color="info" />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-dialog v-model="purchased" :maximized="maximizedToggle"  persistent >
 <div class = " bg-white ">
  <q-card flat>
      <q-card-section>
         <i class = "fas fa-window-close text-primary float-right" @click="purchased=false" style="font-size:18px;"></i>
      </q-card-section>
      <q-card-section>
          <q-card-section>
        <div class="text-h6 text-center text-bold">NEW PURCHASE</div>
      </q-card-section>
        <div class="">Customer Phone #</div>
          <q-input outlined v-model="customer_no" mask="###########"  ref="customer_no" :rules="[val => !!val || 'Required']" />
      </q-card-section>
        <q-card-section class = "q-mb-sm">
        <span class="text-bold float-left">Subtotal:</span><q-space/><span class="text-bold float-right">₱  {{ formatPrice(subtotal) }}</span>
      </q-card-section>
        <q-separator/>
      <q-card-section>
         <q-table
      title="Item List"
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
           <span class = "text-info text-bold"> {{ props.row.product }}</span><br/>
           <span class = ""> {{ props.row.variant }} </span>

          </q-td>
          <q-td key="price" :props="props">
            <div class="text-pre-wrap">{{ props.row.price }}</div>
          </q-td>
           <q-td key="amount" :props="props">
            <div class="text-pre-wrap">{{ formatPrice(props.row.amount) }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
      </q-card-section>
      <center>
      <q-card-actions vertical style = "width:300px">
        <q-btn size="20px" color = "info" class = "q-mb-sm"  @click="purchased=false" >Add New Product</q-btn>
        <q-btn size="20px" color = "secondary" @click="checkout()">CHECKOUT</q-btn>
      </q-card-actions>
      </center>
    </q-card>
        </div>
     </q-dialog>
    </q-page>
  </q-page-container>
</q-layout>
</template>
<script>
import { StreamBarcodeReader } from 'vue-barcode-reader'
export default {
  name: 'Scan',
  components: { StreamBarcodeReader },
  data () {
    return {
      columns: [
        {
          name: 'quantity',
          required: true,
          label: 'QTY',
          align: 'left',
          field: row => row.quantity,
          format: val => `${val}`,
          sortable: true,
          style: 'width: 5px'
        },
        { name: 'product', align: 'left', label: 'Product', field: 'product', sortable: true },
        { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: true, style: 'width: 20px' },
        { name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true, style: 'width: 20px' }
      ],
      products: [
      ],
      customer_no: null,
      purchased: false,
      maximizedToggle: true,
      result: null,
      add_details: false,
      addDetail: false,
      addPurchase: false,
      product_name: null,
      company_name: null,
      id: null,
      variant: null,
      price: null,
      scanned: false,
      product_id: null,
      camera: true,
      myprice: '',
      msg: null,
      subtotal: 0
    }
  },
  methods: {
    checkout () {
      if (this.$refs.customer_no.hasError) {
      } else {
        this.$axios.post('products/checkout', {
          shop_id: this.$q.sessionStorage.getItem('shop_id').toString(),
          customer_phone_number: this.customer_no,
          products: this.products
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.msg = 'TRANSACTION COMPLETE '
          console.log(response.data)
          this.showNotif()
          this.purchased = false
        }
        ).catch(error => {
          console.log(error.response)
        })
      }
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    add_to_list () {
      this.purchased = true
      this.products.push({
        product_id: this.id,
        quantity: 1,
        product: this.product_name,
        variant: this.variant,
        price: this.price,
        amount: this.price
      })
      this.scanned = false
      this.addPurchase = false
      this.get_total()
    },
    get_total () {
      this.subtotal = 0
      for (var i in this.products) {
        this.subtotal += parseInt(this.products[i].amount)
      }
    },
    detect (item) {
      console.log(item)
      const index = this.products.indexOf(item)
      if (item.quantity < 1) {
        this.products.splice(index, 1)
        this.get_total()
      } else {
        item.amount = item.quantity * item.price
        this.get_total()
      }
    },
    showNotif () {
      this.$q.notify({
        message: this.msg,
        color: 'info'
      })
    },
    add_to_store () {
      if (this.$refs.product_name.hasError || this.$refs.company_name.hasError || this.$refs.variant.hasError || this.$refs.price.hasError) {
      } else {
        this.scanned = false
        this.addDetail = false
        this.$axios.post('products/create', {
          shop_id: this.$q.sessionStorage.getItem('shop_id').toString(),
          price: this.price,
          manufacturer_name: this.company_name,
          name: this.product_name,
          variant: this.variant,
          sku: this.result,
          ean: this.result
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.msg = 'You have successfully added a new product! '
          this.showNotif()
          this.add_details = false
          this.camera = true
          console.log(response)
        }
        ).catch(error => {
          console.log(error.response)
        })
      }
    },
    prompt_user () {
      this.$q.dialog({
        title: 'Add price for this product!',
        prompt: {
          model: '',
          isValid: val => val.length > 0,
          type: 'number' // optional,
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.$axios.post('/prices/create', {
          shop_id: this.$q.sessionStorage.getItem('shop_id').toString(),
          product_id: this.product_id,
          price: data
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.msg = 'Price added successfully!'
          this.showNotif()
          console.log(response)
        }
        ).catch(error => {
          console.log(error.response)
        })
        this.camera = true
        this.scanned = false
      }).onCancel(data => {
        this.camera = true
        this.scanned = false
      })
    },
    async onDecode (content) {
      this.scanned = true
      this.result = content
      this.company_name = null
      this.product_name = null
      this.variant = null
      this.price = null
      this.camera = false
      // this.addDetail = true
      // console.log(content)
      this.$axios.post('products/search/ean', {
        shop_id: this.$q.sessionStorage.getItem('shop_id').toString(),
        ean: content
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        if (response.data.results.price_available === true && response.data.results.product_available === true) {
          console.log(response.data)
          this.company_name = response.data.results.product.manufacturer_name
          this.product_name = response.data.results.product.name
          this.variant = response.data.results.product.variant
          this.price = response.data.results.price.price
          this.id = response.data.results.product.id
          this.addPurchase = true
          this.addDetail = false
          this.camera = true
        } else if (response.data.results.price_available === false && response.data.results.product_available === true) {
          this.addDetail = false
          this.addPurchase = false
          this.product_id = response.data.results.product_id
          this.prompt_user()
        }
      }
      ).catch(error => {
        console.log(error.response)
        this.addDetail = true
        this.addPurchase = false
        this.camera = true
      })
    },
    async onLoaded (content) {
      // this.result = content
      // this.addDetail = true
      // console.log(content)
    }
  },
  created () {
  }

}
</script>
