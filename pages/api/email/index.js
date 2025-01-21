// import { renderToStaticMarkup } from 'react-dom/server'; // Import renderToStaticMarkup
// import { Resend } from 'resend';
// import RivvettWelcomeEmail from '@/emails/index'; // Adjust the import path

// const resend = new Resend(process.env.AUTH_RESEND_KEY);

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     // Parse the request body
//     const { email, userFirstname } = req.body;

//     // Generate the email HTML string using renderToStaticMarkup
//     const html = renderToStaticMarkup(
//       <RivvettWelcomeEmail userFirstname={userFirstname} />
//     );

//     // Send the email using Resend API
//     const { data, error } = await resend.emails.send({
//       from: 'rivvett <onboarding@resend.dev>',
//       to: [email],
//       subject: 'Rivvett Onboarding',
//       html, // The rendered HTML string
//     });

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.status(200).json({ message: 'Email sent successfully' });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// }
