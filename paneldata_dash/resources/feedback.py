from flask_restful import Resource
from flask import request
import os

from libs.mailgun import Mailgun
from schemas.feedback import FeedbackSchema

feedback_schema = FeedbackSchema()


class Feedback(Resource):

    @classmethod
    def post(cls):
        """
        Use to upload image with feedback
        :return:
        """
        recipient = os.environ.get('FEEDBACK_RECIPIENT_MAIL')
        subject = "You have received a new feedback"
        text = f"{request.form.get('message')}"
        image = request.files.get('feedback.jpg')
        files = []
        if image:
            files = [("attachment", image)]
        try:
            Mailgun.send_email([recipient], subject, text, files)
            return {'message': 'Feedback sent successfully'}, 200
        except Exception as e:
            return {'error': 'could not send feedback'}, 400






