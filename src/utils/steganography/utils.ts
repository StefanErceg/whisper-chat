export const isPrime = (n: number): boolean => {
   if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
   if (n % 2 === 0) return n === 2;
   if (n % 3 === 0) return n === 3;
   const m = Math.sqrt(n);
   for (let i = 5; i <= m; i += 6) {
      if (n % i === 0) return false;
      if (n % (i + 2) === 0) return false;
   }
   return true;
};

export const findNextPrime = (n: number): number => {
   for (let i = n; true; i += 1) {
      if (isPrime(i)) return i;
   }
};

export const sum = (func: (x: number) => number, end: number, options?: { start?: number; inc?: number; defValue?: number }): number => {
   let sum = 0;
   options = options || {};
   for (let i = options.start || 0; i < end; i += options.inc || 1) {
      sum += func(i) || 0;
   }
   return sum === 0 && options.defValue ? options.defValue : sum;
};

export const product = (
   func: (x: number) => number,
   end: number,
   options?: { start?: number; inc?: number; defValue?: number }
): number => {
   let prod = 1;
   options = options || {};
   for (let i = options.start || 0; i < end; i += options.inc || 1) {
      prod *= func(i) || 1;
   }
   return prod === 1 && options.defValue ? options.defValue : prod;
};

export const createArrayFromArgs = (args: (i: number) => any, index: number, threshold: number): any[] => {
   const ret: any[] = new Array(threshold - 1);
   for (let i = 0; i < threshold; i += 1) {
      ret[i] = args(i >= index ? i + 1 : i);
   }
   return ret;
};

export const loadImg = async (url: string): Promise<HTMLImageElement> =>
   new Promise((resolve, _) => {
      const image = new Image();
      image.src = url;
      image.crossOrigin = 'Anonymous';
      setTimeout(() => {
         resolve(image);
      }, 100);
   });
