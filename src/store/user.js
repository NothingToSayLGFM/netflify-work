import unsplash from "../utils/unsplash";

const user = {
  state: {
    userData: null,
    userModalOpen: false,
    modalUserImages: [],
    dataUserModal: "",
    likesPhotos: null,
    userColl: null,
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },

    setLikesPhotos(state, photos) {
      state.likesPhotos = photos;
    },
    setUserColl(state, data) {
      state.userColl = data;
    },

    openUserPhotosModal(state, data) {
      state.userModalOpen = true;
      state.dataUserModal = data;
    },
    closeUserPhotosModal(state) {
      state.userModalOpen = false;
      state.modalUserImages = [];
    },
    setUserModalPhotos(state, photos) {
      state.modalUserImages = photos;
    },
  },
  actions: {
    async getUserData({ commit }, name) {
      try {
        const res = await unsplash.users.profile(name);
        const data = await res.json();
        if (data.code !== "404") {
          let userData = data;
          commit("setUserData", userData);
        } else {
          throw new Error("user error");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    closeUserModal({ commit }) {
      commit("closeUserPhotosModal");
    },
    openUserPhotosModal({ commit }, data) {
      commit("openUserPhotosModal", data);
    },
    async getUserLikesPhotos({ commit }, name) {
      try {
        const res = await unsplash.users.likes(name);
        const data = await res.json();
        if (data.cod !== "404") {
          commit("setLikesPhotos", data);
        }
      } catch (err) {
        console.log("getUserLikesPhotos", err);
      }
    },
    async getUserColls({ commit }, name) {
      try {
        const res = await unsplash.users.collections(name);
        const data = await res.json();
        if (data.cod !== "404") {
          commit("setUserColl", data);
        }
      } catch (err) {
        console.log("getUserCollections", err);
      }
    },
  },
};

export default user;
