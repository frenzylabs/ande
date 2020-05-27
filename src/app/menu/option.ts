//
//  option.ts
//  hum
// 
//  Created by Wess Cope (me@wess.io) on 05/22/20
//  Copyright 2020 Wess Cope
//
import Signal from '../../libs/signal'
import { create } from 'domain'

export enum MenuRole {
  undo, 
  redo, 
  cut, 
  copy, 
  paste, 
  pasteAndMatchStyle, 
  delete, 
  selectAll, 
  reload, 
  forceReload, 
  toggleDevTools, 
  resetZoom, 
  zoomIn, 
  zoomOut, 
  togglefullscreen, 
  window, 
  minimize, 
  close, 
  help, 
  about, 
  services, 
  hide, 
  hideOthers, 
  unhide, 
  quit, 
  startSpeaking, 
  stopSpeaking, 
  zoom, 
  front, 
  appMenu, 
  fileMenu, 
  editMenu, 
  viewMenu, 
  recentDocuments,
  toggleTabBar, 
  selectNextTab, 
  selectPreviousTab, 
  mergeAllWindows, 
  clearRecentDocuments, 
  moveTabToNewWindow,
  windowMenu
}

export type MenuHandler = (option, window, event) => void

export interface MenuItem {
  event?:string,
  label?:string,
  parent?:string,
  role?:string,
  type?:string
  click?:MenuHandler
  accelerator?:string
  submenu?:MenuItem[]
}

const Seperator = {
  label:"",
  type: "separator"
}

const Role = (r:MenuRole, submenu?:MenuItem[]):MenuItem => {
  var opt:MenuItem = {
    role: MenuRole[r]
  }

  if(submenu) {
    opt.submenu = submenu
  }

  return opt
}

function createSignal(components:string[]) {
  return components
    .map(c => c.replace('...', ''))
    .join('.')
    .toLowerCase()
    .replace(/\s+/g, '-')
}


function MenuOption(label:string, optionals:{shortcut?:string, submenu?:MenuItem[], data?:any} = {}):MenuItem {
  var opt:MenuItem = {
    label: label
  }

  if(optionals.shortcut) {
    opt.accelerator = optionals.shortcut
  }

  if(optionals.submenu) {
    opt.submenu = (optionals.submenu || []).map(sub => {
      var subOpt = sub

      const evt = createSignal([
        'menu',
        label,
        sub.label
      ])

      if(!Object.keys(subOpt).includes('submenu') && evt.substr(evt.length - 1, evt.length) !== '.') {
        subOpt.event = evt
      }
      
      return {
        ...subOpt,
        click: () => {
          Signal.emit(evt)
        }
      }
    })
  }

  const evt = createSignal([
    'menu',
    label
  ])

  return {
    ...opt,
    event: evt,
    click: () => {
      Signal.emit(evt)
    }
  }
}

export default {
  Option: MenuOption,
  Seperator,
  Role,
  Roles: MenuRole
}
