@isTest(SeeAllData=false)
private class BillCalloutClassTest {
	@istest
	static void testcallout() {
		account acc = new account(
			name = 'Account 0',
            
			Active__c = 'Yes',
			Bill_By_Email__c = true,
			Email__c = 'onlyramak@gmail.com'
		);
		insert acc;
		Test.startTest();
		Test.setMock(HttpCalloutMock.class, new BiillApiMockHttpResponseGenerator());
		//List<Id> listids = BillAPI.getBills();
		//system.debug(listids.size());
		//system.assert.areEqual(1, listids.size());
        BillBatch billbatche = new BillBatch();
         Database.executeBatch(billbatche);
		Account[] accUpdatedList = [SELECT Id, Name, (SELECT Id FROM Bills__r) FROM Account];
   
		system.assert.areEqual(1, accUpdatedList.size());
		Test.stopTest();
	}
}