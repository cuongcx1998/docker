import convertKana from "@/plugins/convertKana";
import notify from '@/plugins/notify';
import i18n from '@/plugins/i18n';

export default {
  toNumeric: {
    twoWay: true,
    componentUpdated: function (el) {
      if(!el.value) {
        return;
      }
      let toHalf = convertKana(el.value,'khvrna');
      toHalf = parseFloat(toHalf.replace(/\,/g,''));
      if (!isNaN(toHalf)) {
        el.value = toHalf.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      } else {
        el.value = '';
      }
    },
  },
  toNumber: {
    twoWay: true,
    componentUpdated: function (el) {
      if(!el.value) {
        return;
      }

      if (isNaN(el.value)) {
        el.value = '';
        el.classList.add('is-invalid');
        return notify.error(i18n.tc('any_error'))
      }

      const event = new Event('input', { bubbles: true });
      el.classList.remove('is-invalid');
      el.value = convertKana(el.value,'khvrna');
      el.dispatchEvent(event);
    },
  },
}