import React, { useRef, useEffect, useState } from 'react';
import './Contact.css';
// import { MdOutlineEmail } from 'react-icons/md';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("UmRj0D4NmhDtceMHF");
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_n@2005',    // Make sure this matches exactly with your EmailJS service ID
        'template_he73xg7',   // Make sure this matches exactly with your template ID
        form.current,
        'UmRj0D4NmhDtceMHF'   // Your public key
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          toast.success('Message sent successfully! ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error);  // Log the full error
          toast.error('Failed to send message. Please try again! 😕', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="contact-section">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="contact-container">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>Get in touch with us for any questions about our travel packages or custom trip planning.</p>
          
          <div className="contact-options">
            {/* <article className="contact-option">
              <MdOutlineEmail className="contact-option-icon"/>
              <h4>Email</h4>
              <h5>nilancyagarwal04@gmail.com</h5>
              <a href="mailto:nilancyagarwal04@gmail.com" target="_blank" rel="noreferrer">
                Send a message
              </a>
            </article> */}

            <article className="contact-option">
              <FaLinkedinIn className="contact-option-icon"/>
              <h4>LinkedIn</h4>
              <h5>Nilancy Agarwal</h5>
              <a href="https://linkedin.com/in/nilancy04" target="_blank" rel="noreferrer">
                Connect with me
              </a>
            </article>

            <article className="contact-option">
              <FaGithub className="contact-option-icon"/>
              <h4>GitHub</h4>
              <h5>nilancy04</h5>
              <a href="https://github.com/nilancy04" target="_blank" rel="noreferrer">
                View Projects
              </a>
            </article>

            <article className="contact-option">
    <FaTwitter className="contact-option-icon"/>
    <h4>Twitter</h4>
    <h5>@nilancy2005</h5>
    <a href="https://twitter.com/nilancy2005" target="_blank" rel="noreferrer">
      Follow me
    </a>
  </article>
          </div>

          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <input 
                type="text" 
                name="from_name" 
                placeholder="Your Full Name" 
                required 
              />
            </div>

            <div className="form-group">
              <input 
                type="email" 
                name="reply_to"    // Changed from to_name to reply_to
                placeholder="Your Email" 
                required 
              />
            </div>

            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows="7" 
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;