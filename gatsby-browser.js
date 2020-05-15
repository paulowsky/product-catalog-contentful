const React = require('react')
const CartProvider = require('./src/lib/CartContext').CartProvider

exports.wrapPageElement = ({ element, props }) => {
  return (
    <CartProvider {...props}>
      {element}
    </CartProvider>
  )
}
