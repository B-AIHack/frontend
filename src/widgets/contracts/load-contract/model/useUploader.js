import { useState } from 'react'

export const getFileFormat = (file) =>
  file.name.match(/\.([^.]+)$/)?.[1]?.toUpperCase() ?? null

const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 B'
  }

  const k = 1024
  const dm = Math.max(0, decimals)
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = parseFloat((bytes / k ** i).toFixed(dm))

  return `${value} ${sizes[i]}`
}

const getFileSize = (file, decimals) => formatFileSize(file.size, decimals ?? 2)

const getFileId = (file) => file.name + file.type

export const useUploader = () => {
  const [files, setFiles] = useState([])

  const [statusById, setStatusById] = useState({})

  const startLoadingForFiles = async (files) => {
    files.forEach((file) => {
      const id = getFileId(file)

      setStatusById((previousState) => ({
        ...previousState,
        [id]: 'loading'
      }))

      setTimeout(() => {
        setStatusById((previousState) => ({
          ...previousState,
          [id]: 'loaded'
        }))
      }, 400)
    })
  }

  const deleteFile = (id) => {
    setFiles((previousFiles) =>
      previousFiles.filter((file) => getFileId(file) !== id)
    )
  }

  const onChange = ({ acceptedFiles, files }) => {
    setFiles(files)
    startLoadingForFiles(acceptedFiles)
  }

  const allow = (nextFiles) => {
    return (
      files.length === 0 &&
      nextFiles.every((file) => file.type === 'application/pdf')
    )
  }

  return {
    files,
    setFiles,
    statusById,
    setStatusById,
    deleteFile,
    startLoadingForFiles,
    onChange,
    allow
  }
}

export const prepareFile = (file, filesControl) => {
  const id = getFileId(file)

  return {
    id,
    status: filesControl.statusById[id] ?? 'error',
    description: getFileSize(file),
    name: file.name,
    format: getFileFormat(file)
  }
}

export const prepareFiles = (files, filesControl) =>
  files.map((file) => prepareFile(file, filesControl))
