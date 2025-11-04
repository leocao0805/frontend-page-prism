import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import styles from './ProjectCard.module.css'

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const handleEdit = (e) => {
    e.preventDefault()
    onEdit(project)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    onDelete(project)
  }

  return (
    <div className={styles.card}>
      <Link to={`/projects/${project.id}`} className={styles.link}>
        <div className={styles.header}>
          <h3 className={styles.name}>{project.name}</h3>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
        <div className={styles.footer}>
          <span className={styles.inspirationsCount}>
            {project.inspirations?.length || 0} inspirations
          </span>
        </div>
      </Link>
      
      {(onEdit || onDelete) && (
        <div className={styles.actions}>
          {onEdit && (
            <Button onClick={handleEdit} className={styles.editButton}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button onClick={handleDelete} className={styles.deleteButton}>
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectCard
