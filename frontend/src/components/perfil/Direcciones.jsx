import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/paymentMethods.css'
import { api } from '../../services/api'

const API_URL = api

export const Direcciones = () => {
  const [direcciones, setDirecciones] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const [addMessage, setAddMessage] = useState({ text: '', kind: '' })
  const [deleteMessage, setDeleteMessage] = useState({ text: '', kind: '' })

  const [formData, setFormData] = useState({
    calle: '',
    numeroInterior: '',
    numeroEXterior: '',
    colonia: '',
    alcadia: '',
    codigoPostal: ''
  })

  const userData = localStorage.getItem('usuario')
  const userId = userData ? JSON.parse(userData).id : null

  useEffect(() => {
    if (!userId) return
    const fetchDirecciones = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${API_URL}/${userId}`)
        setDirecciones(res.data.direcciones || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDirecciones()
  }, [userId])

  const validateDireccion = ({ calle, numeroInterior, numeroEXterior, colonia, alcadia, codigoPostal }) => {
    if (!calle.trim()) return 'La calle es obligatoria.'
    if (!numeroEXterior.trim()) return 'El número exterior es obligatorio.'
    if (!numeroInterior.trim()) return 'El número interior es obligatorio.'
    if (!colonia.trim()) return 'La colonia es obligatoria.'
    if (!alcadia.trim()) return 'La alcaldía es obligatoria.'
    if (!/^\d{5}$/.test(codigoPostal)) return 'El código postal debe tener 5 dígitos.'
    return null
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId) return

    const errorMsg = validateDireccion(formData)
    if (errorMsg) {
      setAddMessage({ text: errorMsg, kind: 'error' })
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${API_URL}/${userId}/direcciones`, formData)
      setDirecciones(res.data.direcciones || [])
      setFormData({
        calle: '',
        numeroInterior: '',
        numeroEXterior: '',
        colonia: '',
        alcadia: '',
        codigoPostal: ''
      })
      setAddMessage({ text: 'Dirección agregada correctamente.', kind: 'success' })
    } catch (err) {
      console.error(err)
      setAddMessage({ text: err.response?.data?.error || 'Error al agregar dirección', kind: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (selectedIndex === null || !userId) {
      setDeleteMessage({ text: 'Selecciona una dirección para eliminar.', kind: 'error' })
      return
    }

    try {
      setLoading(true)
      const res = await axios.delete(`${API_URL}/${userId}/direcciones/${selectedIndex}`)
      setDirecciones(res.data.direcciones || [])
      setSelectedIndex(null)
      setDeleteMessage({ text: 'Dirección eliminada correctamente.', kind: 'success' })
    } catch (err) {
      console.error(err)
      setDeleteMessage({ text: err.response?.data?.error || 'Error al eliminar dirección', kind: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (!userId) return <p>Cargando usuario...</p>

  return (
    <div className='direcciones-container'>
      <h2 className='title'>Direcciones</h2>

      {deleteMessage.text && <div className={`message ${deleteMessage.kind}`}>{deleteMessage.text}</div>}
      {loading && <p className='loading'>Cargando...</p>}

      <div className='direcciones-list-container'>
        {direcciones.length === 0
          ? <p className='no-direcciones'>No tienes direcciones registradas.</p>
          : (
            <ul className='direcciones-list'>
              {direcciones.map((d, i) => (
                <li key={i} className='direccion-item'>
                  <input
                    type='radio'
                    name='direccion'
                    className='radio-direccion'
                    checked={selectedIndex === i}
                    onChange={() => setSelectedIndex(i)}
                  />
                  <div className='direccion-info'>
                    <div>{d.calle} #{d.numeroEXterior}, Int. {d.numeroInterior}</div>
                    <div>Col. {d.colonia}, {d.alcadia}</div>
                    <div>CP {d.codigoPostal}</div>
                  </div>
                </li>
              ))}
            </ul>
            )}

        <button
          onClick={handleDelete}
          disabled={selectedIndex === null || loading}
          className='btn-delete'
        >
          Eliminar seleccionado
        </button>
      </div>

      <hr className='divider' />

      <h3 className='subtitle'>Agregar nueva dirección</h3>
      {addMessage.text && <div className={`message ${addMessage.kind}`}>{addMessage.text}</div>}

      <form onSubmit={handleSubmit} className='form-direccion'>
        <label>
          Calle:
          <input
            name='calle'
            value={formData.calle}
            onChange={handleChange}
            placeholder='Ej. Av. Reforma'
            required
            className='input-text'
          />
        </label>

        <label>
          Número Exterior:
          <input
            name='numeroEXterior'
            value={formData.numeroEXterior}
            onChange={handleChange}
            placeholder='Ej. 123'
            required
            className='input-text'
          />
        </label>

        <label>
          Número Interior:
          <input
            name='numeroInterior'
            value={formData.numeroInterior}
            onChange={handleChange}
            placeholder='Ej. 5B'
            required
            className='input-text'
          />
        </label>

        <label>
          Colonia:
          <input
            name='colonia'
            value={formData.colonia}
            onChange={handleChange}
            placeholder='Ej. Roma Norte'
            required
            className='input-text'
          />
        </label>

        <label>
          Alcaldía:
          <input
            name='alcadia'
            value={formData.alcadia}
            onChange={handleChange}
            placeholder='Ej. Cuauhtémoc'
            required
            className='input-text'
          />
        </label>

        <label>
          Código Postal:
          <input
            name='codigoPostal'
            value={formData.codigoPostal}
            onChange={handleChange}
            placeholder='Ej. 06700'
            required
            className='input-text'
          />
        </label>

        <button type='submit' disabled={loading} className='btn-submit'>
          {loading ? 'Guardando...' : 'Agregar dirección'}
        </button>
      </form>
    </div>
  )
}
