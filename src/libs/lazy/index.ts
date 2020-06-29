//
//  index.ts
//  ande
// 
//  Created by Wess Cope (wess@frenzylabs.com) on 06/29/20
//  Copyright 2020 Frenzy Labs, LLC
//

function lazy(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
) {
  const getter = descriptor.get
  if (!getter) {
    throw new Error(`@lazy must be applied to getter function`)
  }

  descriptor.get = function() {
    // eslint-disable-next-line prefer-rest-params
    const value = getter.apply(this, arguments)
    Object.defineProperty(this, propertyKey, { value })
    return value
  }
}

export default lazy
