// Part of this file is from egg-core@4.4.0/lib/utils/router.js

import * as path from 'path'
import * as decorators from './route'
import * as inflection from 'inflection'
import { RouteTable, ROUTE_TABLE } from './def'

type RestMap = { [key: string]: RestMapEntry }
interface RestMapEntry {
  method: string | string[],
  suffix: string,
  member?: boolean,
  namePrefix?: string
}

const REST_MAP: RestMap = {
  index: {
    suffix: '',
    method: 'Get'
  },
  new: {
    namePrefix: 'new_',
    member: true,
    suffix: 'new',
    method: 'Get'
  },
  create: {
    suffix: '',
    method: 'Post'
  },
  show: {
    member: true,
    suffix: ':id',
    method: 'Get'
  },
  edit: {
    member: true,
    namePrefix: 'edit_',
    suffix: ':id/edit',
    method: 'Get'
  },
  update: {
    member: true,
    namePrefix: '',
    suffix: ':id',
    method: ['Patch', 'Put']
  },
  destroy: {
    member: true,
    namePrefix: 'destroy_',
    suffix: ':id',
    method: 'Delete'
  }
}

const LAST_WORD_BLACKLIST = ['controller', 'router', 'routes']

function ResourceDecoratorFactory (prefix: string = '/', name: string | null = ''): ClassDecorator {
  return function ResourceDecorator (target) {
    if (name == null) {
      // set name to null to disable auto name prefix
      name = ''
    } else if (!name) {
      // Auto-detect resource name from the controller's name
      const splitName = inflection.underscore(target.name).split('_')
      const lastWord = splitName[splitName.length - 1]
      if (LAST_WORD_BLACKLIST.includes(lastWord)) {
        splitName.splice(-1, 1)
      }

      name = splitName.join('_')
    }

    for (const key in REST_MAP) {
      if (target.prototype[key] == null) continue

      const opts = REST_MAP[key]
      let formatedName: string = ''

      // Give the route a name
      if (name) {
        if (opts.member) {
          formatedName = inflection.singularize(name)
        } else {
          formatedName = inflection.pluralize(name)
        }

        if (opts.namePrefix) {
          formatedName = opts.namePrefix + formatedName
        }
      }

      // Skip if user defines the route manually
      const routeTable: RouteTable | undefined = target.prototype[ROUTE_TABLE]
      if (routeTable && routeTable.find(entry => entry.key === key)) {
        continue
      }

      const methods = Array.isArray(opts.method) ? opts.method : [opts.method]
      for (const method of methods) {
        // Use the existing decorators to register routes
        decorators[method](opts.suffix, formatedName)(target.prototype, key)
      }
    }

    // Decorate target with @Routes
    const namePrefix = name && inflection.pluralize(inflection.dasherize(name))
    const finalPrefix = path.join(prefix, namePrefix)
    decorators.Routes(finalPrefix)(target)
  }
}

export function Resource (target: Function): void
export function Resource (prefix?: string, name?: string | null): ClassDecorator
export function Resource (...args: any[]) {
  if (typeof args[0] === 'function') {
    ResourceDecoratorFactory()(args[0])
  } else {
    return ResourceDecoratorFactory(...args)
  }
}
