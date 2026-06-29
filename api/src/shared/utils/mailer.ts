import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendLeadConfirmationEmail(
  name: string,
  email: string,
  telephone_number: string,
  history: string,
  selected_plan: string,
): Promise<void> {
  await transporter.sendMail({
    from: `"Coutinho Team" <${process.env.GMAIL_USERNAME}>`,
    to: process.env.HOTMAIL_USERNAME,
    subject: "Novo lead registrado na Coutinho Team!",
    html: `
      <h2>Olá, Arthur!</h2>
      <p>Existe um novo lead registrado no site.</p>
      <p>Plano selecionado: <strong>${selected_plan}</strong></p>
      <p>Nome do atleta: ${name}</p>
      <p>E-mail do atleta: ${email}</p>
      <p>Telefone do atleta: ${telephone_number}</p>
      <p>Historico esportivo do atleta: ${history}</p>
      <br/>
      <p>Atenciosamente,<br/>Coutinho Team</p>
    `,
  });
}
