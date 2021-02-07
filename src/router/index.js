import Vue from "vue";
import VueRouter from "vue-router";
import PhotosTemplate from "../pages/PhotosTemplate.vue";
import UserTemplate from "../pages/UserTemplate.vue";
import MyProfile from "../pages/MyProfile";
import FuturedCollection from "../pages/FuturedCollection";
import SinglCollection from "../pages/SinglCollection";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user/:name",
    name: "UserTemplate",
    component: UserTemplate,
  },
  {
    path: "/user/profile/:name",
    name: "MyProfile",
    component: MyProfile,
  },
  {
    path: "/collection/",
    name: "FuturedCollection",
    component: FuturedCollection,
  },
  {
    path: "/collection/:id",
    name: "SinglCollection",
    component: SinglCollection,
  },
  {
    path: "/",
    exact: true,
    name: "PhotosTemplate",
    component: PhotosTemplate,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
