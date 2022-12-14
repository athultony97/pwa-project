
class ItemsDB{
    constructor(){
        console.log("Db api intiated");
        this.storeName = 'Itemlist';
        this.isAvailable = false;
    this.db = null;
    }
    open(){
        return new Promise((resolve, reject) =>{ 
        console.log('open')
        if (!window.indexedDB) {
            reject("Your browser doesn't support IndexedDB.");
            return;
          }
    
          // Opens/Creates the database.
          const request = window.indexedDB.open("item", 1);
          console.log("request",request)

          request.onerror = event => {
            reject(event.target.error.message);
          };
    
          // Handles the success when opening/creating the database.
          request.onsuccess = event => {
            this.db = event.target.result;
        if (this.db) {
          this.isAvailable = true;
        }

        if (this.isAvailable) {
          resolve();
        }
        else {
          reject('The database is not available.');
        }
          };
          request.onupgradeneeded = event => {
            const db = event.target.result;
            
            // Creates the object store.
            const objectStore = db.createObjectStore(this.storeName, {
              autoIncrement: true
              //keyPath: "id"
            });
    
            // Creates the indexes.
          console.log("object store : ",objectStore)
          };
    
    
        })
    }


    add(item){
        console.log("add call");
         // Assumes initialy that the action will fail.
    let isSuccess = false;
    let error = null;

    const items = {
     
      item: item,
     
      
    };

    return new Promise((resolve, reject) => {

      // Creates the transaction and store objects.
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      // Handles the transaction success.
      transaction.oncomplete = () => {
        if (isSuccess) {
          resolve(items);
        }
        else {
          reject(error || 'Unknown error');
        }
      };

      // Handles the transaction error.
      transaction.onerror = (event) => {
        reject(event.target.error.message);
      };

      const storeRequest = store.add(items);



  
    });
    }

    
}