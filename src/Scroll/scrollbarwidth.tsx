function scrollbarWidth() {
  if (typeof document === 'undefined') {
    return 0;
  }

  const body = document.body;
  const div = document.createElement('div');
  const boxStyle = div.style;

  boxStyle.position = 'absolute';
  boxStyle.top = boxStyle.left = '-9999px';
  boxStyle.width = boxStyle.height = '100px';
  boxStyle.overflow = 'scroll';

  body.appendChild(div);

  const width = div.offsetWidth - div.clientWidth;
  // console.log(div.offsetWidth, div.clientWidth);

  body.removeChild(div);

  return width;
}
export { scrollbarWidth };
