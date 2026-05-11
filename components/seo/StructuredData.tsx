export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LumieraMed",
    "description": "Connects international medical students with accredited clinical elective placements across China's leading hospitals",
    "url": "https://lumieramed.com",
    "logo": "https://lumieramed.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44 7786 236891",
      "contactType": "customer service",
      "email": "support@lumieramed.com"
    },
    "sameAs": [
      "https://twitter.com/lumieramed",
      "https://facebook.com/lumieramed",
      "https://linkedin.com/company/lumieramed"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "London"
    },
    "services": [
      {
        "@type": "Service",
        "name": "Clinical Elective Placements",
        "description": "Accredited clinical elective placements in Chinese hospitals",
        "provider": {
          "@type": "Organization",
          "name": "LumieraMed"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
