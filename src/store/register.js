import unsplash from "../utils/unsplash";

const register = {
  state: {
    access: null,
    currentUser: null,
    collectionModalOpen: false,
    collectionData: [],
    currentUserCollections: null,
    currentAddingPhoto: null,
  },
  mutations: {
    setAccess(state, data) {
      state.access = data;
    },
    setCurrentUser(state, data) {
      state.currentUser = data;
    },

    deniedAccess(state) {
      state.access = null;
    },
    deniedCurrentUser(state) {
      state.currentUser = null;
    },

    setLoaded(state) {
      state.currentUser = "loaded";
    },

    openCollectionModal(state, data) {
      state.collectionModalOpen = true;
      state.currentUserCollections = data;
    },
    closeCollectionPhotosModal(state) {
      state.collectionModalOpen = false;
      state.currentUserCollections = null;
    },
    addCollection(state, data) {
      state.currentUserCollections.push(data);
    },
    currentAddingPhoto(state, id) {
      state.currentAddingPhoto = id;
    },
  },
  actions: {
    getToken() {
      const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "read_user",
        "write_user",
        "read_photos",
        "read_collections",
        "write_collections",
        "write_likes",
        "write_photos",
      ]);
      location.assign(authenticationUrl);
    },
    authorization({ commit }, token) {
      unsplash.auth
        .userAuthentication(token)
        .then((json) => {
          return json.json();
        })
        .then((data) => {
          // console.log(data);
          unsplash.auth.setBearerToken(data.access_token);
          if (data.error) {
            return;
          } else {
            commit("setLoaded");
            unsplash.currentUser
              .profile()
              .then((json) => {
                return json.json();
              })
              .then((data) => {
                commit("setCurrentUser", data);
                // console.log(data);
              });
            commit("setAccess", data);
          }
        });
    },
    refreshToken({ commit }, token) {
      unsplash.auth.setBearerToken(token);
      unsplash.currentUser
        .profile()
        .then((json) => {
          return json.json();
        })
        .then((data) => {
          commit("setCurrentUser", data);
        });
    },
    getCurrentUser({ commit }) {
      unsplash.currentUser
        .profile()
        .then((json) => {
          return json.json();
        })
        .then((data) => {
          commit("setCurrentUser", data);
        });
    },
    logOut({ commit, dispatch }) {
      commit("deniedCurrentUser");
      commit("deniedAccess");
      dispatch("logoutLikes");
    },
    async like({ dispatch }, id) {
      try {
        await unsplash.photos
          .likePhoto(id)
          .then((json) => json.json())
          .then((data) => {
            console.log(data);
            dispatch("photoLike", data);
          });
      } catch (err) {
        console.log(err);
      }
    },
    async unlike({ dispatch }, id) {
      try {
        await unsplash.photos
          .unlikePhoto(id)
          .then((json) => json.json())
          .then((data) => dispatch("photoDislike", data));
      } catch (err) {
        console.log(err);
      }
    },

    closeCollectionModal({ commit }) {
      commit("closeCollectionPhotosModal");
    },
    async openCollectionModal({ commit, state }, id) {
      const res = await unsplash.users.collections(state.currentUser.username);
      const data = await res.json();
      commit("currentAddingPhoto", id);
      commit("openCollectionModal", data);
    },
    async createCollection({ commit }, obj) {
      if (obj.desc) {
        let res = await unsplash.collections.createCollection(
          obj.title,
          obj.desc
        );
        const data = await res.json();
        console.log(data);
        commit("addCollection", data);
      } else {
        let res = await unsplash.collections.createCollection(obj.title);
        const data = await res.json();
        commit("addCollection", data);
      }
    },
    async addPhotoToCollection({ commit }, obj) {
      try {
        await unsplash.collections.addPhotoToCollection(
          obj.collId,
          obj.photoId
        );
        commit("closeCollectionPhotosModal");
      } catch (err) {
        console.log("addPhotoToCollection", err);
      }
    },
  },
};

export default register;
