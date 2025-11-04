import React, { useState } from 'react'
import Button from './Button'
import styles from './InspirationCard.module.css'

const InspirationCard = ({ inspiration, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false)
  
  const formattedDate = new Date(inspiration.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={inspiration.websiteMetadata.url}
            alt={inspiration.websiteMetadata.title || 'Design inspiration'}
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg
              className={styles.placeholderIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>
            {inspiration.websiteMetadata.title || 'Design Inspiration'}
          </h4>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        
        <a 
          href={inspiration.websiteMetadata.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          {inspiration.websiteMetadata.url}
        </a>
        
        {inspiration.notes && (
          <p className={styles.notes}>{inspiration.notes}</p>
        )}
        
        {(onEdit || onDelete) && (
          <div className={styles.actions}>
            {onEdit && (
              <Button onClick={() => onEdit(inspiration)} className={styles.editButton}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button onClick={() => onDelete(inspiration)} className={styles.deleteButton}>
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default InspirationCard
