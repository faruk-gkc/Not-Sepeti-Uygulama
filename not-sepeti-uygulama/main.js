const getInput = document.querySelector(".form-value");
const getAdd =  document.querySelector(".form-btn");
const gorevListesi = document.querySelector(".gorev-listesi");

getAdd.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevSilTamamla);
document.addEventListener("DOMContentLoaded",localStorageOku);



function gorevSilTamamla(e){
    const tiklanilanEleman = e.target;

    if(tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")){
        console.log("tamamlandı");
        tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");
    }
    if(tiklanilanEleman.classList.contains("gorev-btn-sil")){
        if(confirm("Emin misiniz?")){
            tiklanilanEleman.parentElement.classList.toggle("kaybol"); // kaybol clasını ekle 

            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev)
    
            tiklanilanEleman.parentElement.addEventListener("transitionend",function(){ // transitionend yani trasition bittiğinde kaldır parent'i
                tiklanilanEleman.parentElement.remove();
            });
        }
       
        
    }
}


function gorevEkle(e){
    e.preventDefault();

    // BOŞ DEĞER OLUŞURMASIN DİYE YAPTIK..
    if(getInput.value.length > 0){
        gorevItemOlustur(getInput.value);

        localStorageKaydet(getInput.value);
        //input içeriğini boşaltma
        getInput.value ="";
    }
    else{
        alert("Boş Görev Tanımı Girilemez..");
    }
}

function localStorageArrayeDonustur(){
    let gorevler;

    if(localStorage.getItem("gorevler") === null){
        gorevler =[];
    }
    else{
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }

    return gorevler;
}

function localStorageKaydet(getInput){
    let gorevler = localStorageArrayeDonustur();

    gorevler.push(getInput);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
function localStorageOku(){
    let gorevler = localStorageArrayeDonustur();

    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev){
 //div oluşturma
 const yeniDiv = document.createElement("div");
 yeniDiv.classList.add("gorev-item");// div'e class ismi verdik.


 //li oluşturma
 const yeniLi = document.createElement("li");
 yeniLi.classList.add("gorev-tanim");
 yeniLi.innerText = gorev;
 yeniDiv.appendChild(yeniLi);


 //yeni görev tamam butonu oluştuma
 const yeniGorevTamam = document.createElement("button");
 yeniGorevTamam.classList.add("gorev-btn");
 yeniGorevTamam.classList.add("gorev-btn-tamamlandi");
 yeniGorevTamam.innerHTML = '<i class="fas fa-check-square"></i>';
 yeniDiv.appendChild(yeniGorevTamam);

 //yeni görev sil butonu oluştuma
 const yeniGorevSil = document.createElement("button");
 yeniGorevSil.classList.add("gorev-btn");
 yeniGorevSil.classList.add("gorev-btn-sil");
 yeniGorevSil.innerHTML = '<i class="fas fa-trash-alt"></i>';
 yeniDiv.appendChild(yeniGorevSil);


 //ul ye oluşturduğumuz divi ekleyelim;
 gorevListesi.appendChild(yeniDiv);
}

function localStorageSil(gorev){
    let gorevler = localStorageArrayeDonustur();

    //JAVASCRİPT ARRAY REMOVE ITEM İLE BAKARAK SPLİCE İLE ELEMAN SİLİCEZ..Storage'ye okutucaz..
    const silinecekElemanIndex = gorevler.indexOf(gorev)
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);
    
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}