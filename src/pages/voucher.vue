<template>
  <q-page padding class="myfont">
    <div class="fit column wrap justify-center items-center content-center" v-if ="no_pending === true">
      <div>
        <p class="title">BUY VOUCHER</p>
      </div>
      <div class="fit column wrap content-center">
        <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="grey"
            label="‎₱ 100"
             v-if="btn1===false"
             @click ="btn_click(1)"
          />
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="secondary"
            label="‎₱ 100"
            v-if="btn1===true"
          />
        </div>
        <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="secondary"
            label="‎₱ 500"
              v-if="btn2===true"
          />
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="grey"
            label="‎₱ 500"
             @click ="btn_click(2)"
               v-if="btn2==false"
          />
        </div>
         <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="secondary"
            label="‎₱ 1,000"
              v-if="btn3===true"
          />
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="grey"
            label="‎₱ 1,000"
              @click ="btn_click(3)"
              v-if="btn3===false"
          />
        </div>
      </div>
        <div class="fit row inline wrap justify-center items-center content-center vouch">
          <p class="sub_total"># of Vouchers: </p>
          <q-input  outlined ref="voucher_qty" :rules="[val => !!val || 'Required']" v-model ="voucher_qty" @input="sub_total()" type = "number" />
        </div>
        <q-separator />
        <div class="fit">
          <p class="sub q-ml-md">Sub Total: <span class= "float-right q-mr-lg" v-if ="calculated===true">₱ {{ formatPrice(stotal) }}</span></p>
          <p class="fee q-ml-md">Fee: <span class= "float-right q-mr-lg"  v-if ="calculated===true">₱ {{ formatPrice(fee) }}</span></p>
        </div>
        <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="info"
            label="CHECKOUT"
            @click ="check_out()"
          />
        </div>
      </div>
       <q-dialog
      v-model="reciept"
      persistent
      :maximized="maximizedToggle"
    >
      <div class = " bg-white ">
  <q-card flat >
      <q-card-section>
        <div class="text-center "> <p class="title text-bold ">PAYMENT</p>
         <p class="via_pay">VIA {{ title }}</p>
         <q-separator/>
         </div>
      </q-card-section>
        <q-card-section class = "q-py-none">
        <div class="fit">
        <p class="sub_tot">Subtotal:</p>
      </div>
      <div class="fit">
        <p class="cash_2">₱ {{ formatPrice(total) }}</p>
      </div>
      </q-card-section>
        <q-card-section class = "q-py-none">
       <div class="fit">
        <p class="instructions">Payment Instructions:</p>
      </div>
      <div class="fit">
        <p class="ins_dif"> {{ payment_instruction }}.</p>
      </div>
      </q-card-section>
       <q-card-section class="card_sec">
          <p class="desc" v-if="pm_id === 1">BANK NAME:</p>
          <p class="desc_bank"  v-if="pm_id === 1"> {{ bank_name }}</p>
          <p  class="desc">ACCOUNT NAME:</p>
          <p class="desc_bank">{{ account_name }}</p>
          <p  class="desc">ACCOUNT NUMBER:</p>
          <p class="desc_bank">{{ account_number }}</p>
        </q-card-section>
        <q-card-section class = "q-py-none">
       <p class="veri_ins">Verification Instructions:</p>
        <p class="veri">{{ verification_instruction }}</p>
      </q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md " enctype="multipart/form-data">
      <q-card-section class= "q-px-xl" >
           <q-file outlined v-model="proof"  name="poster_file" label="Upload an image" accept="image/*" ref="proof" :rules="[val => !!val || 'Required']" >
        <template v-slot:prepend>
          <q-icon name="camera" />
        </template>
      </q-file>
      </q-card-section>
      <center>
      <q-card-actions vertical style = "width:300px">
        <q-btn size="20px" type="submit" color = "info" class = "q-mb-sm" icon="cloud_upload" label="UPLOAD" />
        <q-btn size="20px" color = "secondary" class = "q-mb-sm"  to = "/">UPLOAD LATER </q-btn>
         <q-btn size="20px" color = "grey" @click ="cancel_order()" >CANCEL PURCHASE</q-btn>
      </q-card-actions>
      </center>
         </q-form>
    </q-card>
        </div>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'VoucherPurchase',
  data () {
    return {
      no_pending: false,
      voucher_qty: null,
      btn1: false,
      btn2: false,
      btn3: false,
      checkout: false,
      stotal: null,
      fee: null,
      amount: null,
      calculated: false,
      voucher_id: null,
      server_message: null,
      proof: null,
      reciept: false,
      maximizedToggle: true,
      title: null,
      total: null,
      payment_instruction: null,
      verification_instruction: null,
      bank_name: null,
      account_name: null,
      account_number: null,
      pm_id: null,
      voucher_orders_id: null,
      msg: null
    }
  },
  methods: {
    showNotif () {
      this.$q.notify({
        message: this.msg,
        color: 'info'
      })
    },
    cancel_order () {
      this.$axios.post('voucher-order/' + this.voucher_orders_id + '/cancel',
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        this.reciept = false
        this.no_pending = true
        this.msg = 'You have cancelled your voucher purchase. Thank you!'
        this.showNotif()
        console.log(response.data)
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    onSubmit (evt) {
      const formData = new FormData()
      formData.append('select_file', this.proof)
      formData.append('voucher_orders_id', this.voucher_orders_id)
      this.$axios.post('voucher-order/upload/proof-of-payment', formData,
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.msg = 'Your purchase is now being process. Thank you!'
        this.showNotif()
        this.reciept = false
        this.no_pending = true
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    servermsg () {
      this.$q.dialog({
        title: 'Something went wrong.',
        message: this.server_message,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    check_out () {
      this.$refs.voucher_qty.validate()
      if (this.$refs.voucher_qty.hasError) {
        this.server_message = 'Please provide # of voucher!'
        this.servermsg()
      } else if (this.btn1 === false && this.btn2 === false && this.btn3 === false) {
        this.server_message = 'Please choose voucher amount'
        this.servermsg()
      } else {
        this.$q.localStorage.set('vp_id', this.voucher_id)
        this.$q.localStorage.set('qty', this.voucher_qty)
        this.$q.localStorage.set('amount', this.stotal)
        this.$router.replace('/pay-voucher')
      }
    },
    btn_click (number) {
      if (number === 1) {
        this.btn1 = true
        this.btn2 = false
        this.btn3 = false
        this.sub_total()
      } else if (number === 2) {
        this.btn2 = true
        this.btn1 = false
        this.btn3 = false
        this.sub_total()
      } else if (number === 3) {
        this.btn3 = true
        this.btn2 = false
        this.btn1 = false
        this.sub_total()
      }
    },
    sub_total () {
      this.calculated = true
      if (this.btn1 === true) {
        this.amount = 100
        this.voucher_id = 1
      } else if (this.btn2 === true) {
        this.amount = 500
        this.voucher_id = 2
      } else if (this.btn3 === true) {
        this.amount = 1000
        this.voucher_id = 3
      }
      this.amount = this.amount * this.voucher_qty
      this.fee = this.amount * 0.03
      this.stotal = parseInt(this.fee) + parseInt(this.amount)
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getVoucher () {
      this.$axios.get('voucher-order/' + this.$q.sessionStorage.getItem('voucher_id') + '/no-proof-of-payment', {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        console.log(response.data)
        if (response.data.results.length > 0) {
          this.reciept = true
          this.title = response.data.results[0].payment_method.title
          this.total = parseInt(response.data.results[0].amount) + parseInt(response.data.results[0].fee)
          this.payment_instruction = response.data.results[0].payment_method.payment_intstruction
          this.verification_instruction = response.data.results[0].payment_method.verification_instruction
          this.bank_name = response.data.results[0].payment_method.description
          this.account_name = response.data.results[0].payment_method.account_name
          this.account_number = response.data.results[0].payment_method.account_number
          this.pm_id = response.data.results[0].payment_method.id
          this.voucher_orders_id = response.data.results[0].id
        } else {
          this.no_pending = true
        }
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    getPayment () {
      this.$axios.get('payment-methods', {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        console.log(response.data)
      }
      ).catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.getVoucher()
    this.getPayment()
  }
}
</script>

<style>
  .title{
    font-size: 347%;
    font-weight: bold;
  }
  .vouch{
    padding-bottom: 5%;
    padding-top: 5%;
  }
  .but_width{
    width: 100%;
  }
  .but{
    width: 90%;
    margin: 0%;
    margin-bottom: 3%;
  }
  .sub_total{
    margin-right: 3%;
    font-size: 22px;
  }
  .sub{
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
  }
  .fee{
    font-size: 21px;
    margin-bottom: 6px;
  }
  .title{
    font-size: 347%;
    font-weight: bold;
  }
  .sub_total{
    font-size: 20px;
    margin-top: -23px;
  }
  .border{
    border-style: groove;
  }
  .cash{
    font-size: 42px;
    font-weight: bold;
  }
  .but_width{
    width: 100%;
  }
  .but{
    width: 98%;
    margin: 0%;
    margin-bottom: 3%;
  }
  .but_1{
    width: 129%;
    margin: 0%;
    margin-bottom: 3%;
  }
  .img_hold{
    margin-top: 18px;
    margin-right: 26px;
  }
  .choose{
    font-size: 27px;
  }
  .div_but{
    width: 76%;
  }
  .div_but_2{
    width: 58%;
  }
  .image_margin{
    margin-left: 20px;
  }
  .proced{
    width: 100%;
  }
  .but_pro{
    width: 100%;
    margin-top: 14px;
  }
  .via_pay{
    font-size: 33px;
    margin-top: -28px;
  }
  .cash_2{
    font-size: 37px;
    font-weight: bold;
    margin-top: -24px;
  }
  .sub_tot{
    font-size: 20px;
  }
  .instructions{
    font-size: 15px;
  }
  .ins_dif{
    font-size: 20px;
    margin-top: -17px;
  }
  .card_sec{
    border-radius: initial;
    border-color: grey;
    background-color: #e3e6e3;
  }
  .desc_bank{
    font-size: 20px;
    font-weight: bold;
    margin-top: -21px;
  }
  desc{
    font-size: 20px;
  }
  .veri{
    font-size: 21px;
    margin-top: -21px;
  }
  .veri-in{
    font-size: 18px;
  }
</style>
