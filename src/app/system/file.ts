//
//  file.tsx
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/11/20
//  Copyright 2020 Wess Cope
//

import { Fn } from "johnny-five"

export const remote    = window.require('electron').remote
export const path      = remote.require('path')
export const fs        = remote.require('fs-extra')
// const klaw      = remote.require('klaw')
// const through2  = remote.require('through2')



export const walk = (root, key = "0", parent: any | null = null) => {
  if(!fs.existsSync(root)) {
    console.error("NO FILE")
    return
  }

  const stats = fs.lstatSync(root)

  if(!stats.isDirectory()) {
    var _parent = parent

    delete _parent['children']

    return {
      type:   'file',
      title:  path.basename(root),
      name:   path.basename(root),
      path:   root,
      key:    key,
      parent: _parent,
      isLeaf: true
    }
  } else {
    
    var entry = {
      type:     'directory',
      title:    path.basename(root),
      name:     path.basename(root),
      path:     root,
      key:      key,
      parent:   parent
    }

    const children = 
      fs.readdirSync(root)
      .filter(child => child.substring(0, 1) != '.')
      .map((child, i) => walk(path.join(root, child), `${key}-${i}`, entry))

    return {
      ...entry,
      children
    }
  }
}

export default {
  fs, 
  path,
  walk
}
