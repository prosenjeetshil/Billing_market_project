from django.core.mail import EmailMessage

class Send_Mail():
    @staticmethod
    def send_mail(subject, body,to):
        mail = EmailMessage(subject=subject, body=body, to=to)
        mail.send()

class Util():
    @staticmethod
    def send_mail(data):
        mail=EmailMessage(
            subject=data['email_subject'],body=data['email_body'],to=[data['to_email']])
        mail.send()
       