import React from 'react'
import Button from './Button'
import styles from './EmptyState.module.css'

const EmptyState = ({ 
  title = 'No items found',
  message = 'Get started by creating your first item',
  actionLabel,
  onAction,
  icon
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {icon || (
          <svg
            className={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className={styles.actionButton}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
