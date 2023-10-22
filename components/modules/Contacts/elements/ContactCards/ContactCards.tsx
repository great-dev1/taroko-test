import { Children, FC } from 'react'

import styles from './ContactCards.module.scss'
import Text from '@/components/elements/Text'

interface ContactCardsProps {
  loading?: boolean
}

const ContactCards: FC<React.PropsWithChildren<ContactCardsProps>> = ({ loading, children }) => {
  return (
    <div className={styles.root}>
      {children && Children.toArray(children).length === 0 && !loading ? (
        <Text type="heading-m">No Contacts!</Text>
      ) : (
        children
      )}
    </div>
  )
}

export default ContactCards
