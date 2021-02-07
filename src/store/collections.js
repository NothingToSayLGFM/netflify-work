import unsplash from "../utils/unsplash";

const collections = {
  state: {
    collections: [],
    singlCollection: [],
    singlUserData: null,
  },
  mutations: {
    addCollections(state, data) {
      state.collections.push(data);
    },
    addCollectionScroll(state, data) {
      state.collections[0].push(...data);
    },

    setSinglCollection(state, data) {
      state.singlCollection = [];
      state.singlCollection.push(...data);
    },
    setSinglCollectionScroll(state, data) {
      state.singlCollection.push(...data);
    },

    setSinglUserData(state, data) {
      state.singlUserData = data;
    },
  },
  actions: {
    async getCollections({ commit }, obj) {
      if (obj.count === undefined) {
        obj.count = 10;
      }
      if (obj.page === undefined) {
        obj.page = 1;
      }
      if (obj.page > 1) {
        const res = await unsplash.collections.listCollections(
          obj.page,
          obj.count,
          "featured"
        );
        const data = await res.json();
        if (data.cod !== "404") {
          let collections = data.map((item) => {
            return { ...item };
          });
          commit("addCollectionScroll", collections);
        } else {
          throw new Error("collection error");
        }
      } else {
        const res = await unsplash.collections.listCollections(
          obj.page,
          obj.count,
          "featured"
        );
        const data = await res.json();
        if (data.cod !== "404") {
          let collections = data.map((item) => {
            return { ...item };
          });
          commit("addCollections", collections);
        } else {
          throw new Error("collection error");
        }
      }
    },
    async getSinglCollection({ commit }, id) {
      try {
        const res = await unsplash.collections.getCollectionPhotos(id);
        const data = await res.json();
        if (data.cod !== "404") {
          let collection = data.map((item) => {
            return { ...item };
          });
          commit("setSinglCollection", collection);
        }
      } catch (err) {
        console.log("getSinglCollection error", err);
      }
    },

    async getSinglCollectionScroll({ commit }, some) {
      if (some.page === undefined) {
        return;
      }
      try {
        const res = await unsplash.collections.getCollectionPhotos(
          some.id,
          some.page,
          some.count
        );
        const data = await res.json();
        if (data.cod !== "404") {
          let collection = data.map((item) => {
            return { ...item };
          });
          commit("setSinglCollectionScroll", collection);
        }
      } catch (err) {
        console.log("getSinglCollection error", err);
      }
    },

    async getUserData({ commit }, id) {
      try {
        const res = await unsplash.collections.getCollection(id);
        const data = await res.json();
        if (data.cod !== "404") {
          commit("setSinglUserData", data);
        } else {
          throw new Error("collection error");
        }
      } catch (err) {
        console.log("getUserData error", err);
      }
    },
  },
};

export default collections;
