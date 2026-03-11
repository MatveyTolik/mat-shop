import Header from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"


export default function ContactPage() {
  return (
    <>
      <main className="contact-page">
        <div className="container">
          <h1>Contact Us</h1>

          <div className="contact-grid">
            {/* Contact Form */}
            <form className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" required />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Your message" rows={5} required />
              </div>

              <button type="submit">Send Message</button>
            </form>

            {/* Contact Info */}
            <div className="contact-info">
              <h3>Our Office</h3>
              <p>123 Commerce Street</p>
              <p>New York, NY 10001</p>

              <h3>Email</h3>
              <p>support@mystore.com</p>

              <h3>Phone</h3>
              <p>+1 (234) 567-89-00</p>

              <h3>Working Hours</h3>
              <p>Mon - Fri: 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
