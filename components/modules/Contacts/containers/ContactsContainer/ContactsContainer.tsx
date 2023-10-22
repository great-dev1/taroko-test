import { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

import PageLayout from '@/components/common/PageLayout/PageLayout'
import { ContactInfo, ContactInputType } from '@/helper/type'
import CreateContactModal from '../Modals/CreateContactModal'
import UpdateContactModal from '../Modals/UpdateContactModal'
import DeleteContactModal from '../Modals/DeleteContactModal'
import ContactsHeader from '../../elements/ContactsHeader'
import ContactCards from '../../elements/ContactCards'
import ContactCard from '../../elements/ContactCard'

import { useCreateData, useDeleteData, useGetAllData, useUpdateData } from '@/helper/fetch'
import { contactsUrl } from '../../utils/contactsURL'
import { useUpdateEffect } from 'react-use'
import { useConfirm } from '@/helper/confirm'
import ContactsSort from '../../elements/ContactsSort'
import { useSort } from '@/helper/sort'

interface ContactContainerProps {
  title: string
}

const ContactContainer: React.FC<ContactContainerProps> = ({ title }) => {
  const [createModalOpenState, setCreateModalOpenState] = useState(false)
  const [updateModalOpenState, setUpdateModalOpenState] = useState(false)
  const [deleteModalOpenState, setDeleteModalOpenState] = useState(false)

  const [contact, setContact] = useState<ContactInfo | undefined>()
  const [sortState, setSortState] = useState(false)
  const [contactsData, setContactsData] = useState<ContactInfo[]>()
  const { sort } = useSort()
  const { createConfirm } = useConfirm()

  const { getAllData: getAllContacts, options: getOptions } = useGetAllData<ContactInfo>(contactsUrl)
  const { createData: createContact, options: createOptions } = useCreateData<ContactInfo>(contactsUrl)
  const { updateData: updateContact, options: updateOptions } = useUpdateData<ContactInfo>(contactsUrl)
  const { deleteData: deleteContact, options: deleteOptions } = useDeleteData(contactsUrl)

  const handleCreateModalOpen = (state: boolean) => {
    setCreateModalOpenState(state)
  }

  const handleUpdateModalOpen = (contact: ContactInfo) => {
    setContact(contact)
    setUpdateModalOpenState(contact ? true : false)
  }

  const handleDeleteModalOpen = (contact: ContactInfo) => {
    setContact(contact)
    setDeleteModalOpenState(contact ? true : false)
  }

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  useUpdateEffect(() => {
    setContactsData(getOptions?.data)
  }, [getOptions?.data])

  const handleCreate = useCallback(
    async (contact: ContactInfo) => {
      const { id, ...data } = contact
      const result = await createContact(data)
      setContactsData((prev) => {
        return [...prev, result]
      })
      setCreateModalOpenState(false)
      createConfirm('create')
    },
    [createContact, setContactsData, createConfirm]
  )

  const handleUpdate = useCallback(
    async (contact: ContactInfo) => {
      const { id, ...res } = contact
      const result = await updateContact(id, res)
      setContactsData((prev) => {
        return prev.map((item) => {
          return item.id === result.id ? result : item
        })
      })
      setUpdateModalOpenState(false)
      createConfirm('update')
    },
    [updateContact, setContactsData, createConfirm]
  )

  const handleDelete = useCallback(
    async (contact: ContactInfo) => {
      const result = deleteContact(contact.id)
      const id = contact.id
      setContactsData((prev) => {
        return prev.filter((item) => {
          return item.id != id
        })
      })
      setDeleteModalOpenState(false)
      createConfirm('delete')
    },
    [deleteContact, createConfirm]
  )

  const handleSort = useCallback(
    (asc: boolean) => {
      const data = [...contactsData]
      setContactsData(sort(data, asc))
      setSortState(asc)
    },
    [sort, contactsData, setContactsData]
  )

  return (
    <PageLayout>
      <ContactsHeader title="Contact List" onAddClick={() => setCreateModalOpenState(true)} />
      <ContactsSort onSort={handleSort} asc={sortState} />
      <ContactCards>
        {contactsData?.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onUpdate={handleUpdateModalOpen}
            onDelete={handleDeleteModalOpen}
            disable={true}
          />
        ))}
      </ContactCards>
      <CreateContactModal
        onCreate={handleCreate}
        onClose={() => setCreateModalOpenState(false)}
        open={createModalOpenState}
        loading={createOptions.loading}
      />
      <UpdateContactModal
        contact={contact}
        onUpdate={handleUpdate}
        onClose={() => setUpdateModalOpenState(false)}
        open={updateModalOpenState}
        loading={updateOptions.loading}
      />
      <DeleteContactModal
        contact={contact}
        onDelete={handleDelete}
        onClose={() => setDeleteModalOpenState(false)}
        open={deleteModalOpenState}
        loading={deleteOptions.loading}
      />
    </PageLayout>
  )
}

export default ContactContainer
