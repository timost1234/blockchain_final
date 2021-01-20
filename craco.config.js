const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 'primary-color': '#000000', // primary color for all components
              "link-color": "#000000", // link color
              "success-color": "#52c41a", // success state color
              "warning-color": "#faad14", // warning state color
              "error-color": "#f5222d", // error state color
              "font-size-base": "16px", // major text font size 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};