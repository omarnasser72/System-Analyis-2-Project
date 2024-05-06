// COOKIES, LOCAL STORAGE

export const setAuthUser = (data) => {
    // save object to the local storage
    // Stringify OBJECT TO TEXT
    console.log(data);
    try{
      const authUser = JSON.parse(data)
    }catch(err){
      console.log(err);
    }
    localStorage.setItem("user", JSON.stringify(data));
  };
  
  export const getAuthUser = (data) => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    console.log(localStorage);
  };
  
  export const removeAuthUser = () => {
    console.log(localStorage.getItem("user"))
    if (localStorage.getItem("user")) localStorage.removeItem("user");
    
  };
 