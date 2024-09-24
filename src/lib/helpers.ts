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

export interface EvaluateType {
  type: string;
  score: number;
}

export function evaluatePasswordStrength(password: string): EvaluateType {
  let score = 0;

  if (!password) return { type: 'Weak', score: score };

  // Check password length
  if (password.length > 8) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return { type: 'Weak', score: score };
    case 3:
      return { type: 'Medium', score: score };
    case 4:
      return { type: 'Strong', score: score };
    case 5:
      return { type: 'Very Strong', score: score };
    default:
      return { type: '', score: -1 };
  }
}
