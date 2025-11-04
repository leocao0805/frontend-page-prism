import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, updateProject, deleteProject } from '../services/project'
import { createInspiration, getInspirationsByProject, updateInspiration, deleteInspiration } from '../services/inspiration'
import { applyFilters } from '../utils/filterUtils'
import Button from '../components/Button'
import ProjectForm from '../components/ProjectForm'
import InspirationForm from '../components/InspirationForm'
import InspirationCard from '../components/InspirationCard'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import styles from './ProjectDetail.module.css'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [inspirations, setInspirations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingInspiration, setEditingInspiration] = useState(null)
  const [deletingInspiration, setDeletingInspiration] = useState(null)
  const [editingProject, setEditingProject] = useState(false)
  const [deletingProject, setDeletingProject] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchProjectData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [projectData, projectInspirations] = await Promise.all([
        getProject(id),
        getInspirationsByProject(id),
      ])
      
      if (!projectData) {
        throw new Error('Project not found')
      }
      
      setProject(projectData)
      setInspirations(projectInspirations)
    } catch (err) {
      setError(err.message || 'Failed to load project')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjectData()
  }, [id])

  const handleCreateInspiration = async (inspirationData) => {
    const newInspiration = await createInspiration(inspirationData)
    setInspirations([newInspiration, ...inspirations])
    setShowForm(false)
  }

  const handleEditInspiration = (inspiration) => {
    setEditingInspiration(inspiration)
    setShowForm(true)
  }

  const handleUpdateInspiration = async (inspirationData) => {
    const updatedInspiration = await updateInspiration(
      editingInspiration.id,
      inspirationData
    )
    setInspirations(
      inspirations.map((insp) =>
        insp.id === editingInspiration.id ? updatedInspiration : insp
      )
    )
    setShowForm(false)
    setEditingInspiration(null)
  }

  const handleDeleteClick = (inspiration) => {
    setDeletingInspiration(inspiration)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingInspiration) return
    
    try {
      await deleteInspiration(deletingInspiration.id)
      setInspirations(
        inspirations.filter((insp) => insp.id !== deletingInspiration.id)
      )
      setDeletingInspiration(null)
    } catch (err) {
      setError(err.message || 'Failed to delete inspiration')
      setDeletingInspiration(null)
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingInspiration(null)
  }

  const handleEditProject = () => {
    setEditingProject(true)
  }

  const handleUpdateProject = async (projectData) => {
    const updatedProject = await updateProject(id, projectData)
    setProject(updatedProject)
    setEditingProject(false)
  }

  const handleDeleteProject = () => {
    setDeletingProject(true)
  }

  const handleDeleteProjectConfirm = async () => {
    try {
      await deleteProject(id)
      navigate('/projects')
    } catch (err) {
      setError(err.message || 'Failed to delete project')
      setDeletingProject(false)
    }
  }

  // Apply search and filter using useMemo for performance
  const filteredInspirations = useMemo(() => {
    return applyFilters(inspirations, searchQuery, sortOrder)
  }, [inspirations, searchQuery, sortOrder])

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading project..." />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Project"
        message={error}
        onRetry={fetchProjectData}
      />
    )
  }

  if (!project) {
    return <ErrorState title="Project Not Found" message="This project could not be found." />
  }

  return (
    <div className={styles.container}>
      {editingProject ? (
        <div className={styles.editProjectSection}>
          <h2 className={styles.sectionTitle}>Edit Project</h2>
          <ProjectForm
            onSubmit={handleUpdateProject}
            onCancel={() => setEditingProject(false)}
            initialData={project}
          />
        </div>
      ) : (
        <div className={styles.projectHeader}>
          <div>
            <h1 className={styles.heading}>{project.name}</h1>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.metadata}>
              <span>
                <strong>Created:</strong>{' '}
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
              <span className={styles.divider}>•</span>
              <span>
                <strong>Last Updated:</strong>{' '}
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={handleEditProject} className={styles.editButton}>
              Edit Project
            </Button>
            <Button onClick={handleDeleteProject} className={styles.deleteButton}>
              Delete Project
            </Button>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.subheading}>Inspirations ({inspirations.length})</h2>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : editingInspiration ? 'Cancel Edit' : 'Add Inspiration'}
          </Button>
        </div>

        {showForm && (
          <InspirationForm
            onSubmit={editingInspiration ? handleUpdateInspiration : handleCreateInspiration}
            onCancel={handleCancelForm}
            projectId={id}
            initialData={editingInspiration}
          />
        )}

        {inspirations.length > 0 && (
          <div className={styles.filterSection}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
              placeholder="Search by URL or notes..."
            />
            <div className={styles.sortControl}>
              <label htmlFor="sort" className={styles.sortLabel}>
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        )}

        {inspirations.length === 0 ? (
          <EmptyState
            title="No Inspirations Yet"
            message="Start adding design inspirations to this project"
            actionLabel="Add First Inspiration"
            onAction={() => setShowForm(true)}
          />
        ) : filteredInspirations.length === 0 ? (
          <EmptyState
            title="No Results Found"
            message={`No inspirations match "${searchQuery}". Try a different search term.`}
            actionLabel="Clear Search"
            onAction={handleClearSearch}
          />
        ) : (
          <div className={styles.inspirationGrid}>
            {filteredInspirations.map((inspiration) => (
              <InspirationCard 
                key={inspiration.id} 
                inspiration={inspiration}
                onEdit={handleEditInspiration}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deletingInspiration}
        title="Delete Inspiration"
        message="Are you sure you want to delete this inspiration? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingInspiration(null)}
        variant="danger"
      />

      <ConfirmDialog
        isOpen={deletingProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${project?.name}"? This will also delete all ${inspirations.length} associated inspirations. This action cannot be undone.`}
        confirmLabel="Delete Project"
        cancelLabel="Cancel"
        onConfirm={handleDeleteProjectConfirm}
        onCancel={() => setDeletingProject(false)}
        variant="danger"
      />
    </div>
  )
}

export default ProjectDetail
