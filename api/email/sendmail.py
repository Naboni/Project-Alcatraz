import smtplib
from email.mime.text import MIMEText

def sendMailToTutor(child, tutorEmail):
    port = 2525
    smtp_sever = 'smtp.mailtrap.io'
    login = '9028472a1c03f9'
    password = 'dcbd0dbfc7bf97'
    message = f"<h3>You have been assigned a Student.</h3>\
            <ul><li>Name:<strong> {child.firstname} {child.lastname}</strong></li>\
            <li>Gender: {child.gender}</li>\
            <li>Age: {child.age}</li>\
            <li>Subjects: {child.subjects}</li>\
            <li>Location: {child.location}</li></ul>\
                "

    sender_email = 'naboniabebe@gmail.com'
    reciever_email = tutorEmail
    msg = MIMEText(message, 'html')
    msg['Subject'] = 'ETutor'
    msg['From']=sender_email
    msg['To']=reciever_email

    with smtplib.SMTP(smtp_sever, port) as server:
        server.login(login, password)
        server.sendmail(sender_email, reciever_email, msg.as_string())

def sendMailToParent(tutor, parentEmail):
    port = 2525
    smtp_sever = 'smtp.mailtrap.io'
    login = '9028472a1c03f9'
    password = 'dcbd0dbfc7bf97'
    message = f"<h3>Your child have been assigned a Tutor.</h3>\
            <ul><li>Name:<strong> {tutor.firstname} {tutor.lastname}</strong></li>\
            <li>Gender: {tutor.gender}</li>\
            <li>Phone: {tutor.phone}</li>\
            <li>Location: {tutor.location}</li>\
            <li>Subjects: {tutor.subjects}</li></ul>\
                "

    sender_email = 'naboniabebe@gmail.com'
    reciever_email = parentEmail
    msg = MIMEText(message, 'html')
    msg['Subject'] = 'ETutor'
    msg['From']=sender_email
    msg['To']=reciever_email

    with smtplib.SMTP(smtp_sever, port) as server:
        server.login(login, password)
        server.sendmail(sender_email, reciever_email, msg.as_string())