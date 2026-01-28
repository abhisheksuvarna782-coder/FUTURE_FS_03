import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const AdvithiCateringWebsite = () => {
  const [activeCategory, setActiveCategory] = useState('Veg Gravy');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', guests: '', event_date: '', message: '' });

  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all elements with data-animate attribute
    setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const menuData = {
    'Veg Gravy': ['Vegetable Mix', 'Veg Kolhapuri', 'Paneer Butter Masala', 'Paneer Tikka Masala', 'Mushroom Masala', 'Veg Kurma', 'Paneer Stew', 'Aloo Matar', 'Shahi Paneer', 'Palak Paneer', 'Chana Masala', 'Matar Paneer', 'Bhindi Masala', 'Aloo Gobi'],
    'Flavoured Rice': ['Mutton Fried Rice', 'Prawn Fried Rice', 'Chicken Fried Rice', 'Egg Fried Rice', 'Paneer Fried Rice', 'Mushroom Fried Rice', 'Biryani', 'Singapore Rice', 'Ghee Rice', 'Schezwan Rice', 'Jeera Rice', 'Butter Rice', 'Boiled Rice', 'Steamed Rice'],
    'Raita': ['Veg Raita', 'Boondi Raita'],
    'Veg Curry': ['Sambar', 'Rasam', 'Dal Fry', 'Dal Tadka'],
    'Sweets': ['Carrot Halwa', 'Kashi Halwa', 'Holige', 'Jalebi', 'Kaju Holige', 'Gulab Jamun', 'Rasmalai', 'Rasgulla', 'Sheera', 'Adapayas', 'Kadlebele Payasa', 'Semige Payasa', 'Godikhadi Payasa', 'Rice Payasa', 'Ragi Payasa', 'Moong Dal Payasa'],
    'Desserts': ['Custard', 'Caramel Pudding', 'Chocolate Pudding', 'Donut', 'Brownie', 'DBC Cake'],
    'Ice Cream': ['Butterscotch', 'Fruit Salad with Ice Cream', 'Chocolate', 'Vanilla', 'Strawberry', 'Chickoo', 'Mango', 'Pista'],
    'Welcome Drinks': ['Lime Juice', 'Watermelon Juice', 'Grape Juice', 'Badam (Hot & Cold)', 'Pista Milkshake', 'Tender Coconut Juice', 'Strawberry Milkshake', 'Anjeer Milkshake', 'Sugarcane Juice', 'Lime Soda', 'Pineapple Juice', 'Date Shake', 'Mint Pineapple', 'Mojito', 'Mango Shake', 'White Dill Juice'],
    'Soups': ['Veg Manchow', 'Hot & Sour', 'Chicken Clear Soup', 'Cream of Tomato', 'Cream of Mushroom', 'Cream of Chicken', 'Crushed Corn Soup', 'Mixed Veg Soup', 'Chicken Soup', 'Mushroom Soup'],
    'Salads': ['Green Salad', 'Broccoli Salad', 'Russian Salad', 'Pasta Salad', 'Corn Salad', 'Avian Salad', 'Creamy Chicken Salad', 'Fruit Salad'],
    'Pickles': ['Mango Lime', 'Mixed Veg', 'Cucumber'],
    'Chicken Dry Items': ['Chicken Sukka', 'Pepper Dry', 'Schezwan Chicken', 'Methi Chicken', 'Dragon Chicken', 'Urval', 'Ghee Roast', 'Lemon Chicken', 'Chettinad Chicken', 'Afghani Chicken', 'Coorg Chicken', 'Andhra Chilli', 'Butter Chicken', 'Garlic Chicken', 'Pepper Chilli', 'Chicken Chilli', 'Hariyali Chicken'],
    'Mutton Dry Items': ['Sukka', 'Pepper Dry', 'Tawa Roast', 'Schezwan', 'Methi', 'Urval', 'Ghee Roast', 'Lemon', 'Korgu Chilli', 'Butter', 'Garlic', 'Pepper Chilli', 'Hariyali', 'Mutton 65', 'Ginger', 'Manchurian'],
    'Indian Breads': ['Idli', 'Neer Dosa', 'Appam', 'Moode', 'Semige', 'Set Dosa', 'Puri', 'Chapati', 'Korrotti', 'Akki Roti', 'Rumali Roti', 'Coin Parotta', 'Masala Parotta', 'Methi Parotta', 'Aloo Parotta', 'Tawa Naan'],
    'Non-Veg Gravy': ['Chicken Handi', 'Cheese Makai', 'Peshwari', 'Kolhapuri', 'Kaju Masala', 'Methi Masala', 'Pepper Masala', 'Maharaja', 'Mughlai', 'Tikka Masala', 'Punjabi Masala', 'Hyderabadi', 'Coriander', 'Kadahi', 'Kurma', 'Keema Masala', 'Stew', 'Butter Chicken', 'Pulimunchi'],
    'Egg Specials': ['Boiled Egg', 'Egg Masala', 'Pepper Fry', 'Egg Masala Gravy', 'Omelette', 'Bhurji', 'Tawa Roast', 'Egg Chilli', 'Egg Manchurian', 'Egg Kurma', 'Egg Ghee Roast'],
    'Fish Items': ['Pulimunchi', 'Tawa Fry', 'Rava Fry', 'Masala Fry'],
    'Tikka Items': ['Chicken Tikka', 'Malai Tikka', 'Banjara Kebab', 'Kalmi Kebab', 'Pepper Tikka', 'Lemon Tikka', 'Sheekh Tikka', 'Hariyali Tikka', 'Prawn Tikka', 'Fish Tikka', 'Paneer Tikka'],
    'Chicken Starters': ['Chicken Kebab', 'Pepper Kebab', 'Koliwada', 'Lemon Kebab', 'Jeera Kebab', 'Chicken 65', 'Garlic Kebab', 'Ginger Kebab', 'Liver Kebab', 'Lollipop', 'Crispy Chicken', 'Kalmi Kebab', 'Malai Kebab', 'Hariyali Kebab', 'Banjara Kebab', 'Chicken Cheese Ball'],
    'Veg Starters': ['Gobi Manchurian', 'Gobi 65', 'Gobi Chilli', 'Mushroom Manchurian', 'Mushroom Chilli', 'Mushroom 65', 'Paneer Manchurian', 'Paneer 65', 'Paneer Chilli', 'Paneer Roll', 'Paneer Stick', 'Paneer Tikka', 'Barbecue Paneer', 'Hariyali Kebab', 'Harabhara Kebab', 'Veg Ball Manchurian'],
    'Extras': ['Water Bottle', 'Soft Drinks', 'Fresh Juice', 'Lime Soda', 'Beeda', 'Sweet Corn']
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill in Name, Phone, and Email fields!');
      return;
    }

    console.log("=== SENDING EMAIL ===");
    console.log("Form Data:", formData);

    // Try with multiple common variable name patterns
    const templateParams = {
      // Standard names
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      event_date: formData.event_date,
      message: formData.message,
      
      // Alternative names (just in case)
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone,
      guest_count: formData.guests,
      date: formData.event_date,
      user_message: formData.message,
      
      // Even more alternatives
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      number_of_guests: formData.guests,
      event_details: formData.message
    };

    console.log("Template Params:", templateParams);

    emailjs.send(
      'service_vb2w6su',
      'template_ohhp1ra',
      templateParams,
      'j08uf2ELQ7U_KiikN'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Enquiry sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', guests: '', event_date: '', message: '' });
    })
    .catch((error) => {
      console.error('FAILED...', error);
      alert('Failed to send enquiry. Please try calling us directly at +91 96117 64554');
    });
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0, background: '#0a0a0a', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;600;700&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        
        /* Animation Keyframes */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 100px; opacity: 1; }
        }
        
        /* Scroll Animation Classes */
        [data-animate] {
          opacity: 0;
        }
        
        [data-animate].visible {
          animation-duration: 0.9s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        [data-animate="fadeInUp"].visible { animation-name: fadeInUp; }
        [data-animate="fadeInDown"].visible { animation-name: fadeInDown; }
        [data-animate="fadeIn"].visible { animation-name: fadeIn; }
        [data-animate="scaleIn"].visible { animation-name: scaleIn; }
        [data-animate="slideInLeft"].visible { animation-name: slideInLeft; }
        [data-animate="slideInRight"].visible { animation-name: slideInRight; }
        
        .stagger-1 { animation-delay: 0.15s; }
        .stagger-2 { animation-delay: 0.3s; }
        .stagger-3 { animation-delay: 0.45s; }
        .stagger-4 { animation-delay: 0.6s; }
        
        .nav-link {
          font-family: 'Montserrat', sans-serif;
          color: #d4af37;
          text-decoration: none;
          padding: 8px 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          font-weight: 600;
          letter-spacing: 1px;
        }
        
        .nav-link:hover {
          color: #fff;
          text-shadow: 0 0 15px #d4af37, 0 0 30px #d4af37;
          transform: translateY(-2px);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
          width: 100%;
          box-shadow: 0 0 10px #d4af37;
        }
        
        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #d4af37 0%, #f8e6a0 50%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
          letter-spacing: 4px;
        }
        
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: #d4af37;
          text-align: center;
          margin-bottom: 50px;
          font-weight: 700;
          position: relative;
          letter-spacing: 2px;
        }
        
        .section-title::after {
          content: '';
          display: block;
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 20px auto 0;
          box-shadow: 0 0 10px #d4af37;
          animation: expandWidth 1.2s ease-out 0.5s both;
        }
        
        .category-btn {
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          color: #d4af37;
          border: 2px solid #d4af37;
          border-radius: 8px;
          padding: 12px 24px;
          margin: 8px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .category-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.35), transparent);
          transform: translate(-50%, -50%);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .category-btn:hover::before {
          width: 350px;
          height: 350px;
        }
        
        .category-btn:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 0 30px #d4af37, 0 0 55px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(212, 175, 55, 0.2);
          border-color: #f8e6a0;
          color: #fff;
        }
        
        .category-btn-active {
          background: linear-gradient(135deg, #d4af37, #f8e6a0);
          color: #000;
          border-color: #f8e6a0;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.5), 
                      0 0 40px rgba(212, 175, 55, 0.4), 
                      inset 0 0 25px rgba(255, 255, 255, 0.3);
          font-weight: 700;
          transform: scale(1.08);
          animation: pulse 2.5s ease-in-out infinite;
        }
        
        .menu-item {
          font-family: 'Cormorant Garamond', serif;
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.95));
          padding: 22px;
          margin: 10px;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1.15rem;
          font-weight: 600;
          color: #e8e8e8;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
          text-align: center;
        }
        
        .menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.18), transparent);
          transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .menu-item:hover::before {
          left: 100%;
        }
        
        .menu-item:hover {
          border-color: #d4af37;
          background: linear-gradient(135deg, rgba(42, 42, 42, 0.98), rgba(52, 52, 52, 0.98));
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4), 
                      0 0 40px rgba(212, 175, 55, 0.2), 
                      inset 0 0 20px rgba(212, 175, 55, 0.08);
          transform: translateY(-8px) scale(1.04);
          color: #f8e6a0;
          border-width: 2px;
        }
        
        .input-field {
          font-family: 'Montserrat', sans-serif;
          width: 100%;
          padding: 15px;
          margin: 10px 0;
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid #333;
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .input-field:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.4), inset 0 0 12px rgba(212, 175, 55, 0.1);
          background: rgba(26, 26, 26, 0.95);
          transform: translateY(-3px);
        }
        
        .submit-btn {
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(135deg, #d4af37, #f8e6a0);
          color: #000;
          border: none;
          border-radius: 8px;
          padding: 15px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 2px;
          margin-top: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.7s ease;
        }
        
        .submit-btn:hover::before {
          width: 350px;
          height: 350px;
        }
        
        .submit-btn:hover {
          transform: translateY(-6px) scale(1.06);
          box-shadow: 0 0 35px #d4af37, 0 0 65px rgba(212, 175, 55, 0.6);
          background: linear-gradient(135deg, #f8e6a0, #d4af37);
        }
        
        .submit-btn:active {
          transform: translateY(-4px) scale(1.04);
        }
        
        .about-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          line-height: 1.9;
          color: #e8e8e8;
          font-weight: 400;
          transition: all 0.4s ease;
        }
        
        .about-text:hover {
          color: #f8e6a0;
          transform: translateX(3px);
        }
        
        .contact-info {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          color: #d4af37;
          margin: 15px 0;
          font-weight: 400;
          transition: all 0.4s ease;
        }
        
        .contact-info:hover {
          color: #f8e6a0;
          transform: translateX(8px);
        }
        
        .footer-text {
          font-family: 'Montserrat', sans-serif;
          color: #888;
          font-size: 0.95rem;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        
        .footer-text:hover {
          color: #d4af37;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem !important;
            letter-spacing: 2px;
          }
          
          .section-title {
            font-size: 2rem !important;
          }
          
          .category-btn {
            padding: 10px 18px;
            font-size: 0.85rem;
            margin: 5px;
          }
          
          .menu-item {
            padding: 18px;
            font-size: 1.05rem;
            margin: 8px 0;
          }
          
          .about-text {
            font-size: 1.1rem;
            line-height: 1.7;
          }
          
          .contact-info {
            font-size: 1rem;
          }
          
          .input-field {
            padding: 12px;
            font-size: 0.95rem;
          }
          
          .submit-btn {
            padding: 12px 30px;
            font-size: 1rem;
            letter-spacing: 1.5px;
          }
          
          .nav-link {
            padding: 6px 12px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem !important;
            letter-spacing: 1px;
          }
          
          .section-title {
            font-size: 1.6rem !important;
            margin-bottom: 30px;
          }
          
          .category-btn {
            padding: 8px 14px;
            font-size: 0.8rem;
            margin: 4px;
          }
          
          .menu-item {
            padding: 15px;
            font-size: 1rem;
          }
          
          .about-text {
            font-size: 1rem;
          }
          
          .contact-info {
            font-size: 0.95rem;
          }
          
          .nav-link {
            padding: 5px 10px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: 'rgba(10, 10, 10, 0.95)', padding: '15px 0', borderBottom: '1px solid #d4af37', boxShadow: '0 2px 15px rgba(212, 175, 55, 0.2)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <div data-animate="slideInLeft">
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', color: '#d4af37', fontWeight: '700', letterSpacing: '3px' }}>
              ADVITHI
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(0.6rem, 2vw, 0.75rem)', color: '#f8e6a0', fontWeight: '300', letterSpacing: '4px', marginTop: '5px' }}>
              CATERING SERVICES
            </div>
          </div>
          <div data-animate="scaleIn" style={{ width: 'clamp(60px, 15vw, 80px)', height: 'clamp(60px, 15vw, 80px)', background: 'linear-gradient(135deg, #d4af37, #f8e6a0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}>
            <img src="images/logo.png" alt="Advithi Logo" style={{ width: 'clamp(50px, 13vw, 70px)', height: 'clamp(50px, 13vw, 70px)', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ background: 'rgba(10, 10, 10, 0.98)', padding: '20px 0', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #d4af37', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)', backdropFilter: 'blur(15px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(15px, 4vw, 40px)', padding: '0 20px', flexWrap: 'wrap' }}>
          <a href="#home" className="nav-link" style={{ fontFamily: 'Playfair Display, serif' }}>Home</a>
          <a href="#about" className="nav-link" style={{ fontFamily: 'Playfair Display, serif' }}>About</a>
          <a href="#menu" className="nav-link" style={{ fontFamily: 'Playfair Display, serif' }}>Menu</a>
          <a href="#contact" className="nav-link" style={{ fontFamily: 'Playfair Display, serif' }}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)', padding: '60px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05), transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div data-animate="scaleIn" style={{ width: 'clamp(150px, 40vw, 200px)', height: 'clamp(150px, 40vw, 200px)', background: 'linear-gradient(135deg, #d4af37, #f8e6a0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', boxShadow: '0 0 60px rgba(212, 175, 55, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.2)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
          <img src="images/logo.png" alt="Advithi Catering Logo" style={{ width: 'clamp(130px, 36vw, 180px)', height: 'clamp(130px, 36vw, 180px)', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        
        <h1 className="hero-title" data-animate="fadeInUp" style={{ textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1, fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          ADVITHI
        </h1>
        <h2 data-animate="fadeInUp" className="stagger-1" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1rem, 4vw, 1.8rem)', color: '#f8e6a0', letterSpacing: 'clamp(3px, 2vw, 8px)', fontWeight: '300', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          CATERING SERVICES
        </h2>
        <p data-animate="fadeIn" className="stagger-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: '#ccc', marginTop: '30px', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
          Deralakatte, Mangaluru
        </p>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: 'clamp(50px, 15vw, 100px) 20px', background: 'linear-gradient(180deg, #0a0a0a, #1a1a1a)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="section-title" data-animate="fadeInDown">Our Story</h2>
          <p className="about-text" data-animate="fadeInUp" style={{ textAlign: 'center', marginBottom: '30px' }}>
            Advithi Catering Services has been proudly serving Mangaluru, Karnataka with exceptional culinary experiences rooted in the rich traditions of coastal and South Indian cuisine. For years, we have been the trusted choice for weddings, receptions, housewarmings, corporate gatherings, and festive celebrations across the region. Our deep understanding of coastal flavors, combined with time-honored recipes passed down through generations, allows us to create authentic dishes that capture the true essence of Karnataka's culinary heritage.
          </p>
          <p className="about-text stagger-1" data-animate="fadeInUp" style={{ textAlign: 'center', marginBottom: '30px' }}>
            What sets us apart is our unwavering commitment to taste, hygiene, quality, and punctuality. Every dish we prepare is crafted with premium ingredients, meticulous attention to detail, and the passion that comes from truly loving what we do. From the aromatic spices of traditional gravies to the delicate balance of our coastal specialties, we bring authenticity and excellence to every plate. Our experienced team works tirelessly to ensure that your event is not just catered, but elevated into a memorable gastronomic experience.
          </p>
          <p className="about-text stagger-2" data-animate="fadeInUp" style={{ textAlign: 'center', marginBottom: '30px' }}>
            At Advithi, we believe that food has the power to bring people together, to create joy, and to turn ordinary moments into cherished memories. This philosophy drives everything we do. Whether it's an intimate family gathering or a grand celebration with hundreds of guests, we approach each event with the same dedication and warmth. Our reputation has been built on the trust of hundreds of satisfied customers who have experienced firsthand our commitment to making their special occasions truly unforgettable.
          </p>
          <p className="about-text stagger-3" data-animate="fadeInUp" style={{ textAlign: 'center', fontWeight: '600', color: '#d4af37' }}>
            With extensive menu options ranging from traditional vegetarian delicacies to exquisite non-vegetarian specialties, premium desserts, and refreshing beverages, we offer complete culinary solutions tailored to your unique needs and preferences.
          </p>
          
          {/* Statistics Section */}
          <div data-animate="fadeInUp" className="stagger-4" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(40px, 8vw, 100px)', marginTop: '60px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#d4af37', fontWeight: '700', marginBottom: '10px', textShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}>500+</h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#e8e8e8', fontWeight: '600', letterSpacing: '1px' }}>Events</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#d4af37', fontWeight: '700', marginBottom: '10px', textShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}>100%</h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#e8e8e8', fontWeight: '600', letterSpacing: '1px' }}>Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" style={{ padding: 'clamp(50px, 15vw, 100px) 20px', background: 'linear-gradient(180deg, #1a1a1a, #0a0a0a)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="section-title" data-animate="fadeInDown">Our Menu</h2>
          
          <div data-animate="fadeIn" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
            {Object.keys(menuData).map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'category-btn-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {menuData[activeCategory].map((item, index) => (
              <div key={`${activeCategory}-${index}`} className="menu-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: 'clamp(50px, 15vw, 100px) 20px', background: 'linear-gradient(180deg, #0a0a0a, #1a1a1a)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'left', marginBottom: '50px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: '#d4af37', letterSpacing: '3px', marginBottom: '15px', fontWeight: '400' }}>CONTACT US</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#fff', marginBottom: '30px', fontWeight: '700', lineHeight: '1.2' }}>Let's Plan Your Event</h2>
            <div style={{ width: '120px', height: '3px', background: '#d4af37', marginBottom: '30px' }}></div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#ccc', lineHeight: '1.8', marginBottom: '50px' }}>
              Reach out to us for bookings, menu customization, or any queries. We are here to make your event memorable.
            </p>

            {/* Contact Info Cards */}
            <div style={{ marginBottom: '50px' }}>
              {/* Visit Us */}
              <div data-animate="fadeInUp" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '40px', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', color: '#fff', marginBottom: '10px', fontWeight: '600' }}>Visit Us</h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#ccc', lineHeight: '1.7' }}>
                    Raja complex, Beeri road,<br/>
                    Paneer, Deralakatte,<br/>
                    Mangaluru 575022
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div data-animate="fadeInUp" className="stagger-1" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '40px', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', color: '#fff', marginBottom: '10px', fontWeight: '600' }}>Call Us</h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#ccc', marginBottom: '8px' }}>Niranjan C Suvarna (Proprietor)</p>
                  <a href="tel:+919611764554" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', color: '#d4af37', fontWeight: '700', textDecoration: 'none', transition: 'all 0.3s ease' }}>+91 96117 64554</a>
                </div>
              </div>

              {/* Email Us */}
              <div data-animate="fadeInUp" className="stagger-2" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '40px', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', color: '#fff', marginBottom: '10px', fontWeight: '600' }}>Email Us</h3>
                  <a href="mailto:advithicatering@gmail.com" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#ccc', textDecoration: 'none', transition: 'all 0.3s ease' }}>advithicatering@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-animate="fadeInUp" className="stagger-4">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#fff', marginBottom: '30px', fontWeight: '600' }}>Get in Touch</h3>
            <input 
              type="text" 
              placeholder="Full Name *" 
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              type="tel" 
              placeholder="Phone Number *" 
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
            <input 
              type="email" 
              placeholder="Email Address *" 
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input 
              type="text" 
              placeholder="Guest Count (Approx)" 
              className="input-field"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
            />
            <input 
              type="date" 
              placeholder="Event Date" 
              className="input-field"
              value={formData.event_date}
              onChange={(e) => setFormData({...formData, event_date: e.target.value})}
            />
            <textarea 
              placeholder="Tell us about your event requirements..." 
              className="input-field"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                className="submit-btn"
                onClick={handleSubmit}
              >
                SEND INQUIRY ✈️
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#000', padding: '30px 20px', textAlign: 'center', borderTop: '1px solid #d4af37' }}>
        <p className="footer-text">© 2026 Advithi Catering Services. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdvithiCateringWebsite;