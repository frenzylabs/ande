//
//  baudrate.ts
//  matter
// 
//  Created by Wess Cope (me@wess.io) on 04/15/20
//  Copyright 2020 Wess Cope
//


export const Baudrates = [
  2_000_000,
  1_500_000,
  1_382_400,
  1_000_000,
  921_600,
  500_000,
  460_800,
  256_000,
  250_000,
  230_400,
  128_000,
  115_200,
  111_112,
  76_800,
  57_000,
  56_000,
  38_400,
  28_800,
  19_200,
  14_400,
  9600 
]

export type Baudrate = typeof Baudrates[number]
