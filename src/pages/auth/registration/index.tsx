import { useState, useEffect } from 'react';
import { Form, Input } from 'antd';

import disk from '../../../assets/images/disk.png';
import address from '../../../assets/icons/adress.svg';
import left_side_img from '../../../assets/images/auth_img.png';
import close from '../../../assets/icons/close.svg';
import { IOrganizationRegistrationData, IOrganizationRegistrationFormData } from '../../../models';
import { useDispatch, useSelector } from 'react-redux';
import {
    increamentOrganizationRegistration,
    organizationRegistrationErrorSelector,
    organizationRegistrationStatusSelector
}
    from './slice/registration';
import { InitMap, Loading } from '../../../components';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { VALIDATION_PATTERNS } from '../../../validators';


dayjs.extend(customParseFormat);

export function Registration() {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openGoogleMap, setOpenGoogleMap] = useState<boolean>(false);

    const [googleMapAddress, setGoogleMapAddress] = useState<string>();
    const [googleMapLat, setgoogleMapLat] = useState<number>();
    const [googleMapLng, setgoogleMapLng] = useState<number>();

    const organizationRegistrationStatus: string = useSelector(organizationRegistrationStatusSelector);
    const organizationRegistrationError: string | null = useSelector(organizationRegistrationErrorSelector);



    const onFinish = (values: IOrganizationRegistrationFormData) => {
        const formattedDateOpenTime = new Date(values.openTime).toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        const formattedDateCloseTime = new Date(values.closeTime).toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        const { confirmPassword, ...dataToSend } = values;
        const data: IOrganizationRegistrationData = {
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            openTime: formattedDateOpenTime,
            closeTime: formattedDateCloseTime,
            address: {
                addressName: values.address,
                latitude: Number(googleMapLat),
                longitude: Number(googleMapLng)
            }
        }
        dispatch(increamentOrganizationRegistration(data) as any);
    };

    const validateTextOnly = (_: any, value: string) => {
        const regex = VALIDATION_PATTERNS.TEXT;// Regular expression to allow only alphabetic characters and spaces
        if (!regex.test(value)) {
            return Promise.reject('Please enter only text');
        }
        return Promise.resolve();
    };


    const passwordValidator = (_: any, value: string) => {
        if (!value) {
            return Promise.reject('');
        }

        if (!VALIDATION_PATTERNS.PASSWORD.test(value)) {
            return Promise.reject(
                `Password must contain at least one symbol, one number,and one uppercase letter`
            );
        }

        return Promise.resolve();
    };


    const validatePhoneNumber = (rule: any, value: any, callback: Function) => {
        // You can implement your own validation logic here
        // For example, using a regular expression to validate international phone numbers
        const phoneRegex = VALIDATION_PATTERNS.PHONE;

        if (!value || phoneRegex.test(value)) {
            callback(); // Validation passed
        } else {
            callback('Invalid phone number format'); // Validation failed
        }
    };


    useEffect(() => {
        form.setFieldsValue({
            address: googleMapAddress,
        });
    }, [googleMapAddress]);


    useEffect(() => {
        if (organizationRegistrationStatus === 'idle') {
            navigate('/login');
        }

    }, [organizationRegistrationStatus]);


    return (
        <>
            <div className='registration_main_content'>
                <div className='form_content'>
                    <Form
                        form={form}
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={{ remember: true }}
                    >
                        <p className='error_message'>{organizationRegistrationError}</p>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: '' },
                            {
                                validator: validateTextOnly,
                            },
                            {
                                max: 50,
                                message: "Name should be less than 50 character",
                            },
                            {
                                min: 3,
                                message: "Name must be at least 8 characters!",
                            },


                            ]}
                        >
                            <Input placeholder='Name' className='input' />
                        </Form.Item>
                        <div className='address_content'>
                            <Form.Item
                                name="address"
                                rules={[{ required: true, message: '', }]}
                            >

                                <Input placeholder='Address' className='input' />

                            </Form.Item>
                            <img src={address} className='address_icon' onClick={(() => {
                                setOpenGoogleMap(true)
                            })} />
                        </div>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: '' },
                            {
                                validator: validatePhoneNumber,
                            },

                            ]}
                        >
                            <Input placeholder='Phone' className='input' />
                        </Form.Item>
                        <Form.Item
                            name="openTime"
                            rules={[{ required: true, message: '' }]}
                        >
                            <TimePicker format="HH:mm:ss" placeholder='Open Time' className='input' />
                        </Form.Item>

                        <Form.Item
                            name="closeTime"
                            rules={[{ required: true, message: '' }]}
                        >
                            <TimePicker format="HH:mm:ss" placeholder='Close Time' className='input' />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: '' }, {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                max: 30,
                                message: "Email should be less than 30 characters!",
                            },
                            ]}
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
                                {
                                    max: 50,
                                    message: "Password should be less than 50 characters!",
                                },
                                { validator: passwordValidator }
                            ]}
                        >
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
                            <Input placeholder='Confirm Password' className='input' />
                        </Form.Item>

                        <Form.Item>
                            <button className='btn'>
                                SIGN UP
                                {
                                    organizationRegistrationStatus === 'loading' ? <Loading /> : null
                                }

                            </button>
                        </Form.Item>
                        <div className={'google_map_content ' + (openGoogleMap ? 'show-map' : 'hidden-map')}>
                            <InitMap
                                sendGoogleMapAddressInformation={(address: string) => {
                                    setGoogleMapAddress(address);
                                }}

                                sendLat={(lat: number) => {
                                    setgoogleMapLat(lat)
                                }}

                                sendLng={(lng: number) => {
                                    setgoogleMapLng(lng)
                                }}


                            />
                            <div className="close_content" onClick={(() => {
                                setOpenGoogleMap(false)
                            })}>
                                <img src={close} />
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='right_content animate__animated animate__fadeInRight'>
                    <img src={disk} className='disk_img' />
                    <img src={left_side_img} className='right_img' />
                    <div className="registration_right_sids">
                        <div className='registration_right_sids_description'>
                            <p className='title'>MusicBox</p>
                            <p className='description'>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}