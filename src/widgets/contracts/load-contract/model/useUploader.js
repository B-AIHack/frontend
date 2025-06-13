import { useState } from 'react'
import { useUploadMutation } from '@/entities/contracts'

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
  const { mutateAsync: uploadAsync } = useUploadMutation()

  const [files, setFiles] = useState([])
  const [loadedFiles, setLoadedFiles] = useState({})

  const [statusById, setStatusById] = useState({})

  const startLoadingForFiles = async (files) => {
    for await (const file of files) {
      const id = getFileId(file)

      setStatusById((previousState) => ({
        ...previousState,
        [id]: 'loading'
      }))

      const formData = new FormData()
      formData.append('files', file)

      const loadedFile = await uploadAsync(formData)

      setStatusById((previousState) => ({
        ...previousState,
        [id]: 'loaded'
      }))
      setLoadedFiles((previousState) => ({
        ...previousState,
        [id]: loadedFile.data.ids.at(0)
      }))
    }
  }

  const deleteFile = (id) => {
    setFiles((previousFiles) =>
      previousFiles.filter((file) => getFileId(file) !== id)
    )
    setLoadedFiles((previousFiles) => {
      const { [id]: _, ...rest } = previousFiles

      return rest
    })
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
    loadedFiles,
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
