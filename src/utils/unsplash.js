import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: process.env.VUE_APP_UNSPLASH_API_KEY,
  secret: process.env.VUE_APP_UNSPLASH_API_SECRET,
  callbackUrl: "https://pysarenko-ia.groupbwt.dev/",
});

export default unsplash;
