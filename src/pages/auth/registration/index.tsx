import { Checkbox, Form, Input } from 'antd';
import left_side_img from '../../../assets/images/auth_img.png';
import disk from '../../../assets/images/disk.png';


export function Registration() {

    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: '', }]}
                        >
                            <Input placeholder='First Name' className='input' />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: '', }]}
                        >
                            <Input placeholder='Last Name' className='input' />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '', }]}
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
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[{ required: true, message: '' },
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
                            </button>
                        </Form.Item>
                    </Form>
                </div>
                {/* <div className="animate__animated animate__fadeInLeft disk_animate_content">

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
                </div> */}
               
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
                        <p>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                    </div>
             
                    </div>
                </div>
            </div>
        </>
    )
}