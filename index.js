const nodeMailer = require('nodemailer');
const fs = require('fs');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
const timeStr = `${year}${month}${day}`;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
console.log(timeStr)

// read mail template
const mailContent = fs.readFileSync('./mailTemplate.txt', 'utf8')
                    .split('\r\n')
                    .filter(e => !e.startsWith('//'))
                    .map(line => `<p>${line}</p>`)
                    .join('');
console.log(mailContent);

// get all receipients
const receivers = fs.readFileSync('./receivers.txt', 'utf8')
                    .split('\r\n')
                    .filter(e => !e.startsWith('//'))
                    .join(',');
console.log(receivers);

const transporter = nodeMailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'chen0625tung@gmail.com',
        pass: 'tifa2056'
    }
});

const mailOptions = {
    from: 'chen0625tung@gmail.com',
    to: receivers, // list of receipients
    subject: `${timeStr} 工作日誌`,
    html: mailContent
}

transporter.sendMail(mailOptions, (err, info) => {
    if(err) throw err;
    if(info) console.log(`Done sending!, time: ${timeStr}`, info)
});