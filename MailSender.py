import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import getpass

def send_email(to_email, subject, message, from_email, password):
    # Setup the MIME
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Add body to email
    msg.attach(MIMEText(message, 'plain'))

    # Create SMTP session for sending the mail
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Enable security
            server.login(from_email, password)  # Login with mail_id and password
            text = msg.as_string()
            server.sendmail(from_email, to_email, text)
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email. Error: {e}")

def main():
    from_email = "prometienda.fc@gmail.com"
    password = "uictyyyzilngdczu"
    to_email = input("Enter the recipient's email: ")
    subject = input("Enter the subject of the email: ")
    message = input("Enter the message: ")

    send_email(to_email, subject, message, from_email, password)

if __name__ == "__main__":
    main()

