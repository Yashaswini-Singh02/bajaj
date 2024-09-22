export const validateBase64File = (base64: string | null) => {
  if (!base64) {
    return { isValid: false, mimeType: null, sizeKB: null };
  }

  try {
    const matches = base64.match(/^data:(.*);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
      return { isValid: false, mimeType: null, sizeKB: null };
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], "base64");
    const sizeKB = buffer.length / 1024;

    return { isValid: true, mimeType, sizeKB };
  } catch {
    return { isValid: false, mimeType: null, sizeKB: null };
  }
};
