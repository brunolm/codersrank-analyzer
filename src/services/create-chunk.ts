export const createChunk = <T>(arr: T[], chunkSize: number) => {
  let result: Array<Array<T>> = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }

  return result
}
