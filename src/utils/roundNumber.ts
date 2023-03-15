export const roundNumber = (number: string | number, precision = 5) =>
  Number(
    (Math.round(Number(number) * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(
      precision,
    ),
  )
