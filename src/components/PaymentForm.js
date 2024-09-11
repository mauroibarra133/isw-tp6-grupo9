import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { Card, Button } from 'react-bootstrap';


const PaymentForm = ({ paymentMethods, onPayment, setSelectedPaymentMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentData, setPaymentData] = useState({
    numeroTarjeta: '',
    pin: '',
    nombre: '',
    tipo: '',
    numeroDocumento: '',
    direccion: ''
  });
  const handleCardClick = (method) => {
    setSelectedMethod(method);
  };
  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayment(paymentData);
  };
  const paymentMethodDetails = {
    'Tarjeta': 'Pago seguro con Mercado Pago.',
    'Contado al retirar': 'Pago con efectivo al retirar tu pedido.',
    'Contado contra entrega': 'Pago con efectivo al recibir tu pedido.',
  };
  useEffect(() => {
    if (selectedMethod !== 'Tarjeta') {
      setPaymentData({
        numeroTarjeta: '',
        pin: '',
        nombre: '',
        tipo: '',
        numeroDocumento: ''
      });
    }
  }, [selectedMethod]);

  return (
    <div className="container payment-form">
      <h2>Forma de Pago</h2>
      <form onSubmit={handleSubmit}>
        <div className="row" style={{ padding: '2rem' }}>
          {paymentMethods.map((method) => (
            <div className="col-md-4 mb-4" key={method}>
              <Card
                className={`cursor-pointer ${selectedMethod === method ? 'border-primary' : 'border-secondary'}`}
                onClick={() => handleCardClick(method)}
              >
                <Card.Img variant="top" src={`/images/${method}.png`} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>{method}</Card.Title>
                  <Card.Text>
                    {paymentMethodDetails[method] || 'Descripción no disponible.'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* Mostrar campos específicos según el método de pago seleccionado */}
        {selectedMethod === 'Contado contra entrega' && (
          <div className="payment-fields">
            <input 
              type="text" 
              name="direccion" 
              placeholder="Direccion" 
              value={paymentData.direccion}
              onChange={handleInputChange} 
              className='form-control'
            />
          
          </div>
        )}
            {selectedMethod === 'Tarjeta' && (
          <div className="payment-fields">
            <input 
              type="text" 
              name="numeroTarjeta" 
              placeholder="Número de Tarjeta" 
              value={paymentData.numeroTarjeta}
              onChange={handleInputChange} 
              className='form-control'
            />
            <input 
              type="text" 
              name="pin" 
              placeholder="PIN" 
              value={paymentData.pin}
              onChange={handleInputChange}  
              className='form-control'
            />
            <input 
              type="text" 
              name="nombre" 
              placeholder="Nombre Completo" 
              value={paymentData.nombre}
              onChange={handleInputChange}  
              className='form-control'
            />
            <input 
              type="text" 
              name="tipo" 
              placeholder="Tipo de Documento" 
              value={paymentData.tipo}
              onChange={handleInputChange} 
              className='form-control'
            />
            <input 
              type="text" 
              name="numeroDocumento" 
              placeholder="Número de Documento" 
              value={paymentData.numeroDocumento}
              onChange={handleInputChange} 
              className='form-control'
            />
          </div>
        )}
        <Button type="submit" variant="primary" disabled={!selectedMethod}>
          Confirmar
        </Button>      
        </form>
    </div>
  );
};

export default PaymentForm;
