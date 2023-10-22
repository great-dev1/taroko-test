import { FC, useState, useMemo, useCallback, useEffect } from 'react'
import ModalPage from '@/components/common/ModalPage/ModalPage'
import { ContactInfo, ContactInputType } from '@/helper/type'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import { Controller, useForm } from 'react-hook-form'
import {useConfirm} from '@/helper/confirm'
import * as yup from 'yup'
import Row from '@/components/elements/Row'
import Col from '@/components/elements/Col'
import Text from '@/components/elements/Text'
import styles from './CreateContactModal.module.scss'

interface CreateContactModalProps {
  onCreate: (contact: ContactInputType) => void
  onClose: VoidFunction
  open: boolean
  loading: boolean
}

const contactInputTypeSchema = yup.object({
  first_name: yup.string().required('First Name is Required'),
  last_name: yup.string().required('Last Name is Required'),
  job: yup.string().required('Job is required'),
  description: yup.string().required('Description is required'),
})

const CreateContactModal: FC<CreateContactModalProps> = ({ open, onCreate, onClose, loading }) => {
  const [error, setError] = useState('')
  const {createConfirm} = useConfirm();
  const defaultValues = useMemo((): ContactInputType => {
    return {
      first_name: '',
      last_name: '',
      description: '',
      job: '',
    }
  }, [])

  const {
    control,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ContactInputType>({
    defaultValues,
    resolver: yupResolver(contactInputTypeSchema),
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues, open])

  const handleCreate = useCallback(() => {
    if (watch('first_name') === "" || watch('last_name') === "" || watch('job') === "" || watch('description') === "") {
      createConfirm("validate");
      return;
    }
    onCreate({
      first_name: watch('first_name'),
      last_name: watch('last_name'),
      description: watch('description'),
      job: watch('job'),
    })
  }, [onCreate, watch, createConfirm])

  return (
    <ModalPage
      title="Create a contact"
      open={open}
      nextButton={true}
      backButton={true}
      closeButton={true}
      nextLabel="Ok"
      backLabel="Cancel"
      loading={loading}
      onBackClick={onClose}
      onNextClick={handleCreate}
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
                <input className={styles.input} type="text" {...field} />
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
                <input className={styles.input} type="text" {...field} />
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
                <input className={styles.input} type="text" {...field} />
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
                <input className={styles.input} type="text" {...field} />
              </Col>
            </Row>
          )}
        />
        <div>{error && <Text variant="accent"></Text>}</div>
      </div>
    </ModalPage>
  )
}

export default CreateContactModal
