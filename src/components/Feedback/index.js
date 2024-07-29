import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Feedback() {
  const form = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
      .sendForm('service_di8z3ah', 'template_134ee8t', form.current, 'gbXVq1mZOaYOw1Li6')
      .then((result) => {
        console.log(result);
        form.current.reset(); 
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="d-flex justify-content-center align-items-center feedback w-100">
      <div className="bg-white p-3 rounded w-100">
        <h2>Get In Touch</h2>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="text" placeholder="Enter Name" className="form-control rounded-0" name="from_name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder="Enter Email" className="form-control rounded-0" name="from_email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message"><strong>Message</strong></label>
            <input type="text" name="message" className="form-control rounded-0 " placeholder='Enter your Message to Admin'/>
          </div>
          <button type="submit" className="btn btn-info w-100 rounded-0">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
