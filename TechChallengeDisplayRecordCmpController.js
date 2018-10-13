({
	doInit : function(component, event, helper) {
        component.set("v.Columns", [
            {label:"Name",fieldName:"Name",type:"url",
            typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
            {label:"Account Number",fieldName:"AccountNumber",type:"Number"},
            {label:"Account Owner",fieldName:"OwnerNme",type:'text'},
            {label:"Account Source",fieldName:"AccountSource",type:"text"},
            {label:"AnnualRevenue",fieldName:"AnnualRevenue",type:"currency"},
            {label:"Type",fieldName:"Type",type:"text"},
            {label:"Industry",fieldName:"Industry",type:"text"},
            {label:"CreateBy",fieldName:"CreatedByName"},
              {type: 'button',              
                   typeAttributes: {
                label: 'Edit',
                name: 'Edit',
                title: 'Edit',
                disabled: false,
                value: 'Edit',
                iconPosition: 'left',
                   variant:'base'
               }},
                {type: 'button', 
                   typeAttributes: {
                label: 'Delete',
                name: 'Delete',
                title: 'Delete',
                disabled: false,
                value: 'Delete',
                iconPosition: 'left',
                variant:'base'
            }  
            }
        ])
        
         component.set("v.ColumnsUpdate", [
            {label:"Name",fieldName:"Name",type:"text"},
             {label:"Account Source",fieldName:"AccountSource",type:"text"},
             ]);
             
	 	var methodRef=component.get("c.getRecords");
            methodRef.setParams({"objectname":"Account"});
          methodRef.setCallback(this,function(response){
            var status=response.getState();
            if(status==='SUCCESS'){
             var rows=response.getReturnValue();
               //omponent.set(,response.getReturnValue()); 
             for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                       console.log('ow'+row);
                if (row.Owner) row.OwnerNme = row.Owner.Name;
                if(row.CreatedBy) row.CreatedByName=row.CreatedBy.Name;
            }
            component.set("v.accountList", rows);
            }
        });
           helper.serverCall(methodRef); 
	},
   getSelectedRecord: function(component, event, helper) {
         var cmp=event.getParam('selectedRows');
           component.set("v.selectedRecord",cmp);
       console.log( component.get("v.selectedRecord"));
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
            
    deleteRecord :function(component, event, helper) {
        helper.deleteRow(component, event);

 },
    handleRowAction :function(component, event, helper) {
        console.log('inside')
         var action = event.getParam('action');
        var row = event.getParam('row');
        console.log(action.name)
        switch (action.name) {
          case 'Edit':
                helper.editRow(component, event);
                break;
          case 'Delete':
                helper.deleteRow(component, event);
                break;
        }
    },
    closeModal : function(component, event, helper) {
		component.destroy();
         helper.refresh();
	},
    openModal:function(component, event, helper) {
        var cmpTarget = component.find('modal');
		$A.util.removeClass(cmpTarget,"slds-hide");
		$A.util.addClass(cmpTarget, 'slds-fade-in-open');
        console.log(component.get("v.selectedRecord"));

    },
    onchnagepick :function(component, event, helper) {
    var object= component.find("source").get("v.value");
        console.log(object);
        component.set("v.SelectedSource",object);
        
        
    },
    UpdateRecord:function(component, event, helper) {
        var methodRef=component.get("c.updaterecord");
        var SourceValue=component.get("v.SelectedSource");
        console.log(SourceValue);
            methodRef.setParams(
                {"Accounts":component.get("v.selectedRecord"),
                "SourceValue":SourceValue});
        methodRef.setCallback(this,function(response){
            var status=response.getState();
              
            if(status==='SUCCESS'){
              helper.refresh();
                            
            }
        });
        helper.serverCall(methodRef);
        
    }
})
