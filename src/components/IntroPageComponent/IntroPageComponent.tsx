import { Link } from 'react-router-dom'
import Logo from '../../images/FocalX-Logo.png'
import './IntroPageComponent.css'

interface IntroForm {
    title : string,
    desc : string,
    linkP : string ,
    linkHref : string ,
    linkA : string ,
    inputs : React.ReactNode,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function IntroPageComponent({title , desc , inputs , linkP , linkHref , linkA , handleSubmit } : IntroForm) {
    return (
        <section className='FM-intro'>
            <div className='FM-intro-div'>
                <img className='focal-logo' src={Logo} alt="focal-logo" />
                <h3 className='FM-sign'>{title}</h3>
                <p className='FM-desc'>{desc}</p>
                <form className='FM-intro-form' onSubmit={handleSubmit} method='post'>
                    {inputs}
                    <button className='FM-btn-form FM-yellow-bg' type='submit'>{title}</button>
                </form>
                <p className='FM-p-form'>{linkP}<Link className='FM-link-form' to={linkHref}>{linkA}</Link></p>
            </div>
        </section>
    )
}
