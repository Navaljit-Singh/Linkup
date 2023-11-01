const users = [];

// add new users 
function userJoin(id , username , room) {
    const user = {id , username , room};
    users.push(user);
    return user ; 
    
}



// what if we want to have the current user

function getCurrentUser(id){
   return users.find(user=>user.id ===id);




}
// when user leaves 
function userLeaves(id){
    const index = users.findIndex(user=>user.id === id);
    if(index !== -1){
        return users.splice(index , 1)[0];
    }
}

// total number of users in particular room
function getRoomUsers(room){
    return users.filter(user=>user.room === room);
}
module.exports={
    userJoin , 
    getCurrentUser,
    userLeaves , 
    getRoomUsers
}; 