/*
Populate the getBills method, which will create and insert a list of Bill__c object records, and then return the inserted Bill__c object records.
Utilize the Named Credential in the setEndpoint method.
Utilize the GET keyword in the setMethod method.
Utilize the JSON.deserialize() method to deserialize the JSON body we receive from the HTTP GET Call into a List of BillWrapper objects (hint: “List<BillWrapper> bwList = (List<BillWrapper>)JSON.deserialize(responseBody, List<BillWrapper>.class”);
Create a List of Active Accounts (Active__c = ‘Yes’) using a SOQL query, and iterate over it, 
putting the Account Name and Account Id in a Map<String, Id>.
Iterate over the list of BillWrappers.
Using functions of the newly populated Map<String, Id> 
to match the Account Name in the individual BillWrapper to the Account Id value in the Map<String, Id>. 
Hint: https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_methods_system_map.htm
Match the billId of the BillWrapper to the Bill_Id__c of the Bill To Insert.
Use the following to match the BillWrapper balance to the Balance__c of
 the Bill To Insert: billToInsert.Balance__c = Decimal.valueOf(bw.balance.replace(‘$’, ”));
Add each new bill to a list of Bills To Insert.
Insert Bills To Insert.
Query for Inserted Bills.
Return Queried For Bills.
To test your code, call the getBills method in Anonymous Apex, which will create your first set of bills to test with when successfully completed:
BillAPI.getBills();

*/

public with sharing class BillAPI {
	public static List<Bill__c> getBills() {
		List<Bill__c> billList = new List<Bill__c>();
		HttpRequest req = new HttpRequest();
		req.setEndpoint('callout:Billing_API');
		req.setMethod('GET');
		req.setHeader('Content-Type', 'application/json; charset=UTF-8');
		Http http = new Http();
		HTTPResponse res = http.send(req);
		List<BillWrapper> billWrap;
		if (res.getStatusCode() == 200) {
			billWrap = (list<BillWrapper>) JSON.deserialize(res.getBody(), list<BillWrapper>.class);
			List<Account> activeAcc = [SELECT id, name FROM Account WHERE Active__c = 'Yes' WITH SECURITY_ENFORCED];
			Map<String, Id> accMap = new Map<String, Id>();
			for (Account acc : activeAcc) {
				accMap.put(acc.Name, acc.Id);
			}

			for (BillWrapper blist : billWrap) {
				if (accMap.containsKey(blist.accountName)) {
					Bill__c bill = new Bill__c();
					bill.Account__c = accMap.get(blist.accountName);
					bill.Bill_Id__c = blist.billId;
					bill.Balance__c = Decimal.valueOf(blist.balance.replace('$', ''));
					billList.add(bill);
				}
			}
			//Set<Id>billId=new Set<Id>();
			//this is for upsert
			//Schema.SobjectField externalIdField=Bill__c.Fields.Bill_Id__c;
			boolean allOrNone = false;
			//Upsert & Extrnal ID
			// Database.UpsertResult[] srList=Database.insert(billList,externalIdField,allOrNone);
			Database.SaveResult[] srList = Database.insert(billList, allOrNone);
			for (Database.SaveResult sr : srList) {
				if (sr.isSuccess()) {
					system.debug('Operation was successful');
					//Operation was successful
					//billId.add(sr.id);
				} else {
					// Operation failed, so get all errors
					for (Database.Error err : sr.getErrors()) {
						System.debug('error has occurred.' + err.getStatusCode() + ': ' + err.getMessage());
						System.debug('fields that affected this error: ' + err.getFields());
					}
				}
			}
		}

		return billList;
	}

	public class BillWrapper {
		public String billId;
		public String accountName;
		public String balance;
	}
}
