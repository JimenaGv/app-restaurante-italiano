import '../styles/global.css'
import '../styles/menu.css'
import React, { useState, useEffect } from 'react'
import { CardMenu } from '../components/menu/CardMenu'
import { ModalPlatillo } from '../components/menu/ModalPlatillo'

export const Menu = () => {
  // PAYLOAD
//   {
//   "text": "Bebidas",
//   "value": "bebidas",
//   "dish": {
//     "name": "Mojito",
//     "price": 6.00,
//     "image": "https://ik.imagekit.io/bhug69xts/mojito.png",
//     "description": "Cóctel refrescante con ron, hierbabuena, azúcar y limón.",
//     "customizations": [
//       { "text": "Tamaño", "value": "tamano", "options": ["Pequeño", "Mediano", "Grande"] },
//       { "text": "Extra", "value": "extra", "options": ["Con extra de ron", "Sin extra de ron"] }
//     ]
//   }
// }
  // const menu = [
  //   {
  //     text: 'Entradas',
  //     value: 'entradas',
  //     dishes: [
  //       {
  //         id: 'entradas-1',
  //         name: 'Bruschetta',
  //         price: 5.99,
  //         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2014_Bruschetta_The_Larder_Chiang_Mai.jpg/1280px-2014_Bruschetta_The_Larder_Chiang_Mai.jpg',
  //         description: 'Pan tostado con tomate, albahaca y aceite de oliva.',
  //         customizations: [
  //           { text: 'Tipo de pan', value: 'tipo_de_pan', options: ['Integral', 'Blanco', 'Ajo'] },
  //           { text: 'Agregar queso', value: 'agregar_queso', options: ['Mozzarella', 'Parmesano', 'Sin queso'] }
  //         ]
  //       },
  //       {
  //         id: 'entradas-2',
  //         name: 'Ensalada Caprese',
  //         price: 7.49,
  //         image: 'https://www.themediterraneandish.com/wp-content/uploads/2023/06/Caprese-Salad_7-315x315.jpg',
  //         description: 'Tomates frescos, mozzarella, albahaca, aceite de oliva y vinagre balsámico.',
  //         customizations: [
  //           { text: 'Tamaño', value: 'tamano', options: ['Pequeña', 'Grande'] },
  //           { text: 'Agregar aderezo', value: 'agregar_aderezo', options: ['Balsámico', 'Mostaza y miel', 'Sin aderezo'] }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Platos Principales',
  //     value: 'platos_principales',
  //     dishes: [
  //       {
  //         id: 'platos_principales-1',
  //         name: 'Spaghetti Carbonara',
  //         price: 12.99,
  //         image: 'https://thefoodxp.com/wp-content/uploads/2021/06/Spaghetti-carbonara-Recipe.jpg',
  //         description: 'Pasta con crema, huevo, panceta y queso parmesano.',
  //         customizations: [
  //           { text: 'Tipo de pasta', value: 'tipo_de_pasta', options: ['Espaguetis', 'Fettuccine', 'Penne'] },
  //           { text: 'Agregar proteína', value: 'agregar_proteina', options: ['Pollo', 'Tocino', 'Vegetariano'] }
  //         ]
  //       },
  //       {
  //         id: 'platos_principales-2',
  //         name: 'Pizza Margherita',
  //         price: 9.99,
  //         image: 'https://foodbyjonister.com/wp-content/uploads/2020/01/MargheritaPizza.jpg',
  //         description: 'Pizza clásica con tomate, mozzarella, albahaca y aceite de oliva.',
  //         customizations: [
  //           { text: 'Tamaño', value: 'tamano', options: ['Individual', 'Mediana', 'Familiar'] },
  //           { text: 'Agregar extra', value: 'agregar_extra', options: ['Pepperoni', 'Champiñones', 'Anchoas', 'Sin extras'] }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Postres',
  //     value: 'postres',
  //     dishes: [
  //       {
  //         id: 'postres-1',
  //         name: 'Tiramisú',
  //         price: 4.50,
  //         image: 'https://cdn7.kiwilimon.com/recetaimagen/35448/42520.jpg',
  //         description: 'Delicioso postre italiano de café, mascarpone y cacao.',
  //         customizations: [
  //           { text: 'Tamaño', value: 'tamano', options: ['Individual', 'Porción grande'] },
  //           { text: 'Sin café', value: 'sin_cafe', options: ['Con café', 'Sin café'] }
  //         ]
  //       },
  //       {
  //         id: 'postres-2',
  //         name: 'Cheesecake de Fresa',
  //         price: 5.75,
  //         image: 'https://tse1.mm.bing.net/th/id/OIP.stqodgel_tiVD1VJ2s7odgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  //         description: 'Suave pastel de queso con mermelada de fresa.',
  //         customizations: [
  //           { text: 'Tamaño', value: 'tamano', options: ['Individual', 'Porción grande'] },
  //           { text: 'Corteza', value: 'corteza', options: ['Galleta', 'Sin corteza'] }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     text: 'Bebidas',
  //     value: 'bebidas',
  //     dishes: [
  //       {
  //         id: 'bebidas-1',
  //         name: 'Mojito',
  //         price: 6.00,
  //         image: 'https://ik.imagekit.io/bhug69xts/mojito.png',
  //         description: 'Cóctel refrescante con ron, hierbabuena, azúcar y limón.',
  //         customizations: [
  //           { text: 'Tamaño', value: 'tamano', options: ['Pequeño', 'Mediano', 'Grande'] },
  //           { text: 'Extra', value: 'extra', options: ['Con extra de ron', 'Sin extra de ron'] }
  //         ]
  //       },
  //       {
  //         id: 'bebidas-2',
  //         name: 'Limonada Natural',
  //         price: 3.50,
  //         image: 'https://tse3.mm.bing.net/th/id/OIP.KgUgU5x8fjt9KlT66GubvwHaEO?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  //         description: 'Limonada fresca con azúcar y agua mineral.',
  //         customizations: [
  //           { text: 'Con azúcar', value: 'con_azucar', options: ['Con azúcar', 'Sin azúcar'] },
  //           { text: 'Agua', value: 'agua', options: ['Agua normal', 'Agua con gas'] }
  //         ]
  //       }
  //     ]
  //   }
  // ]

  const [menu, setMenu] = useState([])
  const [activeTab, setActiveTab] = useState()
  const [modalState, setModalState] = useState(false)
  const [selectDish, setSelectDish] = useState(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:3000/menu', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) throw new Error('Error al obtener el menú.')

        const menuCompleto = await res.json()

        setMenu(menuCompleto)
        setActiveTab(menuCompleto[0])
      } catch (error) {
        setMenu([])
        console.error(error)
      }
    }

    fetchMenu()
  }, [])

  const updateModalState = (newState) => {
    setModalState(newState)
  }

  const openModalState = (dish) => {
    setModalState(true)
    setSelectDish(dish)
  }

  return (
    <>
      <div className='page'>
        <h2 className='menu--title title'>Nuestro Menú</h2>

        <div className='menu--category-tabs-container'>
          {menu.map((c) => (
            <button
              key={c.value}
              className={`menu--category-tab ${c.value === activeTab?.value ? 'active' : ''}`}
              onClick={() => setActiveTab(c)}
            >
              {c.text}
            </button>
          ))}
        </div>

        <div className='menu--dishes-container'>
          <h2 className='menu--category-title'>{activeTab?.text}</h2>

          <ul className='menu--dishes'>
            {
                    activeTab?.dishes.map((d) => (
                      <CardMenu key={d._id} data={d} addAction={openModalState} />
                    ))
                }
          </ul>
        </div>
      </div>
      {modalState && (
        <ModalPlatillo
          modalState={updateModalState}
          dish={selectDish}
        />
      )}
    </>
  )
}
