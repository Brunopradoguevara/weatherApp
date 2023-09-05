
const ModalAlert = ({isAlertOpen,setIsAlertOpen}) => {

  const handleAlert = ()=>{
    setIsAlertOpen(false)
  }

  return (
    <div className="alert__section">
      {isAlertOpen ? (
        <dialog open className="alert">
        <div className="alert__content"> 
          <ion-icon name="alert-circle-outline"></ion-icon>
          <span className="alert__text">Acceso a la ubicación denegada</span>
          <button onClick={handleAlert} className="btn--close_modal">Aceptar</button>
        </div>
      </dialog>
      ) : (
        <dialog  className="alert">
          <div className="alert__content"> 
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span className="alert__text">Acceso a la ubicación denegada</span>
            <button onClick={handleAlert} className="btn--close_modal">Aceptar</button>
          </div>
        </dialog>
      )}
        
    </div>
  )
}

export default ModalAlert