import axios, { CancelTokenSource, AxiosResponse, AxiosError } from 'axios'
import Hook from '@hook/hook'
import type { setterKey, options as hookOptions } from '@hook/hook'
axios.defaults.withCredentials = true
export interface options extends hookOptions {
  abortable?: boolean
}

export type method = 'get' | 'post' | 'head' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'

export default class Ajax extends Hook {
  static axios = axios
  static create <T extends Ajax>(url: string, method: method, options?: options): T {
    const ajax = new this(options)
    ajax.url(url).method(method)
    return <T>ajax
  };

  private _ajaxable: boolean = true;
  private _abortable: boolean | CancelTokenSource = false

  constructor(options?: options) {
    super(options)
    const config = Object.assign(
      {
        abortable: true
      },
      options,
    )
    if (config.abortable) {
      this.abortable()
    }
  }

  config(key: setterKey, value?: any): this {
    return this.generateSetter('config')(key, value)
  }

  getConfig(field?: string): any {
    return this.generateGetter('config')(field)
  }

  params(key: setterKey, value?: any): this {
    return this.generateSetter('params')(key, value)
  }

  getParams(field?: string): any {
    return this.generateGetter('params')(field)
  }

  method(method: method): this {
    this.config('method', method)
    return this
  }

  url(url: string): this {
    this.config('url', url)
    return this
  }

  abortable(): this {
    const { CancelToken } = axios
    const source: CancelTokenSource = CancelToken.source()
    this._abortable = source
    this.config('cancelSource', source)
    this.config('cancelToken', source.token)
    return this
  }

  abort(message?: string): this {
    const source = this._abortable
    if (source) {
      (<CancelTokenSource>source).cancel(message)
    }
    this.emit('netAbort', message, source)
    return this
  }

  isAbortable(): boolean {
    return !!this._abortable
  }

  disable(): this {
    this._ajaxable = false
    return this
  }

  enable(): this {
    this._ajaxable = true
    return this
  }

  isDisabled(): boolean {
    return this._ajaxable === false
  }

  async convertResponse(res: AxiosResponse): Promise<any> {
    return res.data
  }

  async convertError(error: AxiosError): Promise<any> {
    return error
  }

  async fetch(): Promise<this> {
    if (!this._ajaxable) {
      return this
    }
    await this.emit('netRequest')

    const config = this.getConfig()
    const method = (config.method || 'get').toUpperCase()
    if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
      this.config({
        data: this.getParams()
      })
    } else {
      this.config({
        params: this.getParams()
      })
    }

    await axios
      .request(this.getConfig())
      .then(async (res: AxiosResponse) => {
        const convertedData: any = await this.convertResponse(res)
        await this.emit('netResponse', true, res)
        await this.emit('netSuccess', convertedData, res)
        await this.emit('netCompleted', true, res)
      })
      .catch(async (error: AxiosError) => {
        const convertedError: any = await this.convertError(error)
        await this.emit('netResponse', false, error)
        await this.emit('netError', convertedError, error)
        await this.emit('netCompleted', false, error)
      })
    return this
  }
}
