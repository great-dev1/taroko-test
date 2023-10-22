export type ContactInfo = {
  id: number
  first_name?: string
  last_name?: string
  job?: string
  description?: string
}

export type ContactInputType = Omit<ContactInfo, 'id'>

export type FetchOptions<T> = {
  loading: boolean
  data?: T[]
  error: string
}
