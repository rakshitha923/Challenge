@isTest
private class TechChallengeDisplayRecord_Test{

@isTest
private static void testgetRecords(){
Test.StartTest();
TechChallengeDisplayRecord.getRecords('Account');
Test.StopTest();
}
@isTest
private static void testdeleteRecords(){
List<Id> accountid=new list<Id>();
Account a=new Account();
a.Name='test';
insert a;
accountid.add(a.ID);
TechChallengeDisplayRecord.getRecordId(accountid);
TechChallengeDisplayRecord.deleteRecords(accountid);


}

@isTest
private static void updateSourceRecords(){
List<Account> accountid=new list<Account>();
Account a=new Account();
a.Name='test';
insert a;
accountid.add(a);
TechChallengeDisplayRecord.updaterecord(accountid,'web');
}



}
