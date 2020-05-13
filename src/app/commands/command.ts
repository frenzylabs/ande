//
//  command.ts
//  boilerplate
// 
//  Created by Wess Cope (me@wess.io) on 05/07/20
//  Copyright 2020 Wess Cope
//


export enum Axis {
  X         = 'X',
  Y         = 'Y',
  Z         = 'Z',
  EXTRUDER  = 'E',
  ALL       = 'ALL'
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  FORWARD,
  BACK,
  HOME
}

export enum HeatComponent {
  HOTEND  = "M104 S",
  BED     = "M140 S"
}

export interface Position {
  e?:number
  x?:number
  y?:number
  z?:number
  f?:number
}

const travel = (a:Axis, distance:number) => `G1 ${a.toString()}${distance}`

export const Command = {
  mode: {
    relative: "G91",
    absolute: "G90"
  },

  move: {
    home:     (a:Axis = Axis.ALL) => a == Axis.ALL ? 'G28' : `G28 ${a.toString()}`,
    to:       (a:Axis, distance:number) => travel(a, distance),
    left:     (distance:number) => travel(Axis.X, distance),
    right:    (distance:number) => travel(Axis.X, (distance > 0 ? -(distance) : 0)),
    forward:  (distance:number) => travel(Axis.Y, distance),
    back:     (distance:number) => travel(Axis.Y, (distance > 0 ? -(distance) : 0)),
    up:       (distance:number) => travel(Axis.Z, distance),
    down:     (distance:number) => travel(Axis.Z, (distance > 0 ? -(distance) : 0)),
    extruder: (distance:number) => travel(Axis.EXTRUDER, distance)
  },

  position: {
    current:  "M114",
    set:(position:Position) => {
      return ['G1'].concat(
                Object.entries(position).map(
                  ([key, val]) => `${key.toUpperCase()}${val}`
                )
              ).join(' ')
    }
  },

  temp: {
    current: "M105",
    report:(interval:number = 4) => `M155 S${interval}`,
    set: (target:HeatComponent, value:number) => `${target}${value}`
  },

  fans:   (on:boolean) => on ? "M106" : "M106 S 0",
  motors: (on:boolean) => on ? "M17" : "M18",
  
  firmware: {
    info: "M115",
    update: "M997"
  },

  probe: {
    deploy: "M401",
    stow: "M402",
    run: "G29"
  },

  host: {
    keepalive: 'M113 S2'
  },

  action: (a:string) => `M118 A1 ${a}`
}

export default Command
