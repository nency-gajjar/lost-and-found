import Vue from "vue";
import html2pdf from 'html2pdf.js';

Vue.use(html2pdf);

export default (_, inject) => {
  inject('html2pdf', (element, options) => {
    return html2pdf(element, options)
  });
}