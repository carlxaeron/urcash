<template>
  <q-page padding>
    <div class="fit column wrap justify-center items-center content-center">
      <div>
        <p class="title">PAY</p>
      </div>
      <div class="q-pt-none">
        <p style="font-size:24px;">Scan the merchant's QR to pay.</p>
      </div>
      <div class="fit justify-center row inline q-mb-xl" v-if ="scan_result === false">
          <StreamBarcodeReader style = "max-width:300px;" @decode="onDecode"></StreamBarcodeReader>
      </div>
    <q-card flat class="my-card">
      <q-separator />
       <q-card-section>
        <div class="row">
          <div class = "col-md-2">
             <q-img
      alt=""
      src="../assets/money.png"
      style = "width:50px;"
    />
          </div>
          <div   class = "col-md-10 q-ml-md text-center "><span class = "text-h6">VOUCHER BALANCE</span><br/>
          <span class= "text-h6 text-bold">₱ {{ formatPrice(balance) }}</span>

          </div>
        </div>
      </q-card-section>
        <q-separator />
    </q-card>
    </div>
     <q-dialog v-model="scan_result" persistent >
      <q-card class="my-card">
        <q-card-section class="q-pt-none">
           <div class="items-center">
            <div class="col text-h6 text-bold">
              <center>
              YOU'RE PAYING
              </center>
            </div>
          </div>
        </q-card-section>
      <q-card-section class="q-pt-none">
          <div class="text-subtitle1 text-bold">
            <center>
           {{ shop_name }}
           </center>
          </div>
          <div class="text-caption text-grey">
            <center>
           <q-icon name="place" /> {{ street }} {{ brgy }} {{ city }} {{ province }}
            </center>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn  color="negative" label="Cancel" @click ="scan_result = false" />
          <q-btn  color="info" label = "Proceed" @click ="prompt_amount = true" />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-dialog v-model="prompt_amount" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter the amount to pay</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
          v-model="amount"
          type="number"
          input-class="text-h6"
          autofocus
          ref="amount"
          :rules="[val => !!val || 'Required']"
        >
         <template v-slot:prepend>
          <b>₱</b>
        </template>
         </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color = "negative" label="Cancel" @click ="prompt_amount = false; scan_result =false;" />
          <q-btn  label="Send Payment" color = "info" @click ="pay()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
           <q-dialog
      v-model="pay_success"
      persistent
      :maximized="maximizedToggle"
    >
     <q-card>
        <q-card-section>
         <center>
          <q-img
          class = "q-mt-xl"
      alt=""
      src="../assets/pay_success.png"
      style="width:100%; max-width: 400px;"
    />
     <q-btn size="lg" color = "primary" label="View Voucher Balance" to="/" />
    </center>
        </q-card-section>
      </q-card>
    </q-dialog>
           <q-dialog
      v-model="pay_error"
      persistent
      :maximized="maximizedToggle"
    >
     <q-card>
        <q-card-section>
         <center>
          <q-img
          class = "q-mt-xl"
      alt=""
      src="../assets/pay_error.png"
      style="width:100%; max-width: 400px;"
    />
     <q-btn color = "negative" size ="lg" label="Purchase Voucher" to="/voucher" />

    </center>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader'
export default {
  name: 'Pay',
  components: { StreamBarcodeReader },
  data () {
    return {
      pay_success: false,
      pay_error: false,
      maximizedToggle: true,
      balance: this.$q.sessionStorage.getItem('balance'),
      shop_name: null,
      street: null,
      brgy: null,
      city: null,
      province: null,
      scan_result: false,
      prompt_amount: false,
      amount: null,
      shop_id: null
    }
  },
  methods: {
    pay () {
      this.$refs.amount.validate()
      if (this.$refs.amount.hasError) {
      } else {
        this.$axios.post('pay', {
          payor_shop_id: this.$q.sessionStorage.getItem('shop_id'),
          payee_shop_id: this.shop_id,
          amount: this.amount
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          console.log(response.data)
          this.pay_success = true
        }
        ).catch(error => {
          console.log(error.response)
          this.pay_error = true
        })
      }
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    onDecode (content) {
      this.$axios.get('find/shops/' + content,
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.shop_name = response.data.results.shop_details.shop.reg_bus_name
        this.street = response.data.results.shop_details.address.street
        this.brgy = response.data.results.shop_details.address.barangay
        this.city = response.data.results.shop_details.address.city
        this.province = response.data.results.shop_details.address.province
        this.scan_result = true
        this.shop_id = response.data.results.shop_details.shop.id
      }
      ).catch(error => {
        console.log(error.response)
      })
    }

  }
}
</script>

<style>
.title{
    font-size: 347%;
    font-weight: bold;
  }
 .img_text{
    font-size: 20px;
    margin-top: 12px;
  }
  .div_img{
    margin: 13px;
  }
  .img_hold{
    margin-top: 18px;
    margin-right: 26px;
  }
  .div_but_2{
    width: 58%;
  }
  .title_2{
    font-size: 17px;
  }
  .cash_less{
    margin-top: -25px;
    font-size: 20px;
    font-weight: bold;
  }
  .image_margin_2{
    margin-left: 50px;
  }
</style>
