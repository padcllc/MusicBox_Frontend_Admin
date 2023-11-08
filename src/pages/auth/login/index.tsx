import { Checkbox, Form, Input } from 'antd';

import left_side_img from '../../../assets/images/auth_img.png';
import disk from '../../../assets/images/disk.png';
import { useDispatch, useSelector } from 'react-redux';
import { organizationLoginStatusSelector, organizationLoginErrorSelector, increamentOrganizationLoginAsync } from './slice/login';
import { Loading } from '../../../components';
import { IOrganizationLoginData } from '../../../models/login';


export function Login() {
    const dispatch = useDispatch();

    const organizationLoginStatus = useSelector(organizationLoginStatusSelector);
    const organizationLoginError = useSelector(organizationLoginErrorSelector);

    const onFinish = (values: IOrganizationLoginData) => {
        dispatch(increamentOrganizationLoginAsync(values) as any);

    };


    return (
        <>
            <div className='login_main_content'>
                <>
                    <div className='animatin_content animate__animated animate__fadeInLeft'>
                        <img src={disk} className="disk_img" />
                    </div>
                    <img src={left_side_img} className='login_page_description_img' />
                    <div className='login_page_description'>
                        <p className='title'>MusicBox</p>
                        <p>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                    </div>
                </>
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
        </>
    )
}

