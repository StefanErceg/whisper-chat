export const config = {
   t: 3,
   threshold: 1,
   codeUnitSize: 16,
   args: function (i: number) {
      return i + 1;
   },
   messageDelimiter: function (modMessage: any, threshold: number) {
      var delimiter = new Array(threshold * 3);
      for (var i = 0; i < delimiter.length; i += 1) delimiter[i] = 255;

      return delimiter;
   },
   messageCompleted: function (data: any, i: number, threshold: number) {
      var done = true;
      for (var j = 0; j < 16 && done; j += 1) {
         done = done && data[i + j * 4] === 255;
      }
      return done;
   },
};
