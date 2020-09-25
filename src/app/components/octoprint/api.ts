//
// api
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 24/09/2020
// 
// Copyright (c) 2020 Wess.io
//

const app  = window.require('electron').remote.app

import axios from 'axios'

import {OctoServer} from './model'

export type OctoCallback = (error: Error | null, response: any | null) => void

export default class OctoAPI {
  private server:OctoServer

  get headers():{[key: string] : string} {
    var _headers = {
      "Content-Type" : "application/json"
    }

    if(this.server.token) {
      _headers["X-Api-Key"] = this.server.token
    }

    return _headers
  }

  get request() {
    return axios.create({
      baseURL: `http://${this.server.location}`,
      headers: this.headers
    })
  }

  constructor(server:OctoServer) {
    this.server = {
      name:     server.name,
      location:  server.location.substr((server.location.length - 1), 1) == '/' ? server.location.substring(0, server.location.length - 1) : server.location,
      token:    server.token
    }
  }

  token(callback:OctoCallback) {
    this.request.post('/plugin/appkeys/request', {
      app: 'ande'
    })
    .then((res) => callback(null, res))
    .catch(e => callback(e, null))
  } 
}