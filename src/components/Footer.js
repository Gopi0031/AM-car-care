import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent-500">AutomotiveCare Pro</h3>
            <p className="text-background-dark text-sm">
              Your trusted partner for premium automotive care services in Guntur, Andhra Pradesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-background">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-background-dark hover:text-accent-500 transition text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-background-dark hover:text-accent-500 transition text-sm">
                  Booking
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background-dark hover:text-accent-500 transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-background">Our Services</h4>
            <ul className="space-y-2 text-background-dark text-sm">
              <li>Car Wash</li>
              <li>Car Detailing</li>
              <li>Maintenance</li>
              <li>Paint Protection</li>
              <li>Interior Cleaning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-background">Contact Us</h4>
            <ul className="space-y-2 text-background-dark text-sm">
              <li>📍 Guntur, Andhra Pradesh</li>
              <li>📞 +91 XXX XXX XXXX</li>
              <li>✉️ info@autocarepro.com</li>
              <li className="pt-2">
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-accent-500 transition">Facebook</a>
                  <a href="#" className="hover:text-accent-500 transition">Instagram</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-background-dark text-sm">
            &copy; {new Date().getFullYear()} AutoCare Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
