const {
  useBabelRc,
  override,
  fixBabelImports,
  addPostcssPlugins,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

// Import your eslint configuration here
const eslintConfig = require("./.eslintrc.js");

const useEslintConfig = (configRules) => (config) => {
  const updatedRules = config.module.rules.map((rule) => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    if (
      rule.use &&
      rule.use.some((use) => use.options && use.options.useEslintrc !== void 0)
    ) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules },
      };
      ruleUse.options = newOptions;
      return rule;

      // Rule not using eslint. Do not modify.
    } else {
      return rule;
    }
  });

  config.module.rules = updatedRules;
  return config;
};

const HtmlWebPackPlugin = require('html-webpack-plugin');


const addHtmlWebPackPlugin = config => {
  config.plugins.push(new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html',
    hash: true
  }));
  return config;
};

module.exports = override(
  useEslintConfig(eslintConfig), // Use your imported .eslintrc.js file here
  useBabelRc(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    cmp: path.resolve(__dirname, "src/components"),
    pages: path.resolve(__dirname, "src/pages"),
  }),
  addPostcssPlugins([
    require("tailwindcss")({
      important: true,
      purge: false,
      future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
      },
      theme: {
        screens: {
          xs: "480px",
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1200px",
          xxl: "1600px",
        },

        extend: {
          colors: {
            gray: {
              500: "#c5c5c5",
            },
            blue: {
              700: "#26457a",
              600: "#73829F",
            },

            gold: {
              500: "#cfc493",
            },
            red: {
              50: "#FFF5E5",
            },
          },
          boxShadow: {
            custom: "0px 0px 6px rgba(137, 137, 137, 0.25)",
          },
          maxHeight: {
            450: "450px",
          },
          minHeight: {
            450: "450px",
            500: "500px",
            800: "800px",
          },
          maxWidth: {
            1200: "1200px",
            1440: "1440px",
          },
          height: {
            700: "700px",
          },
          zIndex: {
            negative: "-1",
          },
          borderWidth: {
            10: "10px",
          },
          borderRadius: {
            "4xl": "2.5rem",
          },
        },
      },
    }),
  ]),
  addHtmlWebPackPlugin
);
