import React, { useState, useEffect } from 'react'
import Button from './Button'
import styles from './ProjectForm.module.css'

const ProjectForm = ({ onSubmit, onCancel, initialData = null }) => {
  const isEditMode = !!initialData
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setDescription(initialData.description || '')
    }
  }, [initialData])

  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Project name is required'
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
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
      })
      // Reset form on success (only if not in edit mode)
      if (!isEditMode) {
        setName('')
        setDescription('')
      }
      setErrors({})
    } catch (error) {
      setErrors({ submit: error.message || `Failed to ${isEditMode ? 'update' : 'create'} project` })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Project Name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="Enter project name"
          disabled={isSubmitting}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Enter project description (optional)"
          rows="4"
          disabled={isSubmitting}
        />
      </div>

      {errors.submit && (
        <div className={styles.submitError}>{errors.submit}</div>
      )}

      <div className={styles.buttonGroup}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (isEditMode ? 'Updating...' : 'Creating...') 
            : (isEditMode ? 'Update Project' : 'Create Project')
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

export default ProjectForm
