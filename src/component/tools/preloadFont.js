const preloadFont = () => {
  const myFont = new FontFace('Marvin', 'url(../../assets/fonts/Marvin.woff)');
  myFont.load()
    .then((font) => {
      document.fonts.add(font);
      console.log('Font loaded');
    });
};

export default preloadFont;
