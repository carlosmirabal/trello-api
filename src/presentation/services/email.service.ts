import nodemailer from "nodemailer";

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    // attachments?: any
}

export class EmailService {
    private transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
        private readonly postToProvider: boolean
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            },
        });
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody } = options;

        try {
            if (!this.postToProvider) return true;

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
            });

            return true;
        } catch (error) {
            return false;
        }
    }
}
