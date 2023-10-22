import ModalPage from '@/components/common/ModalPage/ModalPage'
import Col from '@/components/elements/Col'
import Row from '@/components/elements/Row'
import Text from '@/components/elements/Text'
import { ContactInfo, ContactInputType } from '@/helper/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useMemo, useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from './UpdateContactModal.module.scss'

import * as yup from 'yup'
interface UpdateContactModalProps {
  contact?: ContactInfo
  onUpdate: (contact: ContactInfo) => void
  onClose: VoidFunction
  open: boolean
  loading: boolean
}

const contactUpdateInputTypeSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  job: yup.string().required(),
  description: yup.string().required(),
})

const UpdateContactModal: FC<UpdateContactModalProps> = ({ contact, open, onUpdate, onClose, loading }) => {
  const defaultValues = useMemo((): ContactInputType => {
    return {
      first_name: contact?.first_name || '',
      last_name: contact?.last_name || '',
      description: contact?.description || '',
      job: contact?.job || '',
    }
  }, [contact])

  const {
    control,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ContactInputType>({
    defaultValues,
    resolver: yupResolver(contactUpdateInputTypeSchema),
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  const handleUpdate = useCallback(() => {
    onUpdate({
      id: contact.id,
      first_name: watch('first_name'),
      last_name: watch('last_name'),
      description: watch('description'),
      job: watch('job'),
    })
  }, [contact, watch, onUpdate])

  return (
    contact && (
      <ModalPage
        title="Update a contact"
        open={open}
        nextButton={true}
        backButton={true}
        closeButton={true}
        nextLabel="Update"
        backLabel="Cancel"
        onBackClick={onClose}
        onNextClick={handleUpdate}
        loading={loading}
      >
        <div className={styles.root}>
          <Controller
            control={control}
            name="first_name"
            render={({ field: { ref, ...field } }) => (
              <Row align="center" justify="start" className="my-1-5">
                <Col width={4}>
                  <Text bold type="body-m">
                    First Name:
                  </Text>
                </Col>
                <Col width={8}>
                  <input className={styles.input}  type="text" {...field} />
                </Col>
              </Row>
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({ field: { ref, ...field } }) => (
              <Row align="center" justify="start" className="my-1-5">
                <Col width={4}>
                  <Text bold type="body-m">
                    Last Name:
                  </Text>
                </Col>
                <Col width={8}>
                  <input className={styles.input}  type="text" {...field} />
                </Col>
              </Row>
            )}
          />
          <Controller
            control={control}
            name="job"
            render={({ field: { ref, ...field } }) => (
              <Row align="center" justify="start" className="my-1-5">
                <Col width={4}>
                  <Text bold type="body-m">
                    Job:
                  </Text>
                </Col>
                <Col width={8}>
                  <input className={styles.input}  type="text" {...field} />
                </Col>
              </Row>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { ref, ...field } }) => (
              <Row align="center" justify="start" className="my-1-5">
                <Col width={4}>
                  <Text bold type="body-m">
                    Description:
                  </Text>
                </Col>
                <Col width={8}>
                  <input className={styles.input}  type="text" {...field} />
                </Col>
              </Row>
            )}
          />
        </div>
      </ModalPage>
    )
  )
}

export default UpdateContactModal
