import './general-info.styles.scss';

const General = ({parkData}) => {
    console.log(parkData)



    return (
        <div className='general-info-container'>
            <div className='general-info'>
                <span>General Information</span>
            </div>
            <div className='contact-container'>
                <span>Location & Contact</span>
                <div className='address'>
                    <p>{`${parkData[0].addresses[0].line1}`}</p>
                    <p style={{display: `${parkData[0].addresses[0].line2.length !== 0 ? 'block' : 'none'}`}}>{`${parkData[0].addresses[0].line2}`}</p>
                    <p style={{display: `${parkData[0].addresses[0].line3.length !== 0 ? 'block' : 'none'}`}}>{`${parkData[0].addresses[0].line3}`}</p>
                    <p>{`${parkData[0].addresses[0].city}`}, {`${parkData[0].addresses[0].stateCode}`}</p>
                    <p>{`${parkData[0].addresses[0].postalCode}`}</p>
                </div>
                <p>Phone: {`${parkData[0].contacts.phoneNumbers[0].phoneNumber}`}</p>
                <p>Email: {`${parkData[0].contacts.emailAddresses[0].emailAddress}`}</p>
            </div>
            <div className='hours-of-operation-container'>
                <span>Hours of Operation</span>
                <div className='hours-description'>
                    <p>{parkData[0].operatingHours[0].description}</p>                    
                </div>
                <div className='standard-hours'>
                    <p>Monday: {parkData[0].operatingHours[0].standardHours.monday}</p>
                    <p>Tuesday: {parkData[0].operatingHours[0].standardHours.tuesday}</p>
                    <p>Wednesday: {parkData[0].operatingHours[0].standardHours.wednesday}</p>
                    <p>Thursday: {parkData[0].operatingHours[0].standardHours.thursday}</p>
                    <p>Friday: {parkData[0].operatingHours[0].standardHours.friday}</p>
                    <p>Saturday: {parkData[0].operatingHours[0].standardHours.saturday}</p>
                    <p>Sunday: {parkData[0].operatingHours[0].standardHours.sunday}</p>
                </div>
            </div>
            <div className='entrance-fees-container'>
                <span>Entrance Fees</span>
                {parkData[0].entranceFees.map(fee => (
                    <div className='entrance-fees'>
                        <p className='fee-title'>{fee.title} (${fee.cost})</p>
                        <p>{fee.description}</p>
                    </div>
                ))}
            </div>
            <div className='entrance-passes-container'>
                <span>Entrance Passes</span>
                {parkData[0].entrancePasses.map(pass => (
                    <div className='entrance-passes'>
                        <p className='pass-title'>{pass.title} (${pass.cost})</p>
                        <p>{pass.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default General;