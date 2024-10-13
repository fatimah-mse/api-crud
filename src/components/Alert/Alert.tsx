import './Alert.css'

interface AlertType {
    msg : string,
    yesBTN? : string,
    noBTN? : string,
    RetryFunc? : () => void,
    NoRetryFunc? : () => void
}

export default function Alert({msg , yesBTN , noBTN , RetryFunc , NoRetryFunc} : AlertType) {
    return (
        <section className="FM-alert-parent">
            <div className="FM-alert">
                <p className='FM-msg'>{msg}</p>
                <div className='FM-btns'>
                    <button className='FM-btn FM-yellow-bg' onClick={RetryFunc}>{yesBTN}</button>
                    <button className='FM-btn FM-yellow-bg' onClick={NoRetryFunc} >{noBTN}</button>
                </div>
            </div>
        </section>
        
        
    )
}
