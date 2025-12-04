import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, updateProject, deleteProject } from '../services/project'
import { createInspiration } from '../services/inspiration'
import Button from '../components/Button'
import styles from './ProjectDetail.module.css'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(id)
      setProject(projectData)
    }
    fetchProject()
  }, [id])

  const handleEdit = () => {
    setName(project.name)
    setDescription(project.description)
    setIsEditing(true)
  }

  const handleSave = async () => {
    const updated = await updateProject(id, { name, description })
    setProject(updated)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id)
      navigate('/projects')
    }
  }

  const handleAddInspiration = async () => {
    if (!url.trim()) return
    const newInspiration = await createInspiration({
      projectId: id,
      websiteMetadata: { url: url.trim() },
      screenshot_uri: '',
      notes: '',
    })
    setProject({
      ...project,
      inspirations: [...(project.inspirations || []), newInspiration],
    })
    setUrl('')
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      {isEditing ? (
        <>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button className={styles.editButton} onClick={handleSave}>Save</Button>
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.heading}>{project.name}</h1>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.section}>
            <h2 className={styles.subheading}>Project Details</h2>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Updated:</strong>{' '}
              {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className={styles.section}>
            <h2 className={styles.subheading}>Inspirations</h2>
            {project.inspirations?.length > 0 ? (
              <ul className={styles.inspirationList}>
                {project.inspirations.map((inspiration) => (
                  <li key={inspiration.id}>
                    {inspiration.websiteMetadata.title ||
                      inspiration.websiteMetadata.url}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No inspirations added yet.</p>
            )}
            <div className={styles.addTaskForm}>
              <input
                className={styles.input}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
              />
              <Button className={styles.addButton} onClick={handleAddInspiration}>
                Add Inspiration
              </Button>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button className={styles.editButton} onClick={handleEdit}>Edit Project</Button>
            <Button className={styles.deleteButton} onClick={handleDelete}>Delete Project</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectDetail
