import unsplash from "../utils/unsplash";

const modalWindow = {
  state: {
    dataModal: "",
    isPhotosModalOpen: false,
    modalImages: [],
    chartsData: null,
    scrollImages: [],
  },
  mutations: {
    setChartsData(state, data) {
      state.chartsData = data;
    },
    openPhotosModal(state, data) {
      state.isPhotosModalOpen = true;
      state.dataModal = data;
    },
    closePhotosModal(state) {
      state.isPhotosModalOpen = false;
      state.modalImages = [];
      state.scrollImages = [];
    },
    setModalPhotos(state, photos) {
      state.modalImages = photos;
    },

    setScrollImages(state, data) {
      state.modalImages.push(...data);
    },
  },
  actions: {
    async getChartsData({ commit }, id) {
      try {
        const res = await unsplash.photos.getPhotoStats(id);
        const data = await res.json();
        if (data.cod !== "404") {
          let chartData = {
            views_count: data.views.total,
            views_history: { ...data.views.historical },
            like_count: data.likes.total,
            likes_history: { ...data.likes.historical },
            downloads_count: data.downloads.total,
            downloads_history: { ...data.downloads.historical },
          };
          commit("setChartsData", chartData);
        } else {
          throw new Error("chart error");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getModalPhotos({ commit }, category) {
      try {
        const res = await unsplash.search.photos(category);
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
            };
          });
          commit("setModalPhotos", photos);
        } else {
          throw new Error("modal error");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getScrollPhotos({ commit }, obj) {
      try {
        const res = await unsplash.search.photos(obj.page, obj.cat);
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
            };
          });
          commit("setScrollImages", photos);
        } else {
          throw new Error("modal error");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    closeModal({ commit }) {
      commit("closePhotosModal");
    },
    openPhotosModal({ commit }, data) {
      commit("openPhotosModal", data);
    },
  },
};

export default modalWindow;
