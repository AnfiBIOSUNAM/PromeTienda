import './Card.css';

export default function Card({message, handleConfirm, handleCancel}){
    return(
        <div className='confirmation-card'>
            <p>{message}</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}