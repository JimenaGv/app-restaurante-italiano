import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/paymentMethods.css'
import { api } from '../../services/api'

const API_URL = api

export default function MetodosPago () {
  const [metodosPago, setMetodosPago] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const [addMessage, setAddMessage] = useState({ text: '', kind: '' })
  const [deleteMessage, setDeleteMessage] = useState({ text: '', kind: '' })

  const [formData, setFormData] = useState({
    categoria: 'crédito',
    numeroTarjeta: '',
    vencimiento: '',
    titular: ''
  })

  const userData = localStorage.getItem('usuario')
  const userId = userData ? JSON.parse(userData).id : null

  useEffect(() => {
    if (!userId) return
    const fetchMetodos = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${API_URL}/${userId}`)
        setMetodosPago(res.data.metodosPago || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMetodos()
  }, [userId])

  const maskCard = (num) => {
    if (!num) return ''
    const only = ('' + num).replace(/\s+/g, '')
    const last4 = only.slice(-4)
    return `**** **** **** ${last4}`
  }

  const validateCard = ({ numeroTarjeta, vencimiento, titular }) => {
    const digits = (numeroTarjeta || '').replace(/\s+/g, '')
    if (!/^\d{16}$/.test(digits)) return 'El número de tarjeta debe tener 16 dígitos.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) return 'El vencimiento debe estar en formato MM/AA.'
    if (!titular || titular.trim().length < 2) return 'El nombre del titular es obligatorio.'
    return null
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId) return

    const errorMsg = validateCard(formData)
    if (errorMsg) {
      setAddMessage({ text: errorMsg, kind: 'error' })
      return
    }

    try {
      setLoading(true)
      const payload = {
        numeroTarjeta: formData.numeroTarjeta.replace(/\s+/g, ''),
        vencimiento: formData.vencimiento,
        titular: formData.titular,
        categoria: formData.categoria
      }

      const res = await axios.post(`${API_URL}/${userId}/metodos-pago`, payload)
      setMetodosPago(res.data.metodosPago || [])
      setFormData({ categoria: 'crédito', numeroTarjeta: '', vencimiento: '', titular: '' })
      setAddMessage({ text: 'Tarjeta agregada correctamente.', kind: 'success' })
    } catch (err) {
      console.error(err)
      setAddMessage({ text: err.response?.data?.error || 'Error al agregar tarjeta', kind: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (selectedIndex === null || !userId) {
      setDeleteMessage({ text: 'Selecciona una tarjeta para eliminar.', kind: 'error' })
      return
    }

    try {
      setLoading(true)
      const res = await axios.delete(`${API_URL}/${userId}/metodos-pago/${selectedIndex}`)
      setMetodosPago(res.data.metodosPago || [])
      setSelectedIndex(null)
      setDeleteMessage({ text: 'Tarjeta eliminada correctamente.', kind: 'success' })
    } catch (err) {
      console.error(err)
      setDeleteMessage({ text: err.response?.data?.error || 'Error al eliminar tarjeta', kind: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (!userId) return <p>Cargando usuario...</p>

  return (
    <div className='metodos-pago-container'>
      <h2 className='title'>Métodos de Pago</h2>

      {deleteMessage.text && <div className={`message ${deleteMessage.kind}`}>{deleteMessage.text}</div>}

      {loading && <p className='loading'>Cargando...</p>}

      <div className='metodos-list-container'>
        {metodosPago.length === 0
          ? <p className='no-metodos'>No tienes tarjetas registradas.</p>
          : (
            <ul className='metodos-list'>
              {metodosPago.map((m, i) => (
                <li key={i} className='metodo-item'>
                  <input
                    type='radio'
                    name='metodo'
                    className='radio-metodo'
                    checked={selectedIndex === i}
                    onChange={() => setSelectedIndex(i)}
                  />
                  <div className='metodo-info'>
                    <div className='categoria'>{m.categoria.toUpperCase()}</div>
                    <div className='numero'>{maskCard(m.numeroTarjeta)} — {m.titular}</div>
                    <div className='vence'>Vence: {m.vencimiento}</div>
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

      <h3 className='subtitle'>Agregar nueva tarjeta</h3>
      {addMessage.text && <div className={`message ${addMessage.kind}`}>{addMessage.text}</div>}
      <form onSubmit={handleSubmit} className='form-metodo'>
        <label>
          Categoria:
          <select
            name='categoria'
            value={formData.categoria}
            onChange={handleChange}
            className='input-select'
          >
            <option value='crédito'>Crédito</option>
            <option value='débito'>Débito</option>
          </select>
        </label>

        <label>
          Número de tarjeta:
          <input
            name='numeroTarjeta'
            value={formData.numeroTarjeta}
            onChange={handleChange}
            placeholder='1234 5678 9012 3456'
            required
            className='input-text'
          />
        </label>

        <label>
          Vencimiento (MM/AA):
          <input
            name='vencimiento'
            value={formData.vencimiento}
            onChange={handleChange}
            placeholder='MM/AA'
            required
            className='input-text'
          />
        </label>

        <label>
          Titular:
          <input
            name='titular'
            value={formData.titular}
            onChange={handleChange}
            placeholder='Nombre en la tarjeta'
            required
            className='input-text'
          />
        </label>

        <button type='submit' disabled={loading} className='btn-submit'>
          {loading ? 'Guardando...' : 'Agregar tarjeta'}
        </button>
      </form>
    </div>
  )
}
