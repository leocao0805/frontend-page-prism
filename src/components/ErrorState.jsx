import React from 'react'
import Button from './Button'
import styles from './ErrorState.module.css'

const ErrorState = ({ 
  message = 'Something went wrong', 
  onRetry,
  title = 'Error'
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className={styles.retryButton}>
          Try Again
        </Button>
      )}
    </div>
  )
}

export default ErrorState
