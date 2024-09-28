import { randomBytes } from 'crypto'

/**
 * Fungsi pembantu untuk menghasilkan string acak alfanumerik sepanjang 6 karakter
 * Menggunakan crypto.randomBytes untuk menghasilkan angka acak yang lebih aman
 * @param length Jumlah karakter yang diinginkan dalam kunci
 * @returns String acak alfanumerik sepanjang `length` karakter
 */
export function random(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = randomBytes(length)
  let result = ''

  for (let i = 0; i < length; i++) {
    const index = bytes[i] % chars.length
    result += chars.charAt(index)
  }

  return result
}
