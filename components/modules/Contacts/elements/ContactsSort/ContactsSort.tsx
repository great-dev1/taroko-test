import { FC } from 'react'
import Button from '@/components/elements/Button'
import Col from '@/components/elements/Col'
import Row from '@/components/elements/Row'
import Text from '@/components/elements/Text'
import Image from 'next/image'
interface ContactsSortProps {
  onSort: (asc: boolean) => void
  asc: boolean
}

const ContactsSort: FC<ContactsSortProps> = ({ onSort, asc }) => {
  return (
    <Row align="center" justify="space-between" className="px-6 py-2">
      <Col width={3}></Col>
      <Col width={6}>
        <Row align="center" justify="center">
          <Text type="heading-m">Contacts</Text>
        </Row>
      </Col>
      <Col width={3}>
        <Row align="center" justify="end">
          {!asc ? (
            <Button onClick={() => onSort(true)}>
              <Image src="icons/sort-az.svg" alt="icon" width={24} height={24}/>
              {/* <Text>A To Z</Text> */}
            </Button>
          ) : (
            <Button onClick={() => onSort(false)}>
              <Image src="icons/sort-za.svg" alt="icon" width={24} height={24}/>
            </Button>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default ContactsSort
