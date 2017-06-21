import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import SkuInTransit from '@/components/SkuInTransit';
import MarkingIdentified from '@/components/MarkingIdentified';
import MarkingNotIdentified from '@/components/MarkingNotIdentified';
import _History from '@/components/_History';
import CountryOfOrigin from '@/components/CountryOfOrigin';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SkuInTransit',
      component: SkuInTransit,
    },
    {
      path: '/marking-identified',
      name: 'MarkingIdentified',
      component: MarkingIdentified,
    },
    {
      path: '/marking-not-identified',
      name: 'MarkingNotIdentified',
      component: MarkingNotIdentified,
    },
    {
      path: '/_history',
      name: 'History',
      component: _History,
    },
    {
      path: '/country-of-origin',
      name: 'CountryOfOrigin',
      component: CountryOfOrigin,
    },
  ],
});
