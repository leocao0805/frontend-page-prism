import React from 'react'
import Button from './Button'
import styles from './ConfirmDialog.module.css'

const ConfirmDialog = ({ 
  isOpen,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger' // 'danger' or 'primary'
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className={styles.header}>
          <h3 id="dialog-title" className={styles.title}>{title}</h3>
        </div>
        
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
        </div>
        
        <div className={styles.footer}>
          <Button onClick={onCancel} className={styles.cancelButton}>
            {cancelLabel}
          </Button>
          <Button 
            onClick={onConfirm} 
            className={variant === 'danger' ? styles.dangerButton : styles.confirmButton}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
