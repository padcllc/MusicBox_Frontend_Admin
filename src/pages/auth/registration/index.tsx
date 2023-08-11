import { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Form, Input } from 'antd';


import disk from '../../../assets/images/disk.png';
import address from '../../../assets/icons/adress.svg';
import close from '../../../assets/icons/close.svg';
import { IUserRegistrationData } from '../../../models';
import { useDispatch, useSelector } from 'react-redux';
import { increamentUserRegistration, userRegistrationErrorSelector, userRegistrationStatusSelector } from './slice/registration';
import { Loading } from '../../../components';

export function Registration() {

    const dispatch = useDispatch();

    const center = {
        address: '',
        lat: 40.7998738714596,
        lng: 43.857421875,
    };

    const [markers, setMarker] = useState<any>([]);
    const [openGoogleMap, setOpenGoogleMap] = useState<boolean>(false);

    const userRegistrationStatus: string = useSelector(userRegistrationStatusSelector);
    const userRegistrationError: string | null = useSelector(userRegistrationErrorSelector);




    const onFinish = (values: IUserRegistrationData) => {
        const { confirmPassword, ...dataToSend } = values;
        dispatch(increamentUserRegistration(dataToSend) as any);
    };

    const onMapClick = (e: any) => {
        setMarker((current: any) => [
            //  ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
        ]);
    };


    const validateTextOnly = (_: any, value: string) => {
        const regex = /^[A-Za-z\s]+$/; // Regular expression to allow only alphabetic characters and spaces
        if (!regex.test(value)) {
            return Promise.reject('Please enter only text');
        }
        return Promise.resolve();
    };


    const passwordValidator = (_: any, value: string) => {
        if (!value) {
            return Promise.reject('');
        }

        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value)) {
            return Promise.reject(
                `Password must contain at least one symbol, one number,and one uppercase letter`
            );
        }

        return Promise.resolve();
    };



    return (
        <>
            <div className="main_page">

                <div className='registration_right_sids right_side'>

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <p className='error_message'>{userRegistrationError}</p>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: '' }, {
                                validator: validateTextOnly,
                            }]}
                        >
                            <Input placeholder='First Name' className='input' />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: '' },
                            { validator: validateTextOnly }]}
                        >
                            <Input placeholder='Last Name' className='input' />
                        </Form.Item>

                        {/* <Form.Item
                                name="address"
                                rules={[{ required: true, message: '', }]}
                            >
                                <Input placeholder='Address' className='input' />
                                <img src={address} className='address_icon' onClick={(() => {
                                    setOpenGoogleMap(true)
                                })} />
                            </Form.Item> */}


                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: '' }, {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },]}
                        >
                            <Input placeholder='Email' className='input' />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '',

                                },
                                {
                                    min: 8,
                                    message: 'Password must be at least 8 characters!',
                                },
                                { validator: passwordValidator }
                            ]}
                        >
                            {/* <Input.Password /> */}
                            <Input placeholder='Password' className='input' />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: '' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),

                            ]}
                        >
                            {/* <Input.Password /> */}
                            <Input placeholder='Confirm Password' className='input' />
                        </Form.Item>

                        <Form.Item>
                            <button className='btn'>
                                SIGN UP
                                {
                                    userRegistrationStatus === 'loading' ? <Loading /> : null
                                }

                            </button>
                        </Form.Item>
                    </Form>
                    {
                        openGoogleMap ?
                            <div className='google_map_content'>
                                <GoogleMap
                                    mapContainerClassName='containerStyle__google__map'
                                    center={center}
                                    zoom={10}
                                    onClick={onMapClick}
                                >

                                    {markers.map((marker: any) => (

                                        <Marker
                                            position={{
                                                lat: marker.lat,
                                                lng: marker.lng
                                            }} />

                                    ))}

                                </GoogleMap>
                                <div className="close_content" onClick={(() => {
                                    setOpenGoogleMap(false)
                                })}>
                                    <img src={close} />
                                </div>
                            </div> : null
                    }

                </div>

                <div className='registration_left_content'>
                    <div className="animate__animated animate__fadeInRight registration_disk_animate_content">
                        <img src={disk} className="" />
                        <div className='information_content'>
                            <p className='information_title'>Address</p>
                            <p className='information_title location'>Location</p>
                            <p className="info location_info">Mher Mkrtchyan 47/1 Gyumri, Armenia</p>
                            <p className='information_title email'>Send Us An Email</p>
                            <p className="info email_info">musicbox@gmail.com</p>
                            <p className='information_title phone'>Phone</p>
                            <p className="info phone_info">(+374)94562112</p>
                            <p className="info reserved_info">C 2021 PADC LLC All Rights Reserved</p>

                        </div>
                    </div>

                    <div className="registration_left_sids">
                        <div className='registration_left_sids_description'>

                            <p className='title'>MusicBox</p>
                            <p className='description'>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}