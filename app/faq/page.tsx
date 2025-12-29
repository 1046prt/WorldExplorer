"use client";

import { Metadata } from "next";
import { GlobalNavigation } from "@/components/global-navigation";
import Footer from "@/components/footer";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  Monitor,
  Database,
} from "lucide-react";
import { useState } from "react";
import "@/styles/faq.css";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqCategories: FAQCategory[] = [
    {
      title: "General Usage",
      icon: <HelpCircle className="faq-category-icon" />,
      items: [
        {
          question: "How do I navigate through different countries?",
          answer:
            "You can explore countries in several ways: use the global search bar at the top of the page to search for specific countries, browse the countries section from the main menu, or click on any country directly from the interactive map on the homepage.",
        },
        {
          question: "What features are available on mobile devices?",
          answer:
            "WorldExplorer is fully responsive and optimized for mobile devices. All features including country exploration, quizzes, currency converter, and interactive maps work seamlessly on smartphones and tablets.",
        },
        {
          question: "How do I use the quiz system?",
          answer:
            "The quiz system is located on the homepage. Simply click on the quiz section, select your preferred difficulty level, and start answering geography and culture-related questions. Your scores are tracked locally in your browser.",
        },
        {
          question: "Can I bookmark specific countries or content?",
          answer:
            "Yes, you can bookmark any page using your browser's bookmark feature. Each country has its own dedicated URL that you can save and share with others.",
        },
      ],
    },
    {
      title: "Educational Use",
      icon: <BookOpen className="faq-category-icon" />,
      items: [
        {
          question: "Can I use WorldExplorer content for educational purposes?",
          answer:
            "Yes, WorldExplorer is designed as an educational platform. Teachers and students are welcome to use the content for classroom activities, research projects, and learning purposes. Please see our About page for more details on educational licensing.",
        },
        {
          question: "How do I cite WorldExplorer content in my research?",
          answer:
            "When citing WorldExplorer, please use the following format: 'WorldExplorer. [Page Title]. Retrieved [Date], from https://theworldexplorer.vercel.app/[page-url]'. For academic papers, treat it as a web resource with the current date of access.",
        },
        {
          question: "Are there lesson plans or teaching resources available?",
          answer:
            "Currently, WorldExplorer provides interactive tools and comprehensive country data. While we don't offer formal lesson plans yet, teachers can use our quiz system, country comparisons, and cultural information to create engaging geography and social studies lessons.",
        },
        {
          question: "What age group is WorldExplorer suitable for?",
          answer:
            "WorldExplorer is designed for middle school students and above (ages 11+), but the content is accessible to anyone interested in learning about world geography, cultures, and history. The interface is intuitive enough for younger users with adult guidance.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: <Monitor className="faq-category-icon" />,
      items: [
        {
          question: "What browsers are supported?",
          answer:
            "WorldExplorer works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. Internet Explorer is not supported.",
        },
        {
          question: "Why are some interactive features not working?",
          answer:
            "If interactive features aren't working, try refreshing the page, clearing your browser cache, or disabling browser extensions that might interfere with JavaScript. Ensure you have a stable internet connection for optimal performance.",
        },
        {
          question: "The website is loading slowly. What should I do?",
          answer:
            "Slow loading can be due to internet connection, browser cache, or high server traffic. Try refreshing the page, clearing browser cache, or accessing the site during off-peak hours. Contact us if the problem persists.",
        },
        {
          question: "Are there any accessibility features available?",
          answer:
            "WorldExplorer includes basic accessibility features such as keyboard navigation, alt text for images, and semantic HTML structure. We're continuously working to improve accessibility. If you encounter any barriers, please contact us.",
        },
      ],
    },
    {
      title: "Content & Data",
      icon: <Database className="faq-category-icon" />,
      items: [
        {
          question: "How accurate and up-to-date is the information?",
          answer:
            "We strive to maintain accurate and current information. Our data is sourced from reliable geographic, statistical, and cultural databases. However, some information may become outdated. We update content regularly and appreciate user reports of any inaccuracies.",
        },
        {
          question: "What are the sources for WorldExplorer's data?",
          answer:
            "Our data comes from various reputable sources including national statistical offices, UNESCO, World Bank, and other international organizations. We cross-reference multiple sources to ensure accuracy and reliability.",
        },
        {
          question: "How can I report incorrect information?",
          answer:
            "If you notice any incorrect or outdated information, please contact us through the email provided in the footer (1046prt@gmail.com). Include the specific page URL and details about the error. We appreciate your help in maintaining data accuracy.",
        },
        {
          question: "Can I suggest new features or content?",
          answer:
            "Absolutely! We welcome suggestions for new features, countries to add, or improvements to existing content. Contact us via email or through our GitHub repository. Your feedback helps us improve WorldExplorer for all users.",
        },
        {
          question: "Is there an API available for developers?",
          answer:
            "Currently, WorldExplorer does not offer a public API. However, if you're interested in collaborating or accessing data programmatically for educational purposes, please reach out to us to discuss potential partnerships.",
        },
      ],
    },
  ];

  // Structured data for FAQ page
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category, categoryIndex) =>
      category.items.map((item, itemIndex) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <>
      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <div className="page-wrapper">
        <GlobalNavigation showBackButton currentPage="faq" />

        <main className="faq-main">
          <div className="faq-container">
            <header className="faq-header">
              <h1 className="faq-title">Frequently Asked Questions</h1>
              <p className="faq-description">
                Find answers to common questions about using WorldExplorer,
                educational content, technical support, and more.
              </p>
            </header>

            <div className="faq-content">
              {faqCategories.map((category, categoryIndex) => (
                <section key={categoryIndex} className="faq-category">
                  <div className="faq-category-header">
                    {category.icon}
                    <h2 className="faq-category-title">{category.title}</h2>
                  </div>

                  <div className="faq-items">
                    {category.items.map((item, itemIndex) => {
                      const isOpen = openItems[`${categoryIndex}-${itemIndex}`];
                      return (
                        <div key={itemIndex} className="faq-item">
                          <button
                            className="faq-question"
                            onClick={() => toggleItem(categoryIndex, itemIndex)}
                            aria-expanded={isOpen}
                          >
                            <span className="faq-question-text">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="faq-toggle-icon" />
                            ) : (
                              <ChevronDown className="faq-toggle-icon" />
                            )}
                          </button>

                          <div
                            className={`faq-answer ${
                              isOpen ? "faq-answer-open" : ""
                            }`}
                          >
                            <div className="faq-answer-content">
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <section className="faq-contact">
              <h2 className="faq-contact-title">Still have questions?</h2>
              <p className="faq-contact-text">
                If you couldn't find the answer you're looking for, feel free to
                reach out to us.
              </p>
              <a href="mailto:1046prt@gmail.com" className="faq-contact-button">
                Contact Support
              </a>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
