import { useCallback, useState } from 'react'
import { FetchOptions } from './type'
import { error } from 'console'

export function useGetAllData<T>(apiUrl: string) {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const getAllData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(apiUrl)
      if (!response.ok) throw 'Fetch Error'
      const res = await response.json()
      setData(res.data)
      return res.data
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [setLoading, apiUrl])

  return { getAllData, options: { loading, data, error } }
}

export function useCreateData<T>(apiUrl: string) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const createData = useCallback(
    async (data: Partial<T>) => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({contact: data}),
        })
        if (!response.ok) throw 'Fetch Error'
        const res = await response.json()
        console.log(res)
        return res.data
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [apiUrl, setError, setLoading]
  )

  return { createData, options: { loading, error } }
}

export function useUpdateData<T>(apiUrl: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateData = useCallback(
    async (id: number, data: Partial<T>) => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({info: data}),
        })
        if (!response.ok) throw 'Fetch Error'
        const res = await response.json()
        return res.data
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [apiUrl, setLoading, setError]
  )

  return { updateData, options: { loading, error } }
}

export function useDeleteData(apiUrl: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const deleteData = useCallback(
    async (id: number) => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) throw 'Fetch Error'
        const res = await response.json()
        return res
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, apiUrl]
  )

  return { deleteData, options: { loading, error } }
}
