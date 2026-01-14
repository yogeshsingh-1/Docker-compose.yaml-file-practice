import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData,setFormData] = useState();
  const navigate = useNavigate();
const onChangeHandler = (event)=>{
  const {name,value} = event.target;

  setFormData((prev)=>({...prev,[name] : value}));
}
const submitHandler =async(e)=>{
  e.preventDefault();
 try{
    const res = await axios.post('http://localhost:4000/api/v1/signup',formData);
    console.log(res);
    if(!res.data.success){
      console.log(res.data.message);
    }
    else{
      console.log(res.data.message);
      navigate('/signin')
    }
 }catch(e){
  console.log(e.response.data.message);
 }finally{
  console.log("loading...");
 }
  setFormData();
}
  return (
    <div className='container col-8 mt-3'>
      <h3>Sign Up</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control value={formData?.name ?? ""}onChange={onChangeHandler}type="text" name="name"placeholder="Enter Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={formData?.email ?? ""}onChange={onChangeHandler}type="text" name="email"placeholder="Enter Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control value={formData?.password ?? ""} onChange={onChangeHandler}type="text" name="password" placeholder="Enter Password" />
      </Form.Group>
    <Button variant="primary" type="submit">Primary</Button>
      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group> */}
    </Form>
    </div>
  )
}

export default Signup