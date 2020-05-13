//
//  index.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/13/20
//  Copyright 2020 Wess Cope
//

import NeDB from 'nedb'

import {
  FileSystem,
  Env
} from '../system'

const {path} = FileSystem

export default class {
  datastore = new NeDB({
    filename: path.join(Env.directory.user, '.hstore'),
    autoload: true
  })
}
