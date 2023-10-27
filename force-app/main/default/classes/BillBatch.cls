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
		return Database.getQueryLocator(query,AccessLevel.USER_MODE);
	}

	public void execute(Database.BatchableContext bc, List<Account> scope) {
		//this is a method that will process the queried for records by preparing
		//a list of account Ids (this.receivesBillByEmail) to carry over to the finish method.
		//we will do this by iterating over scope and checking whether Bill_By_Email__c == TRUE.
		//This method will also call our BillAPI.getBills() method.

		for (Account a : scope) {
			if (a.Bill_By_Email__c) {
				receivesBillByEmail.add(a.Id);
			}
		}
         BillapiId=  BillAPI.getBills();

	}

	public void finish(Database.BatchableContext bc) {
            
      Map<String, Blob> sendMap = new Map<String, Blob>();
       for(Account acc:[
				SELECT Id, Email__c, (SELECT Id FROM Bills__r ORDER BY CreatedDate DESC)
				FROM Account
				WHERE Id IN :this.receivesBillByEmail
        ]){
            if(!acc.Bills__r.isempty() && acc.Email__c!=null){
             PageReference pageRef = new PageReference('/apex/BillVFP?id=' + acc.Bills__r[0].id );
              Blob pdfBlob ;
                
                 if (test.isRunningTest()) {
                      
						pdfBlob = blob.valueOf('Unit.Test');
					} else {
                     
						pdfBlob = pageRef.getContentAsPDF();
					}
         
              sendMap.put(acc.Email__c,pdfBlob);
            
        }
         if(!sendMap.isEmpty())
        {
        			BillEmailer.sendEmails(sendMap);
           
        }
        
        }
	}
}