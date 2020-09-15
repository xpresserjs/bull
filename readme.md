# Xpresser Bull Plugin
 ### Setup
 1. Install `@xpresser/bull` in your project
 2. Add `npm://@xpresser/bull` to plugins array in your plugins.json file.
 
 Note: if you don't have `plugins.json` file in your project create one in your **backend** folder.
 **backend/plugins.json**
 ```json
 [
   "npm://@xpresser/bull"
 ]
 ```
 
 ### Config
 Add to your plugins config using key `@xpresser/bull`
 ```javascript
 {
   plugins: {
     '@xpresser/bull': {
        enabled: true,
        handleCron: false,
        logCompletedTime: true
     }   
   }
 }
 ```