/**
 * 股票相关插件
 */
module.exports = {
  install: function (Vue) {
    Vue.mixin({
      filters: {
        /**
         * 删除符号'+'
         */
        removePlus: function (val) {
          if (typeof val !== 'undefined') {
            return val.replace('+', '');
          }
          return val;
        },
        /**
         * 删除符号'-'和'+'
         */
        removeOperator: function (value) {
          if (value && (value.indexOf('-') === 0 || value.indexOf('+') === 0)) {
            return value.slice(1);
          }
          return value;
        },
        /**
         * 根据股票价格返回颜色
         */
        stockColor: function (value) {
          if (value.indexOf('+') === 0) {
            return 'red';
          } else if (value.indexOf('-') === 0) {
            return 'green';
          }
          return 'gray';
        },
        /**
         * 返回股市颜色
         * A股为红色
         * H股为紫色
         * 美股为蓝色
         */
        marketColor: function (value) {
          var color = '';
          switch (value) {
            // 沪股
            case '1':
              color = 'red';
              break;
              // 沪指
            case '3':
              color = 'red';
              break;
              // sh封闭式基金
            case '10':
              color = 'red';
              break;
              // 上海债券
            case '12':
              color = 'red';
              break;
              // 深股
            case '2':
              color = 'red';
              break;
              // 深指
            case '4':
              color = 'red';
              break;
              // sz封闭式基金
            case '11':
              color = 'red';
              break;
              // 深圳债券
            case '13':
              color = 'red';
              break;
              //
            case '5':
              color = 'purple';
              break;
            case '6':
              color = 'purple';
              break;
            case '17':
              color = 'purple';
              break;
            case '18':
              color = 'purple';
              break;
            case '21':
              color = 'purple';
              break;
            case '7':
              color = 'blue';
              break;
            case '8':
              color = 'blue';
              break;
            case '9':
              color = 'blue';
              break;
            case '14':
              color = 'red';
              break;
            case '15':
              color = 'red';
              break;
            case '16':
              color = 'red';
              break;
              // case '19':
              // case '20':
              //   market = '基金';
              //   break;
              // case '22':
              //   market = '债券逆回购';
              //   break;
              // case '100':
              //   market = '组合';
              //   break;
            default:
              color = '';
              break;
          }
          return color;
        },
        /**
         * 根据编号返回股市缩写
         */
        market: function (value) {
          var market = '';
          switch (value) {
            // 沪股
            case '1':
              market = 'SH';
              break;
              // 沪指
            case '3':
              market = 'SH';
              break;
              // sh封闭式基金
            case '10':
              market = 'SH';
              break;
              // 上海债券
            case '12':
              market = 'SH';
              break;
              // 深股
            case '2':
              market = 'SZ';
              break;
              // 深指
            case '4':
              market = 'SZ';
              break;
              // sz封闭式基金
            case '11':
              market = 'SZ';
              break;
              // 深圳债券
            case '13':
              market = 'SZ';
              break;
              //
            case '5':
              market = 'HK';
              break;
            case '6':
              market = 'HK';
              break;
            case '17':
              market = 'HK';
              break;
            case '18':
              market = 'HK';
              break;
            case '21':
              market = 'HK';
              break;
            case '7':
              market = 'US';
              break;
            case '8':
              market = 'US';
              break;
            case '9':
              market = 'Global';
              break;
            case '14':
              market = 'SB';
              break;
            case '15':
              market = 'SB';
              break;
            case '16':
              market = 'SB';
              break;
            case '19':
              market = '基金';
              break;
            case '20':
              market = '基金';
              break;
            case '22':
              market = '债券逆回购';
              break;
            case '100':
              market = '组合';
              break;
            default:
              market = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
              break;
          }
          return market;
        },
      },
    });
  },
};
