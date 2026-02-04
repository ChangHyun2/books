// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontSize: {
        "title-1": ["24px", { lineHeight: "24px", fontWeight: "700" }],
        "title-2": ["22px", { lineHeight: "24px", fontWeight: "700" }],
        "title-3": ["18px", { lineHeight: "18px", fontWeight: "700" }],
        "body-1": ["20px", { lineHeight: "20px", fontWeight: "500" }],
        "body-2": ["14px", { lineHeight: "14px", fontWeight: "500" }],
        caption: ["16px", { lineHeight: "16px", fontWeight: "500" }],
        small: ["10px", { lineHeight: "10px", fontWeight: "500" }],
      },
    },
  },
};

export default config;
