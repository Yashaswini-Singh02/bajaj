export interface ApiResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: number[];
  alphabets: string[];
  highest_lowercase_alphabet: string | null;
  file_valid: boolean;
  file_mime_type: string | null;
  file_size_kb: number | null;
}
