
function Exit(args){
    args.parentNode.removeChild(args)
    Update2()
}
function Update(){
    for(let i=0;i<user_backgroundNode.children.length;i++){
        if (user_backgroundNode.children[i].children.length>2){
            let the_node=user_backgroundNode.children[i].children[0].children[0]
            if(body.getElementsByClassName('user')[0].children.length>2){
                the_node.onclick=Switch.bind(null,body.getElementsByClassName('user')[0],user_backgroundNode.children[i],new User(body.getElementsByClassName('user')[0].name).Node,
                new User_center(user_backgroundNode.children[i].name).Node)
            }
            else{
                the_node.onclick=Switch.bind(null,body.getElementsByClassName('user')[0],user_backgroundNode.children[i],new Me_side(body.getElementsByClassName('user')[0].name).Node,
                new User_center(user_backgroundNode.children[i].name).Node)
            }
        }
        else{
            let the_node=user_backgroundNode.children[i].children[0].children[0]
            the_node.onclick=Switch.bind(null,body.getElementsByClassName('user')[0],user_backgroundNode.children[i],new User(body.getElementsByClassName('user')[0].name).Node,
            new Me(user_backgroundNode.children[i].name).Node)
        }
    }
}
function Update2(){
    console.log(document.getElementById('background_others').getElementsByClassName('user').length)
    if(document.getElementById('background_me').children.length===0){
        console.log('check')
        if(document.getElementById('background_others').getElementsByClassName('user').length===1){
            document.getElementById('background_me').style.width="100%"
            document.getElementById('background_me').style.height="95%"
            document.getElementById('background_others').style.width="0%"
            document.getElementById('background_others').style.height="0%"
            var o_name=document.getElementById('background_others').getElementsByClassName('user')[0].name
            document.getElementById('background_others').removeChild(document.getElementById('background_others').getElementsByClassName('user')[0])
            document.getElementById('background_me').appendChild(new Me(o_name).Node)


        }
        else{
            document.getElementById('background_me').style.width="0%"
            document.getElementById('background_others').style.width="100%"
        }
    }
    if(document.getElementById('background_others').getElementsByClassName('user').length===0){
        document.getElementById('background_me').style.width="100%"
        document.getElementById('background_me').style.height="95%"
        document.getElementById('background_others').style.width="0%"
        document.getElementById('background_others').style.height="0%"
    }
}
function Switch(old_1,old_2,new_1,new_2){
    console.log(old_1)
    if(document.getElementById('background_me').children.length!==0){
        var parent_1=old_1.parentNode
        var parent_2=old_2.parentNode

        parent_1.removeChild(old_1)
        parent_2.removeChild(old_2)

        parent_1.appendChild(new_2)
        parent_2.appendChild(new_1)
        Update()
    }
    else{
        document.getElementById('background_me').style.width="70%"
        document.getElementById('background_others').style.width="30%"
        document.getElementById('background_me').appendChild(new_2)
        document.getElementById('background_others').removeChild(old_2)
        document.getElementById('background_others').appendChild(new_1)
        Update()
        
    }

}

class small_tool_bar{
    constructor(){
        this.node = document.createElement("div")
        this.node.className="small_tool_bar"
        this.node.innerHTML='<i class="material-symbols-outlined">push_pin</i><i class="material-symbols-outlined">grid_view</i><i class="material-symbols-outlined">close_fullscreen</i>'
    }
    get Node(){
        return this.node
    }
}
class Name{
    constructor(name){
        this.node = document.createElement('p')
        this.node.innerHTML=name
    }
    get Node(){
        return this.node
    }

}
class User_circle{
    constructor(name){
        this.node = document.createElement("div")
        this.node.className= "user_circle"
        var tool_bar=new small_tool_bar().Node
        this.node.appendChild(tool_bar)
        this.node.appendChild(new Name(name).Node)

    }
    get Node(){
        return this.node
    }
}
class Circle_icon{
    constructor(){
        this.node = document.createElement("label")
        this.node.className ="circle_icon"
        this.node.innerHTML="<input type='checkbox'><i class='fa-solid fa-microphone-slash'></i></input><i class='fa-solid fa-microphone'></i>"
    }
    get Node(){
        return this.node
    }
}
class Exit_button{
    constructor(){
        this.node = document.createElement('div')
        this.node.className="exit_button"
    }
    get Node(){
        return this.node
    }

}
class User{
    constructor(name){
        this.node = document.createElement("div")
        this.node.className="user"
        this.node.name=name
        // this.node.name=name
        this.node.user_circle =new User_circle(name).Node
        this.node.appendChild(this.node.user_circle)
        
        this.node.appendChild(new Circle_icon().Node)
        
        var new_button=new Exit_button().Node
        this.node.appendChild(new_button)
        new_button.addEventListener("click",Exit.bind(null,new_button.parentNode))

    }
    get Node(){
        return this.node
    }
}
class User_center{
    constructor(name){
        this.node = document.createElement("div")
        this.node.className="user"
        this.node.name=name
        this.node.user_circle =new User_circle(name).Node
        this.node.appendChild(this.node.user_circle)
        
        this.node.appendChild(new Circle_icon().Node)
        
        var new_button=new Exit_button().Node
        this.node.appendChild(new_button)
        new_button.addEventListener("click",Exit.bind(null,new_button.parentNode))

    }
    get Node(){
        return this.node
    }
}
class Me{
    constructor(name){
        this.node = document.createElement('div')
        this.node.className='user'
        this.node.name=name
        // this.node.style.backgroundColor='red'
        this.node.user_circle =new User_circle(name).Node
        this.node.appendChild(this.node.user_circle)

        this.node.appendChild(new Circle_icon().Node)
    }
    get Node(){
        return this.node
    }
}
class Me_side{
    constructor(name){
        this.node = document.createElement('div')
        this.node.className='user'
        this.node.name=name
        this.node.user_circle =new User_circle(name).Node
        this.node.appendChild(this.node.user_circle)

        this.node.appendChild(new Circle_icon().Node)
    }
    get Node(){
        return this.node
    }
}
var body=document.getElementById("background_me")
var me_Node=new Me("me").Node
body.appendChild(me_Node)
var user_backgroundNode = document.getElementById('background_others')
var user_name=["a","b","c","d","e","f"]
for(let i=0;i < user_name.length;i++){
    console.log(i)
    user_backgroundNode.appendChild(new User(user_name[i]).Node)
}
Update()




