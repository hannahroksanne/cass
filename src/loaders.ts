import { create } from 'zustand'
import removeFromArray from 'just-remove'
import $ from '../configuration'

type Job = {
  cid: string
  name: string
  startTime?: number
}

type StoreState = {
  jobs: Job[]
  jobNames: string[]
  history: any[]
  hasJobs: () => boolean
  hasJob: (cid: string) => boolean
  start: (cid: string) => void
  stop: (cid: string) => void
  record: (cid: string) => void
  prepareJob: (cid: string) => Job
  getJob: (cid: string) => Job | undefined
}

const useStore = create<StoreState>((set, get) => {
  // Check if anything is loading.
  const hasJobs = (get: any) => () => get().jobs.length > 0

  // Check if a specific thing is loading.
  const hasJob = (get: any) => (cid: string) => !!get().getJob(cid)

  // Indicate to the store that a new thing has started loading.
  const start = (get: any, set: any) => (cid: string) => {
    const loader = get().prepareJob(cid)

    set((state: any) => ({
      jobs: [...state.jobs, loader],
      jobNames: [...state.jobNames, loader.name],
    }))
  }

  // Indicate to the store that a thing has stopped loading.
  const stop = (get: any, set: any) => (cid: string) => {
    get().record(cid)
    const foundJob = get().getJob(cid)
    if (foundJob) {
      set((state: any) => ({
        jobs: removeFromArray(state.jobs, [foundJob]),
        jobNames: removeFromArray(state.jobNames, [foundJob.name]),
      }))
    }
  }

  // Record the time it took to load a thing.
  // This is helpful for us to measure performance later on.
  const record = (get: any, set: any) => (cid: string) => {
    const job = get().getJob(cid)
    if (job) {
      const stopTime = Date.now()
      const time = new Date(stopTime - job.startTime!)
      const duration = `${time.getSeconds()}s`
      set((state: any) => ({
        history: [...state.history, { ...job, stopTime, duration }],
      }))
    }
  }

  // Try to find the loader associated with this specific thing
  // that has started loading.
  const prepareJob = (get: any) => (cid: string) => {
    const loader = $.loaders[cid]
    const startTime = Date.now()
    return { ...loader, startTime }
  }

  const getJob = (get: any) => (cid: string) => {
    return get().jobs.find((job) => job.cid === cid)
  }

  return {
    jobs: [],
    jobNames: [],
    history: [],
    hasJobs: hasJobs(get),
    hasJob: hasJob(get),
    start: start(get, set),
    stop: stop(get, set),
    record: record(get, set),
    prepareJob: prepareJob(get),
    getJob: getJob(get),
  }
})

export default useStore
