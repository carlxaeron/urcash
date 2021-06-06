<template>
  <q-page padding class="myfont">
      <div class="fit column wrap justify-center items-center content-center" v-if="page1 === true">
      <div>
        <p class="title">CASHOUT</p>
      </div>
      <div>
        <p class="text-body1 q-pt-none">Enter your desired amount:</p>
      </div>
      <div class="fit justify-center row inline content-center border">
         <q-input
          v-model="cashout_amount"
          borderless
          type="number"
          input-class="text-h6"
        >
         <template v-slot:prepend>
          <b>₱</b>
        </template>
         </q-input>
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
           <div class="fit column wrap content-center but_width">
          <div class="fit row inline q-px-xl">
              <p class = "text-h6 text-bold">Subtotal:  </p> <q-space />
               <p class = "text-h6 text-bold">₱ {{ formatPrice( -1*((-1 * cashout_amount) - (cashout_amount * 0.03))) }}</p>
          </div>
        </div>
        <div class="fit column wrap content-center but_width">
          <div class="fit row inline q-px-xl">
              <p class = "text-h6 text-grey">FEE:</p> <q-space />
               <p class = "text-h6 text-grey">₱ {{ formatPrice(cashout_amount * 0.03) }}</p>
          </div>
        </div>
        <div class="fit">
          <q-btn
            size="25px"
            class="q-px-xl q-py-xs but_pro"
            color="info"
            label="Cashout"
             @click ="check_out()"

          />
        </div>
      </div>
<!--  -->
<div class="fit column wrap justify-center content-center"  v-if="page2 === true">
      <div class="fit column wrap justify-center content-center">
        <p class="c-title">CASHOUT</p>
      </div>
      <div class="fit column wrap justify-center content-center">
        <p class="c-title-sub">VIA {{ wallet_type }} <span v-if="e_wallet_id === 0"> TRANSFER </span></p>
      </div>
      <q-separator />
      <div class="fit column wrap justify-center content-center">
        <p class="c-title-sub2">PLEASE ENTER YOUR {{ wallet_type }} DETAILS FOR CASH OUT</p>
      </div>
      <div class="fit column no-wrap justify-center content-center"  v-if="e_wallet_id === 0">
        <p class="c-select-label">Bank Name:</p>
        <q-select
          outlined
          v-model="bank_id"
          :options="banks"
          class="c-select"
          option-value="id"
          option-label="name"
          emit-value
          map-options
        />
      </div>
      <div class="fit column no-wrap justify-center content-center">
        <p class="c-select-label">Account No:</p>
        <q-input
          outlined
          v-model="account_no"
          class="c-select"
        />
      </div>
      <div class="fit column no-wrap justify-center content-center">
        <p class="c-select-label">Account Name:</p>
        <q-input
          outlined
          v-model="account_name"
          class="c-select"
        />
      </div>
      <div class="fit column no-wrap justify-start content-center margin-bot">
        <p class="c-cash-receive">You will receive:</p>
        <p class="c-cash-receive-sub">₱ {{ formatPrice(cashout_amount) }}</p>
      </div>
      <div class="fit column no-wrap justify-start content-center">
        <p class="c-cash-receive">You will be charged:</p>
        <p class="c-cash-receive-sub">₱ {{ formatPrice(fee) }}</p>
      </div>
      <div class="fit column no-wrap justify-start content-center">
        <q-btn size="22px" class="c-select" @click="doCashout()" color="info" text-color="white" label="PROCEED" />
      </div>
    </div>
       <q-dialog
      v-model="cashout_success"
      persistent
      :maximized="maximizedToggle"
    >
     <q-card>
        <q-card-section>
         <center>
          <q-img
          class = "q-mt-xl"
      alt=""
      src="../assets/cashout_result.png"
      style="width:100%; max-width: 400px;"
    />
    </center>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'cashout',
  data () {
    return {
      cashout_success: false,
      maximizedToggle: true,
      account_no: null,
      account_name: null,
      bank_id: null,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false,
      cashout_amount: 0,
      e_wallet_id: null,
      wallet_type: null,
      page1: true,
      page2: false,
      banks: [],
      fee: null
    }
  },
  methods: {
    doCashout () {
      if (this.btn1 === true) {
        this.$axios.post('bank/cashout', {
          shop_id: this.$q.sessionStorage.getItem('shop_id'),
          banks_id: this.bank_id,
          account_name: this.account_name,
          account_number: this.account_no,
          amount: this.cashout_amount
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.cashout_success = true
          this.timer = setTimeout(() => {
            this.$router.push('/')
          }, 3000)
        }
        ).catch(error => {
          console.log(error.response)
          this.server_message = error.response.data.message
          this.servermsg()
          this.page2 = false
          this.page1 = true
        })
      } else {
        this.$axios.post('ewallet/cashout', {
          shop_id: this.$q.sessionStorage.getItem('shop_id'),
          e_wallet_id: this.e_wallet_id,
          account_name: this.account_name,
          account_number: this.account_no,
          amount: this.cashout_amount
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          this.cashout_success = true
          this.timer = setTimeout(() => {
            this.$router.push('/')
          }, 3000)
        }
        ).catch(error => {
          console.log(error.response)
          this.server_message = error.response.data.message
          this.servermsg()
          this.page2 = false
          this.page1 = true
        })
      }
    },
    showNotif () {
      this.$q.notify({
        message: this.msg,
        color: 'info'
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
      } else if (this.cashout_amount <= 0) {
        this.server_message = 'Invalid Cashout Amount'
        this.servermsg()
      } else {
        if (this.btn1 === true) {
          this.$axios.get('banks',
            {
              headers: {
                Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
              }
            }
          ).then(response => {
            console.log(response.data)
            this.banks = response.data.results
            this.page1 = false
            this.page2 = true
            this.fee = -1 * (-1 * (this.cashout_amount) - (this.cashout_amount * 0.03))
          }
          ).catch(error => {
            console.log(error.response)
          })
        } else {
          this.page1 = false
          this.page2 = true
          this.fee = -1 * (-1 * (this.cashout_amount) - (this.cashout_amount * 0.03))
        }
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
        this.e_wallet_id = 0
        this.wallet_type = 'BANK'
      } else if (number === 2) {
        this.btn2 = true
        this.btn1 = false
        this.btn3 = false
        this.btn4 = false
        this.e_wallet_id = 1
        this.wallet_type = 'GCASH'
      } else if (number === 3) {
        this.btn3 = true
        this.btn2 = false
        this.btn1 = false
        this.btn4 = false
        this.e_wallet_id = 2
        this.wallet_type = 'COINS.PH'
      } else if (number === 4) {
        this.btn4 = true
        this.btn2 = false
        this.btn1 = false
        this.btn3 = false
        this.e_wallet_id = 3
        this.wallet_type = 'PAYMAYA'
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
  .c-title{
    font-size: 43px;
    font-weight: bold;
  }
  .c-title-sub{
    font-size: 25px;
    margin-top: -26px;
    margin-bottom: 3px;
  }
  .c-title-sub2{
    font-size: 14px;
  }
  .c-select{
    width: 92%;
    margin-left: 18px;
  }
  .c-select-label{
    font-size: 18px;
    margin-bottom: 0px;
    margin-left: 18px;
  }
  .c-cash-receive{
    font-size: 15px;
    margin-top: 10px;
    margin-left: 18px;
    margin-bottom: 0px;
  }
  .c-cash-receive-sub{
    font-size: 27px;
    font-weight: bold;
    margin-left: 18px;
  }
  .margin-bot{
    margin-bottom: -29px;
  }
</style>
