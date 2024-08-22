import EventEmitter from 'node:events'
import { join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'
import { app } from 'electron'

export interface DatabaseEvents {
  ready: []
}

export class Database extends EventEmitter<DatabaseEvents> {
  dir: string
  pgLite: PGlite
  constructor() {
    super()
    this.dir = join(app.getPath('userData'), 'tomato')
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir)
    }
    this.init()
  }

  private async init() {
    this.pgLite = await PGlite.create({
      dataDir: this.dir,
    })
    this.emit('ready')
  }
}
