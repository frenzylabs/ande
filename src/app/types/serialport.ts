//
//  serialport.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/05/20
//  Copyright 2020 Wess Cope
//

export const Serialport  = window.require("serialport")
export const Binding     = window.require('@serialport/bindings')

Serialport.Binding = Binding

export default Serialport
