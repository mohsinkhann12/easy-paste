export const getClips = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["clips"], (result) => {
      resolve(result.clips || []);
    });
  });
};

export const saveClip = (clip) => {
  return new Promise((resolve) => {
    getClips().then((clips) => {
      if (clips.length >= 10) return resolve();
      const newClips = [...clips, clip];
      chrome.storage.sync.set({ clips: newClips }, () => resolve());
    });
  });
};

export const deleteClip = (index) => {
  return new Promise((resolve) => {
    getClips().then((clips) => {
      const newClips = clips.filter((_, i) => i !== index);
      chrome.storage.sync.set({ clips: newClips }, () => resolve());
    });
  });
};