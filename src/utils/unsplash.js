import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: process.env.VUE_APP_UNSPLASH_API_KEY,
  secret: process.env.VUE_APP_UNSPLASH_API_SECRET,
  callbackUrl:
    "https://602070315610f9b2254b19e0--upbeat-wozniak-486305.netlify.app/",
});

export default unsplash;
