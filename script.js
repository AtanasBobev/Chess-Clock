let display={
  hideMenu:function(){
document.querySelector(".container#menu").style.display='none';
  },
  showMenu:function(){
    document.querySelector(".container#menu").style.display='block';
  },
  showSelection:function(){
document.querySelector("#main").classList.remove('d-none');
  },
  hideSelection:function(){
    document.querySelector("#main").classList.add('d-none');
  }
}
