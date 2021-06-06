const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '', component: () => import('pages/Index.vue')
      },
      {
        path: '/scan_qr', component: () => import('pages/scan_qr.vue')
      },
      {
        path: '/pay-voucher', component: () => import('pages/voucher_payment.vue')
      },
      {
        path: '/pay', component: () => import('pages/pay.vue')
      },
      {
        path: '/voucher', component: () => import('pages/voucher.vue')
      },
      {
        path: '/profile', component: () => import('pages/Profile.vue')
      },
      {
        path: '/merchant_profile', component: () => import('pages/merchant_profile.vue')
      },
      {
        path: '/transaction', component: () => import('pages/transactions.vue')
      },
      {
        path: '/merchant_verify', component: () => import('pages/merchant_verify.vue')
      },
      {
        path: '/support', component: () => import('pages/support.vue')
      },
      {
        path: '/cashout', component: () => import('pages/cashout.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/table',
    component: () => import('layouts/table.vue')
  },
  {
    path: '/register',
    component: () => import('layouts/Registration1.vue')
  },
  {
    path: '/lock',
    component: () => import('layouts/locked.vue'),
    meta: {
      islock: true
    }
  },
  {
    path: '/verify',
    component: () => import('layouts/SmsVerify.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/welcome',
    component: () => import('layouts/welcome.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sample', component: () => import('layouts/sample.vue')
  }
]

export default routes
