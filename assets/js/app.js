// get elements
const post_form = document.getElementById('post-add-modal');
const msg = document.querySelector(".msg");
const all_post = document.querySelector(".all-post");
const edit_form = document.getElementById('edit_form');

//get all posts
const getAllPosts =()=>{
    let posts = readLSData('fb_post');
    let list = '';

    if(!posts){
        all_post.innerHTML=`<div class="text-center shadow no-product">No Post Found</div>`;
        return false;
    }

    posts.reverse().map((data)=>{
        list +=`<div class="post-timeline-area">
        <div class="card">
            <div class="card-body">
                <div class="post-auth-area">
                    <div class="user-info">
                        <img src="${data.aphoto}" alt="">
                        <div class="details">
                            <span>${data.aname}</span>
                            <span>2 h . <i class="fas fa-globe-asia"></i></span>
                        </div>
                        
                    </div>
                    <div class="dropdown">
                        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item edit_btn" post_id="${data.id}" data-bs-toggle="modal" href="#edit_modal">Edit</a></li>
                          <li><a class="dropdown-item delete_btn" post_id="${data.id}" href="#">Delete</a></li>
                        </ul>
                      </div>
                </div>
                <div class="post-content-area">
                    <p>${data.pcontent}</p>
                    
                </div>
            </div>
            
            ${data.pphoto ? '<img class="w-100" src="'+ data.pphoto +'" alt="">' : ''}
        </div>
      </div>`;
    });

    all_post.innerHTML= list;

}

getAllPosts();

// post form submit
post_form.onsubmit=(e)=>{
    e.preventDefault();
    //form data
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const {aname,aphoto,pcontent,pphoto} = Object.fromEntries(form_data.entries());
    //create a random id 
    const randId = Math.floor(Math.random() * 10000)+'_'+ Date.now();

    if(!aname || !aphoto){
        msg.innerHTML=setAlert("All field are required")
    }
    else{
        createLSData('fb_post',{ ...data, id: randId });
        e.target.reset();
        getAllPosts();
        
    }


}

all_post.onclick=(e)=>{
    e.preventDefault();

    // edit button
    if(e.target.classList.contains('edit_btn')){
        let posts_id = e.target.getAttribute('post_id');
        let data = readLSData('fb_post');

        // let deleted_data = ;
       let { aname,aphoto,pcontent,pphoto,id } =  data.find(item => item.id == posts_id);

        

    edit_form.innerHTML=`
        <div class="my-3">
        <label for="">Auth Name</label>
        <input name="aname" class="form-control" type="text" value="${aname}">
    </div>
    <div class="my-3">
        <label for="">Auth Photo</label>
        <input name="aphoto" class="form-control" type="text" value="${aphoto}">
    </div>
    <div class="my-3">
        <label for="">Post Content</label>
        <input name="pcontent" class="form-control" type="text" value="${pcontent}">
    </div>
    <div class="my-3">
        <label for="">Post Photo</label>
        <input name="pphoto" class="form-control" type="text" value="${pphoto}">
    </div>
    <div class="my-3">
        <input name="id" class="form-control" type="hidden" value="${id}">
    </div>
    <div class="my-3">
        <img class="w-100" src="${pphoto}">
    </div>
    <div class="my-3">
        <input class="form-control btn btn-outline-danger" type="submit" value="Update Now">
    </div>`

    }

    // delete btn
    if(e.target.classList.contains('delete_btn')){
         let confi = confirm('Do you Delete It?');
        

         if(confi==true){
            const post_id = e.target.getAttribute('post_id');
            // get all post to LS Data
             const posts = readLSData('fb_post');

            let deleted_data = posts.filter(data => data.id !== post_id);

             updateLSData('fb_post',deleted_data)

             getAllPosts();
         }
    }
}

edit_form.onsubmit=(e)=>{
    e.preventDefault();

    let up_form_data = new FormData(e.target);
    let {aname,aphoto,pcontent,pphoto,id} = Object.fromEntries(up_form_data.entries());
  

    //get dat to LS
    let all_data = readLSData('fb_post');

    let edit_data = all_data.findIndex(data => data.id == id);

    all_data[edit_data] = {aname,aphoto,pcontent,pphoto,id};
  
    // //update LS Data
     updateLSData('fb_post',all_data);
    // // //now realod data
      getAllPosts();
}