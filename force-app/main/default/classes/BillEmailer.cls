public with sharing class BillEmailer {
	public static void sendEmails(Map<String, Blob> emailsWithBills) {
		
		List<Messaging.SingleEmailMessage> emailsToSend = new List<Messaging.SingleEmailMessage>();
		
		for (String email : emailsWithBills.keySet()) {
			Messaging.SingleEmailMessage semail = new Messaging.SingleEmailMessage();
			system.debug('email' + email);
		
                String[] sendingTo = new List<String>{ email };
			semail.setToAddresses(sendingTo);
			system.debug('sendingTo' + sendingTo);
			// String[] sendingToBccAdd = new String[]{''};
			//semail.setBccAddresses(sendingToBccAdd);
			//String[] sendingTocAdd = new String[]{''};
			//semail.setCcAddresses(sendingTocAdd);
			semail.setTargetObjectId( UserInfo.getUserId() );
			semail.setSaveAsActivity( false );
			semail.setSubject(
				'Your Cricket Wirless Monthly Bill Statement is Ready for the month of ' +
					DateTime.now().format('MMMM') +' '
					+Date.Today().Year()
			);
			semail.setPlainTextBody('Dear Valued Customer ,' + '\n \n' + 'Attached is your current bill.');
			Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
			attach.Body = emailsWithBills.get(email);
			attach.FileName =
				'Bill-' +
				Date.Today().Month() +
				'-' +
				Date.Today().Day() +
				'-' +
				Date.Today().Year() +
				'.pdf';
			attach.ContentType = 'application/pdf';
			semail.setFileAttachments(new List<Messaging.EmailFileAttachment>{ attach });
			emailsToSend.add(semail);
		
		}

		Messaging.SendEmailResult[] results = Messaging.sendEmail(emailsToSend);
		system.debug('SendEmailResult');
	
		inspectResults(results);
	}

	
	private static Boolean inspectResults(Messaging.SendEmailResult[] results) {
		Boolean sendResult = true;
		
		for (Messaging.SendEmailResult res : results) {
			if (res.isSuccess()) {
				System.debug('Email sent successfully');
			} else {
				sendResult = false;
				System.debug('The following errors occurred: ' + res.getErrors());
			}
		}
		return sendResult;
	}
}