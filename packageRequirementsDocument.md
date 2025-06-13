### **Product Requirements Document: AFK Friends Landing Page**

#### **Introduction/Overview**

This document outlines the requirements for building a landing page for AFK Friends, an event platform that helps users transition from meeting people to building genuine friendships. The landing page serves as a waitlist collection tool to demonstrate user interest to investors and validate product-market fit before launch.

The landing page will feature a product demo video, compelling messaging about the platform's unique value proposition, and an email collection form for LA-based early adopters.

#### **Goals**

* **Investor Validation:** Demonstrate user interest and market demand to potential investors.  
* **Product Validation:** Collect early user feedback and validate product-market fit.  
* **Waitlist Building:** Generate a qualified list of potential users in Los Angeles.  
* **Brand Awareness:** Introduce AFK Friends as a solution to superficial networking platforms.  
* **Conversion Optimization:** Achieve high email signup conversion rates from landing page visitors.

#### **User Stories**

* As a potential user, I want to understand how AFK Friends differs from Meetup/Eventbrite so that I can decide if it's worth joining the waitlist.  
* As someone frustrated with surface-level networking, I want to see *examples* of how this app will help me build genuine friendships so that I feel confident signing up.  
* As a busy professional in LA, I want to quickly understand the app's benefits and sign up for updates so that I don't miss the launch.  
* As someone interested in hosting intimate events, I want to learn about the AI assistance features so that I understand how the app will support my community-building goals.  
* As an investor, I want to see evidence of user demand and a clear value proposition so that I can evaluate the business opportunity.

#### **Functional Requirements**

##### **1\. Content & Messaging**

* The page must display the main headline: "Stop meeting people, start making friends."  
* The page must explain how AFK Friends differs from existing platforms. This should be presented in a simple, visual "How We're Different" section using icons and short text.  
* The page must highlight key value propositions:  
  * AI assistance for messaging, event planning, and preparation.  
  * Network management with relationship tracking.  
  * A point system rewarding genuine relationship-building behaviors. The messaging should hint at what these behaviors are (e.g., "rewarding meaningful actions like following up after an event").  
  * Small group events (not hundreds of people).  
  * Integrated messaging platform.  
  * Focus on in-person "Away From Keyboard" experiences.  
* The page must emphasize the target audience (late 20s and up looking for authentic friendships) and the initial LA launch focus.  
* The page must include a section designed for social proof (testimonials/user quotes). This can be a placeholder in the initial version, ready to be populated later.

##### **2\. Video Section**

* The page must include a prominently positioned video container for a product demo.  
* The video must autoplay without sound. It must have standard video controls (play/pause, volume, fullscreen).  
* The video must use a standard web video aspect ratio (16:9 recommended).  
* **Loading State:** The video container must display a high-quality, compressed thumbnail of the video's first frame while the full video content is loading.  
* **Accessibility:** The video must have an option for users to view closed captions or a text transcript.

##### **3\. Email Collection Form**

* The form must collect the user's email address (required field).  
* The form must collect the user's location (required field). This will be a dropdown menu with a pre-selected list of cities (prioritizing LA County) and an "Other" option that reveals a free-text input field.  
* The form must include a clear call-to-action button (e.g., "Join the Waitlist").  
* The form must validate email format before submission and prevent duplicate email submissions.  
* The form must display a clear success message after submission and handle error states gracefully.

##### **4\. Legal & Compliance**

* The page must include a footer with links to a **Privacy Policy** and a **Terms of Service** page.  
* The page must feature a **cookie consent banner** to comply with privacy regulations (e.g., GDPR/CCPA), which links to the Privacy Policy.  
* The footer must include placeholder **contact information** or a link to a support/contact method.

#### **Design & Branding**

* The page must use a fun, bright, and inviting aesthetic with the following **official color palette**:  
  * **Primary Background:** Neutral beige/cream (\#F5F3F0)  
  * **Primary CTA / Highlights:** Tomato (\#FE654F)  
  * **Headlines / Primary Text:** Dark Slate Gray (\#2A4747)  
  * **Secondary Buttons / Success States:** Celadon (\#8CC7A1)  
  * **Interactive Elements / Links:** Light Sky Blue (\#85C7F2)  
  * **Accent Elements / Hover States:** Celestial Blue (\#20A4F3)  
* **Visual Hierarchy:** The design must guide the user's eye, with the video as the primary focal point, followed by the main headline, and then the email collection form.  
* **Typography:** Fonts must be clean, modern, and approachable, using Dark Slate Gray (\#2A4747) for primary text to ensure maximum readability.  
* **Layout:** The layout must be a single page with clear sections, following a logical reading flow (e.g., F-pattern or Z-pattern).  
* **Responsiveness:** The page must be fully responsive and optimized for desktop, tablet, and mobile devices, with a mobile-first approach.  
* **Accessibility:** The design must adhere to WCAG guidelines, ensuring proper color contrast ratios, keyboard navigation, and accessible form elements.

#### **Technical Requirements & Infrastructure**

* **Core Technology:** The page must be built using TypeScript, React, and Vite.  
* **Hosting:** The page will be deployed on a modern hosting platform like Vercel or Netlify. The domain will be <www.afkfriends.com>.  
* **Video Hosting:** The product demo video must be hosted on a dedicated video platform (e.g., YouTube, Vimeo, or a CDN) to ensure optimal performance.  
* **Form Handling & Integration:** The form must integrate with Google Sheets for data collection via the Google Sheets API. The implementation must include robust front-end/back-end validation and security measures (e.g., CSRF protection, input sanitization).  
* **Email Automation:** Upon successful form submission, an integration with an email service provider (e.g., Mailchimp, ConvertKit) must trigger an automated welcome email sequence.  
* **Performance Optimization:** The page must be optimized for fast loading times. This includes lazy loading for the video and images, minifying CSS and JavaScript, and ensuring an efficient bundle size.  
* **SEO & Social Sharing:** The page must include comprehensive meta tags for SEO (title, description) and Open Graph/Twitter Card tags for rich social media sharing.

#### **Non-Goals (Out of Scope)**

* Multi-page website  
* User authentication (beyond email collection)  
* Analytics tracking (in the initial version)  
* A/B testing  
* Blog or content section  
* Mobile app download links  
* Payment processing  
* User dashboards or accounts

#### **Success Metrics**

* **Primary Metric:** Email signup conversion rate (target: 15-25% of unique visitors).  
* **Secondary Metrics:**  
  * Total number of email signups.  
  * Video engagement rate (% who watch \>30 seconds).  
  * Bounce rate (target: \<50%).  
  * Geographic distribution of signups (with a focus on validating the LA market).

#### **Open Questions**

* **Video Content:** What specific product features will be shown in the demo video?  
* **Email Sequence Content:** What is the specific content, call-to-action, and timing for the multi-email welcome sequence? (e.g., Day 1: Welcome & Mission, Day 3: Feature Spotlight, Day 7: Founder Story, etc.)  
* **Launch Timeline:** When do you plan to launch the actual app? (Tentative: Late Fall 2025\)

#### **Project Details**

* **Priority Level:** High  
* **Target Timeline:** 1-2 weeks for development and testing  
* **Dependencies:** Final video content creation, Google Sheets API setup, email automation sequence content and setup.
