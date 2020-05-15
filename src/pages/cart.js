import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useCart } from '../lib/CartContext'
import axios from 'axios'

const Cart = () => {
  const cart = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [successMail, setSuccessMail] = useState(false)

  const remove = slug => () => {
    cart.removeFromCart(slug)
  }

  const addToCart = (slug, quantity) => () => {
    cart.addToCart({ slug }, quantity)
  }

  const send = async() => {
    if (name !== '' && email !== ''){
      await axios.post('/.netlify/functions/send', {
        name,
        email,
        mensagem,
        products: cart.cart
      })
      setSuccessMail(true)
      cart.cleanCart()
    }
  }

  const onChangeName = e => {
    setName(e.target.value)
  }
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangeMensagem = e => {
    setMensagem(e.target.value)
  }

  return (
    <Layout>
      <h1 className='font-bold text-lg py-6'>Cart</h1>
      {
        !successMail && cart.size === 0 &&
        <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p class="font-bold">Atenção</p>
          <p>Seu carrinho está vazio. Para pedidos de orçamento, adicione produtos ao carrinho.</p>
        </div>
      }
      {
        !successMail &&
        <div>
          {
            Object
              .keys(cart.cart)
              .map(slug => {
                const product = cart.cart[slug]
                return (
                  <div key={slug} className='border py-6 px-4 mb-4'>
                    <h2 className='font-bold'>{product.product}</h2>
                    <p>
                      <button onClick={addToCart(slug, -1)} disabled={product.quantity <= 1} className='p-1 bg-red-200 hover:bg-red-300 rounded disabled:opacity-75'>-</button>
                      <span className='p-2'>{product.quantity}</span>
                      <button onClick={addToCart(slug, 1)} className='p-1 bg-green-200 hover:bg-green-300 rounded disabled:opacity-75'>+</button>
                    </p>
                    <button className='mt-2 py-2 px-4 bg-red-200 hover:bg-red-300 rounded' type='button' onClick={remove(slug)}>Remover</button>
                  </div>
                )
              })
          }
          {
            cart.size > 0 &&
            <div className='shadow rounded p-6 flex'>
              <h3 className='font-bold text-lg'>Seus dados:</h3>
              <label className='block py-2'>Nome: <input className='border' type='text' name='name' onChange={onChangeName} /></label>
              <label className='block py-2'>E-mail: <input className='border' type='text' name='email' onChange={onChangeEmail} /></label>
              <label className='block py-2'>Mensagem: <input className='border' type='text' name='mensagem' onChange={onChangeMensagem} /></label>
              <button className='bg-gray-200 p-2' onClick={send}>Enviar pedido de orçamento</button>
            </div>
          }
        </div>
      }
      {
        successMail &&
        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
          <div className="flex">
            <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
              <p className="font-bold">Seu pedido de orçamento foi enviado com sucesso!</p>
              <p className="text-sm">As respostas demoram em torno de 1 dia útil para serem processadas.</p>
            </div>
          </div>
        </div>
      }
    </Layout>
  )
}

export default Cart
