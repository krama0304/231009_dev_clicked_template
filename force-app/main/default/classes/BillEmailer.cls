public with sharing class BillEmailer {
	public static void sendEmails(Map<String, Blob> emailsWithBills) {
		//instantiate a list of Messaging.SingleEmailMessage objects
		List<Messaging.SingleEmailMessage> emailsToSend = new List<Messaging.SingleEmailMessage>();
		//Messaging.SingleEmailMessage    mail=new Messaging.SingleEmailMessage();
		//iterate over the keyset of the emailsWithBills map and instantiate a single Messaging.SingleEmailMessage
		//object. Set the bccAddress to the email from the iteration, set a PlainTextBody, and set a Subject for the
		//Messaging.SingleEmailMessage object.
		system.debug('emailsWithBills' + emailsWithBills);
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
			//add the Messaging.SingleEmailMessage object to the list inside of the loop, and send the email outside of the loop.
		}

		Messaging.SendEmailResult[] results = Messaging.sendEmail(emailsToSend);
		system.debug('SendEmailResult');
		// Call a helper method to inspect the returned results
		inspectResults(results);
	}

	//this is a method that will allow you to check to see if your code works.
	private static Boolean inspectResults(Messaging.SendEmailResult[] results) {
		Boolean sendResult = true;
		// sendEmail returns an array of result objects.
		// Iterate through the list to inspect results.
		// In this class, the methods send only one email,
		// so we should have only one result.
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
