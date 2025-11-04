import React, { useState, useEffect } from 'react'
import Button from './Button'
import { generateCaption } from '../services/aiService'
import styles from './InspirationForm.module.css'

const InspirationForm = ({ onSubmit, onCancel, projectId, initialData = null }) => {
  const isEditMode = !!initialData
  const [url, setUrl] = useState(initialData?.websiteMetadata?.url || '')
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false)

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setUrl(initialData.websiteMetadata?.url || '')
      setNotes(initialData.notes || '')
    }
  }, [initialData])

  const validateUrl = (urlString) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!url.trim()) {
      newErrors.url = 'Screenshot URL is required'
    } else if (!validateUrl(url.trim())) {
      newErrors.url = 'Please enter a valid URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      const submissionData = {
        websiteMetadata: {
          url: url.trim(),
          title: url.trim(),
          favicon: initialData?.websiteMetadata?.favicon || '',
        },
        notes: notes.trim(),
      }

      // Add projectId only for new inspirations
      if (!isEditMode) {
        submissionData.projectId = projectId
      }

      await onSubmit(submissionData)
      
      // Reset form on success (only if not in edit mode)
      if (!isEditMode) {
        setUrl('')
        setNotes('')
      }
      setErrors({})
    } catch (error) {
      setErrors({ submit: error.message || `Failed to ${isEditMode ? 'update' : 'create'} inspiration` })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateCaption = async () => {
    // Validate URL first
    if (!url.trim()) {
      setErrors({ url: 'Please enter a URL first' })
      return
    }

    if (!validateUrl(url.trim())) {
      setErrors({ url: 'Please enter a valid URL first' })
      return
    }

    setIsGeneratingCaption(true)
    setErrors({})

    try {
      const caption = await generateCaption(url.trim())
      setNotes(caption)
    } catch (error) {
      setErrors({ 
        ai: error.message || 'Failed to generate caption. Please ensure Ollama is running.' 
      })
    } finally {
      setIsGeneratingCaption(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="url" className={styles.label}>
          Screenshot URL <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`${styles.input} ${errors.url ? styles.inputError : ''}`}
          placeholder="https://example.com/screenshot.png"
          disabled={isSubmitting}
        />
        {errors.url && <p className={styles.errorMessage}>{errors.url}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="notes" className={styles.label}>
          Notes
        </label>
        <div className={styles.notesWrapper}>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.textarea}
            placeholder="Add your thoughts about this design inspiration..."
            rows="4"
            disabled={isSubmitting || isGeneratingCaption}
          />
          <Button
            type="button"
            onClick={handleGenerateCaption}
            disabled={isSubmitting || isGeneratingCaption || !url.trim()}
            className={styles.aiButton}
          >
            {isGeneratingCaption ? (
              <>
                <span className={styles.spinner}></span>
                Generating...
              </>
            ) : (
              <>
                <svg className={styles.aiIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Caption with AI
              </>
            )}
          </Button>
        </div>
        {errors.ai && <p className={styles.errorMessage}>{errors.ai}</p>}
      </div>

      {errors.submit && (
        <div className={styles.submitError}>{errors.submit}</div>
      )}

      <div className={styles.buttonGroup}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (isEditMode ? 'Updating...' : 'Adding...') 
            : (isEditMode ? 'Update Inspiration' : 'Add Inspiration')
          }
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default InspirationForm
