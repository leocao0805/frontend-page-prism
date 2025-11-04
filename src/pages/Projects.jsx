import React, { useState, useEffect } from 'react'
import { getAllProjects, createProject, updateProject, deleteProject } from '../services/project'
import ProjectForm from '../components/ProjectForm'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import ProjectCard from '../components/ProjectCard'
import ConfirmDialog from '../components/ConfirmDialog'
import Button from '../components/Button'
import styles from './Projects.module.css'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const allProjects = await getAllProjects()
      setProjects(allProjects)
    } catch (err) {
      setError(err.message || 'Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreateProject = async (projectData) => {
    const newProject = await createProject(projectData)
    setProjects([newProject, ...projects])
    setShowForm(false)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleUpdateProject = async (projectData) => {
    const updatedProject = await updateProject(editingProject.id, projectData)
    setProjects(
      projects.map((proj) =>
        proj.id === editingProject.id ? updatedProject : proj
      )
    )
    setShowForm(false)
    setEditingProject(null)
  }

  const handleDeleteClick = (project) => {
    setDeletingProject(project)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingProject) return
    
    try {
      await deleteProject(deletingProject.id)
      setProjects(projects.filter((proj) => proj.id !== deletingProject.id))
      setDeletingProject(null)
    } catch (err) {
      setError(err.message || 'Failed to delete project')
      setDeletingProject(null)
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading projects..." />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Projects"
        message={error}
        onRetry={fetchProjects}
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : editingProject ? 'Cancel Edit' : 'New Project'}
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={handleCancelForm}
          initialData={editingProject}
        />
      )}

      {projects.length === 0 ? (
        <EmptyState
          title="No Projects Yet"
          message="Create your first project to start organizing your design inspirations"
          actionLabel="Create Project"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${deletingProject?.name}"? This will also delete all associated inspirations. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingProject(null)}
        variant="danger"
      />
    </div>
  )
}

export default Projects
