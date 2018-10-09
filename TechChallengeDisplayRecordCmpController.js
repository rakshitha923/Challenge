({
	doInit : function(component, event, helper) {
        
        component.set("v.Columns", [
            {label:" Name",fieldName:"Name",type:"text"},
            {label:"Industry",fieldName:"Industry",type:"text"},

        ])
	 var methodRef=component.get("c.getRecords");
            methodRef.setParams({"objectname":"Account"});
          methodRef.setCallback(this,function(response){
            var status=response.getState();
              
            if(status==='SUCCESS'){
                component.set("v.accountList",response.getReturnValue());
                                
            }
        });
        $A.enqueueAction(methodRef);
         
	},
   getSelectedRecord: function(component, event, helper) {
         var cmp=event.getParam('selectedRows');
           component.set("v.selectedRecord",cmp);
            var id= [];
            for(var a in cmp){
            var value = cmp[a];
            console.log(value);
            id.push(value.Id);
            }
        console.log(id);
        component.set("v.RecordIds",id);
            component.set("v.Recordcount",cmp.length);
             console.log(component.get("v.Recordcount"));

  },
            
 editRecord:function(component, event, helper) {
            if(component.get("v.Recordcount")==1){
                 var methodRef=component.get("c.getRecordId");
        		methodRef.setParams({
            					"id":component.get("v.RecordIds")
        							});
         		methodRef.setCallback(this,function(response) {
            	var state = response.getState();
            		if (state === 'SUCCESS'){
             			var editRecordEvent = $A.get("e.force:editRecord");
                		var id=response.getReturnValue();
    					editRecordEvent.setParams({
         									"recordId": id
  		 								});
               
           			editRecordEvent.fire();
            		}
              });
                 $A.enqueueAction(methodRef);
            }
            else{
            alert('please select one record for edit');
            }       
 },
    deleteRecord :function(component, event, helper) {
        var answer=confirm('Are you sure that you want to delete the selected records');
        if(answer){
        var methodRef=component.get("c.deleteRecords");
        methodRef.setParams({
            "id":component.get("v.RecordIds")
        });
         methodRef.setCallback(this,function(response) {
            var state = response.getState();
            if (state === 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
            }
         });
        $A.enqueueAction(methodRef);
    }else{
     $A.get('e.force:refreshView').fire();
    }

 },
    
})