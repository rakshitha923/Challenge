({
	editRow : function(component, row, action) {
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
                 this.serverCall(methodRef);
            }
            else{
            alert('please select one record for edit');
              this.refresh();   
            }      
		
	},
    deleteRow:function(component, event) {
        var answer=confirm('Are you sure that you want to delete the selected records');
        if(answer){
        var methodRef=component.get("c.deleteRecords");
        methodRef.setParams({
            "id":component.get("v.RecordIds")
        });
         methodRef.setCallback(this,function(response) {
            var state = response.getState();
            if (state === 'SUCCESS'){
                this.refresh();
            }
         });
        this.serverCall(methodRef);
    }else{
     this.refresh();
    }
    },
    
   
    refresh:function(){
        $A.get('e.force:refreshView').fire();
    },
    
    serverCall:function(method){
    $A.enqueueAction(method);
   }
    
})