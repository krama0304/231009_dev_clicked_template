public with sharing class BillBatch implements Database.Batchable<sObject>, Database.AllowsCallouts, Database.Stateful {
	private set<Id> receivesBillByEmail = new Set<Id>();
	public List<Id> BillapiId = new List<Id>();
	String query;
	String nameToSearch = 'Yes';
	public Database.QueryLocator start(Database.BatchableContext bc) {
		query =
			'SELECT Id,Name,Bill_By_Email__c, Active__c FROM Account where Active__c  = ' +
			'\'Yes\'' +
			'AND Bill_By_Email__c != null AND Email__c != null';
		//return Database.getQueryLocator(query,AccessLevel.USER_MODE);
		return Database.getQueryLocator(query, AccessLevel.USER_MODE);
	}

	public void execute(Database.BatchableContext bc, List<Account> scope) {
		//this is a method that will process the queried for records by preparing
		//a list of account Ids (this.receivesBillByEmail) to carry over to the finish method.
		//we will do this by iterating over scope and checking whether Bill_By_Email__c == TRUE.
		//This method will also call our BillAPI.getBills() method.
		if (receivesBillByEmail.isempty()) {
			BillapiId = BillAPI.getBills();
		}
		for (Account a : scope) {
			if (a.Bill_By_Email__c) {
				receivesBillByEmail.add(a.Id);
			}
		}
	}

	public void finish(Database.BatchableContext bc) {
		//  BillapiId=  BillAPI.getBills();
		Map<String, Blob> sendMap = new Map<String, Blob>();
		for (Account acc : [
			SELECT Id, Email__c, (SELECT Id FROM Bills__r ORDER BY CreatedDate DESC)
			FROM Account
			WHERE Id IN :this.receivesBillByEmail
		]) {
			if (!acc.Bills__r.isempty() && acc.Email__c != null) {
				system.debug('before');
				system.debug(acc.Bills__r[0].id);
				PageReference pageRef = new PageReference('/apex/BillVFPWrapper?id=' + acc.Bills__r[0].id);
				system.debug('After' + pageRef);
				Blob pdfBlob;
				if (test.isRunningTest()) {
					pdfBlob = blob.valueOf('Unit.Test');
				} else {
					system.debug('Before pdfBlob');
					//pdfBlob = pageRef.getContentAsPDF();
					pdfBlob = pageRef.getContent();
					system.debug('After pdfBlob');
				}
				system.debug('Before sendMap');
				sendMap.put(acc.Email__c, pdfBlob);
				system.debug('After sendMap');
			}
		}
		if (!sendMap.isEmpty()) {
			BillEmailer.sendEmails(sendMap);
		}

		String QueryLimit =
			'1. SOQL Queries used / SOQL Queries allowed: ' +
			Limits.getQueries() +
			'/' +
			Limits.getLimitQueries();
		String DMLimit =
			'2. Number of records queried so far /  Number allowed: ' +
			Limits.getDmlRows() +
			'/' +
			Limits.getLimitDmlRows();
		String DMLStat =
			'3. Number of DML statements used so far / Number allowed: ' +
			Limits.getDmlStatements() +
			'/' +
			Limits.getLimitDmlStatements();
		String CPUT =
			'4. Amount of CPU time (in ms) used so far / CPU usage time (in ms) allowed: ' +
			Limits.getCpuTime() +
			'/' +
			Limits.getLimitCpuTime();

		system.debug(QueryLimit);
		system.debug(DMLimit);
		system.debug(DMLStat);
		system.debug(CPUT);
	}
}
