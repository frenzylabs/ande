//
//  statements.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/29/20
//  Copyright 2020 Wess Cope
//

import Tokens from './tokens'

enum Statements {
  import = Tokens.CALL 
           + Tokens.IMPORT
           + Tokens.LEFT_PARAN
           + "{macro_name}"
           + Tokens.RIGHT_PARAN 
}

export default Statements
