//
// mdns
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 24/09/2020
// 
// Copyright (c) 2020 Wess.io
//

// import dnssd from 'dnssd2'

const remote  = window.require('electron').remote
const dnssd   =  remote.require('dnssd2')

export default dnssd