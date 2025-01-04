import { createMedia } from "@tamagui/react-native-media-driver";
import { createFont, createTamagui, createTokens } from "tamagui";

// Gemeinsame Eigenschaften für die Schriftarten
const sharedFontProps = {
  size: {
    1: 14,
    2: 16,
    3: 18,
    true: 16,
  },
  lineHeight: {
    1: 20,
    2: 24,
    3: 28,
    true: 24,
  },
  weight: {
    1: "400",
    2: "500",
    3: "700",
    true: "500",
  },
};

const openFont = createFont({
  family: "Open, Helvetica, Arial, sans-serif",
  ...sharedFontProps,
});

const robotoFont = createFont({
  family: "Roboto, Helvetica, Arial, sans-serif",
  ...sharedFontProps,
});

const size = {
  0: 0,
  1: 5,
  2: 10,
  3: 15,
  4: 20,
  5: 25,
  true: 10,
};

export const tokens = createTokens({
  size,
  space: { ...size, "-1": -5, "-2": -10 },
  radius: { 0: 0, 1: 4, 2: 8 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    backgroundColor: "#ffffff",
    tileBgColor: "#F2F2F2",
    hoverColor: "#e3f2fd",

    inputBgColor: "#ffffff",

    parcelColor: "#D2B7A5",
    parcelColor2: "#95887B",
    darkColor: "#383735",

    accentColor: "#E30614",

    successColor: "#C6F6D5",

    invertedColor: "#ffffff",

    textColor: "#3B3A38",
    invertedTextColor: "#ffffff",

    disabledColor: "#D7D7D7",
    disabledColor2: "#D3D3D3",
    disabledColor3: "#a8a8a8",
  },
});

const tamaguiConfig = createTamagui({
  fonts: {
    heading: robotoFont,
    body: openFont,
  },
  tokens,

  themes: {
    light: {
      bg: tokens.color.backgroundColor,
      tileBg: tokens.color.tileBgColor,
      hoverBg: tokens.color.hoverColor,
      inputBg: tokens.color.inputBgColor,

      text: tokens.color.textColor,
      invertedText: tokens.color.invertedTextColor,
      disabledText: tokens.color.disabledColor3,

      disabled: tokens.color.disabledColor3,

      parcel: tokens.color.parcelColor,
      parcel2: tokens.color.parcelColor2,
      dark: tokens.color.darkColor,

      accent: tokens.color.accentColor,
      success: tokens.color.successColor,
    },
    dark: {
      bg: tokens.color.darkColor,
      tileBg: tokens.color.parcelColor,
      hoverBg: tokens.color.parcelColor2,

      text: tokens.color.invertedTextColor,
      invertedText: tokens.color.textColor,
      disabledText: tokens.color.disabledColor3,

      disabled: tokens.color.disabledColor3,

      parcel: tokens.color.parcelColor2,
      parcel2: tokens.color.parcelColor,
      dark: "#111",

      accent: tokens.color.accentColor,
      success: tokens.color.successColor,
    },
  },

  media: createMedia({
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 861 },
    short: { maxHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),

  shorthands: {
    px: "paddingHorizontal",
    f: "flex",
    m: "margin",
    w: "width",
  } as const,
});

export default tamaguiConfig;
