declare module 'array-range' {
  /**
   * Creates an array of numbers from start to end-1.
   * If only one argument is provided, it creates an array from 0 to start-1.
   * If no arguments are provided, it creates an empty array.
   *
   * @param start - The start number (inclusive).
   * @param end - The end number (exclusive).
   * @returns An array of numbers from start to end-1.
   */
  function range(start?: number, end?: number): number[]
  export = range
}
