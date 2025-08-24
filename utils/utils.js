export const getPlatformInfo = (platformId, platformsData) => {
  return platformsData.find((p) => p.id === platformId);
};

export const formatDate = (date) => {
  if (!date) return "";
  return date.replaceAll("-", ".");
};

export const formatReleaseType = (releaseType, lang = "ja") => {
  const allowedLangs = ["ja", "en"];
  if (!allowedLangs.includes(lang)) {
    lang = "en";
  }
  const typeDict = {
    album: { ja: "アルバム", en: "Album" },
    single: { ja: "シングル", en: "Single" },
    ep: { ja: "EP", en: "EP"}
  };
  const releaseTypeText = typeDict[releaseType][lang];

  return releaseTypeText;
};

export const formatReleaseCategory = (releaseCategory, lang = "ja") => {
  const allowedLangs = ["ja", "en"];
  if (!allowedLangs.includes(lang)) {
    lang = "en";
  }
  const categoryDict = {
    "piano": { "ja": "ピアノ", "en": "Piano" },
    "instrumental": { "ja": "インスト", "en": "Instrumental" },
    "vocal": { "ja": "歌もの", "en": "Vocals" },
  };
  const releaseCategoryText = categoryDict[releaseCategory][lang];
  if (!releaseCategoryText) {
    return "";
  }
  return releaseCategoryText;
};
