import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, updateProject, deleteProject } from '../services/project'
import { createInspiration, updateInspiration, deleteInspiration } from '../services/inspiration'
import Button from '../components/Button'
import styles from './ProjectDetail.module.css'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [editingInspirationId, setEditingInspirationId] = useState(null)
  const [editingUrl, setEditingUrl] = useState('')
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

  const handleUpdateUrl = async (inspirationId, newUrl) => {
    await updateInspiration(inspirationId, { websiteMetadata: { url: newUrl } })
    setProject({
      ...project,
      inspirations: project.inspirations.map((i) =>
        i.id === inspirationId ? { ...i, websiteMetadata: { ...i.websiteMetadata, url: newUrl } } : i
      ),
    })
  }

  const handleDeleteInspiration = async (inspirationId) => {
    if (window.confirm('Delete this inspiration?')) {
      await deleteInspiration(inspirationId)
      setProject({
        ...project,
        inspirations: project.inspirations.filter((i) => i.id !== inspirationId),
      })
    }
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
                  <li key={inspiration.id} className={styles.taskItem}>
                    {editingInspirationId === inspiration.id ? (
                      <>
                        <input
                          className={styles.input}
                          value={editingUrl}
                          onChange={(e) => setEditingUrl(e.target.value)}
                        />
                        <Button onClick={() => setEditingInspirationId(null)}>Cancel</Button>
                        <Button className={styles.editButton} onClick={() => {
                          handleUpdateUrl(inspiration.id, editingUrl)
                          setEditingInspirationId(null)
                        }}>Save</Button>
                      </>
                    ) : (
                      <>
                        <span className={styles.taskText}>
                          {inspiration.websiteMetadata.url}
                        </span>
                        <Button className={styles.editButton} onClick={() => {
                          setEditingInspirationId(inspiration.id)
                          setEditingUrl(inspiration.websiteMetadata.url)
                        }}>
                          Edit
                        </Button>
                        <Button className={styles.deleteButton} onClick={() => handleDeleteInspiration(inspiration.id)}>
                          Delete
                        </Button>
                      </>
                    )}
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
