import Vue from "vue";
import { Table, TableColumn, Form, FormItem, Input, Button, Select, Option, Icon } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
// Vue.use(ElementUI);
// Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Icon);
new Vue({
    render: (h) => h(App),
}).$mount("#app");
