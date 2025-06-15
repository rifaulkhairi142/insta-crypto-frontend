import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaFacebook size={16} />,
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: <FaYoutube size={16} />,
    label: "Youtube",
    href: "https://youtube.com",
  },
  {
    icon: <FaInstagram size={16} />,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: <FaTiktok size={16} />,
    label: "Tiktok",
    href: "https://tiktok.com",
  },
];

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Our Team", href: "/team" },
    ],
  },
  {
    title: "Help Center",
    links: [{ label: "Contact Us", href: "/contact" }],
  },
  {
    title: "Products",
    links: [{ label: "Pertukaran", href: "/category/bumn" }],
  },
];

const Footer = () => {
  return (
    <footer className="pt-10 pb-6 font-binance-plex border-t border-InputLine mt-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <a
              className="font-bold text-xl md:text-2xl text-front_secondary"
              href="/"
            >
              <div className="flex flex-row gap-x-2 cursor-pointer items-center">
                <img src="/insta-crypto.png" className="w-10 h-10" />
                <span className="font-bold text-lg text-textBrand">
                  INSTA CRYPTO
                </span>
              </div>
            </a>
            <p className="text-textPrimary text-sm mt-2">
              Platform exchange coin crypto termurah seindonesia
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-textPrimary mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-textPrimary hover:text-textBrand text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-InputLine mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-textPrimary text-sm">
            © 2025 Insta Crypto. All Rights Reserved.
          </p>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((link) => {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-textPrimary hover:text-textBrand transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
