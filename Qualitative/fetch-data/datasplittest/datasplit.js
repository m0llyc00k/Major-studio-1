let apikey ="https://api.si.edu/openaccess/api/v1.0/search?q=online_visual_material:true+AND+type:edanmdm+AND+%22Memorabilia%20and%20Ephemera-Political%20and%20Activist%20Ephemera%22+&api_key=g41p5R2gTJACnqmLuuBs0bVwYfV4L6domSyjDHMa";
let contentsets=[];
let labelsets=[];

fetch(apikey).then(response => {
    return response.json();
  }).then(data => {
    data.response.rows.forEach(row=>{
      row.content.freetext.setName.forEach(s=>{
          labelsets.push(s.label);    
      })
      row.content.freetext.setName.forEach(s=>{
        contentsets.push(s.content);    
    })
    }
  
    
    
    )
    
   
    console.log(labelsets);

  
    console.log(contentsets);
    for(let i =0;i<labelsets.length;i++){
      if(labelsets[i]==="Movement"){
    
        console.log(i,contentsets[i]);

      }

    }
  }).catch(err => {
    // Do something for an error here
  });

