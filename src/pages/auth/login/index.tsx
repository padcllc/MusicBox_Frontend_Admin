import { Checkbox, Form, Input } from 'antd';

import left_side_img from '../../../assets/images/auth_img.png';
import disk from '../../../assets/images/disk.png';
import { useDispatch, useSelector } from 'react-redux';
import { organizationLoginStatusSelector, organizationLoginErrorSelector, increamentOrganizationLoginAsync } from './slice/login';
import { Loading } from '../../../components';
import { IOrganizationLoginData } from '../../../models/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const organizationLoginStatus = useSelector(organizationLoginStatusSelector);
    const organizationLoginError = useSelector(organizationLoginErrorSelector);

    const onFinish = (values:IOrganizationLoginData) => {
        dispatch(increamentOrganizationLoginAsync(values) as any);
      
    };


    return (
        <>

            <div className="main_page">
                <div className="animate__animated animate__fadeInLeft disk_animate_content">

                    <img src={disk} className="reload" />
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
                <div className="left_side">
                    <div className="left_side_description">
                        <img src={left_side_img} />
                        <div className='description'>
                            <p className='title'>MusicBox</p>
                            <p>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                        </div>

                    </div>
                </div>
                <div className='right_side'>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <p className='error_message'>{organizationLoginError}</p>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: '', },
                        
                                {
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
                            rules={[{ required: true, message: '' }]}
                        >
                            {/* <Input.Password /> */}
                            <Input placeholder='Password' className='input' />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" >
                            <div className='remember_me_content'>
                                <Checkbox className='remember_me'>Remember me</Checkbox>
                                <p className='forgot_password_title'>Forgot your password?</p>
                            </div>

                        </Form.Item>

                        <Form.Item>
                            <button className='btn'>
                                LOGIN
                                {
                                    organizationLoginStatus === 'loading' ? <Loading /> : null
                                }

                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

