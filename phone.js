const loadphone=async(searchText,isShow)=>{
    const res=await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data=await res.json();  
    const phones=data.data;
    displayphn(phones,isShow);
}
const displayphn=(phones,isShow)=>{
  let phncontainer=document.getElementById('phn-container');
  phncontainer.textContent='';
  const showAll=document.getElementById("show-all")
  if(phones.length>8 && !isShow){
showAll.classList.remove('hidden');
  }
  else{
    showAll.classList.add('hidden')
  }
  if(!isShow){
    phones=phones.slice(0,8);
  }
    phones.forEach(phone=>{
    const phoncard=document.createElement('div')
    phoncard.classList=`card bg-gray-100 p-4 shadow-xl`;
    phoncard.innerHTML=`
                    <figure>
                      <img
                        src="${phone.image}"/>
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleshowdetail('${phone.slug}')"class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
    `;
    
         phncontainer.appendChild(phoncard);
         loadingspinner(false);
    });
}
const handlesearch=(isShow)=>{
        const searchfield=document.getElementById("search-field");
        const searchfieldtext=searchfield.value;
        loadingspinner(true);
        loadphone(searchfieldtext,isShow);
       // searchfield.value='';
}
const loadingspinner=(isloading)=>{
  const spinloader=document.getElementById("spin-loading");
  if(isloading){
    spinloader.classList.remove('hidden');
  }
  else{
    spinloader.classList.add('hidden')
  }
}
const handleshow=()=>{
handlesearch(true);
}
const handleshowdetail=async(id)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data=await res.json();
  showphndetail(data.data)
  
}
const showphndetail=(detail)=>{
  console.log(detail);
  const detailscontainer=document.getElementById('details-container');
  detailscontainer.innerHTML=`
  <div class="px-10 pt-10 flex justify-center">
    <img
      src="${detail.image}"alt="Shoes" class="rounded-xl" />
  </div>
  <div class="card-body items-center text-center ">
    <h2 class="card-title">${detail.name}</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    </div>
    <div>
    <p><span class="text-base font-semibold">Storage :</span>${detail.mainFeatures.storage}</p>
    <p><span class="text-base font-semibold">Display Size :</span>${detail.mainFeatures.displaySize}</p>
    <p><span class="text-base font-semibold">Chipset :</span>${detail.mainFeatures.chipSet}</p>
    <p><span class="text-base font-semibold">Memory :</span>${detail.mainFeatures.memory}</p>
    <p><span class="text-base font-semibold">Slug :</span>${detail.slug}</p>
    <p><span class="text-base font-semibold">Release dates :</span>${detail?.releaseDate}</p>
    <p><span class="text-base font-semibold">Brand :</span>${detail.brand}</p>
    <p><span class="text-base font-semibold">Gps :</span>${detail.others?.GPS||'No GPS'}</p>
    </div>
  `;
  
  show_details.showModal();
}