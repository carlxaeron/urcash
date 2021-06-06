<template>
  <q-layout view="lHh Lpr lFf" class="myfont" >
      <q-dialog v-model="screen_lock" :maximized="maximizedToggle" >
      <div class= "vg">
   <div class= "row col-md-12 col-lg-12 flex flex-center q-pa-lg">
    <q-img
          src="../assets/logo.png"
          style="width: 40%;"
       />
   </div>
  <span class="text-h5 text-white flex flex-center">Provide your 4-digit PIN to unlock!</span>
 <div class = "row flex flex-center ">
    <div class="q-gutter-xs q-mb-lg">
      <q-radio dark v-model="p1" val='1' color = "white" />
      <q-radio dark v-model="p2" val='1' color = "white"/>
      <q-radio dark v-model="p3" val='1' color = "white"/>
      <q-radio dark v-model="p4" val='1' color = "white"/>
    </div>
     <div class = "row col-lg-12 col-md-12 flex flex-center q-pl-lg ">
   <ul  id="keyboard" class = "">
        <li @click = "enter_pin('1')" class="letter">1</li>
        <li @click = "enter_pin('2')" class="letter">2</li>
        <li @click = "enter_pin('3')" class="letter">3</li>
        <li @click = "enter_pin('4')" class="letter clearl">4</li>
        <li @click = "enter_pin('5')" class="letter">5</li>
        <li @click = "enter_pin('6')" class="letter">6</li>
        <li @click = "enter_pin('7')" class="letter clearl">7</li>
        <li @click = "enter_pin('8')" class="letter ">8</li>
        <li @click = "enter_pin('9')" class="letter">9</li>
       <li class="clearl bg-transparent" style="border:0px"></li>
        <li @click = "enter_pin('0')" class="letter">0</li>
         <li class="letter" @click = "remove_pin()"><i class = "fa fa-backspace"> </i> </li>
    </ul>
    </div>
    </div>
    </div>
     </q-dialog>
    <div v-if="page_load === true">
        <q-spinner-gears
            class = "absolute-center"
          color="info"
          size="8em"
        />
         </div>
    <div v-if="page_load === false">
    <q-header  class = "bg-secondary">
      <q-toolbar>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer "
          style="font-size:20px;"
        />

        <q-toolbar-title>
 <q-img
      alt=""
      src="../assets/head.png"
      style = "width:250px;"
    />
        </q-toolbar-title>

        <q-item-section class="absolute-right" avatar>
               <!-- <i class="fa fa-envelope text-white" style="font-size:25px;"></i> -->
      <q-btn dense round flat icon="home" to = "/">
    </q-btn>
              </q-item-section>

      </q-toolbar>
    </q-header>
<q-footer elevated  class = "bg-secondary q-pt-md q-pb-md" >
  <center><span class= "q-mt-md text-white">UrCASH Digital Wallet</span><br/>
