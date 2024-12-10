export const validateRpcUrl = (url: string): boolean | string => {
    try {
      new URL(url);
      return true;
    } catch {
      return 'Please enter a valid URL';
    }
  };
  
  export const validateKeypair = (keypairString: string): boolean => {
    try {
      const secretKey = new Uint8Array(JSON.parse(keypairString));
      return secretKey.length === 64;
    } catch {
      return false;
    }
  };