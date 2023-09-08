import { config } from './config';
import { loadImg, findNextPrime } from './utils';

export const decodeMessageFromImage = async (image: HTMLImageElement | string): Promise<string> => {
   // Handle image url
   if (typeof image === 'string') {
      image = await loadImg(image);
   } else if (image.src) {
      image = await loadImg(image.src);
   } else if (!(image instanceof HTMLImageElement)) {
      throw new Error('IllegalInput: The input image is neither an URL string nor an image.');
   }

   const { t, threshold, codeUnitSize } = config;
   const prime = findNextPrime(Math.pow(2, t));

   if (!t || t < 1 || t > 7) {
      throw new Error(`IllegalOptions: Parameter t = ${t} is not valid: 0 < t < 8`);
   }

   const shadowCanvas = document.createElement('canvas');
   const shadowCtx = shadowCanvas.getContext('2d');

   if (!shadowCtx) throw new Error('Shadow canvas context not available!');

   shadowCanvas.style.display = 'none';
   //TEMP
   const width = 1200;
   const height = 1200;

   shadowCanvas.width = width;
   shadowCanvas.height = width;
   shadowCtx.drawImage(image, 0, 0, width, height);

   const imageData = shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height);
   const data = imageData.data;
   const modMessage = [];

   let i, done;
   for (i = 3, done = false; !done && i < data.length && !done; i += 4) {
      done = config.messageCompleted(data, i, threshold);
      if (!done) modMessage.push(data[i] - (255 - prime + 1));
   }

   let message = '';
   let charCode = 0;
   let bitCount = 0;
   const mask = Math.pow(2, codeUnitSize) - 1;
   for (i = 0; i < modMessage.length; i += 1) {
      charCode += modMessage[i] << bitCount;
      bitCount += t;
      if (bitCount >= codeUnitSize) {
         message += String.fromCharCode(charCode & mask);
         bitCount %= codeUnitSize;
         charCode = modMessage[i] >> (t - bitCount);
      }
   }
   if (charCode !== 0) message += String.fromCharCode(charCode & mask);

   return message;
};
