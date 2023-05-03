import './card.styles.scss';

const Card = ({ image, name, description }) => {
    return (
        <div className='card-container'>
            <div className='card-image'>
                <img src={image} alt={name} />
            </div>
            <div className='card-content'>
                <span>{name}</span>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Card;