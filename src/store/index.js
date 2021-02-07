import Vue from "vue";
import Vuex from "vuex";
import unsplash from "../utils/unsplash";
import user from "./user";
import modalWindow from "./modalWindow";
import register from "./register";
import collections from "./collections";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["register"],
    }),
  ],
  state: {
    randomPhotos: [],
    hasFound: true,
    searchImage: null,
    currentCategory: null,
    currentOrientetion: null,
  },
  mutations: {
    setRandomPhotos(state, photos) {
      state.randomPhotos.push(photos);
    },
    setSearchPhotos(state, photos) {
      state.randomPhotos = [];
      state.randomPhotos.push(photos);
    },
    setRandomPhotosScroll(state, photos) {
      state.randomPhotos[0].push(...photos);
    },
    setSearchScroll(state, image) {
      state.searchImage = image;
    },

    openHasFoundModal(state) {
      state.hasFound = false;
    },
    closeHasFound(state) {
      state.hasFound = true;
    },

    setCategory(state, category) {
      state.currentCategory = category;
    },
    setOrientetion(state, orientetion) {
      state.currentOrientetion = orientetion;
    },
    setPhotoLike(state, newPhoto) {
      for (let i = 0; i < state.randomPhotos[0].length; i++) {
        if (state.randomPhotos[0][i].id === newPhoto.photo.id) {
          state.randomPhotos[0][i].liked_by_user = true;
          state.randomPhotos[0][i].likes += 1;
        }
      }
    },
    setPhotoDislike(state, newPhoto) {
      for (let i = 0; i < state.randomPhotos[0].length; i++) {
        if (state.randomPhotos[0][i].id === newPhoto.photo.id) {
          state.randomPhotos[0][i].liked_by_user = false;
          state.randomPhotos[0][i].likes -= 1;
        }
      }
    },

    logoutLikes(state) {
      for (let i = 0; i < state.randomPhotos[0].length; i++) {
        state.randomPhotos[0][i].liked_by_user = false;
      }
    },
  },
  actions: {
    async getOrientation({ commit }, obj) {
      const res = await unsplash.search.photos(obj.photo, {
        orientation: obj.orientation,
      });
      const data = await res.json();
      if (data.cod !== "404") {
        let randomPhotos = data.results.map((item) => {
          return {
            id: item.id,
            description: item.description,
            alt_description: item.alt_description,
            likes: item.likes,
            userName: item.user,
            url: item.urls.regular,
            width: item.width,
            tags: [...item.tags],
            link: item.links.download + "?force=true",
            downloads: item.downloads,
            ...item,
          };
        });
        commit("setSearchPhotos", randomPhotos);
      } else {
        throw new Error("random photos error");
      }
    },
    async getRandomPhotos({ commit }, obj) {
      if (obj.photo === undefined) {
        obj.photo = "latest";
      }
      if (obj.page === undefined) {
        obj.page = 0;
      }
      if (obj.count === undefined) {
        obj.count = 10;
      }
      try {
        if (obj.page > 0) {
          const res = await unsplash.search.photos(
            obj.photo,
            obj.page,
            obj.count
          );
          const data = await res.json();
          if (data.cod !== "404") {
            let randomPhotos = data.results.map((item) => {
              return {
                id: item.id,
                description: item.description,
                alt_description: item.alt_description,
                likes: item.likes,
                userName: item.user,
                url: item.urls.regular,
                width: item.width,
                tags: [...item.tags],
                link: item.links.download + "?force=true",
                downloads: item.downloads,
                ...item,
              };
            });
            commit("setRandomPhotosScroll", randomPhotos);
          } else {
            throw new Error("random photos error");
          }
        } else if (obj.photo !== "latest") {
          const res = await unsplash.search.photos(obj.photo);
          const data = await res.json();
          if (data.cod !== "404") {
            let photos = data.results.map((item) => {
              return {
                id: item.id,
                description: item.description,
                alt_description: item.alt_description,
                likes: item.likes,
                userName: item.user,
                url: item.urls.regular,
                width: item.width,
                tags: [...item.tags],
                link: item.links.download + "?force=true",
                downloads: item.downloads,
                ...item,
              };
            });
            if (photos.length === 0) {
              commit("openHasFoundModal");
            } else {
              commit("closeHasFound");
              commit("setSearchPhotos", photos);
            }
          } else {
            throw new Error("search error");
          }
        } else {
          const res = await unsplash.search.photos(obj.photo);
          const data = await res.json();
          if (data.cod !== "404") {
            let randomPhotos = data.results.map((item) => {
              return {
                id: item.id,
                description: item.description,
                alt_description: item.alt_description,
                likes: item.likes,
                userName: item.user,
                url: item.urls.regular,
                width: item.width,
                tags: [...item.tags],
                link: item.links.download + "?force=true",
                downloads: item.downloads,
                ...item,
              };
            });
            commit("setRandomPhotos", randomPhotos);
          } else {
            throw new Error("random photos error");
          }
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    photoLike({ commit }, id) {
      commit("setPhotoLike", id);
    },
    photoDislike({ commit }, id) {
      commit("setPhotoDislike", id);
    },

    downloadPhoto(_, id) {
      unsplash.photos
        .getPhoto(id)
        .then((json) => {
          return json.json();
        })
        .then((json) => {
          unsplash.photos.downloadPhoto(json);
        });
    },
    logoutLikes({ commit }) {
      commit("logoutLikes");
    },
  },

  modules: {
    user: user,
    modalWindow: modalWindow,
    register: register,
    collections: collections,
  },
});
