import {
  Sparkles, Scissors, Wind, UserRound, Layers, TrendingDown, ScanLine, ScanFace,
  HeartHandshake, MapPin, Stethoscope, CalendarCheck, Lightbulb, Route,
  FlaskConical, Sprout, Syringe, Zap, Crown, CircleDot, UserCheck,
  ClipboardList, Target, Droplets,
} from 'lucide-react'

// Contact details taken from adgrohairgloskinperambalur.com
export const PHONE = '+917639356789'
export const PHONE_DISPLAY = '+91 76393 56789'
export const EMAIL = 'adgrohairperambalur@gmail.com'
export const ADDRESS =
  '1st Floor, Amma Complex, 150B, Perambalur Collector Office Road, above Smoky Wheels, Thuraimangalam, Perambalur, Tamil Nadu 621212'
export const ADDRESS_LINES = [
  '1st Floor, Amma Complex, 150B,',
  'Perambalur Collector Office Road,',
  'above Smoky Wheels, Thuraimangalam,',
  'Perambalur, Tamil Nadu 621212',
]
export const MAPS_URL = 'https://maps.app.goo.gl/gncu14XsZVxcwL4V6'

export const nav = [
  { href: '#concerns', label: 'Concerns' },
  { href: '#treatments', label: 'Treatments' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
]

export const trust = [
  { icon: Sparkles, text: 'Advanced Hair Restoration Options' },
  { icon: HeartHandshake, text: 'Personalised Treatment Approach' },
  { icon: ScanLine, text: 'Hair & Scalp Consultation' },
  { icon: MapPin, text: 'Convenient Perambur Location' },
]

export const concernOptions = [
  'Hair Fall', 'Hair Thinning', 'Baldness', 'Hair Transplant',
  'GFC Treatment', 'Other Hair Concerns',
]

export const concerns = [
  { icon: TrendingDown, title: 'Hair Fall', text: 'Experiencing increased hair shedding? Explore suitable hair fall treatment options following a hair and scalp assessment.' },
  { icon: Wind, title: 'Hair Thinning', text: 'Concerned about reduced hair density or thinning hair? Understand available hair regrowth and hair restoration approaches.' },
  { icon: UserRound, title: 'Baldness', text: 'Noticing visible bald patches or a receding hairline? Explore suitable hair restoration options based on your condition.' },
  { icon: ScanFace, title: 'Receding Hairline', text: 'Concerned about changes around your forehead or hairline? Discuss available approaches to hairline restoration.' },
  { icon: Layers, title: 'Low Hair Density', text: 'Looking for ways to improve the appearance of hair density? Explore treatment options based on your individual requirements.' },
]

export const treatments = [
  { icon: FlaskConical, title: 'GFC Hair Treatment', text: "Growth Factor Concentrate (GFC) is a hair treatment option that uses growth factor components derived from the patient's blood. It may be considered for selected hair thinning and hair loss concerns.", cta: 'Know More About GFC' },
  { icon: Sprout, title: 'Hair Regrowth Treatment', text: 'Hair regrowth approaches may be considered for certain types of hair thinning and hair loss. Treatment selection depends on the underlying cause and individual assessment.', cta: 'Explore Hair Regrowth Options' },
  { icon: Scissors, title: 'Hair Transplant', text: 'Hair transplant is a surgical hair restoration procedure that involves transferring hair follicles from a donor area to selected areas of hair loss. A consultation helps determine suitability, donor availability and treatment expectations.', cta: 'Book Hair Transplant Consultation' },
  { icon: Syringe, title: 'Advanced PRP Hair Treatment', text: "PRP is a hair treatment option that uses platelet-rich plasma prepared from the patient's blood. Its suitability depends on the individual's hair loss condition and assessment.", cta: 'Discuss PRP Treatment' },
  { icon: Zap, title: 'Oxygen Laser Hair Treatment', text: 'Explore scalp-focused treatment options designed to complement selected hair care and restoration approaches.', cta: 'Explore Treatment Options' },
  { icon: Crown, title: 'Cosmetic Hair System', text: 'For individuals looking for a non-surgical option to improve the appearance of hair coverage, cosmetic hair systems may be discussed during consultation.', cta: 'Enquire About Hair Systems' },
]

export const whyUs = [
  'Consultation-led treatment recommendations',
  'Multiple hair restoration options',
  'Individualised approach to hair concerns',
  'Treatment options explained before proceeding',
  'Convenient Perambur, Chennai location',
  'Appointment-based consultation',
]

export const transplantData = {
  title: 'Considering Hair Transplant in Chennai?',
  intro: 'Hair transplant may be considered for individuals experiencing certain types of hair loss.',
  concerns: ['Receding Hairline', 'Pattern Baldness', 'Visible Bald Patches', 'Reduced Hair Density', 'Advanced Hair Loss'],
  understand: ['Hair transplant procedure', 'Donor area suitability', 'Hairline restoration options', 'Treatment planning', 'Expected outcomes and limitations'],
  cta: 'Book Hair Transplant Consultation',
  badge: Scissors,
  concernIcons: [ScanFace, UserRound, CircleDot, Layers, TrendingDown],
  understandIcons: [Scissors, UserCheck, ScanFace, ClipboardList, Target],
}

export const gfcData = {
  title: 'Exploring GFC Treatment in Chennai?',
  intro: 'GFC (Growth Factor Concentrate) may be considered for selected hair thinning and hair loss concerns.',
  concerns: ['Hair Thinning', 'Reduced Hair Density', 'Certain Types of Hair Loss', 'Weakening Hair Growth'],
  understand: ['How GFC treatment works', 'Your suitability for GFC', 'Treatment procedure', 'Recommended sessions, if applicable', 'Expected outcomes and limitations'],
  cta: 'Book GFC Consultation',
  badge: Droplets,
  concernIcons: [Wind, Layers, TrendingDown, Sprout],
  understandIcons: [FlaskConical, UserCheck, Syringe, CalendarCheck, Target],
}

export const steps = [
  { icon: CalendarCheck, title: 'Book Your Appointment', text: 'Submit your details through the enquiry form or contact our clinic.' },
  { icon: Stethoscope, title: 'Hair & Scalp Assessment', text: 'Discuss your hair concerns and undergo an appropriate assessment.' },
  { icon: Lightbulb, title: 'Understand Your Options', text: 'Explore suitable treatment or hair restoration options.' },
  { icon: Route, title: 'Plan Your Next Step', text: 'Proceed with a treatment plan based on professional recommendations and your preferences.' },
]

export const faqs = [
  ['Where can I get hair treatment in Perambur, Chennai?', 'Advanced GroHair in Perambur offers consultation for hair fall, hair thinning, hair regrowth and hair restoration enquiries.'],
  ['What is the best treatment for hair fall?', 'Hair fall can have different causes. The appropriate approach depends on the underlying reason, hair condition and individual assessment.'],
  ['Is GFC treatment suitable for hair thinning?', 'GFC may be considered for selected hair thinning concerns. Suitability and expected outcomes should be discussed during consultation.'],
  ['How do I know whether I need a hair transplant?', 'Hair transplant suitability depends on the pattern of hair loss, donor hair availability and other individual factors. A consultation helps assess whether it may be appropriate.'],
  ['Where can I enquire about hair transplant in Chennai?', 'You can book a hair transplant consultation at Advanced GroHair, Perambur, Chennai, to discuss suitability and available options.'],
  ['Can I book a hair consultation online?', 'Yes. Submit the enquiry form on this page with your name, mobile number and hair concern to request an appointment.'],
  ['How much does hair treatment cost in Chennai?', 'Hair treatment costs depend on the type of treatment, individual requirements and recommended sessions. Contact our clinic for details after consultation.'],
  ['How can I book an appointment at Advanced GroHair Perambur?', 'Fill out the consultation form or use the Call Now button to connect with our team.'],
]

// ---------------------------------------------------------------------------
// Before / After results  (add real patient photos and consent-cleared cases)
//   Put images in /public/results/ and list them here, e.g.
//   { before: 'results/case1-before.jpg', after: 'results/case1-after.jpg', label: 'Hair transplant - 8 months' }
export const results = []

// Patient reviews (add genuine reviews only)
//   { name: 'Name', concern: 'Hair Fall', rating: 5, text: 'Review text' }
export const reviews = []
