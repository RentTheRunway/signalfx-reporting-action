import * as core from '@actions/core'
import * as sfx from './signalfx'
import * as yaml from 'js-yaml'
import {Event, Metric} from './types'

export async function run(): Promise<void> {
  try {
    const apiKey: string = core.getInput('token', {required: true})
    const apiURL: string =
      core.getInput('api-url') || 'https://ingest.us1.signalfx.com'

    const metrics: Metric[] =
      (yaml.safeLoad(core.getInput('metrics')) as Metric[]) || []
    await sfx.sendMetrics(apiURL, apiKey, metrics)

    core.debug('set metric')

    const events: Event[] =
      (yaml.safeLoad(core.getInput('events')) as Event[]) || []
    await sfx.sendEvents(apiURL, apiKey, events)
  } catch (error: any) {
    core.setFailed(`Run failed: ${error.message}`)
  }
}
