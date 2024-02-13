public with sharing class ProductApi {
    public class Filters {
        @AuraEnabled
        public String searchKey { get; set; }
    }
    public ProductApi() {

    }
    @AuraEnabled(Cacheable=true)
    public static String queryProduct(Filters filters){
        try {
            return string.empty;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}