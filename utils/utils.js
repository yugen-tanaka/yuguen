


export const getPlatformInfo = (platformId, platformsData) => {
  return platformsData.find(p => p.id === platformId);
};


export const formatDate = (date) => {
  if (!date) return '';
  return date.replaceAll('-', '.');
};


export const formatReleaseType = (releaseType, lang='ja') => {
    const allowedLangs = ['ja', 'en'];
    if (!allowedLangs.includes(lang)) {
      lang = 'en';
    }
    typeDict = {'album': {'ja': 'アルバム', 'en': 'Album'}, 'single': {'ja': 'シングル', 'en': 'Single'}}
    const releaseTypeText = typeDict[releaseType][lang]
    
    return releaseTypeText

};