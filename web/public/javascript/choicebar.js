

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;



///redimensionare la deschiderea unui dropdown ca sa nu se intercaleze
for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}


///actionare buton pt generare statistici
// var btn = document.getElementById("getStatistics");
// btn.addEventListener("click", finalChoices);
//
// function finalChoices(){
//
//     ////retinerea elementelor care sunt checked
//
//     var all_input=document.getElementsByClassName("choice_input");
//
//     for(i=0;i<all_input.length;i++){
//         if(all_input[i].checked==true){
//             console.log(all_input[i].previousElementSibling.innerHTML);
//         }
//
//     }
//
// }

