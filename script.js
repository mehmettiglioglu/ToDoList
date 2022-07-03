// Selector 
let addButtonDOM=document.querySelector("#add");
let inputDOM=document.querySelector("#userInput");
let ulDOM=document.querySelector("#list");
let formDOM=document.querySelector("#form")
let toastDOM=document.querySelector("#toast")
let toastBodyDOM=document.querySelector("#toast-body")
let deleteAllButtonDOM=document.querySelector("#deleteAll")

toastDOM.style.display="none"

showTask();
// Event Listener
addButtonDOM.addEventListener("click",add);



function add(event){
    // Sayfanın tekrar yüklenmemesini sağladık
   event.preventDefault();
    // Local storage'den veriyi aldık ve üstüne veri ekledik.
   let array=JSON.parse( localStorage.getItem("item"));

   // Değerin boş olup olmamasını kontrol ettim ve toast bildirimini ayarladım.
   if(inputDOM.value==0){
    toastDOM.style.display="inline"
    toastBodyDOM.textContent="Boş ekleme yapamazsınız !!!";  
    toastBodyDOM.classList.add("toast-danger","alert-danger");
    toastBodyDOM.classList.remove("toast-info","alert-info");  
       $(toastDOM).toast("show")
   }
   // Değer boş değilse yapılacak işlemler.
   else {
    toastDOM.style.display="inline"
    toastBodyDOM.textContent="Bir yeni öğe eklendi";
    toastBodyDOM.classList.remove("toast-danger","alert-danger");
    toastBodyDOM.classList.add("toast-success","alert-success");
    $(toastDOM).toast("show")
    // Local storage'ye veri aktarıyoruz.
    array.push(inputDOM.value);
    // Veri aktardıktan sonra local storage'i güncelliyoruz.
    localStorage.setItem("item",JSON.stringify(array));
    
    
    // Li nesneni oluşturduk ve ul yapısının içerisine ekledik.
    const liDOM=document.createElement("li");
    liDOM.classList.add("list-group-item");
    liDOM.innerText=inputDOM.value;
    ulDOM.appendChild(liDOM);
    $(toastDOM).toast("show")
    inputDOM.value="";
    
    // Delete buttonu 
    const deleteButton=document.createElement("button");
    deleteButton.classList.add("fl-rg");
    // i nesnesi oluşturduk ve icon yerleştirdik.
    iDOM=document.createElement("i");
    iDOM.classList.add("fa-solid","fa-trash-can")
    deleteButton.appendChild(iDOM)
    liDOM.appendChild(deleteButton)
    
    // Delete buttonu eventi
    
    deleteButton.addEventListener("click",deleteItem);
    function deleteItem(e){
        // e parametresi ile tıklanan hedefin en yakınındaki "li" elementine ulaşıp  textini aldık.
        const item=e.target.closest("li").innerText;   
        // Local storageden verimizi arraye aktardık.                   
        let itemsArray=JSON.parse(localStorage.getItem("item"));
        // Silinecek liste elemanının textiyle Local Storage'de tuttuğumuz verinin textini karşılaştırıyoruz ve aynı olanı silmiş oluyoruz. 
        itemsArray.splice(itemsArray.indexOf(item),1);
        // Sildikten sonra local storage'i güncelliyoruz.
        localStorage.setItem("item",JSON.stringify(itemsArray))
        ulDOM.removeChild(liDOM);
    }
    
    // Üstü çizili yapmak
    liDOM.addEventListener("check",function(){
        liDOM.classList.toggle("line")        
    })       
}
}

// Sayfa yenilendikten sonra çalışan fonksiyon;
function showTask(){
    // Eğer local storage'de "item" adlı veri varsa bunu array haline getir ve itemList değişkenine ata, eğer yoksa itemList değişkenini boş array olarak ata.
    let itemList=localStorage.getItem("item")? JSON.parse(localStorage.getItem("item")):[];
    localStorage.setItem("item",JSON.stringify(itemList));
  // Eğer local storage'de eleman varsa herbir eleman için yeniden "li" oluşturup classList'lerine eklemeler yapılacak ve yeniden Delete button oluşturulacak.
    itemList.forEach(item => {
        const liDOM=document.createElement("li");
        liDOM.classList.add("list-group-item");
        liDOM.innerText=item;
        ulDOM.appendChild(liDOM);
        const deleteButton=document.createElement("button");
    deleteButton.classList.add("fl-rg");
    // i nesnesi oluşturduk ve icon yerleştirdik.
    iDOM=document.createElement("i");
    iDOM.classList.add("fa-solid","fa-trash-can")
    deleteButton.appendChild(iDOM)
    liDOM.appendChild(deleteButton)

    // Delete buttonu eventi

    deleteButton.addEventListener("click",deleteItem);
    function deleteItem(e){
         const item=e.target.closest("li").innerText;                      
         let itemsArray=JSON.parse(localStorage.getItem("item"));
         itemsArray.splice(itemsArray.indexOf(item),1);
         localStorage.setItem("item",JSON.stringify(itemsArray))
         ulDOM.removeChild(liDOM);
    }

   
    liDOM.addEventListener("click",function(){
        liDOM.classList.toggle("line")
    })
    });
    
}

const deleteAll=()=>{
localStorage.clear("item");
}
deleteAllButtonDOM.addEventListener("click",deleteAll)