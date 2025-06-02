import React, { useState } from 'react';
import Button from './Button';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className={`form-container ${className}`}>
      {isSubmitted ? (
        <div className="form-element bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-black border border-gray-800 rounded-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Thank You</h3>
          <p className="text-gray-300 font-light tracking-wide">
            Your message has been received. One of our luxury vehicle specialists will contact you shortly.
          </p>
          <div className="mt-8 w-12 h-[1px] bg-gradient-to-r from-white/40 to-transparent mx-auto"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-element space-y-6">
          <div className="mb-6">
            <h3 className="text-lg text-black dark:text-white font-light uppercase tracking-wider mb-2">Personal Information</h3>
            <div className="h-px w-16 bg-gradient-to-r from-black dark:from-white to-transparent mb-6"></div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label htmlFor="firstName" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white transition-colors outline-none text-black dark:text-white"
                placeholder="John"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="lastName" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white transition-colors outline-none text-black dark:text-white"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          
          <div className="form-field">
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white transition-colors outline-none text-black dark:text-white"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white transition-colors outline-none text-black dark:text-white"
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div className="pt-4">
            <h3 className="text-lg text-black dark:text-white font-light uppercase tracking-wider mb-2">Vehicle Interest</h3>
            <div className="h-px w-16 bg-gradient-to-r from-black dark:from-white to-transparent mb-6"></div>
          </div>
          
          <div className="form-field">
            <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              I'm interested in
            </label>
            <div className="relative">
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white transition-colors outline-none text-black dark:text-white appearance-none"
                required
              >
                <option value="" disabled>Select your interest</option>
                <option value="new">New Vehicle Purchase</option>
                <option value="certified">Certified Pre-Owned</option>
                <option value="test-drive">Schedule a Test Drive</option>
                <option value="service">Service & Maintenance</option>
                <option value="other">Other Inquiries</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="form-field">
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white transition-colors outline-none text-black dark:text-white resize-none"
              placeholder="Please share your requirements or questions..."
              required
            ></textarea>
          </div>
          
          <div className="form-field pt-4">
            <div className="flex items-center space-x-2 mb-6">
              <input 
                type="checkbox" 
                id="privacy" 
                className="w-4 h-4 border border-gray-300 dark:border-gray-600" 
                required
              />
              <label htmlFor="privacy" className="text-xs text-gray-500 dark:text-gray-400">
                I agree to the privacy policy and terms of service
              </label>
            </div>
            
            <Button 
              type="submit" 
              variant="outline" 
              fullWidth 
              disabled={isSubmitting}
              className="py-4 px-8 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-light"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : 'Submit Inquiry'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;