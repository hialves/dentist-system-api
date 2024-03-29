import { Logger } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

export const paths = {
  'employee-images': path.resolve('public', 'images', 'employee-images'),
}

export function generateFolders() {
  Object.entries(paths).forEach(([key, p]) => {
    if (!fs.existsSync(p)) {
      const folderUri = p.split(process.cwd())[1].replace(/[\\]/g, '/')
      Logger.log(`Generating folder for ${key} on ${folderUri}`, 'Paths')
      fs.mkdirSync(p, { recursive: true })
    }
  })
}
