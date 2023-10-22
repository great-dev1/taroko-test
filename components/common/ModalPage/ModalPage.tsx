import { FC, useState } from 'react'
import cn from 'classnames'
import styles from './ModalPage.module.scss'
import Box from '@/components/elements/Box'
import Row from '@/components/elements/Row'
import Col from '@/components/elements/Col/index'
import { title } from 'process'
import Button from '@/components/elements/Button/index'
import CloseIcon from '@/assets/icons/close.svg'
import Text from '@/components/elements/Text/index'

interface ModalPageProps {
  open: boolean
  title?: string
  onNextClick?: VoidFunction
  onBackClick?: VoidFunction
  backButton?: boolean
  backLabel?: string
  nextButton?: boolean
  nextLabel?: string
  closeButton?: boolean
  loading?: boolean
}

const ModalPage: FC<React.PropsWithChildren<ModalPageProps>> = ({
  open,
  title = 'Modal Page',
  onNextClick,
  onBackClick,
  nextButton,
  backButton,
  nextLabel = 'next',
  backLabel = 'back',
  closeButton,
  loading,
  children,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    onNextClick()
  }

  return (
    <Row align="center" justify="center" className={cn(styles.root, !open && styles.open)}>
      <Box as="form" className={styles.content} onSubmit={handleSubmit}>
        <Row className={styles.header}>
          <Col>
            <Text>{title}</Text>
          </Col>
          <Col flex={1}></Col>
        </Row>
        <Row className={styles.main}>{children}</Row>
        <Row className={styles.footer} align="center" justify="end" gutterX="2">
          <Col>
            {backButton && (
              <Button variant="secondary" onClick={onBackClick} disabled={loading} size="md">
                {backLabel}
              </Button>
            )}
          </Col>
          <Col>
            {nextButton && (
              <Button
                variant="accent"
                type="submit"
                // onClick={onNextClick}
                disabled={loading}
                loading={loading}
                size="m"
              >
                {nextLabel}
              </Button>
            )}
          </Col>
        </Row>
      </Box>
    </Row>
  )
}

export default ModalPage
