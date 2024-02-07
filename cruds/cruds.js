let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tbl = document.getElementById("tbl");
let deletes = document.getElementById("delete");
let search_inp = document.getElementById("search");
let s_title = document.getElementById("s_title");
let s_category = document.getElementById("s_category");
let head_h = document.getElementById("head_h");


let mood = "create";

let mood_tmp ;

let s_mood = "title";

let s_ind;






// get  total
function get_total(){
    if(price.value != ""){
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value) ) - Number(discount.value);
        total.innerHTML = result;
        total.style.background = "green";
    }else{
        total.style.background = "red";
        total.innerHTML = "";
    }
    }
// create product
let data_p;
if(localStorage.product != undefined){
     data_p = JSON.parse(localStorage.product);
}else{
    data_p = [];
}
function create_el(){
    let new_p = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        total: total.innerHTML,
        category: category.value,
    };
    if(title.value == ""|| price.value == "" ||category.value == ""){
        head_h.style.display = "block";
        head_h.innerHTML = "Please fill all fields";
    }else if(count.value >100){
        head_h.style.display = "block";
        head_h.innerHTML = "count can't be more than 100 element";
        
    }else{
        clear();
        head_h.style.display = "none";
        if(mood == "create"){
            if(new_p.count >1){
                for(i=0 ; i < new_p.count  ; i++){
                    data_p.push(new_p);
                }
            }else{
            data_p.push(new_p);
        }
    }else{
        data_p[mood_tmp] = new_p;
        create.innerHTML = "create";
        mood = "create";
        count.style.display = "block";
    }
}
    
    localStorage.setItem( `product` , JSON.stringify(data_p));
    
    
    display();
    check_del();
    // count_el(data_p.count);
    }
// clear after create
    function clear(){
        title.value = "";
        price.value = "";
        taxes.value ="";
        ads.value = "";
        discount.value = "";
        get_total()
        count.value = "";
        category.value = "";
    }
//  display the data from localStorage to HTML
function display(){
    let table = "";
    for(let i = 0 ; i < data_p.length ; i++){
        table += `
        <tr>
            <td>${(i+1)}</td>
            <td>${data_p[i].title}</td>
            <td>${data_p[i].price}</td>
            <td>${data_p[i].taxes}</td>
            <td>${data_p[i].ads}</td>
            <td>${data_p[i].discount}</td>
            <td>${data_p[i].total}</td>
            <td>${data_p[i].category}</td>
            <td  onclick={update_el(${i})} id="update" class="update">update</td>
            <td  onclick={delete_el(${i})}  id="delete" class="delete">delete</td>
        </tr>   
        `;

    }
    tbl.innerHTML = table;
    
    }
display();


// delete elements
function delete_el(ele){
    data_p.splice(ele,1);
    localStorage.product = JSON.stringify(data_p);
    display();
    check_del();
}


// delete all  &&  check delete btn
function check_del(c){

    if(data_p.length > 0){
        deletes.classList.add( "show-del");
    }else{
        deletes.classList.remove( "show-del");
    }
    deletes.innerHTML = `delete all (${data_p.length})`;
}
function delete_all(){
        data_p.splice(0 , data_p.length);
        localStorage.product = JSON.stringify(data_p);
    display( );
    check_del();
}
check_del();

// update 

function update_el(x){
    title.value = data_p[x].title;
    price.value = data_p[x].price;
    taxes.value = data_p[x].taxes;
    ads.value = data_p[x].ads;
    discount.value = data_p[x].discount;
    count.value = data_p[x].count;
    category.value = data_p[x].category;
    get_total();
    count.style.display = "none"
    create.innerHTML = "update";
    mood = "update";
    mood_tmp = x;
    scroll({
        top : 0,
        behavior : "smooth",
    })
}

// search
s_title.addEventListener("click" , function(){s_mood = "title";    search_inp.focus(); search_inp.setAttribute("placeholder" , "search by title ")  ; search_inp.value = "";  search()})
s_category.addEventListener("click" , function(){s_mood = "cate";  search_inp.focus(); search_inp.setAttribute("placeholder" , "search by category"); search_inp.value = "";  search()})
 
function search(){
    let table="";
    if(s_mood == "cate"){
        for(let i=0 ; i < data_p.length ;i++){
            if(JSON.stringify(data_p[i].category).includes(search_inp.value.toLocaleLowerCase())){
                table += `
                    <tr>
                        <td>${(i+1)}</td>
                        <td>${data_p[i].title}</td>
                        <td>${data_p[i].price}</td>
                        <td>${data_p[i].taxes}</td>
                        <td>${data_p[i].ads}</td>
                        <td>${data_p[i].discount}</td>
                        <td>${data_p[i].total}</td>
                        <td>${data_p[i].category}</td>
                        <td  onclick={update_el(${i})} id="update" class="update">update</td>
                        <td  onclick={delete_el(${i})}  id="delete" class="delete">delete</td>
                    </tr>   
                    `;
                }
            }
        }else{
            for(let i=0 ; i < data_p.length ;i++){
                if(JSON.stringify(data_p[i].title).includes(search_inp.value.toLocaleLowerCase())){
                    table += `
                        <tr>
                            <td>${(i+1)}</td>
                            <td>${data_p[i].title}</td>
                            <td>${data_p[i].price}</td>
                            <td>${data_p[i].taxes}</td>
                            <td>${data_p[i].ads}</td>
                            <td>${data_p[i].discount}</td>
                            <td>${data_p[i].total}</td>
                            <td>${data_p[i].category}</td>
                            <td  onclick={update_el(${i})} id="update" class="update">update</td>
                            <td  onclick={delete_el(${i})}  id="delete" class="delete">delete</td>
                        </tr>   
                        `;
                    }
                }
        }
        tbl.innerHTML = table;   
}


// clean data

