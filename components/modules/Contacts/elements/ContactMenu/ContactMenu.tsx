import Box from '@/components/elements/Box'
import Button from '@/components/elements/Button'
import styles from './ContactMenu.module.scss'
import cn from 'classnames'
interface ContactMenuProps {
  open: boolean
  onCreate: VoidFunction
}

const ContactMenu = ({ open, onCreate }) => {
  return (
    <Box className={cn(styles.root)}>
      <Button onClick={onCreate}>Add</Button>
    </Box>
  )
}

export default ContactMenu
