<template>
  <q-page padding class="myfont">
    <div class="fit column wrap justify-center items-center content-center">
      <div>
        <p class="title">CHECKOUT</p>
      </div>
      <div>
        <p class="sub_total">Subtotal:</p>
      </div>
      <div class="fit justify-center row inline content-center border">
        <p class="cash">₱ {{ formatPrice(stotal) }}</p>
      </div>
      <div>
        <p class="choose">CHOOSE PAYMENT OPTION:</p>
      </div>
        <div class="fit column wrap content-center but_width">
          <div class="fit row inline image_margin">
            <div class="img_hold">
              <q-img
                alt=""
                src="../assets/p1.png"
                style = "width:50px;"
                v-if="btn1===true"
              />
              <q-img
                alt=""
                src="../assets/gp1.png"
                style = "width:50px;"
                v-if="btn1===false"
              />
            </div>
            <div class="div_but">
              <q-btn
                size="22px"
                class="q-px-sm q-py-xs but"
                color="grey"
                label="‎BANK TRANSFER"
              v-if="btn1===false"
             @click ="btn_click(1)"
              />
               <q-btn
                size="22px"
                class="q-px-sm q-py-xs but"
                color="secondary"
                label="‎BANK TRANSFER"
                  v-if="btn1===true"
              />
            </div>
          </div>
        </div>
         <div class="fit column wrap content-center but_width">
         <div class="fit row inline image_margin">
            <div class="img_hold">
              <q-img
                alt=""
                src="../assets/gp2.png"
                style = "width:50px;"
                v-if="btn2===false"
              />
              <q-img
                alt=""
                src="../assets/p2.png"
                style = "width:50px;"
                v-if="btn2===true"
              />
            </div>
            <div class="div_but">
              <q-btn
                size="22px"
                class="q-px-xl q-py-xs but"
                color="grey"
                label="‎GCASH"
              v-if="btn2===false"
             @click ="btn_click(2)"
              />
               <q-btn
                size="22px"
                class="q-px-xl q-py-xs but"
                color="secondary"
                label="‎GCASH"
                  v-if="btn2===true"
              />
            </div>
          </div>
        </div>
        <div class="fit column wrap content-center but_width">
          <div class="fit row inline image_margin">
            <div class="img_hold">
              <q-img
                alt=""
                src="../assets/gp3.png"
                style = "width:50px;"
                v-if="btn3===false"
              />
              <q-img
                alt=""
                src="../assets/p3.png"
                style = "width:50px;"
                v-if="btn3===true"
              />
            </div>
            <div class="div_but">
              <q-btn
                size="22px"
                class="q-px-xl q-py-xs but"
                color="grey"
                label="‎COINS.PH"
              v-if="btn3===false"
             @click ="btn_click(3)"
              />
               <q-btn
                size="22px"
                class="q-px-xl q-py-xs but"
                color="secondary"
                label="COINS.PH"
                  v-if="btn3===true"
              />
            </div>
          </div>
        </div>
        <div class="fit column wrap content-center but_width">
          <div class="fit row inline image_margin">
            <div class="img_hold">
              <q-img
                alt=""
                src="../assets/gp4.png"
                style = "width:50px;"
                v-if="btn4===false"
              />
              <q-img
                alt=""
                src="../assets/p4.png"
                style = "width:50px;"
                v-if="btn4===true"
              />
            </div>
            <div class="div_but">
              <q-btn
                size="22px"
                class="q-px-xl q-py-xs but"
                color="grey"
                label="PAYMAYA"
              v-if="btn4===false"
             @click ="btn_click(4)"
              />
               <q-btn
                size="22px"
                class="q-px-xl q-py-xs but"
                color="secondary"
                label="PAYMAYA"
                  v-if="btn4===true"
              />
            </div>
          </div>
        </div>
        <div class="fit">
          <q-btn
            size="25px"
            class="q-px-xl q-py-xs but_pro"
            color="info"
            label="PROCEED"
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
         <p class="via_pay">VIA {{ sub_title }}</p>
         <q-separator/>
         </div>
      </q-card-section>
        <q-card-section class = "q-py-none">
        <div class="fit">
        <p class="sub_tot">Subtotal:</p>
      </div>
      <div class="fit">
        <p class="cash_2">₱ {{ formatPrice(sub_total) }}</p>
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
        <q-btn size="20px" color = "secondary" to = "/">UPLOAD LATER </q-btn>
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
  name: 'test',
  data () {
    return {
      proof: null,
      reciept: false,
      maximizedToggle: true,
      stotal: this.$q.localStorage.getItem('amount'),
      server_message: null,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false,
      pmethod: null,
      sub_title: null,
      sub_total: null,
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
        this.$router.replace('/')
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
      if (this.btn1 === false && this.btn2 === false && this.btn3 === false && this.btn4 === false) {
        this.server_message = 'Please choose your payment option!'
        this.servermsg()
      } else {
        this.$axios.post('voucher-order/create', {
          shop_id: this.$q.sessionStorage.getItem('shop_id'),
          payment_method_id: this.pmethod,
          voucher_id: this.$q.localStorage.getItem('vp_id'),
          number_of_vouchers: this.$q.localStorage.getItem('qty')
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.reciept = true
          console.log(response.data)
          this.sub_title = response.data.results.payment_method.title
          this.sub_total = parseInt(response.data.results.voucher_order.amount) + parseInt(response.data.results.voucher_order.fee)
          this.payment_instruction = response.data.results.payment_method.payment_intstruction
          this.verification_instruction = response.data.results.payment_method.verification_instruction
          this.bank_name = response.data.results.payment_method.description
          this.account_name = response.data.results.payment_method.account_name
          this.account_number = response.data.results.payment_method.account_number
          this.pm_id = response.data.results.payment_method.id
          this.voucher_orders_id = response.data.results.voucher_order.id
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
    btn_click (number) {
      if (number === 1) {
        this.btn1 = true
        this.btn2 = false
        this.btn3 = false
        this.btn4 = false
        this.pmethod = 1
      } else if (number === 2) {
        this.btn2 = true
        this.btn1 = false
        this.btn3 = false
        this.btn4 = false
        this.pmethod = 2
      } else if (number === 3) {
        this.btn3 = true
        this.btn2 = false
        this.btn1 = false
        this.btn4 = false
        this.pmethod = 3
      } else if (number === 4) {
        this.btn4 = true
        this.btn2 = false
        this.btn1 = false
        this.btn3 = false
        this.pmethod = 4
      }
    }
  }
}
</script>

<style>
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
