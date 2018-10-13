public class TechChallengeDisplayRecord{

@AuraEnabled
public static List<Account> getRecords(string objectname){

List<Account> acc=[select Id,Name,Industry, AccountNumber,ShippingAddress,BillingStreet,BillingState,BillingPostalCode,CreatedBy.Name,
Owner.Name,AccountSource,AnnualRevenue,NumberOfEmployees,Type,Fax,Phone,Parent.Name,Description,LastModifiedBy.Name from Account ];
return acc;
}

@AuraEnabled
public static void deleteRecords(List<Id> id){
system.debug(id);
List<Account> acc=[select Id,Name,Industry from Account where Id IN:id];
delete acc;
}

@AuraEnabled
public static Id getRecordId(List<Id> id){
system.debug(id);
return [select Id from Account where Id In:id].Id;

}
@AuraEnabled
public static void updaterecord(List<Account> Accounts,string SourceValue){
system.debug(SourceValue);
List<Account> SourceUpdate=new list<Account>();
for(Account acc: Accounts){
acc.AccountSource=SourceValue;
SourceUpdate.add(acc);
}
system.debug(SourceUpdate);
if(SourceUpdate.size()>0){
update SourceUpdate;
}



}
}
