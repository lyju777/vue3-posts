import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import globalDirectives from '@/directives/global-directives';
import dayjs from '@/plugins/dayjs';
// import focus from '@/directives/focus';
// import globalComponents from '@/plugins/global-components';

const app = createApp(App);
// app.use(globalComponents);
app.directive('focus', focus);
app.use(globalDirectives);
app.use(dayjs);
app.use(router);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap';

// console.log(import.meta.env.VITE_APP_API_URL);
