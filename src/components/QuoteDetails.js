import React from 'react';
import '../css/styles.css';  

const QuoteDetails = ({ quote }) => {
  // Función para convertir la calificación en imágenes de estrellas
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <>
        {Array(fullStars).fill().map((_, index) => (
          <img key={`full-${index}`} src="/star.png" alt="Star" style={{ height: '20px', marginRight: '5px' }} />
        ))}
        {halfStar && (
          <img src="/star.png" alt="Half Star" style={{ height: '40px', marginRight: '5px', opacity: '0.5' }} />
        )}
        {Array(emptyStars).fill().map((_, index) => (
          <img key={`empty-${index}`} src="/star.png" alt="Empty Star" style={{ height: '20px', marginRight: '5px', opacity: '0.2' }} />
        ))}
      </>
    );
  };

  return (
    <div className='container'>
      <h2>Detalles de la Cotización</h2>
      <table className="quote-table">
        <tbody>
          <tr>
            <th>Transportista</th>
            <td>{quote.transportista}</td>
          </tr>
          <tr>
            <th>Calificación</th>
            <td>{renderStars(quote.calificacion)}</td>
          </tr>
          <tr>
            <th>Fecha de Retiro</th>
            <td>{quote.fechaRetiro}</td>
          </tr>
          <tr>
            <th>Fecha de Entrega</th>
            <td>{quote.fechaEntrega}</td>
          </tr>
          <tr>
            <th>Importe</th>
            <td>${quote.importe}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuoteDetails;
