public class AccountApex {
	@AuraEnabled
	public static list<account> getAccount() {
		return [SELECT id, name, Rating, Industry FROM account LIMIT 10];
	}
	@AuraEnabled(cacheable=true)
	public static list<account> queryAccount() {
		return [SELECT id, name, Rating, Industry FROM account LIMIT 10];
	}
	@AuraEnabled
	public static string createAccount(string accame) {
		Account a = new account(name = accame);
		insert a;
		return a.id;
	}
	@AuraEnabled
	public static string createAccountwithphone(string accame, string accphone, string accfax) {
		Account a = new account(name = accame, phone = accphone, fax = accfax);
		insert a;
		return a.id;
	}
}
