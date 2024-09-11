import React, { useState } from 'react';
import QuoteDetails from './components/QuoteDetails';
import PaymentForm from './components/PaymentForm';
import Notification from './components/Notification';
import Confirmation from './components/Confirmation';

const App = () => { 
  const [quote, setQuote] = useState({
    transportista: "Transportista A",
    calificacion: 4,
    fechaRetiro: "15-09-2024",
    fechaEntrega: "20-09-2024",
    importe: 100,
    formasPago: ["Tarjeta", "Contado al retirar", "Contado contra entrega"],
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handlePayment = (paymentData) => {
    if (selectedPaymentMethod === 'Tarjeta') {
      if (paymentData.numeroTarjeta && paymentData.pin && paymentData.nombre && paymentData.tipo && paymentData.numeroDocumento) {
        setPaymentStatus('success');
        setConfirmationVisible(true);
      } else {
        setPaymentStatus('error');
      }
    } else {
      setPaymentStatus('success');
      setConfirmationVisible(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
  };

  return (
    <div>
      <QuoteDetails quote={quote} />
      {!confirmation && (
        <PaymentForm 
          paymentMethods={quote.formasPago} 
          onPayment={handlePayment} 
          setSelectedPaymentMethod={setSelectedPaymentMethod} 
        />
      )}
      {paymentStatus && <Notification status={paymentStatus} receiptNumber={123}/>}
      {paymentStatus && <Notification status={paymentStatus} receiptNumber={123}/>}
      <Confirmation 
        show={confirmationVisible} 
        handleClose={handleCloseConfirmation} 
      />
    </div>
  );
};

export default App;
