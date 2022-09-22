import React, { useState, useEffect } from 'react';
import styles from './HomeBody.module.css'
import { useNavigate } from 'react-router-dom';

import ContModal from '../components/ContModal';

import Button from '../elements/Button1';
import SmallHeading from '../elements/SmallHeading';

import twitter from '../assets/icon-twitter.svg'
import instagram from '../assets/icon-instagram.svg'

function Body() {
    const [isContModal, setIsContModal] = useState(false)
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);

    const [data, setData] = useState([])

    const handleSubmit = event => {
        event.preventDefault()

        var emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/

        if (!emailRegEx.test(email)) {
            showEmailError()
            return
        }

        fetch('http://localhost:3001/newsletter', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
                setEmail('')
            })
            .catch(error => console.error(error))
    }

    const showEmailError = () => {
        if (/^$/.test(email)) {
            setEmailError('Enter email!')
        } else {
            setEmailError('Enter valid email!')
        }
    }

    let navigate = useNavigate()

    const goToApps = () => {
        window.scrollTo(0, 0)
        navigate('/apps')
    }

    useEffect(() => {
        if (isContModal) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'visible'
        }
    }, [isContModal])

    // const testAPI = () => {
    //     return fetch('http://localhost:3001')
    //         .then(res => res.json())
    //         .then(json => {
    //             setData(json.status)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })
    // }

    // useEffect(() => {
    //     testAPI()
    // }, [])



    return (
        <div className={styles.body_overlay}>
            <div className={styles.body}>
                <div className={styles.container_apps}>
                    <SmallHeading text='Apps' />
                    <h2>Explore apps engineered and developed for you.</h2>
                    <p>{data}</p>
                    <Button
                        text='Show all apps'
                        onClick={goToApps}
                    />
                </div>
                <div className={styles.container_contact}>
                    <SmallHeading text='Contact us' />
                    <p>Get in touch with related information.</p>
                    <Button
                        text='Contact us'
                        onClick={() => setIsContModal(true)}
                    />
                </div>
                <div className={styles.container_connect}>
                    <SmallHeading text='Connect with us' />
                    <p>
                        Never miss updates, subscribe to our newsletter or
                        follow us in our social media.
                    </p>
                    <section>
                        <form
                            onSubmit={handleSubmit}
                            onBlur={() => setEmailError(null)}
                        >
                            <input
                                type='email'
                                placeholder='Email'
                                id='subs_email'
                                name='subs_email'
                                className={
                                    emailError !== null
                                        ? styles.error_input
                                        : undefined
                                }
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type='submit'
                                value='Subscribe'
                            />
                            <span>{emailError}</span>
                        </form>
                        <ul>
                            <li>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://twitter.com/tmlab_dot_app'
                                >
                                    <img
                                        src={twitter}
                                        alt="twitter icon" />
                                </a>
                            </li>
                            <li>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://instagram.com/tmlab.app'
                                >
                                    <img
                                        src={instagram}
                                        alt="instagram icon"
                                    />
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
                <ContModal
                    isContModal={isContModal}
                    close={() => setIsContModal(false)}
                />
            </div>
        </div>
    );
}

export default Body;