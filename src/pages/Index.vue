<template>
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container>
 <q-page>
   <div class = "row flex flex-center">
   <q-card flat class="my-card">
      <q-card-section>
        <div class="text-h5 text-info text-center">HI {{ fname }} WELCOME TO <b>URCASH</b>!</div>
      </q-card-section>
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
    <div class = "bg_home flex flex-center" style = "height:370px;">
      <div class = "row" style="">
      <div class = "col-md-6">
           <q-item clickable to = "/scan_qr">
<q-card  class="my-icon bg-transparent" flat>
      <q-card-section>
       <q-img
      alt=""
      src="../assets/1.png"
      style = "width:120px;"
    />
      </q-card-section>
       <q-card-actions vertical class = "text-center text-bold">
        SCAN QR
      </q-card-actions>
    </q-card>
           </q-item>
      </div>
      <div class = "col-md-6">
<q-item clickable to = "/voucher">
 <q-card class="my-icon bg-transparent" flat>
      <q-card-section>
       <q-img
      alt=""
      src="../assets/3.png"
      style = "width:120px;"
    />
      </q-card-section>
      <q-card-actions vertical class = "text-center text-bold">
        VOUCHERS
      </q-card-actions>
    </q-card>
</q-item>

      </div>
      </div>

       <div class = "row">
      <div class = "col-md-6">
        <q-item clickable to = "/pay">
 <q-card class="my-icon bg-transparent" flat>
      <q-card-section>
       <q-img
      alt=""
      src="../assets/4.png"
      style = "width:120px;"
    />
      </q-card-section>
      <q-card-actions vertical class = "text-center text-bold">
        PAY
      </q-card-actions>
    </q-card>
    </q-item>
      </div>
      <div class = "col-md-6">
<q-item clickable to = "/cashout">
 <q-card class="my-icon bg-transparent" flat>
      <q-card-section>
       <q-img
      alt=""
      src="../assets/2.png"
      style = "width:120px;"
    />
      </q-card-section>
       <q-card-actions vertical class = "text-center text-bold">
        CASH OUT
      </q-card-actions>
    </q-card>
</q-item>
      </div>
      </div>
    </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>
<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      balance: this.$q.sessionStorage.getItem('balance'),
      fname: null
    }
  },
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
        this.fname = response.data.results.user.first_name
      }
      ).catch(error => {
        error = null
      })
    }
  },
  created () {
    this.getUser()
  }

}
</script>
<style lang="stylus">
.my-custom-image {
  filter: blur(1px) sepia()
}
</style>
