import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "vite.config.js", "vite.config.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "vite.config.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        HTMLFormElement: "readonly",
        import: "readonly",
        window: "readonly",
      },
    },
  },
);
