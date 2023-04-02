const ids = [23, 25, 29, 40, 84, 111, 112, 113, 152, 175, 179, 180, 200, 225, 237, 239, 244, 306, 309, 312];

export const getRandomPhotoId = () => {
  return ids[Math.floor(Math.random() * ids.length)];
};

export const getBlurredPhotoUrl = (id) => {
  return `https://picsum.photos/id/${id}/100/?blur=10`;
};

