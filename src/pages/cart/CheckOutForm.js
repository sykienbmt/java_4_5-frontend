import React, { useContext, useState } from 'react';
import './CheckOutForm.css';
import { Button, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ItemPayment from './ItemPayment';
import { UserContext } from 'src/contexts/UserContext';
import { CartContext } from 'src/contexts/CartContext';
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { orderController } from 'src/controllers/OrderController';
// type State={
//   user:User,
//   payment:string,
//   note:string
// }

export default function CheckOutForm() {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  const [state, setState] = useState({
    user: {
      id_user: userContext.state.userInfo.id,
      email: '',
      full_name: '',
      phone_number: '',
      address: ''
    },
    payment: 'COD',
    note: ''
  });

  const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    full_name: yup.string('Enter your Full name').required('Name is required'),
    phone_number: yup
      .string('Enter your Phone number')
      .matches(phoneRegex, 'Invalid phone')
      .required('Phone number is required'),
    address: yup.string('Enter your Address').required('Address is required')
  });

  const formik = useFormik({
    initialValues: {
      email: 'kiennspk01738@fpt.edu.vn',
      full_name: 'Kien Nguyen',
      phone_number: '0966666666',
      address: 'Bmttttt'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let user = state.user;
      user.email = values.email;
      user.full_name = values.full_name;
      user.phone_number = values.phone_number;
      user.address = values.address;
      user.payment = state.payment;
      cartContext.checkout(user);

      let total = 0;
      cartContext.state.itemCarts.map((item) => {
        total += item.price * item.quantity;
      });

      let html = `  <h1 style="text-align: center">Your Order is Successfully</h1>
                    <table style="border-collapse: collapse; width: 100%;" border="1">
                    <tbody>
                    <tr>
                    <td style="width: 13.9205%;">Image</td>
                    <td style="width: 22.017%;">Name</td>
                    <td style="width: 18.537%;">Quantity</td>
                    <td style="width: 9.2685%;">Price</td>
                    <td style="width: 9.2685%;">Total</td>
                    </tr>
                    ${cartContext.state.itemCarts.map((item, index) => {
                      return `<tr>
                        <td style="width: 13.9205%; text-align: center;"><img src=${
                          item.image
                        } alt="" width="50" height="50" /></td>
                        <td style="width: 22.017%;">${item.name}</td>
                        <td style="width: 18.537%;">${item.quantity}</td>
                        <td style="width: 9.2685%;">$${item.price}</td>
                        <td style="width: 9.2685%;">$${item.quantity * item.price}</td>
                        </tr>`;
                    })}
                    </tbody>
                    </table>
                    <h1 style="text-align: right">Total:$ ${total}</h1>`;
      let mailInfo = {
        email:values.email,
        html:html
      };
      orderController.sendMail(mailInfo).then((res) => {
        console.log(res);
      });
    }
  });

  const textField = {
    mt: '15px'
  };

  const styleRadio = {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '25px',
    mt: '15px'
  };

  const total = () => {
    let total = 0;
    cartContext.state.itemCarts.map((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ display: 'flex' }}>
          <div className="payment-container">
            <div className="user-information-container">
              <h2>Delivery Address</h2>
              <TextField
                sx={textField}
                label="Email"
                variant="outlined"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <TextField
                sx={textField}
                label="Full name"
                variant="outlined"
                {...getFieldProps('full_name')}
                error={Boolean(touched.full_name && errors.full_name)}
                helperText={touched.full_name && errors.full_name}
                onChange={formik.handleChange}
                value={formik.values.full_name}
              />
              <TextField
                sx={textField}
                label="Phone Number"
                variant="outlined"
                {...getFieldProps('phone_number')}
                error={Boolean(touched.phone_number && errors.phone_number)}
                helperText={touched.phone_number && errors.phone_number}
                onB
                onChange={formik.handleChange}
                value={formik.values.phone_number}
              />
              <TextField
                sx={textField}
                label="Address"
                variant="outlined"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <TextField
                sx={textField}
                label="Note"
                multiline
                rows={4}
                onChange={(e) => setState({ ...state, note: e.target.value })}
              />
            </div>

            <div className="choose-shipping-container">
              <FormControl sx={{ width: '100%' }}>
                <FormLabel id="demo-radio-buttons-group-label">Your payment</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={state.payment}
                  onChange={(e) => setState({ ...state, payment: e.target.value })}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={styleRadio}
                    value="COD"
                    control={<Radio />}
                    label="Payment with COD"
                  />
                  <FormControlLabel
                    sx={styleRadio}
                    value="Banking"
                    control={<Radio />}
                    label="Payment with Banking"
                  />
                  <FormControlLabel
                    sx={styleRadio}
                    value="Momo"
                    control={<Radio />}
                    label="Payment with MoMo"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="list-cart-payment-container">
            <h2 style={{ marginBottom: '15px' }}>Your Cart</h2>
            <div style={{ padding: '10px' }} className="payment-cart-container">
              <div>
                {cartContext.state.itemCarts.map((item) => {
                  return <ItemPayment key={item.id} item={item} />;
                })}
              </div>
            </div>

            <p className="total-page-payment">
              <span></span>Total: <span>${total()}</span>
            </p>

            <div
              className="button-done-payment"
              style={{
                width: '100%',
                textAlign: 'right',
                paddingTop: '25px',
                paddingRight: '20px'
              }}
            >
              <Button variant="outlined" type="submit">
                Complete
              </Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
