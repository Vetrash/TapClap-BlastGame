const preloadFont = () => {
  const myFont = new FontFace('Marvin', 'url(../../assets/fonts/Marvin.woff)');
  myFont.load()
    .then((font) => {
      document.fonts.add(font);
    });
};

export default preloadFont;