<span>UCC Corp | Copyright 2020</span></center>
</q-footer>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
      >
        <q-scroll-area style="height: 100%; margin-top: 150px; border-right: 1px solid #ddd">
       <q-list  padding>
            <q-item clickable to = "/profile" exact-active-class="text-bold" v-ripple>
             <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-user-circle"></i>
              </q-item-section>

              <q-item-section>
                Profile
              </q-item-section>
            </q-item>

            <q-item clickable  to = "/merchant_profile" exact-active-class="text-bold"  v-ripple>
             <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-store"></i>
              </q-item-section>

              <q-item-section>
                Merchant Profile
              </q-item-section>
            </q-item>
            <q-item clickable to = "/merchant_verify" v-if="isverified === false"  exact-active-class="text-bold" v-ripple>
             <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-check-circle"></i>
              </q-item-section>

              <q-item-section>
               Merchant Verification
              </q-item-section>
            </q-item>
            <q-item clickable  to = "/transaction" exact-active-class="text-bold" v-ripple>
              <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-history"></i>
              </q-item-section>

              <q-item-section>
                Transaction History
              </q-item-section>
            </q-item>
            <q-item clickable  to = "/support"  exact-active-class="text-bold" v-ripple>
              <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-headset"></i>
              </q-item-section>

              <q-item-section>
               Customer Support
              </q-item-section>
            </q-item>

            <q-item clickable @click = "gotoTerms ()" v-ripple>
             <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-file-alt"></i>
              </q-item-section>

              <q-item-section>
                Terms and Condition
              </q-item-section>
            </q-item>

            <q-item clickable  @click = "gotoPrivacy ()" v-ripple>
              <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-lock"></i>
              </q-item-section>

              <q-item-section>
                Privacy Statement
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section class = "text-info text-h6" avatar>
                <i class = "fas fa-sign-out-alt"></i>
              </q-item-section>

              <q-item-section @click = "logout()">
                Sign Out
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
            <div class="absolute-top bg-secondary" style="height: 150px;">
          <div class="absolute-bottom bg-transparent">
            <div class = "row">
              <div class = "col q-pt-lg q-pl-lg">
            <div class="text-white myfont text-bold" style = "font-size:14px;">URCASH WALLET</div>
            <div class="text-white myfont" style = "font-size:14px;">{{ Firstname }} {{ Lastname }}&nbsp;</div>
            <p class="text-white" style = "font-size:12px;"> {{ mynumber }} <br> {{ Email }}<br>
           <span class = "text-bold">Business Name</span><br>
           {{ store_name }} <i class="fa fa-check-circle text-info" v-if="isverified === true"/>
           </p>
              </div>
              <div class = "col">
                 <q-avatar size="100px"  class="q-pt-md q-ml-lg">
              <img :src="imUrl">
            </q-avatar>
              </div>
            </div>
          </div>
        </div>
          <div class="absolute-bottom bg-secondary" style="height: 150px;">
            <div class="absolute-bottom bg-transparent">
            <div class = "row">
                <div class = "col q-pt-sm q-ml-md text-white q-mb-lg">
                 <span  style = "font-size:20px;">DIGITAL ID</span>
            <div class="q-pt-sm myfont" style = "font-size:15px;">{{ Firstname }} {{ Lastname }} <br>
            <span style = "font-size:14px;">
              {{ address }}
            </span>
               </div>
           <span style="font-size:11px;">Powered by UrCash</span>
              </div>
              <div class = "col q-pt-md q-mb-md q-ml-md"  @click ="viewQr()">
               <qriously :value="text" :size="100" />
                </div>
                <q-dialog
      v-model="large_qr"
      persistent
      :maximized="maximizedToggle"
    >
     <q-card >
     <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class = "flex flex-center">
           <qriously :value="text" :size="300" class="q-mt-xl" />
        </q-card-section>
      </q-card>
    </q-dialog>
            </div>
          </div>
        </div>
      </q-drawer>
    <q-page-container v-if="page_load === false && screen_lock === false">
      <router-view />
    </q-page-container>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      large_qr: false,
      isverified: false,
      drawer: false,
      mynumber: this.$q.localStorage.getItem('mobile'),
      Firstname: '',
      Lastname: '',
      Email: '',
      maximizedToggle: true,
      page_load: true,
      screen_lock: false,
      p1: '0',
      p2: '0',
      p3: '0',
      p4: '0',
      pin: '',
      store_name: null,
      text: '',
      address: null,
      imUrl: 'https://cdn.quasar.dev/img/boy-avatar.png'
    }
  },
  methods: {
    viewQr () {
      this.large_qr = true
    },
    logout () {
      this.$axios.post('logout', '', {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        this.$q.sessionStorage.clear()
        this.$q.localStorage.clear()
        this.$router.replace('/login')
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    gotoTerms () {
      window.open('https://terms.urcash.digital/urcashtnc.pdf', '_blank')
    },
    gotoPrivacy () {
      window.open('https://terms.urcash.digital/urcashprivacy.pdf', '_blank')
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
        console.log(response.data)
        this.page_load = false
        this.screen_lock = false
        this.$q.sessionStorage.set('shop_id', response.data.results.shop.id)
        this.$q.sessionStorage.set('voucher_id', response.data.results.voucher_account.id)
        this.imUrl = 'https://api.urcash.digital/' + response.data.results.user.profile_picture
        this.Firstname = response.data.results.user.first_name
        this.Lastname = response.data.results.user.last_name
        this.Email = response.data.results.user.email
        this.store_name = response.data.results.shop.reg_bus_name
        this.text = '' + response.data.results.shop.id
        this.address = response.data.results.address.city + ', ' + response.data.results.address.province
        this.$q.sessionStorage.set('balance', parseInt(response.data.results.voucher_account.voucher_balance))
        if (response.data.results.shop.is_verified !== '0') {
          this.isverified = true
        }
        this.timer = setTimeout(() => {
          this.getUser()
        }, 10000)
      }
      ).catch(error => {
        this.screen_lock = true
        console.log(error.response)
      })
    },
    remove_pin () {
      this.pin = this.pin.slice(0, -1)
      if (this.pin.length >= 1) {
        this.p1 = '1'
      } else {
        this.p1 = '0'
      }
      if (this.pin.length >= 2) {
        this.p2 = '1'
      } else {
        this.p2 = '0'
      }
      if (this.pin.length >= 3) {
        this.p3 = '1'
      } else {
        this.p3 = '0'
      }
      if (this.pin.length === 4) {
        this.p4 = '1'
      } else {
        this.p4 = '0'
      }
    },
    enter_pin (value) {
      this.pin = this.pin + value
      if (this.pin.length >= 1) {
        this.p1 = '1'
      } else {
        this.p1 = '0'
      }
      if (this.pin.length >= 2) {
        this.p2 = '1'
      } else {
        this.p2 = '0'
      }
      if (this.pin.length >= 3) {
        this.p3 = '1'
      } else {
        this.p3 = '0'
      }
      if (this.pin.length >= 4) {
        this.p4 = '1'
      } else {
        this.p4 = '0'
      }
      if (this.pin.length === 4) {
        this.$axios.post('mpin', {
          mobile_number: this.$q.localStorage.getItem('mobile').toString(),
          password: this.pin
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          console.log(response.data)
          this.$q.sessionStorage.set('token', response.data.results.token)
          this.getUser()
        }).catch(error => {
          console.log(error.response)
          error = null
          this.$q.notify({
            message: 'Wrong PIN! Please try again!',
            color: 'negative'
          })
        })
      }
    }

  },
  created () {
    this.getUser()
  }
}
</script>
<style>
#keyboard {
margin: 0;
padding: 0;
list-style: none;
}
    #keyboard li {
    float: left;
    margin: 0 20px 20px 0;
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #000;
    line-height: 80px;
    text-align: center;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    }
        .capslock, .tab, .left-shift, .clearl, .switch {
        clear: left;
        }
            #keyboard .tab, #keyboard .delete {
            width: 70px;
            }
            #keyboard .capslock {
            width: 80px;
            }
            #keyboard .return {
            width: 90px;
            }
            #keyboard .left-shift{
            width: 70px;
            }

            #keyboard .switch {
            width: 90px;
            }
            #keyboard .rightright-shift {
            width: 109px;
            }
        .lastitem {
        margin-right: 0;
        }
        .uppercase {
        text-transform: uppercase;
        }
        #keyboard .space {
        float: left;
        width: 556px;
        }
        #keyboard .switch, #keyboard .space, #keyboard .return{
        font-size: 16px;
        }
        .on {
        display: none;
        }
        #keyboard li:hover {
        position: relative;
        top: 1px;
        left: 1px;
        cursor: pointer;
        }
</style>
