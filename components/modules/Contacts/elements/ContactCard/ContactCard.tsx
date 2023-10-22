import Box from '@/components/elements/Box'
import { ContactInfo } from '../../../../../helper/type'
import styles from './ContactCard.module.scss'
import Row from '@/components/elements/Row'
import Col from '@/components/elements/Col/index'
import Button from '@/components/elements/Button/index'
import Text from '@/components/elements/Text/index'

interface ContactCardProps {
  contact: ContactInfo
  onUpdate: (contact: ContactInfo) => void
  onDelete: (contact: ContactInfo) => void
  disable: boolean
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete, onUpdate, disable }) => {
  const { id, first_name, last_name, job, description } = contact
  const handleUpdateClick = () => {}
  const handleDeleteContact = () => {}

  return (
    <Box className={styles.root}>
      <Row align="start" justify="space-between" className={styles.content}>
        <Col flex={1} className={styles.center}>
          <Row align="center" justify="start" className="mb-2">
            <Col>
              <div className={styles.avatar}>
                {`${first_name?.charAt(0).toUpperCase()}${last_name?.charAt(0).toUpperCase()}`}
              </div>
            </Col>
            <Col>
              <Text type="heading-m">{`${first_name} ${last_name}`}</Text>
            </Col>
          </Row>

          <Text type="body-m" className="mb-1">
            Job: {job}
          </Text>
          <Text type="body-m" className="mb-1">
            Description: {description}
          </Text>
        </Col>
        <Col>
          <Row className="mb-1">
            <Button variant="primary" onClick={() => onUpdate(contact)} size='m'>
              Update
            </Button>
          </Row>
          <Row>
            <Button variant="accent" onClick={() => onDelete(contact)} size='m'>
              Delete
            </Button>
          </Row>
        </Col>
      </Row>
    </Box>
  )
}

export default ContactCard
