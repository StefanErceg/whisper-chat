import { config } from './config';
import { loadImg, findNextPrime } from './utils';

export const encode = (message: string, image: HTMLImageElement | string): Promise<string> => {
   return new Promise((resolve, reject) => {
      try {
         const result = encodeMessageIntoImage(message, image);
         resolve(result);
      } catch (err) {
         reject(err);
      }
   });
};

export const encodeMessageIntoImage = (message: string, image: HTMLImageElement | string): Promise<string> =>
   new Promise(async (resolve, reject) => {
      try {
         if (typeof image === 'string') {
            image = await loadImg(image);
         } else if (image.src) {
            image = await loadImg(image.src);
         } else if (!(image instanceof HTMLImageElement)) {
            throw new Error('IllegalInput: The input image is neither an URL string nor an image.');
         }

         const { t, threshold, codeUnitSize, args, messageDelimiter } = config;

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
         shadowCanvas.height = height;
         shadowCtx.drawImage(image, 0, 0, width, height);

         const imageData = shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height);
         const data = imageData.data;

         const bundlesPerChar = (codeUnitSize / t) >> 0;
         const overlapping = codeUnitSize % t;
         const modMessage = [];
         let decM, oldDec, oldMask, left, right;
         let dec, curOverlapping, mask;

         for (let i = 0; i <= message.length; i += 1) {
            dec = message.charCodeAt(i) || 0;
            curOverlapping = (overlapping * i) % t;
            if (curOverlapping > 0 && oldDec) {
               mask = Math.pow(2, t - curOverlapping) - 1;
               oldMask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -curOverlapping));
               left = (dec & mask) << curOverlapping;
               right = (oldDec & oldMask) >> (codeUnitSize - curOverlapping);
               modMessage.push(left + right);

               if (i < message.length) {
                  mask = Math.pow(2, 2 * t - curOverlapping) * (1 - Math.pow(2, -t));
                  for (let j = 1; j < bundlesPerChar; j += 1) {
                     decM = dec & mask;
                     modMessage.push(decM >> ((j - 1) * t + (t - curOverlapping)));
                     mask <<= t;
                  }
                  if ((overlapping * (i + 1)) % t === 0) {
                     mask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -t));
                     decM = dec & mask;
                     modMessage.push(decM >> (codeUnitSize - t));
                  } else if (((overlapping * (i + 1)) % t) + (t - curOverlapping) <= t) {
                     decM = dec & mask;
                     modMessage.push(decM >> ((bundlesPerChar - 1) * t + (t - curOverlapping)));
                  }
               }
            } else if (i < message.length) {
               mask = Math.pow(2, t) - 1;
               for (let j = 0; j < bundlesPerChar; j += 1) {
                  decM = dec & mask;
                  modMessage.push(decM >> (j * t));
                  mask <<= t;
               }
            }
            oldDec = dec;
         }

         let offset,
            index,
            subOffset = 0;
         const delimiter = messageDelimiter(modMessage, threshold);
         let q,
            qS = [];

         for (offset = 0; (offset + threshold) * 4 <= data.length && offset + threshold <= modMessage.length; offset += threshold) {
            qS = [];
            for (let i = 0; i < threshold && i + offset < modMessage.length; i += 1) {
               q = 0;
               for (let j = offset; j < threshold + offset && j < modMessage.length; j += 1) {
                  q += modMessage[j] * Math.pow(args(i), j - offset);
               }
               qS[i] = 255 - prime + 1 + (q % prime);
            }
            for (let i = offset * 4; i < (offset + qS.length) * 4 && i < data.length; i += 4) {
               data[i + 3] = qS[(i / 4) % threshold];
            }

            subOffset = qS.length;
         }

         for (
            index = offset + subOffset;
            index - (offset + subOffset) < delimiter.length && (offset + delimiter.length) * 4 < data.length;
            index += 1
         ) {
            data[index * 4 + 3] = delimiter[index - (offset + subOffset)];
         }

         for (let i = (index + 1) * 4 + 3; i < data.length; i += 4) {
            data[i] = 255;
         }

         imageData.data.set(data);
         shadowCtx.putImageData(imageData, 0, 0);

         resolve(shadowCanvas.toDataURL());
      } catch (err) {
         reject(err);
      }
   });
