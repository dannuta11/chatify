import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      // turns a rule on with no configuration (i.e. uses the default configuration)
      "@typescript-eslint/array-type": "error",
      // turns on a rule with configuration
      "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
      "no-undef": "off",
    },
  },
);
