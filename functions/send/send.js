// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body)
    
    const today = new Date()
    const dayToSend = new Date(today)
    // se a pessoa enviou depois das 17
    if (today.getHours() > 17){
      dayToSend.setDate(today.getDate() + 1)
      dayToSend.setHours(9)
      dayToSend.setMinutes(Math.ceil(Math.random()*59))
    } else if (today.getHours() < 9) {
      dayToSend.setHours(9)
      dayToSend.setMinutes(Math.ceil(Math.random()*59))
    } else {
      dayToSend.setHours(today.getHours() + 1)
      dayToSend.setMinutes(Math.ceil(Math.random()*59))
    }

    let message = `
      Olá, acabamos de receber um novo pedido de orçamento.

      Dados do cliente:
      -----------------
      
      Nome: ${data.name}
      Email: ${data.email}
      Mensagem: ${data.mensagem}

      Dados do pedido:
      ----------------

    `
    Object
      .keys(data.products)
      .forEach(key => {
        message += `
        -   Produto: ${data.products[key].product}
            Quantidade: ${data.products[key].quantity}
            R$: ${(data.products[key].price * data.products[key].quantity).toFixed(2)}
        `
    })

    const mailgun = require('mailgun-js')
    const DOMAIN = 'sandboxd438bdee478d4d7e8e7e53fb4accb92c.mailgun.org'
    const mg = mailgun({
      apiKey: '714d880741a97f2f345335840ed9a845-3e51f8d2-ccbe4b9b',
      domain: DOMAIN
    })
    const msg = {
      from: 'Requinte Básico <contato@requintebasico.com.br>',
      to: 'mateus.requintebasico@gmail.com',
      subject: '[ORÇAMENTO] Pedido recebido',
      text: message,
      'o:deliverytime': dayToSend.toUTCString()
    }
    mg.messages().send(msg, function (error, body) {
      if (error) {
        console.log(error)
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `email enviado` })
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
