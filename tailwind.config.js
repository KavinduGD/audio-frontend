/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        roboto_slab: ["Roboto Slab"],
        barlows: ["Barlow Semi Condensed"],
        crimsonPro: ["Crimson Pro"],
        rowdies: ["Rowdies"],
        amazon_ember: ["Amazon Ember"],
        amazon_ember_cd_rc: ["Amazon Ember Cd RC"],
        amazon_ember_display: ["Amazon Ember Display"],
        amazon_ember_duospace: ["Amazon Ember Duospace"],
        amazon_ember_mono: ["Amazon Ember Mono"],
        amazon_ember_v2: ["Amazon Ember V2"],
      },
      colors: {
        light_black: "#16191f",
        light_grey: "#545b64",
        dark_white: "#EAEDED",
        dark_grey: "#D5DBDB",
        button_yellow: "#FF9900",
        success_green: "#1e8900",
        error_red: "#d13212",
        text_blue: "#0073bb",
        box_top_color: "#21252C",
        box_bottom_color: "#2A2E33",
      },
    },
  },
  plugins: [],
};

// font-family: 'Amazon Ember', sans-serif;
// font-family: 'Amazon Ember Cd RC', sans-serif;
// font-family: 'Amazon Ember Display', sans-serif;
// font-family: 'Amazon Ember Duospace', sans-serif;
// font-family: 'Amazon Ember Mono', sans-serif;
// font-family: 'Amazon Ember V2', sans-serif;
