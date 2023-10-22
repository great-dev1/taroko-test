import { useState } from 'react'

import cn from 'classnames'

import Row from '@/components/elements/Row'
import styles from './ContactHeader.module.scss'
import Text from '@/components/elements/Text/Text'
import Button from '@/components/elements/Button/index'
import Image from 'next/image'
import ContactMenu from '../ContactMenu'

interface ContactsHeaderProps {
  title: string
  onAddClick: VoidFunction
}

const ContactsHeader: React.FC<ContactsHeaderProps> = ({ title, onAddClick }) => {
  const [menuState, setMenuState] = useState(false)
  const handleMenuClick = ({}) => {
    setMenuState((prev) => {
      return !prev
    })
  }

  const handleAddClick = () => {
    onAddClick();
    setMenuState(false)
  }
  return (
    <Row align="center" justify="space-between" className={styles.root}>
      <Button className={cn(styles.hamburger)} onClick={handleMenuClick}>
        <Image src="icons/burger.svg" alt="icon" width={24} height={24} />
      </Button>

      <div className={cn(styles.menu, menuState && styles.open) }>
        <ContactMenu open={menuState} onCreate={handleAddClick} />
      </div>

      <Text type="heading-m" className={styles.heading}>
        Contact Lists
      </Text>

      <Button variant="plain" className={styles.btn_add} onClick={onAddClick} size="m">
        Add contact
      </Button>
    </Row>
  )
}
export default ContactsHeader
