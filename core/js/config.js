/**
 * Copyright (c) 2011, Robin Appelman <icewind1991@gmail.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING-README file.
 */

/**
 * @namespace
 */
OC.AppConfig={
	url:OC.filePath('core','ajax','appconfig.php'),
	getCall:function(action,data,callback){
		data.action=action;
		$.getJSON(OC.AppConfig.url,data,function(result){
			if(result.status==='success'){
				if(callback){
					callback(result.data);
				}
			}
		});
	},
	postCall:function(action,data,callback){
		data.action=action;
		$.post(OC.AppConfig.url,data,function(result){
			if(result.status==='success'){
				if(callback){
					callback(result.data);
				}
			}
		},'json');
	},
	getValue:function(app,key,defaultValue,callback){
		if(typeof defaultValue=='function'){
			callback=defaultValue;
			defaultValue=null;
		}
		OC.AppConfig.getCall('getValue',{app:app,key:key,defaultValue:defaultValue},callback);
	},
	setValue:function(app,key,value){
		if (OC.PasswordConfirmation.requiresPasswordConfirmation()) {
			OC.PasswordConfirmation.requirePasswordConfirmation(_.bind(this.setValue, this, arguments));
			return;
		}

		OC.AppConfig.postCall('setValue',{app:app,key:key,value:value});
	},
	getApps:function(callback){
		OC.AppConfig.getCall('getApps',{},callback);
	},
	getKeys:function(app,callback){
		OC.AppConfig.getCall('getKeys',{app:app},callback);
	},
	hasKey:function(app,key,callback){
		OC.AppConfig.getCall('hasKey',{app:app,key:key},callback);
	},
	deleteKey:function(app,key){
		if (OC.PasswordConfirmation.requiresPasswordConfirmation()) {
			OC.PasswordConfirmation.requirePasswordConfirmation(_.bind(this.deleteKey, this, arguments));
			return;
		}

		OC.AppConfig.postCall('deleteKey',{app:app,key:key});
	},
	deleteApp:function(app){
		if (OC.PasswordConfirmation.requiresPasswordConfirmation()) {
			OC.PasswordConfirmation.requirePasswordConfirmation(_.bind(this.deleteApp, this, arguments));
			return;
		}

		OC.AppConfig.postCall('deleteApp',{app:app});
	}
};
//TODO OC.Preferences
