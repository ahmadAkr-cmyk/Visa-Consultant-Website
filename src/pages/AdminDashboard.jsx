import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../Components/Toast'
import { FaSignOutAlt, FaImage, FaEnvelope } from 'react-icons/fa'

const AdminDashboard = () => {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('messages')

  useEffect(() => {
    if (!loading && !session) {
      navigate('/')
    }
  }, [session, loading, navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'messages'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaEnvelope />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === 'images'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaImage />
            Image Gallery
          </button>
        </div>

        {/* Content */}
        {activeTab === 'messages' && <MessagesSection />}
        {activeTab === 'images' && <ImageManager />}
      </div>
    </div>
  )
}

// Messages Section Component
const MessagesSection = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data)
    } catch (err) {
      console.error('Error fetching messages:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load messages'
      })
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (err) {
      console.error('Error updating message:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to mark message as read'
      })
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchMessages()
      addToast({
        type: 'success',
        title: 'Success',
        message: 'Message deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting message:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete message'
      })
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading messages...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {messages.map((msg) => (
            <tr key={msg.id} className={!msg.is_read ? 'bg-yellow-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">
                {!msg.is_read && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Unread</span>}
                {msg.is_read && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Read</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msg.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{msg.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{msg.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{msg.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(msg.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {!msg.is_read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {messages.length === 0 && (
        <div className="text-center py-10 text-gray-500">No messages yet</div>
      )}
    </div>
  )
}

// Image Manager Component
const ImageManager = () => {
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const { addToast } = useToast()

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setImages(data)
    } catch (err) {
      console.error('Error fetching images:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to load gallery images'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const uploadImage = async (e) => {
    e.preventDefault()
    try {
      setUploading(true)
      if (!selectedFile) {
        addToast({
          type: 'error',
          title: 'Error',
          message: 'Please select a file first'
        })
        return
      }

      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      console.log('Uploading file to Supabase Storage...')
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, selectedFile)

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        throw uploadError
      }

      console.log('Getting public URL...')
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName)

      console.log('Inserting into database...')
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{
          image_url: publicUrl,
          country: country
        }])

      if (dbError) {
        console.error('Database insert error:', dbError)
        throw dbError
      }

      setCountry('')
      setSelectedFile(null)
      addToast({
        type: 'success',
        title: 'Success',
        message: 'Image uploaded successfully'
      })
      fetchImages()
    } catch (err) {
      console.error('Error uploading image:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to upload image. Check console for details.'
      })
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (image) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return

    try {
      const fileName = image.image_url.split('/').pop()
      
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([fileName])

      if (storageError) throw storageError

      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id)

      if (dbError) throw dbError

      addToast({
        type: 'success',
        title: 'Success',
        message: 'Image deleted successfully'
      })
      fetchImages()
    } catch (err) {
      console.error('Error deleting image:', err)
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete image'
      })
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading images...</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Upload New Image</h3>
        <form onSubmit={uploadImage} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <input
            type="text"
            placeholder="Country (e.g., Canada, UK)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="w-full bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={img.image_url}
              alt={img.country}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {img.country && (
                <h3 className="font-bold text-blue-950">{img.country}</h3>
              )}
              <button
                onClick={() => deleteImage(img)}
                className="mt-3 text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
          No images yet. Upload your first image!
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
