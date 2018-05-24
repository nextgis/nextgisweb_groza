// import {setOptions} from 'leaflet';
//
// const ImageNgwOverlay = L.ImageOverlay.extend({
//   initialize: function (url, options) {
//     this._url = url;
//     setOptions(this, options);
//   },
//
//   onAdd: function () {
//     if (!this._image) {
//       this._initImage();
//
//       if (this.options.opacity < 1) {
//         this._updateOpacity();
//       }
//     }
//
//     if (this.options.interactive) {
//       addClass(this._image, 'leaflet-interactive');
//       this.addInteractiveTarget(this._image);
//     }
//
//     this.getPane().appendChild(this._image);
//     this._reset();
//   }
// });
//
// L.ImageOverlay.ImageNgwOverlay = ImageNgwOverlay;
//
// L.ImageOverlay.imageNgwOverlay = function () {
//   return new ImageNgwOverlay();
// };
//
// export default ImageNgwOverlay;
