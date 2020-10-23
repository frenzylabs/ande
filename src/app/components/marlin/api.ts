//
// api
// ande
// 
// Author:  Wess (me@wess.io)
// Created: 21/10/2020
// 
// Copyright (c) 2020 Wess.io
//

const remote  = window.require('electron').remote
const fs      = remote.require('fs-extra')
const path    = remote.require('path')
const unzip   = remote.require('unzipper')
const axios   = remote.require('axios')

import env      from '~/app/system/env'
import Release  from './model'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
})

export type MarlinCallback = (error: Error | null, response: any | null) => void
export type MarlinProgress = (status:string) => void

const list = (callback:MarlinCallback) => {
  api.get('/repos/MarlinFirmware/Marlin/releases')
  .then(res => {
    const {data} = res

    const list = data.map(d => {
      return {
        name:     d.name,
        tag:      d.tag_name,
        link:     d.html_url,
        download: d.zipball_url,
        body:     d.body  
      }
    })

    callback(null, list)
  })
  .catch(err => callback(err, null))
}

const download = (release:Release, progress:MarlinProgress, callback:MarlinCallback) => {
  const root        =  '/Users/wess/Desktop/' //env.directory.marlin
  const temp        = path.join(root, 'temp')
  const versions    = path.join(root, 'versions')
  const zipName     = release.tag.split('.').join('_') + '.zip'
  const zipPath     = path.join(temp, zipName)
  const destination = path.join(versions, release.tag)

  if(fs.pathExistsSync(destination)) {
    callback(null, destination)
    return
  }

  fs.ensureDirSync(temp)
  
  const writer = fs.createWriteStream(zipPath)

  progress(`Downloading Marlin ${release.tag}...`)

  api({
    method: 'get',
    url: release.download,
    responseType: 'stream',
    onDownloadProgress: (e) => {
      console.log("pr: ", e)
    }  
  })
  .then(res => {
    progress(`Downloaded Marlin ${release.tag}.`)

    res.data
    .pipe(writer).on('close', () => {
      progress(`Extracting Marlin ${release.tag}...`)

      fs.createReadStream(zipPath)
      .pipe(
        unzip.Extract({
          path: temp
        })  
      ).on('close', () => {
        const marlin    = fs.readdirSync(temp).filter(f => f.toLowerCase().includes("marlin"))[0]
        const tmpMarlin = path.join(temp, marlin)
        
        if(!marlin) {
          console.error("No marlin found")
        }
        
        progress(`Extracted Marlin ${release.tag}.`)

        fs.moveSync(
          tmpMarlin,
          destination
        )
        
        progress(`Cleaning up...`)
        fs.removeSync(zipPath)
        fs.removeSync(tmpMarlin)

        progress(`Done.`)
        callback(null, destination)
      })
    })
  })
  .catch(err => callback(err, null))
}

const updateRegistry = (name:string, release:Release) => {
  const root        = '/Users/wess/Desktop/' //env.directory.marlin
  const configs     = path.join(root, 'configs')
  
  const registry = fs.readJsonSync(
    path.join(configs, 'registry.json'),
    {throws: false}
  ) || {}


  const updatedRegistry = {
    ...registry,
    [name] : release
  }

  fs.writeJsonSync(
    path.join(configs, 'registry.json'),
    updatedRegistry
  )

}

const create = (name:string, release:Release, progress:MarlinProgress, callback:MarlinCallback) => {
  const root        = '/Users/wess/Desktop/' //env.directory.marlin
  const version     = path.join(root, 'versions', release.tag)
  const configs     = path.join(root, 'configs')
  const destination = path.join(configs, name)

  if(!fs.pathExistsSync(version)) {
    download(release, progress, () => 
      create(name, release, progress, callback)
    )

    return
  }

  fs.ensureDirSync(configs)

  progress(`Creating ${name} from Marlin ${release.tag}...`)
  fs.copySync(version, destination)
  updateRegistry(name, release)

  progress(`Created ${name} from Marlin ${release.tag}.`)

  callback(null, destination)
}

const registry = async () => {
  const root    = '/Users/wess/Desktop/' //env.directory.marlin
  const configs = path.join(root, 'configs')
  const regis   = path.join(configs, 'registry.json')

  return fs.readJson(regis)
}

export default {
  list,
  download,
  create,
  registry
}