import convertKana from "@/plugins/convertKana";
export default {
  toHalfSize: {
    twoWay: true,
    componentUpdated: function (el) {
      const event = new Event('input', { bubbles: true });
      el.value = convertKana(el.value,'khvrnas');
      el.dispatchEvent(event);
    }
  },
  toFullSize:{
    twoWay: true,
    componentUpdated: function (el) {
      const event = new Event('input', { bubbles: true });
      el.value = convertKana(el.value,'KVHRNAS');
      el.dispatchEvent(event);
    }
  },
}