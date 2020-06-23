//
//  language.ts
//  marshal
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/12/20
//  Copyright 2020 Frenzy Labs, LLC
//

import {languages} from 'monaco-editor'


export const id = 'gcodes'

languages.register({id})

languages.setMonarchTokensProvider(id, {
  tokenizer: {
    root: [
      [/[G]([ \t]*[\d])*[ \t]*/, 'attribute.name'],
      [/[M]([ \t]*[\d])*[ \t]*/, 'key'],
      [/[X|Y|Z](\+?[\d]*\-?[\d]*\.?[\d]*)/, 'attribute.value'],
      [/[E](\+?[\d]*\-?[\d]*\.?[\d]*)/, 'attribute.value.number.css'],
      [/[F](\+?[\d]*\-?[\d]*\.?[\d]*)/, 'attribute.value.number.css'],
      [/[S]([ \t]*[\d])*[ \t]*/, 'keyword'],
      [/;.*/, 'comment']
    ]
  }
})
