import { useCallback } from 'react'
import { ContactInfo } from './type'

export function useSort() {
  const sort = useCallback((contacts: ContactInfo[], asc: boolean): ContactInfo[] => {
    console.log(asc)
    contacts.sort((a, b) => {
      const nameA = a.first_name.toUpperCase() // ignore upper and lowercase
      const nameB = b.first_name.toUpperCase() // ignore upper and lowercase

      if (nameA < nameB) {
        return asc ? -1 : 1
      }
      if (nameA > nameB) {
        return asc ? 1 : -1
      }

      // names must be equal
      return 0
    })
    return contacts
  }, [])
  return { sort }
}
