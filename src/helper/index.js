export const max = numbers => 
  numbers.length > 0 ? Math.max(...numbers) : 0;

export const sleep = ms => 
  new Promise(resolve => setTimeout(resolve, ms));