import { Context } from 'egg'

export const ROUTE_TABLE = Symbol('egg-decorator#routeTable')

export type HttpMethod = 'get' | 'put' | 'post' | 'patch' | 'delete'

export type RouteTable = RouteTableEntry[]
export interface RouteTableEntry {
  key: string,
  method: HttpMethod,
  path: string | RegExp,
  middlewares: any[],
  name?: string
}

export type IMiddleware = (ctx: Context, next: () => Promise<any>) => any
export type ClassOrPropertyDecorator = (target: any, key?: string | symbol) => any

export type RestMap = { [key: string]: RestMapEntry }
export interface RestMapEntry {
  method: string | string[],
  suffix: string,
  member?: boolean,
  namePrefix?: string
}

// egg-core@4.4.0/lib/utils/router.js:11
export const REST_MAP: RestMap = {
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

export const LAST_WORD_BLACKLIST = ['controller', 'router', 'routes']
