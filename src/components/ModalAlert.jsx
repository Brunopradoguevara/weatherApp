
const ModalAlert = ({isAlertOpen,setIsAlertOpen}) => {

  const handleAlert = ()=>{
    setIsAlertOpen('alert--close')
  }

  return (
    <div className={`alert__section ${isAlertOpen}`}>
        <div open className='alert'>
        <div className="alert__content"> 
          <ion-icon name="alert-circle-outline"></ion-icon>
          <span className="alert__text">Acceso a la ubicación denegado, utiliza la barra de búsqueda manual.</span>
          <button onClick={handleAlert} className="btn--close_modal">Aceptar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalAlert