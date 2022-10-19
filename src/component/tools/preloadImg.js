const preload = async (images) => Promise.all(
  images.map((source) => new Promise((resolve, reject) => {
    const img = new Image();
    img.src = source;
    img.onload = () => resolve(img);
    img.onerror = (event) => reject(event);
  })),
);

export default preload;
