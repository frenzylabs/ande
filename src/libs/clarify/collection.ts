
//  collection.ts
//  hum

//  Created by Wess Cope (me@wess.io) on 05/26/20
//  Copyright 2020 Wess Cope


class Collection<T = []> {
  private _data:Array<T> = []

  constructor(protected data: T[] = []) {
    this._data = data

    return new Proxy(this, this)
  }

  public get(target:any, property:string, receiver:any) {
    const collectionMethod = (<any> Collection.prototype)[property]

    if(collectionMethod) {
      return collectionMethod.bind(receiver)
    }

    return target.hasOwnProperty(property) 
            ? this[property] 
            : this._data[property]
  }

  
  public has(target:any, property:string) {
    return target.indexOf(property) > -1
  }

  /// Custom
  public toArray(): T[] {
    return this._data
  }

  public all():T[] {
    return this.toArray()
  }

  public at(index:number, defaultValue?:T): T | null {
    return this._data[index] || defaultValue
  }

  public take(amount: number): Collection<T> {
    return new Collection<T>(
      this._data.slice(0, Math.max(0, amount))
    )
  }

  public skip(amount: number): Collection<T> {
    return new Collection<T>(
      this._data.slice(Math.max(0, amount))
    )
  }

  public first(defaultValue?:any): T | null {
    return this.at(0, defaultValue)
  }

  public last(defaultValue?:T): T | null {
    return this.at(this._data.length - 1, defaultValue)
  }

  public add(addition:T | T[]):Collection<T> {
    var thisCopy = this._data

    thisCopy.concat(
      Array.isArray(addition) ? addition as T[] : [addition as T]
    )

    return new Collection<T>(thisCopy)
  }

  public insert(item:T, atIndex:number): Collection<T> | Error {
    if(atIndex < 0 || atIndex > this._data.length) {
      throw new Error(`Index ${atIndex} is out of range`)
    }

    var thisCopy = this._data
    thisCopy.splice(atIndex, 0, item)

    return new Collection<T>(thisCopy)
  }

  public copy(): Collection<T> {
    return new Collection([...this._data])
  }

  public remove(at:number): Collection<T> {
    return new Collection<T>(this._data.splice(at, 1))
  }

  public reverse(): Collection<T> {
    return new Collection<T>(this._data.reverse())
  }

  public count():number
  public count(predicate: (value?:T, index?:number, collection?:T[]) => boolean): number
  public count(predicate?: (value?:T, index?:number, collection?:T[]) => boolean): number {
    return predicate ? this.where(predicate).count() : this._data.length
  }

  public forEach(handler:(value?:T, index?:number, array?:T[]) => void) {
    this._data.forEach(handler)
  }

  public distinct(): Collection<T>
  public distinct(handler?:(key:T) => string | number) : Collection<T> {
    if(handler) {
      const grouped = this.group(handler)

      return Object.keys(grouped).reduce((acc, key) => {
        acc.add(
          grouped[key][0]
        )

        return acc
      }, new Collection<T>())
    }

    return new Collection<T>([...new Set(this._data)])
  }

  public group<TR = T>(by:(key: T) => string | number, withMap?:(item:T) => TR): {[key: string]: TR[]} {
    var res:{[key:string]: TR[]} = {}

    if(!withMap) {
      withMap = v => <TR>(<any>v)
    }

    return this._data.reduce((ac, v) => {
      const key = by(v)
      const existing = ac[key]
      const mapped = withMap(v)

      if(existing) {
        existing.push(mapped)
      } else {
        ac[key] = [mapped]
      }

      return ac
    }, res)
  }

  public groupJoin<O>(collection: Collection<O>, key1: (k:T) => any, key2: (O) => any, result:(first:T, second:Collection<O>) => any): Collection<any> {
    return this.select(item => result(item, 
      collection.where(a => key1(item) === key2(a))
    ))
  }

  public except(source: Collection<T>): Collection<T> {
    return this.where(item => !source.contains(item))
  }

  public equals(compareTo:Collection<T>): boolean {
    if(this.count() != compareTo.count()) { return false }

    this.forEach((_, index) => {
      if(this.at(index) !== compareTo.at(index)) {
        return false
      }
    })

    return true
  }

  public sorted(by:(a: T, b: T) => number): Collection<T> {
    return new Collection<T>(this._data.sort(by))
  }

  public swap(a: number, b:number): Collection<T> {
    var thisCopy = this._data
    const aValue = thisCopy[a]
    const bValue = thisCopy[b]

    thisCopy[a] = bValue
    thisCopy[b] = aValue

    return new Collection<T>(thisCopy)
  }

  public cast<O>(): Collection<O> {
    return new Collection<O>(this._data as any)
  }

  public where(predicate: (value?:T, index?:number, collection?:T[]) => boolean): Collection<T> {
    return new Collection<T>(this._data.filter(predicate))
  }

  public contains(item:T):boolean {
    return this._data.some(i => i === item)
  }

  public select<R>(handler: (item: T, index: number) => R): Collection<R> {
    return new Collection<R>(this._data.map(handler))
  }

  /// Static
  public static range(start: number, count: number): Collection<number> {
    return new Collection<number>([...Array(5).keys()])
  }

  public static repeat<T>(item:T, count:number): Collection<T> {
    return new Collection(Array(count).fill(item))
  }
  
}


export default Collection
