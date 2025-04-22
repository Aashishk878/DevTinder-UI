const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aashishk4568@gmail.com',
    pass: process.env.MAIL_SECRET, // from App Passwords (no spaces)
  },
});

const sendConnectionEmail = async (sender, recieverMail, status) => {
    if(status === "interested")
    {
      const firstName = sender.split(' ')[0];
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const subject = "💘 You've Got a New Connection Request!";
      const html = `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff0f5; padding: 30px; border-radius: 12px; border: 1px solid #f3d1e4; max-width: 600px; margin: auto;">
        <h1 style="text-align: center; color: #d63384;">💌 New Connection Alert!</h1>
        <p style="font-size: 18px; color: #333; text-align: center;">
          <strong>${capitalizedName}</strong> has shown interest in you! 🥰
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://dev-tinder-delta-one.vercel.app/" style="background-color: #d63384; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-size: 16px;">
            View Connection 💖
          </a>
        </div>

        <p style="font-size: 16px; color: #555; text-align: center;">
          Don’t keep them waiting — check your dashboard to decide if the vibe is mutual! ✨
        </p>

        <hr style="margin: 40px 0; border: none; border-top: 1px solid #f3d1e4;" />

        <p style="font-size: 14px; color: #999; text-align: center;">
          You’re receiving this email because you’re part of <strong>DevTinder</strong>. Keep connecting, keep vibing! 💫<br/>
          Need help? Contact support at <a href="mailto:support@devtinder.com" style="color: #d63384;">support@devtinder.com</a>
        </p>
      </div>
      `;

      await transporter.sendMail({
        from: `"DevTinder 💘" <aashishk4568@gmail.com>`,
        to: recieverMail,
        subject,
        html,
      });
    }
  
  };
  
  module.exports = sendConnectionEmail;