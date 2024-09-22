import { Request, Response } from "express";
import { BFHLResponse } from "../models/bfhl.model";
import { validateBase64File } from "../utils/functions/validate-b64";

export const handleStringFilter = (req: Request, res: Response) => {
  try {
    const { data, file_b64 } = req.body;

    const userId = `yashaswini_singh_shaktawat_02012003`;

    const numbers: number[] = [];
    const alphabets: string[] = [];

    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        if (parseInt(item) || parseInt(item) === 0) {
          numbers.push(item);
        } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
          alphabets.push(item);
        }
      });
    }

    const lowercaseAlphabets = alphabets.filter(
      (char) => char === char.toLowerCase()
    );
    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0
        ? lowercaseAlphabets.sort().reverse()[0]
        : null;

    const { isValid, mimeType, sizeKB } = validateBase64File(file_b64);

    const response: BFHLResponse = {
      is_success: true,
      user_id: userId,
      email: "ys1211@srmist.edu.in",
      roll_number: "RA2111004010402",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      file_valid: isValid,
      file_mime_type: mimeType,
      file_size_kb: sizeKB,
    };

    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      is_success: false,
      message: error.message,
    });
  }
};

export const handleFetchOperation = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      operation_code: 1,
    });
  } catch (error: any) {
    return res.status(500).json({
      is_success: false,
      message: error.message,
    });
  }
};
