<template>
  <q-page padding class="myfont">
      <div  v-if="isverified === false">
        <div class = "col-lg-12 col-md-12 col-sm-12 q-mt-md flex flex-center">
           <span class = "text-h4 text-bold q-my-md">Merchant Verification</span>
           <span class = "text-h6 text-bold q-my-md">Select Document</span>
           </div>
            <div class="fit column wrap content-center">
        <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="grey"
             v-if="btn1===false"
             @click ="btn_click(1)"
           >  DTI Business<br/> Permit</q-btn>
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="secondary"
            v-if="btn1===true"
          >  DTI Business<br/> Permit</q-btn>
        </div>
        <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="secondary"
            label="Mayor’s Business Permit"
              v-if="btn2===true"
          />
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="grey"
            label="Mayor’s Business Permit"
             @click ="btn_click(2)"
               v-if="btn2==false"
          />
        </div>
         <div class="fit column wrap content-center but_width">
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="secondary"
            label="BIR Certification of Registration"
              v-if="btn3===true"
          />
          <q-btn
            size="22px"
            class="q-px-xl q-py-xs but"
            color="grey"
            label="BIR Certification of Registration"
              @click ="btn_click(3)"
              v-if="btn3===false"
          />
        </div>
         <div class="fit column wrap" v-if="btn1 === true || btn2 === true || btn3 === true">
             <center>
          <q-file class="q-px-xl q-pt-none" clearable v-model ="picture" label="Tap to Select Photo" accept="image/*"  flat color = "white">
               <template v-slot:append>
          <q-icon name="camera" color="grey" />
        </template>
        </q-file>
         <q-btn
            size="20px"
            class="q-px-xl q-py-xs but"
            color="info"
            label="Submit"
              @click ="onSubmit()"
          />
             </center>
     </div>
      </div>
      <q-dialog
      v-model="intro1"
      persistent
      :maximized="maximizedToggle"
    >
     <q-card>
        <q-card-section>
         <center>
          <q-img
          class = "q-mt-xl"
      alt=""
      src="../assets/thank_you.png"
      style="width:100%; max-width: 400px;"
    />
    </center>
        </q-card-section>
      </q-card>
    </q-dialog>
        <q-dialog
      v-model="intro2"
      persistent
      :maximized="maximizedToggle"
    >
     <q-card>
        <q-card-section>
         <center>
          <q-img
          class = "q-mt-xl"
      alt=""
      src="../assets/welcome_verify.png"
      style="width:100%; max-width: 400px;"
    />
     <q-btn
            size="20px"
            class="q-px-xl q-py-xs but"
            color="info"
            label="Verify my account"
            @click ="intro2 = false"
          />
    </center>
        </q-card-section>
      </q-card>
    </q-dialog>
     </div>
     <div v-if="isverified === true">
        <q-spinner-gears
            class = "absolute-center"
          color="info"
          size="8em"
        />
         </div>
  </q-page>
</template>

<script>
export default {
  name: 'VoucherPurchase',
  data () {
    return {
      intro1: false,
      intro2: false,
      user_id: null,
      picture: null,
      btn1: false,
      btn2: false,
      btn3: false,
      maximizedToggle: true,
      msg: null,
      document_type: null,
      isverified: true
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
      formData.append('user_id', this.user_id)
      formData.append('select_file', this.picture)
      formData.append('document', this.document_type)
      this.$axios.post('shops/merchant_verification', formData,
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.intro1 = true
        this.timer = setTimeout(() => {
          this.$router.push('/')
        }, 3000)
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
        console.log(response.data)
        this.user_id = response.data.results.user.id
        if (response.data.results.shop.is_verified === '0') {
          this.isverified = false
        } else {
          this.$router.push('/')
        }
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
    btn_click (number) {
      if (number === 1) {
        this.btn1 = true
        this.btn2 = false
        this.btn3 = false
        this.document_type = 'DTI Permit'
      } else if (number === 2) {
        this.btn2 = true
        this.btn1 = false
        this.btn3 = false
        this.document_type = 'Mayor’s Permit'
      } else if (number === 3) {
        this.btn3 = true
        this.btn2 = false
        this.btn1 = false
        this.document_type = 'BIR Registration Certificate'
      }
    }
  },
  created () {
    this.getUser()
  }
}
</script>
<style>
  .but_width{
    width: 100%;
  }
  .but{
    width: 90%;
    margin: 0%;
    margin-bottom: 3%;
  }
</style>
