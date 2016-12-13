import Vue from 'vue';

Vue.filter('badgeChar', (val) => {
  switch (val) {
    case '5':
    case '6':
      return 'HK';
    case '7':
    case '8':
      return 'US';
    default:
      return '';
  }
});

Vue.filter('badgeColor', (val) => {
  switch (val) {
    case '5':
    case '6':
      return 'purple';
    case '7':
    case '8':
      return 'blue';
    default:
      return '';
  }
});
