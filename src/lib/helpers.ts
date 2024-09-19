export const getRandomInt = (min: number = 1, max: number = 10000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
export const getRandomElement = (arr: Array<any>) =>
  arr[Math.floor(Math.random() * arr.length)];

export const formatAmount = (amount: string | number): string => {
  let num: number;

  // Convert the input to a number
  if (typeof amount === 'string') {
    num = parseFloat(amount.replace(/,/g, ''));
  } else {
    num = amount;
  }

  // Check if the conversion is successful and the result is a number
  if (isNaN(num)) {
    return '$0.00';
  }

  // Format the number to two decimal places and add the dollar sign in American standard
  const formattedAmount = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `$${formattedAmount}`;
};


export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024; // Base unit for conversion
  const dm = decimals < 0 ? 0 : decimals; // Decimal places
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // Units

  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine unit index
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]; // Format size
};

export const fileToNewBlob = (file: File): Blob => {
  // Create a new Blob from the file's contents
  return new Blob([file], { type: file.type });
};