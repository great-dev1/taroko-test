import ModalPage from '@/components/common/ModalPage/ModalPage'
import { ContactInfo } from '@/helper/type'
import { FC } from 'react'

interface DeleteContactModalProps {
  contact?: ContactInfo
  onDelete: (contact: ContactInfo) => void
  onClose: VoidFunction
  open: boolean
  loading: boolean
}

const DeleteContactModal: FC<DeleteContactModalProps> = ({ contact, open, onDelete, onClose, loading }) => {
  return (
    contact && (
      <ModalPage
        title="Delete a contact"
        open={open}
        nextButton={true}
        backButton={true}
        closeButton={true}
        nextLabel="Ok"
        backLabel="Cancel"
        loading={loading}
        onBackClick={onClose}
        onNextClick={() => onDelete(contact)}
      >
        <div>Are you going to delete this contact?</div>
      </ModalPage>
    )
  )
}

export default DeleteContactModal
