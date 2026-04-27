import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, tierPresets } from "sponsorkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REFLECT_LOGO_BASE64 = readFileSync(resolve(__dirname, "assets/reflect/512x512.png")).toString(
  "base64",
);

const REFLECT_WIDTH = 128;
const REFLECT_HEIGHT = 128;
const REFLECT_LOGO = (width: number, y: number) => {
  const x = (width - REFLECT_WIDTH) / 2;
  return `
  <a href="https://reflect.app" class="sponsorkit-link" target="_blank" id="reflect">
    <clipPath id="reflect-clip">
      <rect x="${x}" y="${y}" width="${REFLECT_WIDTH}" height="${REFLECT_HEIGHT}" rx="25" ry="25" />
    </clipPath>
    <image width="${REFLECT_WIDTH}" height="${REFLECT_HEIGHT}" x="${x}" y="${y}" href="data:image/png;base64,${REFLECT_LOGO_BASE64}" clip-path="url(#reflect-clip)"/>
  </a>
`;
};

export default defineConfig({
  // Providers configs
  github: {
    login: "ocavue",
    type: "user",
  },

  // Rendering configs
  width: 400,
  renderer: "tiers", // or 'circles'
  formats: ["json", "svg", "png", "webp"],
  tiers: [
    // Past sponsors, currently only supports GitHub
    {
      title: "Past Sponsors",
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    {
      title: "Sponsors",
      preset: tierPresets.medium,
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 50,
      preset: tierPresets.large,
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 100,
      preset: tierPresets.xl,
    },
    {
      title: "Special Sponsor",
      monthlyDollars: Infinity,
      composeAfter(compose, _, config) {
        compose
          .addSpan(20)
          .addText("Special Sponsor", "sponsorkit-tier-title")
          .addRaw(REFLECT_LOGO(config.width!, compose.height))
          .addSpan(150);
      },
    },
  ],
});
